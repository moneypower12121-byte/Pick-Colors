import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Picker from './pages/Picker';
import Palette from './pages/Palette';
import Gallery from './pages/Gallery';
import Tools from './pages/Tools';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

// Tools
import ContrastChecker from './pages/tools/ContrastChecker';
import FormatConverter from './pages/tools/FormatConverter';
import TonalStacker from './pages/tools/TonalStacker';
import HarmonyWheel from './pages/tools/HarmonyWheel';
import MeshGradient from './pages/tools/MeshGradient';
import ColorInterpolator from './pages/tools/ColorInterpolator';
import TokenExporter from './pages/tools/TokenExporter';
import VisionSimulator from './pages/tools/VisionSimulator';
import ImageExtractor from './pages/tools/ImageExtractor';
import ReadabilityTester from './pages/tools/ReadabilityTester';
import AccessibilityChecker from './pages/tools/AccessibilityChecker';
import ImageUrlExtractor from './pages/tools/ImageUrlExtractor';
import ColorFinder from './pages/tools/ColorFinder';
import CssColorNames from './pages/tools/CssColorNames';
import ToolFallback from './pages/tools/ToolFallback';

export default function App() {
  return (
    <>
      <BackgroundAnimation />
      <ScrollToTop />
      <div className="min-h-screen text-on-surface selection:bg-primary/30 selection:text-white flex flex-col relative z-0">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/picker" element={<Picker />} />
            <Route path="/palette" element={<Palette />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/tools" element={<Tools />} />
            
            {/* Tool Routes */}
            <Route path="/tools/contrast-checker" element={<ContrastChecker />} />
            <Route path="/tools/format-converter" element={<FormatConverter />} />
            <Route path="/tools/tonal-stacker" element={<TonalStacker />} />
            <Route path="/tools/harmony-wheel" element={<HarmonyWheel />} />
            <Route path="/tools/mesh-gradient" element={<MeshGradient />} />
            <Route path="/tools/color-interpolator" element={<ColorInterpolator />} />
            <Route path="/tools/token-exporter" element={<TokenExporter />} />
            <Route path="/tools/vision-simulator" element={<VisionSimulator />} />
            <Route path="/tools/image-extractor" element={<ImageExtractor />} />
            <Route path="/tools/readability-tester" element={<ReadabilityTester />} />
            <Route path="/tools/accessibility-checker" element={<AccessibilityChecker />} />
            <Route path="/tools/image-url-extractor" element={<ImageUrlExtractor />} />
            <Route path="/tools/color-finder" element={<ColorFinder />} />
            <Route path="/tools/css-color-names" element={<CssColorNames />} />
            <Route path="/tools/:id" element={<ToolFallback />} />

            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}
