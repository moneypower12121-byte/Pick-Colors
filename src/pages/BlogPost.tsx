import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar } from 'lucide-react';
import Markdown from 'react-markdown';
import { blogs } from '../data/blogs';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-6xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-low rounded-[2rem] border border-white/5 overflow-hidden"
        >
          <div className="w-full h-[300px] md:h-[400px] relative">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-low to-transparent" />
          </div>

          <div className="p-8 md:p-12 -mt-20 relative z-10">
            <div className="flex items-center gap-2 text-sm text-primary mb-4 bg-primary/10 w-fit px-3 py-1.5 rounded-full">
              <Calendar className="w-4 h-4" />
              {blog.date}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-on-surface-variant mb-8 leading-relaxed">
              {blog.metaDescription}
            </p>

            {blog.toolPath && (
              <div className="mb-12">
                <Link 
                  to={blog.toolPath}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                  Open Tool
                  <span className="text-lg leading-none">→</span>
                </Link>
              </div>
            )}

            <div className="markdown-body">
              <Markdown>{blog.content}</Markdown>
            </div>
          </div>
        </motion.article>
      </main>
    </div>
  );
}
