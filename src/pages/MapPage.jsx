import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, ZoomOut, MapPin, Info, Navigation } from 'lucide-react';
import { getLugares } from '../services/api';

export default function MapPage() {
  const navigate = useNavigate();
  const svgContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Nuevos estados para listado y selección
  const [lugares, setLugares] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [pinPos, setPinPos] = useState(null);

  // Cargar lugares
  useEffect(() => {
    getLugares().then(data => setLugares(data));
  }, []);

  // Cargar el SVG dinámicamente
  useEffect(() => {
    fetch('/mapa_procesos.svg')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(data => {
        setSvgContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando el mapa:', err);
        setLoading(false);
      });
  }, []);

  // Calcular posición del PIN cuando se selecciona un lugar de la lista
  useEffect(() => {
    if (selectedId && svgContainerRef.current) {
      // Intentar encontrar el ID en el SVG. El ID del SVG podría ser algo como G_nombre_lugar
      // Necesitamos asegurar que el ID coincida con el nombre en el listado, asumiendo un formato.
      const rawId = selectedId.replace(/-/g, '_');
      const el = document.querySelector(`g[id*="${rawId}" i]`) || document.getElementById(`G_${rawId}`);

      if (el) {
        const containerRect = svgContainerRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setPinPos({
          x: elRect.left - containerRect.left + elRect.width / 2,
          y: elRect.top - containerRect.top + elRect.height / 2
        });
      }
    } else {
      setPinPos(null);
    }
  }, [selectedId, svgContent, hoveredId]);

  // Manejador de eventos global y de alto rendimiento para el SVG
  useEffect(() => {
    if (loading || !svgContent) return;

    const container = svgContainerRef.current;
    const tooltip = tooltipRef.current;
    if (!container) return;

    const handleEvent = (e) => {
      // Buscar cualquier grupo SVG que tenga un ID que empiece por G_
      const groupEl = e.target.closest('g[id^="G_"]');

      if (e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'touchmove') {
        if (groupEl) {
          const rawId = groupEl.id;
          const cleanName = rawId.replace('G_', '').replace(/_/g, ' ');

          if (tooltip) {
            tooltip.classList.add('visible');
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            if (clientX && clientY) {
              tooltip.style.left = `${clientX}px`;
              tooltip.style.top = `${clientY}px`;
            }
            tooltip.innerHTML = `<span class="tooltip-titulo">${cleanName}</span>`;
          }

          if (hoveredId !== rawId) setHoveredId(rawId);
        } else {
          if (tooltip) tooltip.classList.remove('visible');
          setHoveredId(null);
        }
      }

      if (e.type === 'click' || e.type === 'touchend') {
        if (groupEl) {
          e.preventDefault();
          e.stopPropagation();
          const slug = groupEl.id.replace('G_', '').toLowerCase().replace(/_/g, '-');
          if (tooltip) tooltip.classList.remove('visible');
          navigate(`/lugar/${slug}`);
        }
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget || !container.contains(e.relatedTarget)) {
        if (tooltip) tooltip.classList.remove('visible');
        setHoveredId(null);
      }
    };

    container.addEventListener('mousemove', handleEvent);
    container.addEventListener('mouseover', handleEvent);
    container.addEventListener('touchmove', handleEvent, { passive: true });
    container.addEventListener('mouseout', handleMouseOut);
    container.addEventListener('click', handleEvent);
    container.addEventListener('touchend', handleEvent);

    return () => {
      container.removeEventListener('mousemove', handleEvent);
      container.removeEventListener('mouseover', handleEvent);
      container.removeEventListener('touchmove', handleEvent);
      container.removeEventListener('mouseout', handleMouseOut);
      container.removeEventListener('click', handleEvent);
      container.removeEventListener('touchend', handleEvent);
    };
  }, [loading, svgContent, navigate, hoveredId]);

  return (
    <div className="flex-1 w-full bg-slate-50 flex overflow-hidden relative">

      {/* TOOLTIP RESPONSIVE HTML NATIVO (ALTO RENDIMIENTO) */}
      <div id="mapa-tooltip" ref={tooltipRef}></div>

      {/* Herramientas de zoom */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full shadow-md border border-slate-200 p-1 z-50">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Acercar">
          <ZoomIn size={20} />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Alejar">
          <ZoomOut size={20} />
        </button>
      </div>

      {/* Contenedor principal del Mapa */}
      <main className="flex-1 relative flex items-center justify-center bg-white m-4 rounded-3xl shadow-xl border border-slate-200 overflow-hidden svg-map-container">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Cargando mapa turístico...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex items-center justify-center relative"
          >
            <div
              ref={svgContainerRef}
              className="w-full h-full flex items-center justify-center mapa-procesos-wrapper relative"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            {/* PIN Personalizado PNG cuando se selecciona de la lista */}
            <AnimatePresence>
              {pinPos && selectedId && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute pointer-events-none z-50 drop-shadow-xl"
                  style={{
                    left: pinPos.x,
                    top: pinPos.y,
                    transform: 'translate(-50%, -100%)' // Para que la punta del pin apunte al centro
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                    alt="Pin"
                    className="w-12 h-12 md:w-16 md:h-16 animate-bounce"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Panel de Ayuda Fijo - MOVÍDO A LA IZQUIERDA */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden md:block"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl border-2 shadow-2xl rounded-3xl p-6 w-72 flex flex-col items-center gap-4 text-center transition-colors duration-300"
              animate={{ borderColor: hoveredId ? '#3b82f6' : '#e2e8f0' }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-inner ${hoveredId ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                {hoveredId ? <MapPin size={28} className="animate-bounce" /> : <Navigation size={28} />}
              </div>

              <div className="w-full">
                <h3 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2">
                  {hoveredId ? 'Sitio Identificado' : 'Ubicación Actual'}
                </h3>

                {hoveredId ? (
                  <motion.p
                    key={hoveredId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xl font-black text-blue-600 leading-tight"
                  >
                    {hoveredId.replace('G_', '').replace(/_/g, ' ')}
                  </motion.p>
                ) : (
                  <p className="text-xs text-slate-500 font-medium leading-relaxed px-2">
                    Mueve el cursor sobre el mapa o elige un lugar de la lista.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* NUEVO: Panel Derecho de Listado de Lugares */}
      <aside className="w-full md:w-80 lg:w-96 bg-white border-l border-slate-200 shadow-xl z-30 flex flex-col h-full overflow-hidden shrink-0">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-black text-slate-800">Lugares Interactivos</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Selecciona un destino en el mapa</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {lugares.map((lugar) => (
            <div
              key={lugar.id}
              onClick={() => setSelectedId(selectedId === lugar.id ? null : lugar.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col gap-2 ${selectedId === lugar.id
                  ? 'border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-100 hover:border-blue-300 hover:bg-slate-50 hover:shadow-sm'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${selectedId === lugar.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }`}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className={`font-bold transition-colors ${selectedId === lugar.id ? 'text-blue-800' : 'text-slate-700'}`}>
                    {lugar.nombre}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{lugar.descripcion}</p>
                </div>
              </div>

              {/* Botón ver detalles si está seleccionado */}
              <AnimatePresence>
                {selectedId === lugar.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-2"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/lugar/${lugar.id}`);
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Ver Información Completa
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </aside>

    </div>
  );
}
