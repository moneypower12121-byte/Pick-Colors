import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Tools', path: '/tools' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-[#141313]/80 backdrop-blur-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]"
    >
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto font-['Inter'] font-medium tracking-tight">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <img src="/logo-full.png" alt="PickColors Logo" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
          </Link>
          
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => {
              const isActive = link.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(link.path);
                
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-[#BEC8D0] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#BEC8D0] hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#141313] border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-8 py-6 gap-6">
              {navLinks.map((link) => {
                const isActive = link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);
                  
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`transition-colors duration-200 text-lg ${
                      isActive 
                        ? 'text-white font-semibold' 
                        : 'text-[#BEC8D0] hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
