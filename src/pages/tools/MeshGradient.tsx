import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';


export default function MeshGradient() {
  const [colors, setColors] = useState([
    '#FF003C',
    '#FCEE09',
    '#00FFF5',
    '#050A30'
  ]);
  const [copied, setCopied] = useState(false);

  const gradientCSS = `
background-color: ${colors[3]};
background-image: 
  radial-gradient(at 0% 0%, ${colors[0]} 0px, transparent 50%),
  radial-gradient(at 100% 0%, ${colors[1]} 0px, transparent 50%),
  radial-gradient(at 100% 100%, ${colors[2]} 0px, transparent 50%),
  radial-gradient(at 0% 100%, ${colors[3]} 0px, transparent 50%);
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(gradientCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Mesh Gradient Generator" 
        description="Create beautiful CSS mesh gradients with multiple color stops directly in your browser."
        canonicalUrl="https://pickcolors.xyz/tools/MeshGradient"
      />
      <main className="max-w-5xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Mesh Gradient Builder</h1>
          <p className="text-body max-w-2xl">
            Create complex, fluid CSS mesh gradients with our visual editor.
          </p>
          <div className="mt-4"><Link to="/blog/gradient-generator" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 space-y-6">
            <h3 className="text-label-sm mb-4">Gradient Nodes</h3>
            
            {colors.map((color, i) => (
              <div key={i} className="flex gap-4">
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
                />
                <input 
                  type="text" 
                  value={color}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
                />
              </div>
            ))}

            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-label-sm">CSS Output</h3>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-medium text-primary hover:text-primary-container flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy CSS'}
                </button>
              </div>
              <pre className="bg-surface-medium p-4 rounded-xl text-xs font-mono text-text-secondary overflow-x-auto border border-white/5">
                {gradientCSS}
              </pre>
            </div>
          </div>

          {/* Preview */}
          <motion.div 
            className="rounded-[2rem] border border-white/10 min-h-[400px] lg:min-h-full"
            style={{
              backgroundColor: colors[3],
              backgroundImage: `
                radial-gradient(at 0% 0%, ${colors[0]} 0px, transparent 50%),
                radial-gradient(at 100% 0%, ${colors[1]} 0px, transparent 50%),
                radial-gradient(at 100% 100%, ${colors[2]} 0px, transparent 50%),
                radial-gradient(at 0% 100%, ${colors[3]} 0px, transparent 50%)
              `
            }}
            animate={{
              backgroundColor: colors[3],
              backgroundImage: `
                radial-gradient(at 0% 0%, ${colors[0]} 0px, transparent 50%),
                radial-gradient(at 100% 0%, ${colors[1]} 0px, transparent 50%),
                radial-gradient(at 100% 100%, ${colors[2]} 0px, transparent 50%),
                radial-gradient(at 0% 100%, ${colors[3]} 0px, transparent 50%)
              `
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </main>
    </div>
  );
}
