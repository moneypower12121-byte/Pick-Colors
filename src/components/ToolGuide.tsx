import { motion } from 'motion/react';
import { HelpCircle, Sparkles, BookOpen } from 'lucide-react';

interface ToolGuideProps {
  title: string;
  usage: string[];
  features: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  relatedTools?: { name: string; path: string }[];
}

export default function ToolGuide({ title, usage, features, faq, relatedTools }: ToolGuideProps) {
  return (
    <section className="mt-32 max-w-5xl mx-auto border-t border-white/5 pt-24 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Ultimate Guide to {title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-2 prose prose-invert max-w-none">
            <p className="text-xl text-on-surface-variant leading-relaxed mb-12">
              Color is more than just aesthetics; it's a critical component of user experience, branding, and accessibility. 
              Our professional-grade {title} is designed to give you optical precision and technical control over your chromatic workflows.
            </p>
            
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Key Features & Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="bg-surface-low/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-colors">
                  <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6">How to Use the {title}</h3>
            <ol className="space-y-4 text-on-surface-variant list-none p-0">
              {usage.map((step, i) => (
                <li key={i} className="flex gap-4 items-start bg-surface-medium/30 p-4 rounded-xl border border-white/5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-12">
            <div className="bg-gradient-to-br from-surface-low to-surface-medium p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked
              </h3>
              <div className="space-y-6">
                {faq.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <p className="font-semibold text-white/90 text-sm italic">"{item.question}"</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {relatedTools && (
              <div className="p-8">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Explore Related</h3>
                <div className="flex flex-col gap-4">
                  {relatedTools.map((tool, i) => (
                    <a 
                      key={i} 
                      href={tool.path}
                      className="text-sm font-medium text-on-surface-variant hover:text-primary flex items-center justify-between group transition-colors"
                    >
                      {tool.name}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
