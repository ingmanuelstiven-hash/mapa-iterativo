import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, ZoomOut, MapPin, Info } from 'lucide-react';

export default function MapPage() {
  const navigate = useNavigate();
  const svgContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [svgContent, setSvgContent] = useState('');
  const [loading, setLoading] = useState(true);

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
          
          // Actualizar tooltip flotante (alto rendimiento, sin React State)
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

          // Actualizar panel lateral
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
    <div className="h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-2 md:p-4 overflow-hidden">
      
      {/* TOOLTIP RESPONSIVE HTML NATIVO (ALTO RENDIMIENTO) */}
      <div id="mapa-tooltip" ref={tooltipRef}></div>

      {/* Header flotante */}
      <header className="absolute top-4 left-4 flex items-center gap-4 z-50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-md border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all font-semibold"
        >
          <ArrowLeft size={18} />
          <span>Inicio</span>
        </button>
      </header>
      
      {/* Herramientas de zoom */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full shadow-md border border-slate-200 p-1 z-50">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Acercar">
          <ZoomIn size={20} />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Alejar">
          <ZoomOut size={20} />
        </button>
      </div>

      {/* Contenedor principal ocupando ~95% */}
      <main className="w-full h-[95vh] relative flex items-center justify-center bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden svg-map-container mt-12 md:mt-0 p-4">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Cargando mapa turístico...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div 
              ref={svgContainerRef}
              className="w-full h-full flex items-center justify-center cursor-crosshair mapa-procesos-wrapper"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </motion.div>
        )}

        {/* Panel de Ayuda Fijo a la Derecha */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:block"
          >
            <motion.div 
              className="bg-white/95 backdrop-blur-xl border-2 shadow-2xl rounded-3xl p-8 w-80 flex flex-col items-center gap-4 text-center transition-colors duration-300"
              animate={{ borderColor: hoveredId ? '#f8bc1f' : '#e2e8f0' }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-inner ${hoveredId ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
                {hoveredId ? <MapPin size={32} className="animate-bounce" /> : <Info size={32} />}
              </div>
              
              <div className="w-full">
                <h3 className="text-slate-400 font-extrabold text-xs uppercase tracking-widest mb-3">
                  {hoveredId ? 'Sitio Identificado' : 'Exploración Activa'}
                </h3>
                
                {hoveredId ? (
                  <motion.p 
                    key={hoveredId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-black text-amber-600 leading-tight"
                  >
                    {hoveredId.replace('G_', '').replace(/_/g, ' ')}
                  </motion.p>
                ) : (
                  <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">
                    Mueve el cursor sobre los sitios turísticos del mapa para identificarlos.
                  </p>
                )}
              </div>

              {hoveredId && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/30 w-full"
                >
                  Clic para ver detalles
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
