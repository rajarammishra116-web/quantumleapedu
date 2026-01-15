import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { CLASSES, SIMULATION_SUBJECTS } from "../constants/studyOptions"; // SUBJECTS removed
import { motion } from "framer-motion";
import {
  Gamepad2,
  ExternalLink,
  Search,
  Filter,
  FlaskConical,
  Microscope,
  Globe,
  Cpu,
  Rocket
} from "lucide-react";

type Simulation = {
  id: string;
  board: string;
  class: string;
  subject: string;
  topic: string;
  description?: string;
  simulationUrl: string;
};

export default function Simulations() {
  const [items, setItems] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    class: "",
    subject: "",
  });

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const snap = await getDocs(collection(db, "simulations"));
        setItems(
          snap.docs.map(
            (d) => ({ id: d.id, ...(d.data() as Omit<Simulation, "id">) })
          )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSimulations();
  }, []);

  const filteredItems =
    filters.class && filters.subject
      ? items.filter(
        (s) =>
          s.class === filters.class &&
          s.subject === filters.subject
      )
      : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-surface-light">

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {/* Background blobs or icons */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] text-classroom-purple/20 hidden lg:block"
        >
          <FlaskConical size={64} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] text-classroom-blue/20 hidden lg:block"
        >
          <Microscope size={80} />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] right-[30%] text-classroom-yellow/10 opacity-50 hidden md:block"
        >
          <Globe size={120} />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] mb-6">
            <Gamepad2 className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Interactive Simulations
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-classroom-orange to-classroom-red text-2xl md:text-3xl font-bold">
              Experience Science & Math
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Explore concepts through hands-on virtual labs and interactive models.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 md:p-8 rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-6 h-6 text-slate-900" />
            <h2 className="text-xl font-bold text-slate-900">Filter Simulation Labs</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { label: "Class", value: filters.class, options: CLASSES, onChange: (v: string) => setFilters({ ...filters, class: v }), icon: Rocket },
              { label: "Subject", value: filters.subject, options: SIMULATION_SUBJECTS, onChange: (v: string) => setFilters({ ...filters, subject: v }), icon: Cpu },
            ].map((filter, idx) => (
              <div key={idx} className="relative group">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  {filter.label}
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-indigo-50 border-2 border-slate-900 text-slate-900 py-4 px-5 pr-10 rounded-xl font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] transition-all cursor-pointer"
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                  >
                    <option value="">Select {filter.label}</option>
                    {filter.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
                    <filter.icon size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
          ) : (
            <>
              {(!filters.class || !filters.subject) ? (
                <div className="text-center py-16 px-4 bg-purple-50 rounded-3xl border-2 border-dashed border-classroom-purple">
                  <div className="inline-block p-4 bg-classroom-purple text-white rounded-full mb-4 border-2 border-slate-900">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Find a Simulation</h3>
                  <p className="text-slate-600 font-medium">Select your criteria to launch the virtual lab.</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300">
                  <p className="text-xl font-bold text-slate-900 mb-2">No simulations found yet 🧪</p>
                  <p className="text-slate-600">Try a different combination!</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredItems.map((s) => (
                    <motion.div
                      key={s.id}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-3xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[10px_10px_0px_0px_rgba(244,63,94,1)] transition-all overflow-hidden flex flex-col h-full"
                    >
                      {/* Card Header Illustration */}
                      <div className="h-32 bg-slate-100 flex items-center justify-center border-b-4 border-slate-900 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <Gamepad2 size={48} className="text-slate-400" />
                        <div className="absolute top-3 right-3 px-2 py-1 bg-white border-2 border-slate-900 rounded text-xs font-bold uppercase">
                          {s.subject}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-extrabold text-slate-900 mb-3 line-clamp-2">
                          {s.topic}
                        </h3>
                        {s.description && (
                          <p className="text-slate-600 font-medium text-sm mb-6 line-clamp-3 flex-1">
                            {s.description}
                          </p>
                        )}

                        <a
                          href={s.simulationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-auto w-full py-3 bg-classroom-red text-white font-bold rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center justify-center gap-2"
                        >
                          Launch Sim <ExternalLink size={18} />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
