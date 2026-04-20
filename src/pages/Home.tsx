import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Palette, Eye, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [previewColors, setPreviewColors] = useState([
    '#B9A6AE', '#9E07B4', '#4D44B0', '#21C6DE', '#A1AA26'
  ]);
  const [floatingColors, setFloatingColors] = useState([
    '#F7416F', '#43F5CE', '#EC9E1D', '#7CE89A'
  ]);
  const [blobColors, setBlobColors] = useState([
    '#2644D9', '#A7FEC6'
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5)
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getRandomHex = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generatePalette = () => {
    setPreviewColors(Array(5).fill(0).map(() => getRandomHex()));
    setFloatingColors(Array(4).fill(0).map(() => getRandomHex()));
    setBlobColors(Array(2).fill(0).map(() => getRandomHex()));
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30 overflow-x-hidden">
      <main>
        <SEO 
          title="Free Color Picker & Palette Tools — PickColors" 
          description="Pick, convert & generate colors in seconds. 16 free tools for designers & developers — HEX, RGB, HSL, CMYK palettes & more. No sign-up needed."
          canonicalUrl="https://pickcolors.xyz/"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "PickColors",
            "url": "https://pickcolors.xyz/",
            "description": "16 free professional color tools for designers and developers. Pick, convert, and generate color palettes with precision.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://pickcolors.xyz/tools"
              },
              "query-input": "required name=search_term_string"
            }
          }}
        />
        {/* New Animated Hero Section */}
        <section 
          className="relative min-h-[1024px] flex flex-col items-center justify-center pt-20 overflow-hidden mesh-gradient-animated cursor-pointer" 
          onClick={generatePalette}
        >
          {/* Background Blobs */}
          <div 
            className="blob w-[600px] h-[600px] top-[-10%] left-[-10%] animate-float" 
            style={{ backgroundColor: blobColors[0] }}
          />
          <div 
            className="blob w-[500px] h-[500px] bottom-[-10%] right-[-10%] animate-float" 
            style={{ animationDelay: '-5s', backgroundColor: blobColors[1] }}
          />
          <div 
            className="blob w-[400px] h-[400px] bg-secondary top-[40%] left-[60%] animate-float" 
            style={{ animationDelay: '-2s' }}
          />
          
          {/* Floating Glassmorphism Cards */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div 
              className="absolute top-[20%] left-[15%] glass-card px-4 py-2 rounded-xl text-xs font-mono animate-float transition-transform duration-200 ease-out" 
              style={{ 
                animationDuration: '12s', 
                borderColor: `${floatingColors[0]}44`, 
                color: floatingColors[0], 
                transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)` 
              }}
            >
              {floatingColors[0]}
            </div>
            <div 
              className="absolute top-[15%] right-[20%] glass-card px-4 py-2 rounded-xl text-xs font-mono animate-float transition-transform duration-200 ease-out" 
              style={{ 
                animationDuration: '18s', 
                animationDelay: '-3s', 
                borderColor: `${floatingColors[1]}44`, 
                color: floatingColors[1], 
                transform: `translate(${mousePosition.x * 60}px, ${mousePosition.y * 60}px)` 
              }}
            >
              {floatingColors[1]}
            </div>
            <div 
              className="absolute bottom-[30%] left-[25%] glass-card px-4 py-2 rounded-xl text-xs font-mono animate-float transition-transform duration-200 ease-out" 
              style={{ 
                animationDuration: '14s', 
                animationDelay: '-7s', 
                borderColor: `${floatingColors[2]}44`, 
                color: floatingColors[2], 
                transform: `translate(${mousePosition.x * 90}px, ${mousePosition.y * 90}px)` 
              }}
            >
              {floatingColors[2]}
            </div>
            <div 
              className="absolute bottom-[20%] right-[15%] glass-card px-4 py-2 rounded-xl text-xs font-mono animate-float transition-transform duration-200 ease-out" 
              style={{ 
                animationDuration: '16s', 
                animationDelay: '-1s', 
                borderColor: `${floatingColors[3]}44`, 
                color: floatingColors[3], 
                transform: `translate(${mousePosition.x * 120}px, ${mousePosition.y * 120}px)` 
              }}
            >
              {floatingColors[3]}
            </div>
          </div>

          <div className="relative z-20 text-center space-y-12 px-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-label tracking-widest uppercase text-primary mx-auto backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Click anywhere to remix
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight text-white text-glow transition-transform duration-500 hover:scale-[1.02]">
                Free Color Picker & Palette Tools for Designers
              </h1>
              <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
                Generate atmospheric palettes with optical precision using the world's most advanced digital prism.
              </p>
            </div>
            <div className="flex flex-col items-center gap-8">
              <Link to="/picker" className="px-10 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-2xl text-xl shadow-2xl shadow-primary/30 transition-all hover:scale-[1.05] active:scale-[0.95] z-30 pointer-events-auto">
                Start Picking for Free
              </Link>
              
              {/* Live Palette Preview */}
              <div className="flex gap-2 p-2 glass-card rounded-2xl backdrop-blur-xl">
                {previewColors.map((color, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1, backgroundColor: color }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-lg shadow-inner" 
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid (The Bento) */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none">Designed for the <br/><span className="text-primary">chromatic elite.</span></h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">Stop using basic design tools. PickColors provides high-fidelity tools for color professionals who demand absolute precision and aesthetic soul.</p>
            </div>
            <div className="h-px bg-white/10 flex-grow mx-8 hidden md:block"></div>
            <span className="text-[10px] font-label uppercase tracking-[0.4em] text-on-surface-variant shrink-0">Capabilities / 01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Feature: The Palette Forge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 glass-card rounded-[2.5rem] p-10 overflow-hidden relative group border border-white/5 hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute -right-32 -top-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/40 transition-colors duration-700" />
              <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] group-hover:bg-secondary/40 transition-colors duration-700" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-2xl mb-8 flex items-center justify-center text-on-primary shadow-lg shadow-primary/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Palette className="w-7 h-7" />
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tight">The Palette Forge</h3>
                  <p className="text-on-surface-variant text-lg mb-8 max-w-md leading-relaxed">
                    Our proprietary algorithm analyzes emotional weight and optical balance to generate cohesive sets that work in any lighting condition.
                  </p>
                </div>

                {/* Animated Abstract Colors Visual */}
                <div className="relative h-40 mt-8 w-full flex items-end justify-end pr-10">
                  <motion.div 
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-24 bottom-4 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 mix-blend-screen blur-md opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <motion.div 
                    animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute right-12 bottom-12 w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 mix-blend-screen blur-md opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <motion.div 
                    animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute right-0 bottom-0 w-36 h-36 rounded-full bg-gradient-to-tr from-purple-500 to-primary mix-blend-screen blur-md opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </motion.div>

            {/* Small Feature: Vision Check */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-[2.5rem] p-10 relative group overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-surface-container-highest border border-white/10 rounded-xl mb-6 flex items-center justify-center text-primary transform group-hover:-translate-y-1 transition-transform duration-300">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Vision Check</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Instant accessibility simulations for 8 types of color vision deficiencies.</p>
                
                {/* Simulated Color Blindness Bar */}
                <div className="mt-8 flex h-2 rounded-full overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex-1 bg-red-500" />
                  <div className="flex-1 bg-green-500" />
                  <div className="flex-1 bg-blue-500" />
                </div>
              </div>
            </motion.div>

            {/* Small Feature: Dev-First Exports */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-[2.5rem] p-10 relative group overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-surface-container-highest border border-white/10 rounded-xl mb-6 flex items-center justify-center text-primary transform group-hover:-translate-y-1 transition-transform duration-300">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Dev-First Exports</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Copy Tailwind, CSS, Sass, or JSON tokens directly to your clipboard.</p>
                
                {/* Code Snippet Visual */}
                <div className="mt-6 bg-[#0D0D0D] rounded-xl p-4 border border-white/5 font-mono text-[10px] sm:text-xs text-primary/80 group-hover:border-primary/30 transition-colors shadow-inner">
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-pink-400">const</span> <span className="text-blue-400">theme</span> = {'{'}
                  <br/>&nbsp;&nbsp;primary: <span className="text-green-400">'#80D0FF'</span>,
                  <br/>&nbsp;&nbsp;bg: <span className="text-green-400">'#141313'</span>
                  <br/>{'}'};
                </div>
              </div>
            </motion.div>

            {/* Wide Feature: Chromatic Exploration */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 glass-card rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 group border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex-1 relative z-10">
                <h3 className="text-3xl font-bold mb-4">Chromatic Exploration</h3>
                <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-md">
                  Browse through 50,000+ curated palettes. Filter by mood, industry, or saturation level. The ultimate exploration tool for modern designers.
                </p>
                <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium group/btn">
                  Explore library
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="flex-1 w-full relative h-48 md:h-64 perspective-1000">
                <motion.div 
                  className="absolute right-4 top-4 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-20 origin-bottom-right"
                  whileHover={{ rotateY: -15, rotateX: 5, scale: 1.05, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80" 
                    alt="Color palette generator preview showing warm tone combinations" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
                <motion.div 
                  className="absolute right-24 top-12 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 origin-bottom-right"
                  whileHover={{ rotateY: -15, rotateX: 5, scale: 1.05, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" 
                    alt="Abstract color palette with vibrant gradients for UI design inspiration" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Ready to evolve your <span className="italic font-light">process?</span></h2>
            <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto">Join 150,000+ designers using PickColors to craft interfaces that vibrate with life.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/picker" className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-primary/40">Get Started Now</Link>
              <Link to="/tools" className="bg-white/5 border border-white/10 text-on-surface px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors">Explore Tools</Link>
            </div>
            <p className="mt-8 text-on-surface-variant text-xs font-label uppercase tracking-widest">Free forever for personal use • No credit card required</p>
          </div>
        </section>
      </main>
    </div>
  );
}
