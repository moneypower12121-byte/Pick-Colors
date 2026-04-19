import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VisionSimulator() {
  const [palette, setPalette] = useState([
    '#FF003C', '#FCEE09', '#00FFF5', '#050A30', '#80D0FF'
  ]);

  const updateColor = (index: number, value: string) => {
    const newPalette = [...palette];
    newPalette[index] = value;
    setPalette(newPalette);
  };

  const simulations = [
    { id: 'normal', name: 'Normal Vision', desc: 'Standard trichromatic vision.' },
    { id: 'protanopia', name: 'Protanopia', desc: 'Red-blind. Anomalous red cones.' },
    { id: 'deuteranopia', name: 'Deuteranopia', desc: 'Green-blind. Anomalous green cones.' },
    { id: 'tritanopia', name: 'Tritanopia', desc: 'Blue-blind. Anomalous blue cones.' },
    { id: 'achromatopsia', name: 'Achromatopsia', desc: 'Monochromacy. Complete color blindness.' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      {/* SVG Filters for Color Blindness Simulation */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0  0, 0.433, 0.567, 0, 0  0, 0.475, 0.525, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>

      <main className="max-w-5xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Vision Simulator</h1>
          <p className="text-body max-w-2xl">
            Test your palettes against various forms of color blindness to ensure your designs are accessible to everyone.
          </p>
          <div className="mt-4"><Link to="/blog/color-blindness-simulator" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-12">
          <h3 className="text-label-sm mb-6">Edit Base Palette</h3>
          <div className="flex flex-wrap gap-4">
            {palette.map((color, i) => (
              <div key={i} className="flex-1 min-w-[120px] flex flex-col gap-2">
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="w-full h-16 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                />
                <input 
                  type="text" 
                  value={color}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="w-full bg-surface-medium border border-white/10 rounded-lg px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary/50 transition-colors uppercase text-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {simulations.map((sim, index) => (
            <motion.div 
              key={sim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface-low rounded-[1.5rem] p-6 border border-white/5"
            >
              <div className="mb-4">
                <h3 className="font-medium text-lg">{sim.name}</h3>
                <p className="text-sm text-text-secondary">{sim.desc}</p>
              </div>
              
              <div 
                className="flex h-24 rounded-xl overflow-hidden border border-white/5"
                style={{ filter: sim.id === 'normal' ? 'none' : `url(#${sim.id})` }}
              >
                {palette.map((color, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-full" 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
