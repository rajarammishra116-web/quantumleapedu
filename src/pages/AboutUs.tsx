import { contentData } from "../data/contentData";
import { motion, Variants } from "framer-motion";
import { Lightbulb, Target, Users, Rocket } from "lucide-react";

export default function AboutUs() {
  const { about } = contentData;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration (optional extra flair on top of Layout) */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto space-y-16"
      >

        {/* HEADER / STORY */}
        <motion.section variants={item} className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Rocket className="text-primary w-6 h-6" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            {about.title}
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed whitespace-pre-line text-justify md:text-center glass p-8 rounded-3xl border border-white/50 shadow-sm">
              {about.longText}
            </p>
          </div>
        </motion.section>

        {/* VALUES GRID */}
        <motion.section variants={item} className="grid md:grid-cols-2 gap-8">
          {/* VISION */}
          <div className="glass p-8 rounded-3xl border border-white/40 hover:border-primary/20 transition-all duration-300 shadow-md group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Target size={24} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Our Vision & Aim</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Our vision is to move students beyond rote learning and
              examination-oriented preparation. We emphasize logical reasoning,
              conceptual depth, and structured problem-solving so that learning
              becomes meaningful, transferable, and enduring.
            </p>
          </div>

          {/* EDUCATORS */}
          <div className="glass p-8 rounded-3xl border border-white/40 hover:border-purple/20 transition-all duration-300 shadow-md group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <Users size={24} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Our Educators</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Our educators bring strong academic foundations, subject
              mastery, and teaching experience focused on conceptual clarity
              rather than shortcuts. Every course is designed and delivered
              with long-term intellectual growth in mind.
            </p>
          </div>
        </motion.section>

        {/* QUOTE / PHILOSOPHY */}
        <motion.section variants={item} className="text-center py-12">
          <div className="relative inline-block max-w-3xl glass px-10 py-12 rounded-[3rem] border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl">
            <Lightbulb className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-yellow-400 fill-yellow-400/20" />
            <h3 className="text-2xl md:text-3xl font-bold leading-normal">
              "We transform conceptual understanding into lifelong scientific thinking."
            </h3>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}
