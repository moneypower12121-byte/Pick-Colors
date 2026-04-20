import { useState } from 'react';
import { motion } from 'motion/react';
import chroma from 'chroma-js';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ColorSwatchPro from '../../components/ColorSwatchPro';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function HarmonyWheel() {
  const guideData = toolGuides['harmony-wheel'];
  const [baseColor, setBaseColor] = useState('#FF4E00');

  const getHarmonies = (hex: string) => {
    try {
      const c = chroma(hex);
      return {
        complementary: [c.hex(), c.set('hsl.h', '+180').hex()],
        analogous: [c.set('hsl.h', '-30').hex(), c.hex(), c.set('hsl.h', '+30').hex()],
        triadic: [c.hex(), c.set('hsl.h', '+120').hex(), c.set('hsl.h', '+240').hex()],
        tetradic: [c.hex(), c.set('hsl.h', '+90').hex(), c.set('hsl.h', '+180').hex(), c.set('hsl.h', '+270').hex()]
      };
    } catch (e) {
      return null;
    }
  };

  const harmonies = getHarmonies(baseColor);

  const renderSwatchRow = (colors: string[], title: string) => (
    <div className="mb-12">
      <h3 className="text-label-sm mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {colors.map((hex, i) => {
          const c = chroma(hex);
          return (
            <motion.div
              key={`${title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ColorSwatchPro 
                hex={c.hex().toUpperCase()}
                name={`${title} ${i + 1}`}
                rgb={c.css()}
                hsl={c.css('hsl')}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Color Harmonies Generator — Complementary & Analogous | PickColors"
        description="Discover perfect color combinations using color theory. Generate complementary, analogous, triadic, and split-complementary color schemes."
        canonicalUrl="https://pickcolors.xyz/tools/harmony-wheel"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Color Harmonies Generator",
          "url": "https://pickcolors.xyz/tools/harmony-wheel",
          "description": "Discover perfect color combinations using color theory. Generate complementary, analogous, triadic, and split-complementary color schemes.",
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
          "featureList": "Complementary colors, Analogous schemes, Triadic combinations, HEX export"
        }}
      />
      <main className="max-w-7xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Color Harmonies & Scheme Generator
          </h1>
          <p className="text-body max-w-2xl">
            Generate classic color theory relationships based on a single starting color.
          </p>
          <div className="mt-4"><Link to="/blog/color-harmonies-generator" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-16 flex flex-col md:flex-row gap-6 items-center max-w-2xl">
          <div className="flex-1 w-full">
            <label className="text-label-sm block mb-4">Base Color</label>
            <div className="flex gap-4">
              <input 
                type="color" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-14 h-14 rounded-xl cursor-pointer bg-transparent border-0 p-0 shrink-0"
              />
              <input 
                type="text" 
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="flex-1 bg-surface-medium border border-white/10 rounded-xl px-6 font-mono text-lg focus:outline-none focus:border-primary/50 transition-colors uppercase"
              />
            </div>
          </div>
        </div>

        {harmonies && (
          <div>
            {renderSwatchRow(harmonies.complementary, 'Complementary')}
            {renderSwatchRow(harmonies.analogous, 'Analogous')}
            {renderSwatchRow(harmonies.triadic, 'Triadic')}
            {renderSwatchRow(harmonies.tetradic, 'Tetradic')}
          </div>
        )}
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
