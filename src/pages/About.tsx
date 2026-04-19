import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-display mb-6">The Digital Prism</h1>
          <p className="text-body text-xl max-w-2xl mx-auto">
            We believe that color is the foundation of digital emotion. Our mission is to build the ultimate workspace for color professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-low rounded-[2rem] p-10 border border-white/5"
          >
            <h3 className="text-2xl font-medium mb-4">Our Story</h3>
            <p className="text-body mb-4">
              Founded in 2026, Pick Colors started as an internal tool for a boutique design agency. We were frustrated by the lack of precision in existing color pickers.
            </p>
            <p className="text-body">
              Today, we serve thousands of designers, developers, and artists worldwide, providing them with the tools they need to create stunning visual experiences.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-medium rounded-[2rem] p-10 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-medium mb-4 relative z-10">The Design DNA</h3>
            <p className="text-body mb-4 relative z-10">
              Our platform is built on the "Editorial Chromaticism" design system. It combines premium dark mode, glassmorphism, and intentional asymmetry.
            </p>
            <ul className="space-y-2 text-body relative z-10">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Precision extraction</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Tonal stacking</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Harmonic generation</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
