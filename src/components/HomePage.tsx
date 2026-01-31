import { ArrowRight, BookOpen, Layers, PlayCircle, Calculator, Globe, Atom, Ruler, BrainCircuit, Hourglass, Dna, Pi, Sigma, Triangle, Divide, Bot, Telescope } from "lucide-react";
import { contentData } from "../data/contentData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Page } from "../App";
import { OrbitSimulation } from "./PhysicsSimulations";
import { useContentData } from "@/hooks/useContentData";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ }: HomePageProps) {
  const { homepageContent } = useContentData();

  // Use Firestore content if available, otherwise fall back to contentData
  const hero = homepageContent?.hero || contentData.hero;
  const features = homepageContent?.features || contentData.features;
  const about = contentData.about;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-surface-light font-sans text-slate-800 selection:bg-classroom-yellow/50">

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-32 px-6 sm:px-8 lg:px-12 overflow-hidden flex flex-col items-center text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-classroom-purple/20 rounded-full blur-3xl -z-10 animate-blob hidden md:block" />
        <div className="absolute top-40 right-10 w-40 h-40 bg-classroom-yellow/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000 hidden md:block" />

        {/* Floating Subject Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
          {/* Math: Calculator (Top Left) */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[5%] text-classroom-blue opacity-80 hidden lg:block"
          >
            <Calculator size={48} strokeWidth={1.5} />
          </motion.div>

          {/* Science: Atom (Top Right) */}
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[10%] text-classroom-purple opacity-80 hidden lg:block"
          >
            <Atom size={56} strokeWidth={1.5} />
          </motion.div>

          {/* Geography: Globe (Bottom Left) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[20%] left-[10%] text-classroom-green opacity-80 hidden lg:block"
          >
            <Globe size={40} strokeWidth={1.5} />
          </motion.div>

          {/* History/Tools: Hourglass (Bottom Right) */}
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[25%] right-[15%] text-classroom-orange opacity-80 hidden lg:block"
          >
            <Hourglass size={44} strokeWidth={1.5} />
          </motion.div>

          {/* Biology: DNA (Top Center-Left) */}
          <motion.div
            animate={{ x: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[25%] text-secondary/60 opacity-60 hidden md:block"
          >
            <Dna size={32} strokeWidth={1.5} />
          </motion.div>

          {/* Tools: Ruler (Bottom Center-Right) */}
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[25%] text-slate-400/50 hidden md:block"
          >
            <Ruler size={36} strokeWidth={1.5} />
          </motion.div>

          {/* General: Brain (Near Title) */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] right-[30%] text-primary/30 hidden md:block"
          >
            <BrainCircuit size={64} strokeWidth={1} />
          </motion.div>

          {/* Physics Simulation: Orbit (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-[15%] right-[8%] hidden lg:block opacity-60"
          >
            <OrbitSimulation />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Tagline - Handwritten Style */}
          {hero.tagline && (
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] font-bold text-sm tracking-wide uppercase">
                {hero.tagline}
              </span>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight"
          >
            Don't Just Memorize.<br />
            <span className="text-primary relative">
              Learn to Think.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-classroom-yellow -z-10 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            {hero.subheadline}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/materials"
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-[6px_6px_0px_0px_rgba(99,102,241,1)] hover:shadow-[2px_2px_0px_0px_rgba(99,102,241,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2 border-2 border-slate-900"
            >
              Start Learning <ArrowRight size={20} />
            </Link>
            <Link
              to="/courses"
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-[6px_6px_0px_0px_rgba(203,213,225,1)] hover:shadow-[2px_2px_0px_0px_rgba(203,213,225,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all border-2 border-slate-200"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES SECTION (Canva Resources) */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50">
        {/* Background Doodles */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
          <Pi className="absolute top-10 left-10 text-classroom-purple w-12 h-12 rotate-12" />
          <Sigma className="absolute top-20 right-20 text-classroom-orange w-16 h-16 -rotate-12" />
          <Triangle className="absolute bottom-10 left-1/4 text-classroom-green w-10 h-10 rotate-45" />
          <Divide className="absolute bottom-32 right-10 text-classroom-blue w-14 h-14 rotate-6" />
          <Bot className="absolute top-1/2 left-5 text-gray-300 w-12 h-12 -rotate-6" />
          <Telescope className="absolute top-1/3 right-1/4 text-secondary/40 w-16 h-16 rotate-12" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features && features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              color={feature.cardColor}
              icon={getFeatureIcon(index)}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </section>

      {/* STORY SECTION (Canva Zoom Class Style) */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-classroom-yellow border-y-4 border-slate-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
              {about.title}
              <span className="text-3xl">✨</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-800 font-medium leading-relaxed mb-8">
              {about.shortText}
            </p>
            <Link
              to="/about"
              className="inline-block px-8 py-3 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-lg shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Read the full story &rarr;
            </Link>
          </motion.div>

          {/* Illustration/Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md"
          >
            <div className="aspect-square bg-white border-4 border-slate-900 rounded-3xl shadow-[12px_12px_0px_0px_rgba(255,255,255,0.5)] p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-slate-900">Launch Your Potential</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

// Helper to get diverse icons
function getFeatureIcon(index: number) {
  const icons = [
    <BookOpen className="w-8 h-8 text-slate-900" />,
    <PlayCircle className="w-8 h-8 text-slate-900" />,
    <Layers className="w-8 h-8 text-slate-900" />
  ];
  return icons[index % icons.length];
}

function FeatureCard({ title, description, color, icon, delay }: { title: string, description: string, color: string, icon: JSX.Element, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, rotate: -1 }}
      className={`${color} p-8 rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all h-full flex flex-col`}
    >
      <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-900 flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-800 font-medium leading-relaxed">{description}</p>
    </motion.div>
  );
}
