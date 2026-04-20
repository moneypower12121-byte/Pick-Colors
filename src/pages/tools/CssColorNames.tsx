import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import SEO from '../../components/SEO';
import ToolGuide from '../../components/ToolGuide';
import { toolGuides } from '../../data/toolGuides';


const CSS_COLORS = [
  "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", 
  "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", 
  "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", 
  "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", 
  "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", 
  "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", 
  "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", 
  "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", 
  "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", 
  "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", 
  "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", 
  "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", 
  "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", 
  "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", 
  "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", 
  "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", 
  "whitesmoke", "yellow", "yellowgreen"
];

export default function CssColorNames() {
  const guideData = toolGuides['css-color-names'];
  const [search, setSearch] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const filteredColors = useMemo(() => {
    return CSS_COLORS.filter(name => name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="CSS Color Names — Complete List with HEX & RGB | PickColors"
        description="Search and find all official CSS color keywords with HEX and RGB values. The complete reference tool for web developers."
        canonicalUrl="https://pickcolors.xyz/tools/css-color-names"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CSS Color Names Finder",
          "url": "https://pickcolors.xyz/tools/css-color-names",
          "description": "Search and find all official CSS color keywords with HEX and RGB values. The complete reference tool for web developers.",
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
          "featureList": "All CSS color names, HEX and RGB values, Search by name, Copy-on-click"
        }}
      />
      <main className="max-w-6xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            CSS Color Names — Complete List with HEX & RGB
          </h1>
          <p className="text-body max-w-2xl">
            Search and find official CSS color keywords.
          </p>
          <div className="mt-4"><Link to="/blog/css-color-names-finder" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">Read the guide →</Link></div>
        </div>

        <div className="relative mb-12 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search CSS colors (e.g., 'blue', 'dark')..."
            className="w-full bg-surface-low border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredColors.map((name, i) => {
            const hex = chroma(name).hex();
            const isLight = chroma(name).luminance() > 0.5;
            
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                onClick={() => handleCopy(name)}
                className="group cursor-pointer rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1"
              >
                <div 
                  className="h-24 w-full flex items-center justify-center relative"
                  style={{ backgroundColor: name }}
                >
                  <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm bg-black/10`}>
                    {copiedName === name ? (
                      <Check className={`w-6 h-6 ${isLight ? 'text-black' : 'text-white'}`} />
                    ) : (
                      <Copy className={`w-6 h-6 ${isLight ? 'text-black' : 'text-white'}`} />
                    )}
                  </div>
                </div>
                <div className="p-3 bg-surface-low">
                  <p className="text-sm font-medium truncate" title={name}>{name}</p>
                  <p className="text-xs text-text-tertiary font-mono uppercase mt-1">{hex}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {filteredColors.length === 0 && (
          <div className="text-center py-20 text-text-secondary">
            No CSS colors found matching "{search}"
          </div>
        )}
      </main>
      <ToolGuide {...guideData} />
    </div>
  );
}
