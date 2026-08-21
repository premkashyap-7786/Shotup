import { Link, useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="font-sans bg-[#0a0a0a] text-white overflow-x-hidden min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="flex justify-between items-center py-8 px-6 md:px-12 z-50 relative w-full text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium">
        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1.5 group select-none">
          <span className="text-lg md:text-xl font-black tracking-tighter uppercase text-white transition-colors group-hover:text-gray-300">
            SHOTUP
          </span>
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#df1c1c] transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"></div>
        </Link>
        
        <div className="hidden md:flex gap-8 lg:gap-16 text-white/90">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <button 
          className="md:hidden text-white/90 hover:text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center gap-8 text-sm tracking-[0.3em] uppercase font-bold"
          >
            <Link to="/" className="hover:text-[#df1c1c] transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="hover:text-[#df1c1c] transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/portfolio" className="hover:text-[#df1c1c] transition-colors" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
            <Link to="/services" className="hover:text-[#df1c1c] transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/contact" className="hover:text-[#df1c1c] transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {location.pathname !== '/' && (
        <div className="px-6 md:px-12 pb-4 z-30 relative w-full text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold text-gray-500 flex gap-2 items-center">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-700">/</span>
          <span className="text-white">
            {location.pathname === '/about' ? 'About' : location.pathname.replace('/', '')}
          </span>
        </div>
      )}

      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-[#0a0a0a] py-10 px-6 md:px-12 z-30 relative w-full border-t border-white/10 mt-auto">
        <nav className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-[11px] tracking-[0.2em] text-gray-400 uppercase font-medium">
          <div className="flex gap-6 md:gap-12 flex-wrap justify-center">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-gray-500">© {new Date().getFullYear()} SHOTUP.IN</div>
        </nav>
      </footer>
    </div>
  );
}
