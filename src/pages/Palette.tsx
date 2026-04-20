import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, RefreshCw } from 'lucide-react';
import ColorSwatchPro from '../components/ColorSwatchPro';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { toolGuides } from '../data/toolGuides';


export default function Palette() {
  const guideData = toolGuides['palette'];
  const [baseHue, setBaseHue] = useState(200);

  const generatePalette = () => {
    setBaseHue(Math.floor(Math.random() * 360));
  };

  const palette = [
    { name: 'Primary', h: baseHue, s: 80, l: 50 },
    { name: 'Secondary', h: (baseHue + 30) % 360, s: 70, l: 60 },
    { name: 'Accent', h: (baseHue + 150) % 360, s: 90, l: 65 },
    { name: 'Surface', h: baseHue, s: 20, l: 15 },
    { name: 'Background', h: baseHue, s: 10, l: 8 },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Random Color Palette Generator — Free & Instant | PickColors"
        description="Generate beautiful random color palettes instantly. Get HEX codes for every color. Perfect for designers needing fresh color inspiration."
        canonicalUrl="https://pickcolors.xyz/palette"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Random Color Palette Generator",
          "url": "https://pickcolors.xyz/palette",
          "description": "Generate beautiful random color palettes instantly. Get HEX codes for every color. Perfect for designers needing fresh color inspiration.",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "PickColors",
            "url": "https://pickcolors.xyz"
          },
          "featureList": "One-click generation, HEX codes, Exportable palettes, Infinite variations"
        }}
      />
      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              Free Random Color Palette Generator
            </h1>
            <p className="text-on-surface-variant text-lg">Generate fresh inspiration with a single click.</p>
          <div className="mt-4"><Link to="/blog/random-color-palette-generator" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={generatePalette}
            className="px-6 py-4 rounded-full bg-primary text-base-bg font-medium hover:bg-primary-container transition-all hover:scale-[0.98] active:scale-95 flex items-center gap-2 self-start md:self-auto"
          >
            <Wand2 className="w-5 h-5" />
            Generate New
          </motion.button>
        </div>

        {/* Vibrant Shifting Gradient Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-32 w-full rounded-[2rem] mb-12 relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, 
              hsl(${palette[0].h}, ${palette[0].s}%, ${palette[0].l}%), 
              hsl(${palette[1].h}, ${palette[1].s}%, ${palette[1].l}%), 
              hsl(${palette[2].h}, ${palette[2].s}%, ${palette[2].l}%))`
          }}
        >
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={baseHue}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {palette.map((color, index) => {
              const hex = hslToHex(color.h, color.s, color.l);
              const rgb = hslToRgbString(color.h, color.s, color.l);
              const hsl = `${color.h}°, ${color.s}%, ${color.l}%`;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ColorSwatchPro 
                    hex={hex}
                    name={color.name}
                    rgb={rgb}
                    hsl={hsl}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </main>
      <ToolGuide {...guideData} />
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-2xl font-bold mb-8">Related Design Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/picker" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Free Online Color Picker & HEX RGB HSL Converter</h3>
            <p className="text-sm text-text-secondary">Precision color selection with real-time conversion and extraction tool.</p>
          </Link>
          <Link to="/gallery" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Color Palette Inspiration Gallery</h3>
            <p className="text-sm text-text-secondary">Explore 50,000+ curated color palettes for your next project.</p>
          </Link>
          <Link to="/tools/mesh-gradient" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Free CSS Gradient Generator</h3>
            <p className="text-sm text-text-secondary">Create beautiful CSS mesh gradients with multiple color stops.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Helper functions
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hslToRgbString(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return `${f(0)}, ${f(8)}, ${f(4)}`;
}
