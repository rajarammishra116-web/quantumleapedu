import { contentData } from "../data/contentData";
import { motion, Variants } from "framer-motion";
import { Lightbulb, Target, Users, Rocket, Calculator, Globe, Atom, Hourglass, Dna, Sparkles } from "lucide-react";

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
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] text-classroom-blue opacity-60 hidden lg:block"
        >
          <Calculator size={48} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[15%] right-[10%] text-classroom-purple opacity-60 hidden lg:block"
        >
          <Atom size={56} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[10%] text-classroom-green opacity-60 hidden lg:block"
        >
          <Globe size={40} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[25%] right-[15%] text-classroom-orange opacity-60 hidden lg:block"
        >
          <Hourglass size={44} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          animate={{ x: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[50%] left-[2%] text-secondary/40 opacity-50 hidden md:block"
        >
          <Dna size={32} strokeWidth={1.5} />
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto space-y-16"
      >

        {/* HEADER / STORY */}
        <motion.section variants={item} className="text-center space-y-8">
          <div className="inline-flex items-center justify-center p-4 bg-white border-2 border-slate-900 rounded-full shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] mb-2">
            <Rocket className="text-slate-900 w-8 h-8" />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight relative inline-block">
            {about.title}
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-classroom-yellow -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </h1>

          <div className="max-w-4xl mx-auto mt-8">
            {/* "Paper" Card Style for Story */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative rotate-1 transition-transform hover:rotate-0 duration-300">
              <div className="absolute -top-3 -left-3 text-4xl transform -rotate-12">✨</div>
              <p className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line text-justify md:text-center font-medium">
                {about.longText}
              </p>
            </div>
          </div>
        </motion.section>

        {/* VALUES GRID */}
        <motion.section variants={item} className="grid md:grid-cols-2 gap-8">
          {/* VISION - Green Card */}
          <div className="bg-classroom-green p-8 rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-sm">
                <Target size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
            </div>
            <p className="text-slate-900 leading-relaxed text-lg font-medium">
              Our vision is to move students beyond rote learning and
              examination-oriented preparation. We emphasize logical reasoning,
              conceptual depth, and structured problem-solving so that learning
              becomes meaningful.
            </p>
          </div>

          {/* EDUCATORS - Yellow Card */}
          <div className="bg-classroom-yellow p-8 rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-sm">
                <Users size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Educators</h2>
            </div>
            <p className="text-slate-900 leading-relaxed text-lg font-medium">
              Our educators bring strong academic foundations, subject
              mastery, and teaching experience focused on conceptual clarity
              rather than shortcuts. Every course is designed for intellectual growth.
            </p>
          </div>
        </motion.section>

        {/* QUOTE / PHILOSOPHY */}
        <motion.section variants={item} className="text-center py-8">
          <div className="relative inline-block max-w-4xl bg-slate-900 px-10 py-12 rounded-[3rem] text-white shadow-[12px_12px_0px_0px_rgba(99,102,241,0.5)] transform -rotate-1 hover:rotate-0 transition-all duration-500">
            <Lightbulb className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 text-classroom-yellow fill-classroom-yellow animate-pulse" />
            <h3 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight mt-4">
              "We transform conceptual understanding into lifelong scientific thinking."
            </h3>
            <div className="flex justify-center gap-2 mt-6 opacity-60">
              <Sparkles size={20} className="text-classroom-purple" />
              <Sparkles size={20} className="text-classroom-blue" />
              <Sparkles size={20} className="text-classroom-green" />
            </div>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}
