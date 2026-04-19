import { useState } from 'react';
import { motion } from 'motion/react';
import chroma from 'chroma-js';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContrastChecker() {
  const [fgColor, setFgColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#141313');

  let contrast = 1;
  try {
    contrast = chroma.contrast(fgColor, bgColor);
  } catch (e) {
    // Invalid color
  }

  const getStatus = (ratio: number, target: number) => {
    return ratio >= target ? (
      <span className="flex items-center gap-1 text-green-400"><CheckCircle2 className="w-4 h-4" /> Pass</span>
    ) : (
      <span className="flex items-center gap-1 text-red-400"><XCircle className="w-4 h-4" /> Fail</span>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-5xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Contrast Checker</h1>
          <p className="text-body max-w-2xl">
            Ensure your text is readable and WCAG compliant. Good contrast is essential for accessibility.
          </p>
          <div className="mt-4"><Link to="/blog/color-contrast-checker" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-surface-low rounded-[1.5rem] p-6 border border-white/5">
              <label className="text-label-sm block mb-4">Foreground Color</label>
              <div className="flex gap-4">
                <input 
                  type="color" 
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                />
                <input 
                  type="text" 
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
                />
              </div>
            </div>

            <div className="bg-surface-low rounded-[1.5rem] p-6 border border-white/5">
              <label className="text-label-sm block mb-4">Background Color</label>
              <div className="flex gap-4">
                <input 
                  type="color" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                />
                <input 
                  type="text" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
                />
              </div>
            </div>

            <div className="bg-surface-low rounded-[1.5rem] p-6 border border-white/5">
              <h3 className="text-label-sm mb-6">WCAG 2.1 Results</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium mb-1">Normal Text</div>
                    <div className="text-xs text-text-secondary">Less than 18pt or 14pt bold</div>
                  </div>
                  <div className="flex gap-4 text-sm font-medium">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-text-tertiary text-xs">AA (4.5:1)</span>
                      {getStatus(contrast, 4.5)}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-text-tertiary text-xs">AAA (7.0:1)</span>
                      {getStatus(contrast, 7.0)}
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-white/5 w-full"></div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium mb-1">Large Text</div>
                    <div className="text-xs text-text-secondary">At least 18pt or 14pt bold</div>
                  </div>
                  <div className="flex gap-4 text-sm font-medium">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-text-tertiary text-xs">AA (3.0:1)</span>
                      {getStatus(contrast, 3.0)}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-text-tertiary text-xs">AAA (4.5:1)</span>
                      {getStatus(contrast, 4.5)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <motion.div 
            className="rounded-[2rem] p-12 border border-white/10 flex flex-col justify-center relative overflow-hidden"
            style={{ backgroundColor: bgColor, color: fgColor }}
            animate={{ backgroundColor: bgColor, color: fgColor }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="font-mono text-lg font-medium">{contrast.toFixed(2)} : 1</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">The quick brown fox jumps over the lazy dog</h2>
            <p className="text-lg mb-6 opacity-90">
              This is how your normal text will look. Good contrast ensures that everyone can read your content comfortably, regardless of their visual ability or the device they are using.
            </p>
            <div className="flex gap-4">
              <button 
                className="px-6 py-3 rounded-full font-medium transition-transform hover:scale-[0.98] active:scale-95"
                style={{ backgroundColor: fgColor, color: bgColor }}
              >
                Primary Action
              </button>
              <button 
                className="px-6 py-3 rounded-full font-medium border transition-transform hover:scale-[0.98] active:scale-95"
                style={{ borderColor: fgColor, color: fgColor }}
              >
                Secondary
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
