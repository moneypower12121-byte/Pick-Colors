import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ColorSwatchPro from '../../components/ColorSwatchPro';
import chroma from 'chroma-js';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function ImageUrlExtractor() {
  const guideData = toolGuides['image-url-extractor'];
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState('');

  const handleExtract = () => {
    if (!url.trim()) return;
    
    setError('');
    // Use our proxy to bypass CORS
    setImageUrl(`/api/proxy-image?url=${encodeURIComponent(url)}`);
    setExtractedColors([]);
    setIsExtracting(true);
  };

  const processImage = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const MAX_DIM = 200;
    let width = img.width;
    let height = img.height;
    
    if (width > height) {
      if (width > MAX_DIM) {
        height *= MAX_DIM / width;
        width = MAX_DIM;
      }
    } else {
      if (height > MAX_DIM) {
        width *= MAX_DIM / height;
        height = MAX_DIM;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    try {
      const imageData = ctx.getImageData(0, 0, width, height).data;
      const colorCounts: Record<string, number> = {};

      for (let i = 0; i < imageData.length; i += 16) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        
        if (a < 128) continue;

        const qR = Math.round(r / 20) * 20;
        const qG = Math.round(g / 20) * 20;
        const qB = Math.round(b / 20) * 20;
        
        const hex = chroma(qR, qG, qB).hex();
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }

      const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
      const finalColors: string[] = [];
      
      for (const [hex] of sorted) {
        if (finalColors.length >= 6) break;
        const isTooSimilar = finalColors.some(c => chroma.distance(c, hex) < 15);
        if (!isTooSimilar) {
          finalColors.push(hex);
        }
      }

      if (finalColors.length < 6) {
        for (const [hex] of sorted) {
          if (finalColors.length >= 6) break;
          if (!finalColors.includes(hex)) {
            finalColors.push(hex);
          }
        }
      }

      setExtractedColors(finalColors);
      setIsExtracting(false);
    } catch (e) {
      console.error("Failed to extract colors", e);
      setError("Could not extract colors. The image might be protected by CORS.");
      setIsExtracting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Image URL Color Extractor" 
        description="Extract dominant color palettes directly from any online image URL."
        canonicalUrl="https://pickcolors.xyz/tools/ImageUrlExtractor"
      />
      <main className="max-w-6xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-headline mb-4">Color Palette from Image URL</h1>
          <p className="text-body max-w-2xl">
            Extract color palettes from any online image URL.
          </p>
          <div className="mt-4"><Link to="/blog/image-color-extractor" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="bg-surface-low rounded-[2rem] p-8 border border-white/5 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExtract()}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-surface-medium border border-white/10 rounded-xl pl-12 pr-6 py-4 text-lg focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button 
              onClick={handleExtract}
              disabled={isExtracting || !url.trim()}
              className="px-8 py-4 rounded-xl bg-primary text-base-bg font-medium hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Extracting...
                </>
              ) : (
                'Extract'
              )}
            </button>
          </div>
          {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
        </div>

        {imageUrl && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="w-full aspect-video bg-surface-low rounded-[2rem] overflow-hidden border border-white/5">
                <img 
                  src={imageUrl} 
                  alt="Source" 
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  onLoad={(e) => processImage(e.currentTarget)}
                  onError={() => {
                    setError("Failed to load image. It might be invalid or protected by CORS.");
                    setIsExtracting(false);
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="text-label-sm mb-6">Extracted Palette</h3>
              {isExtracting ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center border border-white/5 rounded-[2rem] bg-surface-low/50 p-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-text-secondary">Analyzing pixels...</p>
                </div>
              ) : extractedColors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {extractedColors.map((hex, i) => {
                    const c = chroma(hex);
                    return (
                      <motion.div
                        key={`${hex}-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <ColorSwatchPro 
                          hex={c.hex().toUpperCase()}
                          name={`Color ${i + 1}`}
                          rgb={c.css()}
                          hsl={c.css('hsl')}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
