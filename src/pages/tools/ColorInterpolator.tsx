import { useState } from 'react';
import { motion } from 'motion/react';
import chroma from 'chroma-js';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';


export default function ColorInterpolator() {
  const [color1, setColor1] = useState('#80D0FF');
  const [color2, setColor2] = useState('#FF003C');
  const [steps, setSteps] = useState(7);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  let scale: string[] = [];
  try {
    scale = chroma.scale([color1, color2]).mode('lrgb').colors(steps);
  } catch (e) {
    // Invalid colors
  }

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Color Interpolator - Smooth Color Transitions" 
        description="Generate smooth, mathematically precise transitional steps between two base colors."
        canonicalUrl="https://pickcolors.xyz/tools/ColorInterpolator"
      />
      <main className="max-w-5xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Color Interpolator</h1>
          <p className="text-body max-w-2xl">
            Generate smooth, mathematically precise transitional steps between two base colors.
          </p>
          <div className="mt-4"><Link to="/blog/color-interpolator" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="text-label-sm block mb-4">Start Color</label>
            <div className="flex gap-4">
              <input 
                type="color" 
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
              />
              <input 
                type="text" 
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
              />
            </div>
          </div>

          <div>
            <label className="text-label-sm block mb-4">End Color</label>
            <div className="flex gap-4">
              <input 
                type="color" 
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
              />
              <input 
                type="text" 
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-label-sm">Steps</label>
              <span className="font-mono text-sm text-text-secondary">{steps}</span>
            </div>
            <input 
              type="range" 
              min="3" max="15" 
              value={steps} 
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer bg-surface-medium"
            />
          </div>
        </div>

        {scale.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-label-sm mb-6">Interpolated Palette</h3>
            <div className="flex flex-wrap gap-2">
              {scale.map((hex, i) => {
                const isDark = chroma(hex).luminance() < 0.4;
                return (
                  <motion.div
                    key={`${hex}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleCopy(hex, i)}
                    className="group relative h-32 flex-1 min-w-[60px] rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-end p-3 border border-white/5 hover:scale-105 transition-transform"
                    style={{ backgroundColor: hex }}
                  >
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end ${isDark ? 'text-white' : 'text-black'}`}>
                      <span className="font-mono text-[10px]">{hex.toUpperCase()}</span>
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
