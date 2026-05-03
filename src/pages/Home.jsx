import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, ArrowRight, MapPin } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col font-sans">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar (simulated) */}
      <nav className="w-full px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
            <Map size={20} />
          </div>
          NexusTour
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <MapPin size={80} className="text-amber-500 mx-auto drop-shadow-lg" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight drop-shadow-sm mb-6"
          >
            Explora el <span className="text-amber-500 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">Mapa Turístico</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 max-w-2xl font-medium drop-shadow-sm mb-12"
          >
            Descubre los puntos de interés e interactúa con el territorio de forma fácil y dinámica.
          </motion.p>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => navigate('/mapa')}
              className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-amber-500/30 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Explorar Mapa</span>
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-slate-400 text-sm relative z-10">
        <p>© {new Date().getFullYear()} NexusTour - Mapa Interactivo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
