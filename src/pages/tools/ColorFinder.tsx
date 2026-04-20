import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import ColorSwatchPro from '../../components/ColorSwatchPro';
import chroma from 'chroma-js';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function ColorFinder() {
  const guideData = toolGuides['color-finder'];
  const [color, setColor] = useState('#80D0FF');

  let baseColor = chroma('#80D0FF');
  try {
    baseColor = chroma(color);
  } catch {
    // Keep default
  }

  const generateVariations = () => {
    const variations = [];
    // Generate 12 variations by slightly shifting hue, saturation, and lightness
    for (let i = 0; i < 12; i++) {
      const hShift = (Math.random() - 0.5) * 30; // +/- 15 degrees
      const sShift = (Math.random() - 0.5) * 0.4; // +/- 20%
      const lShift = (Math.random() - 0.5) * 0.4; // +/- 20%
      
      const [h, s, l] = baseColor.hsl();
      const newColor = chroma.hsl(
        (h + hShift + 360) % 360,
        Math.max(0, Math.min(1, s + sShift)),
        Math.max(0, Math.min(1, l + lShift))
      );
      variations.push(newColor);
    }
    return variations;
  };

  const variations = generateVariations();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Similar Color Finder by Code" 
        description="Find similar shades and variations for any HEX or RGB color code."
        canonicalUrl="https://pickcolors.xyz/tools/ColorFinder"
      />
      <main className="max-w-6xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Color Finder by Code</h1>
          <p className="text-body max-w-2xl">
            Find similar shades and variations for any color code.
          </p>
          <div className="mt-4"><Link to="/blog/color-finder-by-code" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input 
                type="text" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter HEX, RGB, or HSL..."
                className="w-full bg-surface-medium border border-white/10 rounded-xl pl-12 pr-6 py-4 text-lg focus:outline-none focus:border-primary/50 transition-colors uppercase font-mono"
              />
            </div>
            <div 
              className="w-16 h-16 rounded-xl border border-white/10 shrink-0"
              style={{ backgroundColor: baseColor.hex() }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-label-sm mb-6">Similar Shades & Variations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {variations.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ColorSwatchPro 
                  hex={c.hex().toUpperCase()}
                  name={`Variation ${i + 1}`}
                  rgb={c.css()}
                  hsl={c.css('hsl')}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
