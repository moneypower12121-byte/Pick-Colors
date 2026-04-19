import { motion } from 'motion/react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <main className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-6">Terms of Service</h1>
          <p className="text-on-surface-variant text-lg">Last updated: April 11, 2026</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-12 text-on-surface-variant leading-relaxed"
        >
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using PickColors ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p className="mb-4">
              PickColors provides users with access to a rich collection of resources, including various design tools, color palette generators, and accessibility checkers. You understand and agree that the Service is provided "AS-IS" and that PickColors assumes no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
            <p className="mb-4">
              You agree to not use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.</li>
              <li>Harm minors in any way.</li>
              <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              You acknowledge and agree that the Service and any necessary software used in connection with the Service contain proprietary and confidential information that is protected by applicable intellectual property and other laws. Except as expressly authorized by PickColors, you agree not to modify, rent, lease, loan, sell, distribute or create derivative works based on the Service, in whole or in part.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Modifications to Service</h2>
            <p className="mb-4">
              PickColors reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that PickColors shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
