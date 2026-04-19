import { motion } from 'motion/react';
import { Settings, Folder, Heart, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-surface-low rounded-[2rem] p-6 border border-white/5 sticky top-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container"></div>
              <div>
                <h3 className="font-medium">Alex Designer</h3>
                <p className="text-xs text-text-secondary">Pro Member</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium">
                <Folder className="w-4 h-4" /> My Projects
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                <Heart className="w-4 h-4" /> Saved Palettes
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                <Clock className="w-4 h-4" /> History
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-headline mb-8">My Projects</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card */}
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-low rounded-[1.5rem] p-6 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
              >
                <div className="h-32 rounded-xl bg-surface-highest mb-4 flex items-center justify-center border border-white/5">
                  <Folder className="w-8 h-8 text-text-tertiary" />
                </div>
                <h3 className="font-medium mb-1">Brand Redesign {i}</h3>
                <p className="text-xs text-text-secondary">Updated 2 days ago</p>
              </motion.div>
            ))}
            
            {/* New Project Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-surface-low/50 rounded-[1.5rem] p-6 border border-white/5 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <span className="text-2xl font-light">+</span>
              </div>
              <h3 className="font-medium mb-1">New Project</h3>
              <p className="text-xs text-text-secondary">Create a new workspace</p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
