import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import chroma from 'chroma-js';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ColorSwatchPro from '../../components/ColorSwatchPro';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


export default function ImageExtractor() {
  const guideData = toolGuides['image-extractor'];
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setExtractedColors([]);
      setIsExtracting(true);
    }
  };

  const extractColors = () => {
    const img = imgRef.current;
    if (!img) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale down for faster processing
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

      // Sample pixels
      for (let i = 0; i < imageData.length; i += 16) { // step by 4 pixels (16 values)
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        
        if (a < 128) continue; // Skip transparent pixels

        // Quantize colors to group similar ones (round to nearest 20)
        const qR = Math.round(r / 20) * 20;
        const qG = Math.round(g / 20) * 20;
        const qB = Math.round(b / 20) * 20;
        
        const hex = chroma(qR, qG, qB).hex();
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }

      // Sort by frequency
      const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);

      // Filter out similar colors to get a distinct palette
      const finalColors: string[] = [];
      for (const [hex] of sorted) {
        if (finalColors.length >= 6) break;
        
        const isTooSimilar = finalColors.some(c => chroma.distance(c, hex) < 15);
        if (!isTooSimilar) {
          finalColors.push(hex);
        }
      }

      // If we didn't get enough distinct colors, just take the top ones
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
      setIsExtracting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Image Color Extractor — Extract Colors from Any Image | PickColors"
        description="Upload any image and extract its dominant color palette. Get HEX, RGB & HSL codes for every color instantly. Free image color extractor tool."
        canonicalUrl="https://pickcolors.xyz/tools/image-extractor"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Image Color Extractor",
          "url": "https://pickcolors.xyz/tools/image-extractor",
          "description": "Upload any image and extract its dominant color palette. Get HEX, RGB & HSL codes for every color instantly. Free image color extractor tool.",
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
      <main className="max-w-6xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Color Palette Extractor from Image (HEX, RGB)
          </h1>
          <p className="text-body max-w-2xl">
            Pull dominant colors and generate cohesive palettes from any uploaded image.
          </p>
          <div className="mt-4"><Link to="/blog/image-color-extractor" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Area */}
          <div>
            <label 
              className="block w-full aspect-video bg-surface-low border-2 border-dashed border-white/10 hover:border-primary/50 rounded-[2rem] cursor-pointer transition-colors relative overflow-hidden group"
            >
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
              
              {imageUrl ? (
                <img 
                  ref={imgRef}
                  src={imageUrl} 
                  alt="Upload preview" 
                  className="w-full h-full object-cover"
                  onLoad={extractColors}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Upload an Image</h3>
                  <p className="text-sm text-text-secondary">Click or drag and drop to extract colors</p>
                </div>
              )}
            </label>
          </div>

          {/* Results Area */}
          <div>
            <h3 className="text-label-sm mb-6">Extracted Palette</h3>
            
            {!imageUrl ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center border border-white/5 rounded-[2rem] bg-surface-low/50 p-8">
                <ImageIcon className="w-12 h-12 text-text-tertiary mb-4" />
                <p className="text-text-secondary">Upload an image to see the extracted colors here.</p>
              </div>
            ) : isExtracting ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center border border-white/5 rounded-[2rem] bg-surface-low/50 p-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-text-secondary">Analyzing pixels...</p>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
