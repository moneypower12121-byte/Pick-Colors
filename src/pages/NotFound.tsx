import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <SEO 
        title="404 — Page Not Found | PickColors"
        description="The page you are looking for does not exist."
        noindex={true}
      />
      <div className="absolute inset-0 mesh-gradient-bg opacity-30 blur-3xl -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-[12rem] font-light leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-medium mb-4">Color Not Found</h2>
        <p className="text-body max-w-md mx-auto mb-8">
          The page you are looking for has faded into the background. Let's get you back to the palette.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-base-bg font-medium hover:bg-gray-200 transition-all hover:scale-[0.98] active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </motion.div>
    </div>
  );
}
