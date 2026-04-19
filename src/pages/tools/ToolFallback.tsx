import { motion } from 'motion/react';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function ToolFallback() {
  const { id } = useParams();
  
  const formatName = (str: string) => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-3xl mx-auto text-center">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-low rounded-[2rem] p-16 border border-white/5 flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8">
            <Construction className="w-10 h-10 text-text-secondary" />
          </div>
          <h1 className="text-3xl font-medium mb-4">{id ? formatName(id) : 'Tool'}</h1>
          <p className="text-body text-lg max-w-md mx-auto mb-8">
            This tool is currently under construction. Our engineers are working hard to bring this feature to The Digital Prism.
          </p>
          <Link 
            to="/tools"
            className="px-8 py-4 rounded-full bg-primary text-base-bg font-medium hover:bg-primary-container transition-all hover:scale-[0.98] active:scale-95"
          >
            Explore Other Tools
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
