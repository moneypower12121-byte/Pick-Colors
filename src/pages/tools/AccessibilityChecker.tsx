import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function AccessibilityChecker() {
  const guideData = toolGuides['accessibility-checker'];
  const [palette, setPalette] = useState([
    '#141313', '#1C1B1B', '#80D0FF', '#37A1D5', '#FFFFFF'
  ]);

  const updateColor = (index: number, value: string) => {
    const newPalette = [...palette];
    newPalette[index] = value;
    setPalette(newPalette);
  };

  const checkContrast = (c1: string, c2: string) => {
    try {
      return chroma.contrast(c1, c2);
    } catch {
      return 1;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Accessibility Color Checker" 
        description="Check your full color palette for WCAG accessibility compliance."
        canonicalUrl="https://pickcolors.xyz/tools/AccessibilityChecker"
      />
      <main className="max-w-6xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Accessibility Color Checker</h1>
          <p className="text-body max-w-2xl">
            Check full palette accessibility compliance. See how every color in your palette contrasts with every other color.
          </p>
          <div className="mt-4"><Link to="/blog/accessibility-color-checker" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-12">
          <h3 className="text-label-sm mb-6">Your Palette</h3>
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

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 border-b border-white/10 text-text-secondary font-medium"></th>
                {palette.map((c, i) => (
                  <th key={i} className="p-4 border-b border-white/10 text-center">
                    <div className="w-8 h-8 rounded-full mx-auto shadow-sm" style={{ backgroundColor: c }}></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {palette.map((bg, i) => (
                <tr key={i}>
                  <td className="p-4 border-b border-white/5 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: bg }}></div>
                    <span className="font-mono text-xs uppercase">{bg}</span>
                  </td>
                  {palette.map((fg, j) => {
                    if (i === j) {
                      return <td key={j} className="p-4 border-b border-white/5 text-center text-text-tertiary">-</td>;
                    }
                    const ratio = checkContrast(fg, bg);
                    const isAA = ratio >= 4.5;
                    const isLargeAA = ratio >= 3.0;
                    
                    return (
                      <td key={j} className="p-4 border-b border-white/5 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-sm">{ratio.toFixed(2)}</span>
                          <div className="flex gap-1">
                            {isAA ? (
                              <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-medium">AA</span>
                            ) : isLargeAA ? (
                              <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded font-medium">AA18</span>
                            ) : (
                              <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-medium">FAIL</span>
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
