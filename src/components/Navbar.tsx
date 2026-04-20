import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Tools', path: '/tools' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <div className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none transition-all duration-500">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto rounded-full transition-all duration-500 ${
            scrolled 
              ? 'bg-[#141313]/90 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)] px-6 py-3' 
              : 'bg-[#141313]/50 backdrop-blur-md border border-white/5 shadow-lg px-8 py-4'
          }`}
        >
          <div className="flex justify-between items-center w-full min-w-[280px] md:min-w-[600px] font-['Inter'] font-medium tracking-tight">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <img src="/logo-full.png" alt="PickColors Logo" className="h-7 w-auto object-contain transition-transform hover:scale-105" referrerPolicy="no-referrer" />
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);
                  
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative px-4 py-2 transition-colors duration-200 group rounded-full overflow-hidden"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 ${
                      isActive 
                        ? 'text-white font-semibold shadow-sm' 
                        : 'text-[#BEC8D0] group-hover:text-white'
                    }`}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-[#BEC8D0] hover:text-white transition-colors bg-white/5 p-2 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-full h-screen z-40 bg-[#141313]/95 backdrop-blur-3xl md:hidden pt-32 px-8 flex flex-col"
          >
            <div className="flex flex-col gap-6 items-center w-full">
              {navLinks.map((link, i) => {
                const isActive = link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);
                  
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-center py-4 rounded-2xl transition-all duration-300 text-3xl font-bold ${
                        isActive 
                          ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]' 
                          : 'text-[#BEC8D0] hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-auto mb-12 flex justify-center gap-6 opacity-60">
               {/* Decorative bottom element in mobile menu */}
               <div className="w-2 h-2 rounded-full bg-white/20"></div>
               <div className="w-2 h-2 rounded-full bg-white/40"></div>
               <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
