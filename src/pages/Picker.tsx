import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, Maximize2 } from 'lucide-react';
import ColorSwatchPro from '../components/ColorSwatchPro';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { toolGuides } from '../data/toolGuides';


export default function Picker() {
  const guideData = toolGuides['picker'];
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(80);
  const [lightness, setLightness] = useState(50);

  const currentHex = hslToHex(hue, saturation, lightness);
  const currentRgb = hslToRgbString(hue, saturation, lightness);
  const currentHsl = `${hue}°, ${saturation}%, ${lightness}%`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Free Online Color Picker — HEX, RGB & HSL | PickColors"
        description="Free online color picker with real-time HEX, RGB & HSL conversion. Pick any color visually, extract from images, and copy code instantly. No install needed."
        canonicalUrl="https://pickcolors.xyz/picker"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Free Online Color Picker",
          "url": "https://pickcolors.xyz/picker",
          "description": "Free online color picker with real-time HEX, RGB & HSL conversion. Pick any color visually, extract from images, and copy code instantly. No install needed.",
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
      <main className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Free Online Color Picker & HEX RGB HSL Converter
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            The Light Table — Professional color selection and precise format conversion for designers and developers.
          </p>
          <div className="mt-4"><Link to="/blog/color-picker-converter" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls - The Light Table Interface */}
          <div className="lg:col-span-7 bg-surface-highest rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient-bg opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-medium">Precision Controls</h2>
              </div>

              <div className="space-y-8">
                {/* Hue Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-label-sm">Hue</label>
                    <span className="font-mono text-sm text-text-secondary">{hue}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="360" 
                    value={hue} 
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                    }}
                  />
                </div>

                {/* Saturation Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-label-sm">Saturation</label>
                    <span className="font-mono text-sm text-text-secondary">{saturation}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={saturation} 
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`
                    }}
                  />
                </div>

                {/* Lightness Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-label-sm">Lightness</label>
                    <span className="font-mono text-sm text-text-secondary">{lightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={lightness} 
                    onChange={(e) => setLightness(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Swatch */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div 
              className="flex-1 rounded-[2rem] border border-white/10 relative overflow-hidden min-h-[200px]"
              style={{ backgroundColor: currentHex }}
            >
              <button className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            
            <ColorSwatchPro 
              hex={currentHex}
              name="Selected Color"
              rgb={currentRgb}
              hsl={currentHsl}
            />
          </div>
        </div>
      </main>
      <ToolGuide {...guideData} />
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-2xl font-bold mb-8">Related Design Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/palette" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Free Random Color Palette Generator</h3>
            <p className="text-sm text-text-secondary">Generate beautiful random color palettes instantly with one click.</p>
          </Link>
          <Link to="/gallery" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Color Palette Inspiration Gallery</h3>
            <p className="text-sm text-text-secondary">Explore 50,000+ curated color palettes for your next project.</p>
          </Link>
          <Link to="/tools/mesh-gradient" className="group p-6 rounded-2xl bg-surface-low border border-white/5 hover:border-primary/30 transition-all">
            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Free CSS Gradient Generator</h3>
            <p className="text-sm text-text-secondary">Create beautiful CSS mesh gradients with multiple color stops.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Helper functions
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hslToRgbString(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return `${f(0)}, ${f(8)}, ${f(4)}`;
}
