import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { BOARDS, CLASSES, SUBJECTS } from "../constants/studyOptions";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Search,
  Filter,
  BookOpen,
  Atom,
  Calculator,
  Globe,
  PenTool
} from "lucide-react";

type StudyMaterial = {
  id: string;
  board: string;
  class: string;
  subject: string;
  pdfUrl: string;
};

export default function StudyMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    board: "",
    class: "",
    subject: "",
  });

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const snap = await getDocs(collection(db, "studyMaterials"));
        setMaterials(
          snap.docs.map(
            (d) => ({ id: d.id, ...(d.data() as Omit<StudyMaterial, "id">) })
          )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const filteredMaterials =
    filters.board && filters.class && filters.subject
      ? materials.filter(
        (m) =>
          m.board === filters.board &&
          m.class === filters.class &&
          m.subject === filters.subject
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[-100px] text-classroom-yellow/10 hidden md:block"
        >
          <Atom size={400} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-10 text-classroom-blue/20 hidden lg:block"
        >
          <BookOpen size={64} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 text-classroom-green/20 hidden lg:block"
        >
          <Calculator size={72} />
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
            <PenTool className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Study Materials
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-classroom-blue to-classroom-purple text-2xl md:text-3xl font-bold">
              Curated for Excellence
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Access premium notes, question banks, and reference materials designed to simplify complex concepts.
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
            <h2 className="text-xl font-bold text-slate-900">Filter Resources</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Board", value: filters.board, options: BOARDS, onChange: (v: string) => setFilters({ ...filters, board: v }), icon: Globe },
              { label: "Class", value: filters.class, options: CLASSES, onChange: (v: string) => setFilters({ ...filters, class: v }), icon: BookOpen },
              { label: "Subject", value: filters.subject, options: SUBJECTS, onChange: (v: string) => setFilters({ ...filters, subject: v }), icon: Atom },
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
              {(!filters.board || !filters.class || !filters.subject) ? (
                <div className="text-center py-16 px-4 bg-yellow-50 rounded-3xl border-2 border-dashed border-classroom-yellow">
                  <div className="inline-block p-4 bg-classroom-yellow rounded-full mb-4 border-2 border-slate-900">
                    <Search className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Learn?</h3>
                  <p className="text-slate-600 font-medium">Select your Board, Class, and Subject above to reveal materials.</p>
                </div>
              ) : filteredMaterials.length === 0 ? (
                <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300">
                  <p className="text-xl font-bold text-slate-900 mb-2">No materials found yet 🧐</p>
                  <p className="text-slate-600">Try different filters or check back later!</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"
                >
                  {filteredMaterials.map((m) => (
                    <motion.div
                      key={m.id}
                      variants={itemVariants}
                      whileHover={{ y: -4, rotate: -1 }}
                      className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] hover:border-classroom-blue transition-all group"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-red-100 rounded-xl border-2 border-slate-900 group-hover:bg-red-200 transition-colors">
                            <FileText className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="px-2 py-0.5 bg-slate-100 border border-slate-900 rounded text-xs font-bold uppercase tracking-wide">
                                {m.board}
                              </span>
                              <span className="px-2 py-0.5 bg-blue-100 border border-slate-900 rounded text-xs font-bold uppercase tracking-wide">
                                Class {m.class}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-classroom-blue transition-colors">
                              {m.subject}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Study Material PDF</p>
                          </div>
                        </div>

                        <a
                          href={m.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 bg-slate-900 text-white rounded-xl shadow-[3px_3px_0px_0px_rgba(148,163,184,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all border-2 border-slate-900"
                          title="Open PDF"
                        >
                          <Download size={20} />
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
