import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogs.filter(blog => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query) ||
      blog.metaDescription.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            The Prism <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container">Blog</span>
          </h1>
          <p className="text-on-surface-variant text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Insights on color theory, design systems, and the future of digital aesthetics.
          </p>

          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-on-surface-variant" />
            </div>
            <input
              type="text"
              placeholder="Search articles by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-low border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </motion.div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">No articles found matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Link 
                to={`/blog/${blog.slug}`}
                className="group flex flex-col h-full bg-surface-low rounded-[2rem] border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden shrink-0">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-primary text-xs font-medium mb-2">{blog.date}</div>
                  <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 flex-1">
                    {blog.metaDescription}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-white group-hover:text-primary transition-colors mt-auto">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        )}
      </main>
    </div>
  );
}
