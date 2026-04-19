import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';

interface ColorSwatchProProps {
  hex: string;
  name: string;
  rgb: string;
  hsl: string;
}

export default function ColorSwatchPro({ hex, name, rgb, hsl }: ColorSwatchProProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        boxShadow: `0 20px 40px -10px ${hex}50`
      }}
      transition={{ duration: 0.2 }}
      className="bg-surface-low rounded-[1.5rem] overflow-hidden border border-white/5 group"
    >
      {/* Edge-to-edge color preview */}
      <div 
        className="h-48 w-full relative"
        style={{ backgroundColor: hex }}
      >
        <button 
          onClick={handleCopy}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-[2px]"
        >
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-white">
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </div>
        </button>
      </div>

      {/* Metadata Area */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-medium tracking-tight">{name}</h4>
          <span className="font-mono text-sm text-text-secondary">{hex}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-label-sm">RGB</span>
            <span className="font-mono text-xs text-text-secondary">{rgb}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-label-sm">HSL</span>
            <span className="font-mono text-xs text-text-secondary">{hsl}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
