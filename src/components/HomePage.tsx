import { ArrowRight, BookOpen, Sparkles, Telescope } from "lucide-react";
import { contentData } from "../data/contentData";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

export default function HomePage() {
  const { hero, about } = contentData;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                Welcome to the Future of Learning
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-7xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 items-center"
            >
              <Link
                to="/materials"
                className="group px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
              >
                Start Learning
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* FEATURES */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto"
          >
            <FeatureCard
              icon={<BookOpen className="text-white" size={28} />}
              bg="bg-gradient-to-br from-blue-500 to-blue-600"
              title="Curated Content"
              description="Deep dive into carefully selected study materials aligned with CBSE and Odisha Board curricula."
              delay={0}
            />

            <FeatureCard
              icon={<Telescope className="text-white" size={28} />}
              bg="bg-gradient-to-br from-purple-500 to-purple-600"
              title="Interactive Simulations"
              description="Visualize and interact with scientific concepts using physics and math simulations."
              delay={0.1}
            />

            <FeatureCard
              icon={<Sparkles className="text-white" size={28} />}
              bg="bg-gradient-to-br from-teal-500 to-teal-600"
              title="Structured Pedagogy"
              description="Learning paths designed for conceptual clarity and long-term retention."
              delay={0.2}
            />
          </motion.div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute inset-0 bg-slate-50/50 skew-y-3 origin-bottom-left -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-8">
              {about.title}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              {about.shortText}
            </p>
            <div className="mt-12">
              <Link
                to="/about"
                className="text-primary font-semibold hover:text-primary-hover hover:underline underline-offset-4"
              >
                Learn more →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  bg,
  title,
  description,
  delay,
}: {
  icon: JSX.Element;
  bg: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass p-8 rounded-3xl border border-slate-100/50 hover:shadow-xl hover:border-primary/20 transition-all"
    >
      <div
        className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
