import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Map } from 'lucide-react';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import DetailPage from './pages/DetailPage';

function Header() {
  const location = useLocation();
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white shadow-sm z-50 relative shrink-0">
      <Link to="/" className="flex items-center gap-2 text-slate-800 font-bold text-xl hover:text-blue-600 transition-colors">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center text-white">
          <Map size={20} />
        </div>
        Mapa Turístico
      </Link>
      <div className="flex items-center gap-6 font-semibold text-slate-600">
        <Link to="/" className={`hover:text-blue-600 transition-colors ${location.pathname === '/' ? 'text-blue-600' : ''}`}>Inicio</Link>
        <Link to="/mapa" className={`hover:text-blue-600 transition-colors ${location.pathname === '/mapa' ? 'text-blue-600' : ''}`}>Mapa</Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto relative z-50 shrink-0">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Mapa Turístico. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/lugar/:id" element={<DetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
