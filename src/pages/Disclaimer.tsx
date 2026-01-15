
import { motion } from "framer-motion";

export default function Disclaimer() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
          {/* Decorative background elements matching site theme */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <motion.div {...fadeInUp} className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-slate-300 text-lg">Quantum Leap: From Ignorance to Enlightenment</p>
          </motion.div>
        </div>

        <div className="p-8 md:p-12 space-y-10 text-slate-700 leading-relaxed">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="mb-6">
              The information provided by <strong>Quantum Leap</strong> on this platform is for general informational purposes only. All information is provided in good faith, however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
            </p>
          </motion.section>

          <div className="h-px bg-slate-100" />

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">1</span>
                General Use
              </h2>
              <div className="pl-11 space-y-4">
                <p>
                  The content provided on this platform is for <strong>general educational and informational purposes only</strong>. It is subject to change without prior notice.
                </p>
                <p>
                  Neither Quantum Leap nor any third parties provide any warranty or guarantee regarding the <strong>accuracy, completeness, performance, timeliness, or suitability</strong> of the information and materials offered for any specific purpose. You acknowledge that such content may contain errors or inaccuracies, and we expressly exclude liability to the fullest extent permitted by law.
                </p>
                <p>
                  Your use of any information or materials on this platform is <strong>entirely at your own risk</strong>. It is your responsibility to ensure that any courses, services, or content meet your personal, academic, or professional requirements.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">2</span>
                Educational Purpose Only
              </h2>
              <div className="pl-11 space-y-4">
                <p>
                  All courses, materials, videos, tests, and resources provided by Quantum Leap are intended <strong>strictly for educational and intellectual development</strong>.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>We <strong>do not guarantee</strong> academic ranks, examination results, job placement, income, or financial success.</li>
                  <li>Learning outcomes depend on individual effort, discipline, consistency, and application.</li>
                  <li>No claims are made regarding assured success in any competitive examination, career, or profession.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">3</span>
                External Links
              </h2>
              <div className="pl-11 space-y-4">
                <p>
                  This platform may include links to external websites for reference or additional information. These links do not signify endorsement. Quantum Leap holds <strong>no responsibility</strong> for the content, accuracy, or availability of linked websites.
                </p>
              </div>
            </div>

          </motion.section>
        </div>
      </div>
    </div>
  );
}
