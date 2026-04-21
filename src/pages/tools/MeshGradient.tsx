import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function MeshGradient() {
  const guideData = toolGuides['mesh-gradient'];
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
        title="CSS Gradient Generator — Free Mesh Gradient Tool | PickColors"
        description="Create beautiful CSS mesh gradients online. Multiple color stops, live preview & instant CSS code export. Free gradient generator for web designers."
        canonicalUrl="https://pickcolors.xyz/tools/mesh-gradient"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CSS Gradient Generator",
          "url": "https://pickcolors.xyz/tools/mesh-gradient",
          "description": "Create beautiful CSS mesh gradients online. Multiple color stops, live preview & instant CSS code export. Free gradient generator for web designers.",
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
          }
        }}
      />
      <main className="max-w-5xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Free CSS Mesh Gradient Generator
          </h1>
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
      <ToolGuide {...guideData} />
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-2xl font-bold mb-8">Related Design Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/picker" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Free Online Color Picker & HEX RGB HSL Converter</h3>
            <p className="text-sm text-text-secondary">Precision color selection with real-time conversion and extraction tool.</p>
          </Link>
          <Link to="/palette" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Free Random Color Palette Generator</h3>
            <p className="text-sm text-text-secondary">Generate beautiful random color palettes instantly with one click.</p>
          </Link>
          <Link to="/gallery" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Color Palette Inspiration Gallery</h3>
            <p className="text-sm text-text-secondary">Explore 50,000+ curated color palettes for your next project.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
