import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function TokenExporter() {
  const guideData = toolGuides['token-exporter'];
  const [palette, setPalette] = useState([
    { id: 1, name: 'primary', hex: '#80D0FF' },
    { id: 2, name: 'secondary', hex: '#37A1D5' },
    { id: 3, name: 'background', hex: '#141313' },
    { id: 4, name: 'surface', hex: '#1C1B1B' },
    { id: 5, name: 'text', hex: '#FFFFFF' },
  ]);
  const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'json'>('css');
  const [copied, setCopied] = useState(false);

  const addColor = () => {
    setPalette([...palette, { id: Date.now(), name: `color-${palette.length + 1}`, hex: '#000000' }]);
  };

  const removeColor = (id: number) => {
    setPalette(palette.filter(c => c.id !== id));
  };

  const updateColor = (id: number, field: 'name' | 'hex', value: string) => {
    setPalette(palette.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const cssOutput = `:root {\n${palette.map(c => `  --color-${c.name}: ${c.hex};`).join('\n')}\n}`;
  const tailwindOutput = `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${palette.map(c => `        '${c.name}': '${c.hex}',`).join('\n')}\n      }\n    }\n  }\n}`;
  const jsonOutput = JSON.stringify({ colors: Object.fromEntries(palette.map(c => [c.name, c.hex])) }, null, 2);

  const getOutput = () => {
    if (activeTab === 'css') return cssOutput;
    if (activeTab === 'tailwind') return tailwindOutput;
    return jsonOutput;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Design Token Exporter — CSS, Tailwind & JSON | PickColors"
        description="Export your color palettes directly to CSS variables, Tailwind config, or JSON design tokens. Bridge the gap between design and development."
        canonicalUrl="https://pickcolors.xyz/tools/token-exporter"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Design Token Exporter",
          "url": "https://pickcolors.xyz/tools/token-exporter",
          "description": "Export your color palettes directly to CSS variables, Tailwind config, or JSON design tokens. Bridge the gap between design and development.",
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
          "featureList": "CSS variables export, Tailwind config, JSON tokens, Design system integration"
        }}
      />
      <main className="max-w-6xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Design Token Exporter — CSS, Tailwind & JSON
          </h1>
          <p className="text-body max-w-2xl">
            Export your palettes directly to CSS variables, Tailwind config, or JSON design tokens.
          </p>
          <div className="mt-4"><Link to="/blog/design-token-exporter" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Palette Editor */}
          <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-label-sm">Your Palette</h3>
              <button 
                onClick={addColor}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-container transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Color
              </button>
            </div>

            <div className="space-y-4">
              {palette.map((color) => (
                <motion.div 
                  key={color.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <input 
                    type="color" 
                    value={color.hex}
                    onChange={(e) => updateColor(color.id, 'hex', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                  />
                  <input 
                    type="text" 
                    value={color.name}
                    onChange={(e) => updateColor(color.id, 'name', e.target.value)}
                    placeholder="Color Name"
                    className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <input 
                    type="text" 
                    value={color.hex}
                    onChange={(e) => updateColor(color.id, 'hex', e.target.value)}
                    className="w-28 bg-surface-medium border border-white/10 rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
                  />
                  <button 
                    onClick={() => removeColor(color.id)}
                    className="p-2 text-text-tertiary hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Exporter */}
          <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {(['css', 'tailwind', 'json'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab 
                        ? 'bg-white/10 text-white' 
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <pre className="flex-1 bg-surface-medium p-6 rounded-xl text-sm font-mono text-text-secondary overflow-x-auto border border-white/5">
              {getOutput()}
            </pre>
          </div>
        </div>
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
