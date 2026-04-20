import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import SEO from '../components/SEO';


export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <SEO 
        title="Contact Us" 
        description="Get in touch with the PickColors team for support, business inquiries, or feedback."
        canonicalUrl="https://pickcolors.xyz/contact"
      />
      <main className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-headline mb-4">Get in Touch</h1>
          <p className="text-body max-w-xl mx-auto">
            Have a question about Pick Colors? We're here to help. Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center shrink-0 border border-white/5">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email Us</h3>
                <p className="text-body text-sm mb-2">For general inquiries and support.</p>
                <a href="mailto:hello@pickcolors.com" className="text-primary hover:underline">hello@pickcolors.com</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center shrink-0 border border-white/5">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Community</h3>
                <p className="text-body text-sm mb-2">Join our Discord server to connect with other designers.</p>
                <a href="#" className="text-primary hover:underline">Join Discord</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center shrink-0 border border-white/5">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Office</h3>
                <p className="text-body text-sm">
                  123 Design Avenue<br/>
                  Creative District<br/>
                  San Francisco, CA 94103
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-low rounded-[2rem] p-8 border border-white/5"
          >
            <div className="space-y-6">
              <div>
                <label className="text-label-sm block mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-medium border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="text-label-sm block mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-surface-medium border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="text-label-sm block mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-surface-medium border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full py-3 rounded-xl bg-primary text-base-bg font-medium hover:bg-primary-container transition-colors"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </main>
    </div>
  );
}
