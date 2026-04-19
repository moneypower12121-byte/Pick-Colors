import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X, Copy, Check } from 'lucide-react';
import chroma from 'chroma-js';
import { galleryItems } from '../data/palettes';

const HUE_CATEGORIES = [
  { id: 'red', name: 'Red', color: '#EF4444' },
  { id: 'orange', name: 'Orange', color: '#F97316' },
  { id: 'yellow', name: 'Yellow', color: '#EAB308' },
  { id: 'green', name: 'Green', color: '#22C55E' },
  { id: 'blue', name: 'Blue', color: '#3B82F6' },
  { id: 'purple', name: 'Purple', color: '#A855F7' },
  { id: 'pink', name: 'Pink', color: '#EC4899' },
  { id: 'monochrome', name: 'Monochrome', color: '#737373' },
];

const getHueCategory = (hex: string) => {
  const [h, s, l] = chroma(hex).hsl();
  
  if (isNaN(h) || s < 0.1 || l < 0.1 || l > 0.9) return 'monochrome';
  
  if (h >= 345 || h < 15) return 'red';
  if (h >= 15 && h < 45) return 'orange';
  if (h >= 45 && h < 75) return 'yellow';
  if (h >= 75 && h < 165) return 'green';
  if (h >= 165 && h < 255) return 'blue';
  if (h >= 255 && h < 295) return 'purple';
  if (h >= 295 && h < 345) return 'pink';
  
  return 'monochrome';
};

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHues, setSelectedHues] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredItems, setFilteredItems] = useState(galleryItems);

  const toggleHue = (hueId: string) => {
    setSelectedHues(prev => 
      prev.includes(hueId) 
        ? prev.filter(h => h !== hueId)
        : [...prev, hueId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedHues([]);
  };

  const handleCopyPalette = (e: React.MouseEvent, id: number, colors: string[]) => {
    e.stopPropagation();
    navigator.clipboard.writeText(colors.join(', '));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  React.useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      const results = galleryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesHue = selectedHues.length === 0 || item.colors.some(color => {
          const category = getHueCategory(color);
          return selectedHues.includes(category);
        });

        return matchesSearch && matchesHue;
      });
      setFilteredItems(results);
      setIsFiltering(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedHues]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-12 gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-headline mb-2">Curated Gallery</h1>
              <p className="text-body">Explore trending and community-created palettes.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search palettes..." 
                  className="bg-surface-low border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-colors w-full md:w-64"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-full border transition-colors ${
                  showFilters || selectedHues.length > 0
                    ? 'bg-primary/10 border-primary/30 text-primary' 
                    : 'bg-surface-low border-white/10 text-text-secondary hover:bg-white/5'
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface-low border border-white/5 rounded-[1.5rem] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Filter by Color</h3>
                    {selectedHues.length > 0 && (
                      <button 
                        onClick={() => setSelectedHues([])}
                        className="text-xs text-text-tertiary hover:text-white transition-colors"
                      >
                        Clear Colors
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {HUE_CATEGORIES.map(hue => {
                      const isSelected = selectedHues.includes(hue.id);
                      return (
                        <button
                          key={hue.id}
                          onClick={() => toggleHue(hue.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                            isSelected 
                              ? 'bg-white/10 text-white border border-white/20' 
                              : 'bg-surface-medium text-text-secondary border border-transparent hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: hue.color }}
                          />
                          {hue.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isFiltering ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-surface-low rounded-[1.5rem] p-4 border border-white/5 animate-pulse">
                <div className="h-32 rounded-xl bg-surface-medium mb-4"></div>
                <div className="flex items-center justify-between px-2">
                  <div>
                    <div className="h-4 w-24 bg-surface-medium rounded mb-2"></div>
                    <div className="h-3 w-16 bg-surface-medium rounded"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-surface-medium"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-surface-low rounded-[2rem] border border-white/5">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-text-tertiary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No palettes found</h3>
            <p className="text-text-secondary mb-6">Try adjusting your search or color filters.</p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 rounded-full bg-surface-medium hover:bg-white/10 transition-colors text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                  }}
                  className="relative bg-surface-low rounded-[1.5rem] p-4 border border-white/5 group cursor-pointer transition-colors hover:border-white/10"
                >
                  {/* Multi-color glow effect */}
                  <div 
                    className="absolute -inset-0.5 rounded-[1.5rem] opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10"
                    style={{
                      background: `linear-gradient(to right, ${item.colors.join(', ')})`
                    }}
                  />
                  
                  <div className="h-32 rounded-xl overflow-hidden flex mb-4">
                    {item.colors.map((color, i) => (
                      <div 
                        key={i} 
                        className="flex-1 h-full group/color relative transition-all duration-300 hover:flex-[1.5]" 
                        style={{ backgroundColor: color }}
                      >
                        <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover/color:opacity-100 transition-opacity duration-300">
                          <span className="text-[10px] font-mono bg-black/50 text-white px-2 py-1 rounded-md backdrop-blur-md">
                            {color.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <span className="text-xs text-text-tertiary">{item.colors.length} colors</span>
                    </div>
                    <button
                      onClick={(e) => handleCopyPalette(e, item.id, item.colors)}
                      className="p-2 rounded-full bg-surface-medium hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                      title="Copy all colors"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
