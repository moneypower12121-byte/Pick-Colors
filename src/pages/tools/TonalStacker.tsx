import { useState } from 'react';
import { motion } from 'motion/react';
import chroma from 'chroma-js';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';


export default function TonalStacker() {
  const [baseColor, setBaseColor] = useState('#37A1D5');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate a Tailwind-like scale (50 to 950)
  const generateScale = (hex: string) => {
    try {
      const c = chroma(hex);
      // We use lightness manipulation to create the scale
      // 50 is very light (95% lightness), 950 is very dark (5% lightness)
      const lightnesses = [0.95, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05];
      const labels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
      
      return lightnesses.map((l, i) => {
        const shade = c.set('hsl.l', l).hex().toUpperCase();
        return { label: labels[i], hex: shade };
      });
    } catch (e) {
      return [];
    }
  };

  const scale = generateScale(baseColor);

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Tonal Stacker - Shade and Tint Generator" 
        description="Generate perfect shades and tints automatically based on a single base color."
        canonicalUrl="https://pickcolors.xyz/tools/TonalStacker"
      />
      <main className="max-w-5xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Tonal Stacker</h1>
          <p className="text-body max-w-2xl">
            Generate perfect shades and tints automatically based on a single base color. Ideal for creating design system tokens.
          </p>
          <div className="mt-4"><Link to="/blog/tonal-stacker-tool" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-12 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full">
            <label className="text-label-sm block mb-4">Base Color</label>
            <div className="flex gap-4">
              <input 
                type="color" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-14 h-14 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
              />
              <input 
                type="text" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-6 font-mono text-lg focus:outline-none focus:border-primary/50 transition-colors uppercase"
              />
            </div>
          </div>
        </div>

        {scale.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-label-sm mb-6">Generated Scale</h3>
            <div className="grid grid-cols-2 md:grid-cols-11 gap-2">
              {scale.map((swatch, i) => {
                const isDark = chroma(swatch.hex).luminance() < 0.4;
                return (
                  <motion.div
                    key={swatch.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleCopy(swatch.hex, i)}
                    className="group relative h-32 md:h-48 rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between p-3 border border-white/5 hover:scale-105 transition-transform"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <span className={`text-xs font-medium ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                      {swatch.label}
                    </span>
                    
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end ${isDark ? 'text-white' : 'text-black'}`}>
                      <span className="font-mono text-[10px]">{swatch.hex}</span>
                      {copiedIndex === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
