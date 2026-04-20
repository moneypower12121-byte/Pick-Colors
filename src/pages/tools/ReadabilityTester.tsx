import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Type } from 'lucide-react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function ReadabilityTester() {
  const guideData = toolGuides['readability-tester'];
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#141313');
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');

  let contrast = 1;
  try {
    contrast = chroma.contrast(textColor, bgColor);
  } catch (e) {
    // Invalid colors
  }

  const sizes = [
    { name: 'Small (12px)', class: 'text-xs' },
    { name: 'Base (16px)', class: 'text-base' },
    { name: 'Large (24px)', class: 'text-2xl font-medium' },
    { name: 'Heading (48px)', class: 'text-5xl font-bold tracking-tight' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Text Readability Tester — Font & Background Colors | PickColors"
        description="Preview text readability across different font sizes and background colors. Ensure your design meets accessibility standards for all users."
        canonicalUrl="https://pickcolors.xyz/tools/readability-tester"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Text Readability Tester",
          "url": "https://pickcolors.xyz/tools/readability-tester",
          "description": "Preview text readability across different font sizes and background colors. Ensure your design meets accessibility standards for all users.",
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
          "featureList": "Live preview, Font size testing, Background color testing, Readability scoring"
        }}
      />
      <main className="max-w-5xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Text Readability Tester
          </h1>
          <p className="text-body max-w-2xl">
            Preview text readability across different sizes and backgrounds.
          </p>
          <div className="mt-4"><Link to="/blog/text-readability-tester" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 md:col-span-1 space-y-8">
            <div>
              <label className="text-label-sm block mb-4">Text Color</label>
              <div className="flex gap-4">
                <input 
                  type="color" 
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
                />
                <input 
                  type="text" 
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-label-sm block mb-4">Background Color</label>
              <div className="flex gap-4">
                <input 
                  type="color" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
                />
                <input 
                  type="text" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-4 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-label-sm block mb-4">Sample Text</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-surface-medium border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none h-24"
              />
            </div>
            
            <div className="p-4 rounded-xl bg-surface-medium border border-white/5 flex items-center justify-between">
              <span className="text-sm text-text-secondary">Contrast Ratio</span>
              <span className="font-mono font-medium">{contrast.toFixed(2)}:1</span>
            </div>
          </div>

          <div className="md:col-span-2 rounded-[2rem] overflow-hidden border border-white/10" style={{ backgroundColor: bgColor }}>
            <div className="p-12 h-full flex flex-col justify-center space-y-12" style={{ color: textColor }}>
              {sizes.map((size, i) => (
                <motion.div 
                  key={size.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-xs opacity-50 mb-2 font-mono uppercase tracking-wider">{size.name}</div>
                  <div className={size.class}>{text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
