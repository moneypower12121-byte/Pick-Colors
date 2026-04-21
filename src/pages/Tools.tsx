import { motion } from 'motion/react';
import { 
  Sun, 
  Paintbrush, 
  Image as ImageIcon, 
  Eye, 
  Layers, 
  RefreshCw, 
  GitMerge, 
  Briefcase, 
  Aperture, 
  Code,
  Pipette,
  Palette,
  Sparkles,
  Type,
  CheckCircle2,
  Link as LinkIcon,
  Tag,
  Search,
  Hash,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const tools = [
  {
    id: 'picker',
    name: 'Color Picker & Converter',
    description: 'Pick colors visually and convert between HEX, RGB, and HSL.',
    icon: Pipette,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    path: '/picker'
  },
  {
    id: 'mesh-gradient',
    name: 'Gradient Generator',
    description: 'Create beautiful CSS gradients with multiple color stops.',
    icon: Paintbrush,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10'
  },
  {
    id: 'harmony-wheel',
    name: 'Color Harmonies Generator',
    description: 'Discover perfect color combinations for your designs.',
    icon: Aperture,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10'
  },
  {
    id: 'palette',
    name: 'Random Color Palette Generator',
    description: 'Generate fresh color inspiration with a single click.',
    icon: Palette,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    path: '/palette'
  },
  {
    id: 'contrast-checker',
    name: 'Contrast Checker',
    description: 'Test color accessibility based on WCAG guidelines.',
    icon: Sun,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10'
  },
  {
    id: 'readability-tester',
    name: 'Readability Tester',
    description: 'Preview text readability across different sizes and backgrounds.',
    icon: Type,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 'accessibility-checker',
    name: 'Accessibility Color Checker',
    description: 'Check full palette accessibility compliance.',
    icon: CheckCircle2,
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  },
  {
    id: 'image-extractor',
    name: 'Image Color Extractor',
    description: 'Upload images to extract dominant color palettes.',
    icon: ImageIcon,
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  },
  {
    id: 'image-url-extractor',
    name: 'Color Palette from Image URL',
    description: 'Extract color palettes from any online image URL.',
    icon: LinkIcon,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10'
  },
  {
    id: 'format-converter',
    name: 'Color Converters',
    description: 'Fast HEX to RGB, RGB to HEX, and HSL color code conversions.',
    icon: RefreshCw,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10'
  },
  {
    id: 'color-finder',
    name: 'Color Finder by Code',
    description: 'Find similar shades and variations for any color.',
    icon: Search,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10'
  },
  {
    id: 'css-color-names',
    name: 'CSS Color Names Finder',
    description: 'Search and find official CSS color keywords.',
    icon: Hash,
    color: 'text-red-400',
    bg: 'bg-red-400/10'
  },
  {
    id: 'vision-simulator',
    name: 'Vision Simulator',
    description: 'Test your palettes against various forms of color blindness.',
    icon: Eye,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 'tonal-stacker',
    name: 'Tonal Stacker',
    description: 'Generate perfect shades and tints automatically based on a single base color.',
    icon: Layers,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    id: 'color-interpolator',
    name: 'Color Interpolator',
    description: 'Generate smooth, mathematically precise transitional steps between two base colors.',
    icon: GitMerge,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10'
  },
  {
    id: 'token-exporter',
    name: 'Token Exporter',
    description: 'Export your palettes directly to CSS variables, Tailwind config, or JSON design tokens.',
    icon: Code,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10'
  }
];

export default function Tools() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="16 Free Online Color Tools for Designers & Developers | PickColors"
        description="Explore 16 free professional color tools — color picker, palette generator, contrast checker, gradient maker, vision simulator & more. Built for designers & developers."
        canonicalUrl="https://pickcolors.xyz/tools"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "PickColors Color Tools",
          "url": "https://pickcolors.xyz/tools",
          "description": "Explore 16 free professional color tools — color picker, palette generator, contrast checker, gradient maker, vision simulator & more.",
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
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-headline mb-4"
          >
            16 Free Online Color Tools for Designers & Developers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-body text-lg max-w-2xl"
          >
            The complete suite for color manipulation, analysis, and extraction. Built for designers who demand precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-surface-low rounded-[1.5rem] p-8 border border-white/5 hover:border-white/10 hover:bg-surface-medium transition-all group flex flex-col h-full"
              >
                <div className={`w-12 h-12 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                
                <h3 className="text-xl font-medium mb-3">{tool.name}</h3>
                <p className="text-body mb-8 flex-1">
                  {tool.description}
                </p>
                
                <Link 
                  to={tool.path || `/tools/${tool.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors mt-auto"
                >
                  Open {tool.name} Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
