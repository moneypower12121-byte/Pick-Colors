import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import chroma from 'chroma-js';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';


export default function FormatConverter() {
  const [input, setInput] = useState('#80D0FF');
  const [color, setColor] = useState<chroma.Color | null>(chroma('#80D0FF'));
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  useEffect(() => {
    try {
      const c = chroma(input);
      setColor(c);
    } catch (e) {
      setColor(null);
    }
  }, [input]);

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const formats = color ? [
    { label: 'HEX', value: color.hex().toUpperCase() },
    { label: 'RGB', value: color.css() },
    { label: 'HSL', value: color.css('hsl') },
    { label: 'LAB', value: `lab(${color.lab()[0].toFixed(1)}%, ${color.lab()[1].toFixed(1)}, ${color.lab()[2].toFixed(1)})` },
    { label: 'CMYK', value: `cmyk(${(color.cmyk()[0]*100).toFixed(0)}%, ${(color.cmyk()[1]*100).toFixed(0)}%, ${(color.cmyk()[2]*100).toFixed(0)}%, ${(color.cmyk()[3]*100).toFixed(0)}%)` }
  ] : [];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Color Format Converter - HEX to RGB to HSL" 
        description="Fast HEX to RGB, RGB to HEX, and HSL color code conversions for designers."
        canonicalUrl="https://pickcolors.xyz/tools/FormatConverter"
      />
      <main className="max-w-4xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Format Converter</h1>
          <p className="text-body max-w-2xl">
            Seamlessly convert colors between HEX, RGB, HSL, LAB, and CMYK formats.
          </p>
          <div className="mt-4"><Link to="/blog/color-picker-converter" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-8">
          <label className="text-label-sm block mb-4">Input Color (Any Format)</label>
          <div className="flex gap-4">
            <div 
              className="w-14 h-14 rounded-xl border border-white/10 shrink-0 transition-colors"
              style={{ backgroundColor: color ? color.hex() : 'transparent' }}
            ></div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. #FF0000, rgb(255,0,0), red"
              className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-6 font-mono text-lg focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          {!color && input.length > 0 && (
            <p className="text-red-400 text-sm mt-4">Invalid color format</p>
          )}
        </div>

        {color && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formats.map((f, i) => (
              <motion.div 
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface-low rounded-2xl p-6 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors"
              >
                <div>
                  <div className="text-label-sm mb-2">{f.label}</div>
                  <div className="font-mono text-lg">{f.value}</div>
                </div>
                <button 
                  onClick={() => handleCopy(f.value, f.label)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-text-secondary hover:text-white"
                >
                  {copiedFormat === f.label ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
