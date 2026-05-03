import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Info, Image as ImageIcon, Briefcase, ChevronRight } from 'lucide-react';
import { getLugarById } from '../services/api';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lugar, setLugar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    setLoading(true);
    getLugarById(id)
      .then(data => {
        setLugar(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!lugar) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h1 className="text-2xl font-bold text-slate-700">Lugar no encontrado</h1>
        <button onClick={() => navigate('/mapa')} className="text-blue-600 hover:underline flex items-center gap-2 font-medium">
          <ArrowLeft size={18} /> Volver al mapa
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Info },
    { id: 'galeria', label: 'Galería', icon: ImageIcon },
    { id: 'servicios', label: 'Servicios', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-white shadow-sm">
        <img 
          src={lugar.galeria[0]} 
          alt={lugar.nombre} 
          className="w-full h-full object-cover opacity-80 blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        
        <div className="absolute top-6 left-6">
          <button 
            onClick={() => navigate('/mapa')}
            className="p-2 bg-white/90 backdrop-blur-md rounded-full border border-slate-200 hover:bg-white text-slate-700 hover:text-blue-600 transition-all shadow-sm group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute bottom-10 left-6 md:left-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md"
          >
            {lugar.nombre}
          </motion.h1>
          <div className="flex items-center gap-2 text-blue-300 text-sm font-bold uppercase tracking-wider">
            <span className="w-8 h-0.5 bg-blue-400" />
            Información Detallada
          </div>
        </div>
      </div>

      {/* Tabs System */}
      <div className="container mx-auto px-4 md:px-6 -mt-6 relative z-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-2 sm:px-6 flex items-center justify-center gap-2 transition-all relative ${
                  activeTab === tab.id ? 'text-blue-600 font-bold' : 'text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-100/50'
                }`}
              >
                <tab.icon size={20} className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'} />
                <span className="hidden sm:block">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 shadow-[0_-2px_10px_rgba(37,99,235,0.4)]" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      Descripción del Proceso
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {lugar.descripcion}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Estado</span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Activo
                        </span>
                      </div>
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                        <span className="text-xs font-bold uppercase text-slate-400 block mb-1">Responsable</span>
                        <span className="text-slate-700 font-semibold">Coordinación de Área</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'galeria' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {lugar.galeria.map((img, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm group cursor-zoom-in relative"
                      >
                        <img 
                          src={img} 
                          alt={`Foto ${index + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </motion.div>
                    ))}
                    <div className="aspect-video rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
                      <ImageIcon size={40} className="opacity-50" />
                      <span className="text-sm font-medium">Añadir más fotos</span>
                    </div>
                  </div>
                )}

                {activeTab === 'servicios' && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Listado de Servicios</h3>
                    <div className="grid gap-4">
                      {lugar.servicios.map((servicio, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-5 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-100 transition-colors">
                              {index + 1}
                            </div>
                            <span className="text-slate-700 font-semibold group-hover:text-blue-700 transition-colors">{servicio}</span>
                          </div>
                          <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
