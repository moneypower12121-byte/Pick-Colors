import { Link } from 'react-router-dom';
import { Globe, Megaphone, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] w-full pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-30 select-none">
        <h1 className="text-[15vw] font-black font-['Inter'] text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent leading-none whitespace-nowrap">
          PICKCOLORS
        </h1>
      </div>
      
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Hero / CTA Section inside Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 mb-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-white/70 uppercase tracking-widest">Ready to build</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
          Elevate your interface with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">precision color</span>.
        </h2>
        
        <p className="text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
          The Digital Prism is a specialized toolkit for architects of the web. 
          Stop guessing values and start building robust optical systems.
        </p>

        <Link 
          to="/tools" 
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Explore All Tools</span>
          <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-primary/20 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-12 gap-12 px-8 max-w-7xl mx-auto border-t border-white/10 pt-20">
        
        {/* Brand Column */}
        <div className="col-span-2 lg:col-span-5 pr-8">
          <Link to="/" className="inline-block mb-6 transition-transform hover:scale-105 origin-left">
            <img src="/logo-full.png" alt="PickColors Logo" className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" referrerPolicy="no-referrer" />
          </Link>
          <p className="font-['Inter'] text-sm text-[#BEC8D0] leading-relaxed max-w-xs mb-8">
            The Digital Prism. A specialized toolset for modern chromatic selection, accessibility validation, and palette architecture.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[#BEC8D0] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
              <Globe className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[#BEC8D0] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
              <Megaphone className="w-4 h-4" />
            </a>
            <a href="mailto:hello@pickcolors.xyz" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-[#BEC8D0] hover:bg-white hover:text-black hover:border-white transition-all duration-300">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="col-span-1 lg:col-span-2 lg:col-start-7">
          <div className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-[2px] bg-primary"></span>
            Product
          </div>
          <div className="flex flex-col gap-4 font-['Inter'] text-sm text-[#BEC8D0]">
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/tools">Tool Index</Link>
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/picker">Color Picker</Link>
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/palette">Palette Generator</Link>
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/gallery">Inspiration Gallery</Link>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-[2px] bg-purple-500"></span>
            Resources
          </div>
          <div className="flex flex-col gap-4 font-['Inter'] text-sm text-[#BEC8D0]">
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/blog">Blog & Articles</Link>
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/about">About Us</Link>
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/contact">Contact Support</Link>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-2">
          <div className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-[2px] bg-zinc-500"></span>
            Legal
          </div>
          <div className="flex flex-col gap-4 font-['Inter'] text-sm text-[#BEC8D0]">
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/privacy">Privacy Policy</Link>
            <Link className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit" to="/terms">Terms of Service</Link>
          </div>
        </div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 mt-24 pt-8 border-t border-white/10 flex flex-col items-center">
        <p className="font-['Inter'] text-xs text-[#BEC8D0] flex items-center gap-2">
          © {new Date().getFullYear()} PickColors. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
