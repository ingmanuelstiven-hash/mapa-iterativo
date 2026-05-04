import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, ArrowRight, Compass, Camera, TreePine } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col font-sans w-full h-full flex-1">
      
      {/* Hero Section con Banner ocupando el 100% del espacio restante */}
      <section className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
        {/* Imagen de Fondo (Placeholder de Unsplash de alta calidad) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')" }}
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-slate-900/40" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white mt-[-5vh]">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm md:text-lg font-bold text-blue-200 uppercase tracking-[0.3em] mb-4 drop-shadow-md">
              Bienvenidos
            </h2>
            <h1 className="text-5xl md:text-8xl font-black mb-6 drop-shadow-2xl">
              Explora Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300">Territorio</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-100 mb-12 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
              Descubre los sitios turísticos más impresionantes, planifica tu ruta e interactúa con el mapa de forma dinámica.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => navigate('/mapa')}
              className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-xl transition-all duration-300 shadow-2xl shadow-blue-900/50 flex items-center gap-3 mx-auto overflow-hidden"
            >
              <span className="relative z-10">Explorar Mapa</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
