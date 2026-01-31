import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Clock,
  Users,
  BookOpen,
  Atom,
  Calculator,
  Dna,
  FlaskConical,
  Globe,
  Sparkles,
  CheckCircle2,
  GraduationCap
} from "lucide-react";

const BOARDS = ["CBSE", "Odisha Board"];
const CLASSES = ["9", "10", "11", "12"];

type Course = {
  id: string;
  name: string;
  board: string;
  class: string;
  subject?: string;
  batchStrength?: string;
  structure?: string;
  mode?: string;
  fees?: string;
  timetable?: string;
  offer?: string;
  brochureUrl?: string;
  priority?: number;
  isActive: boolean;
};

// --- Theme Logic ---
const THEMES: Record<string, { bg: string; text: string; accent: string; icon: any; gradient: string }> = {
  Physics: {
    bg: "bg-indigo-50",
    text: "text-indigo-900",
    accent: "bg-indigo-500",
    icon: Atom,
    gradient: "from-indigo-400 to-purple-500",
  },
  Mathematics: {
    bg: "bg-blue-50",
    text: "text-blue-900",
    accent: "bg-blue-500",
    icon: Calculator,
    gradient: "from-blue-400 to-cyan-500",
  },
  Chemistry: {
    bg: "bg-teal-50",
    text: "text-teal-900",
    accent: "bg-teal-500",
    icon: FlaskConical,
    gradient: "from-teal-400 to-emerald-500",
  },
  Biology: {
    bg: "bg-pink-50",
    text: "text-pink-900",
    accent: "bg-pink-500",
    icon: Dna,
    gradient: "from-pink-400 to-rose-500",
  },
  History: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    accent: "bg-amber-500",
    icon: BookOpen,
    gradient: "from-amber-400 to-orange-500",
  },
  Geography: {
    bg: "bg-green-50",
    text: "text-green-900",
    accent: "bg-green-500",
    icon: Globe,
    gradient: "from-green-400 to-lime-500",
  },
  Default: {
    bg: "bg-slate-50",
    text: "text-slate-900",
    accent: "bg-slate-800",
    icon: GraduationCap,
    gradient: "from-slate-700 to-slate-900",
  },
};

function getTheme(subject?: string) {
  if (!subject) return THEMES.Default;
  // Simple check for keywords
  if (subject.includes("Phys")) return THEMES.Physics;
  if (subject.includes("Math")) return THEMES.Mathematics;
  if (subject.includes("Chem")) return THEMES.Chemistry;
  if (subject.includes("Bio")) return THEMES.Biology;
  if (subject.includes("Hist")) return THEMES.History;
  if (subject.includes("Geo")) return THEMES.Geography;
  return THEMES.Default;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [board, setBoard] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snap = await getDocs(collection(db, "courses"));
        setCourses(
          snap.docs
            .map((d) => ({ id: d.id, ...(d.data() as Omit<Course, "id">) }))
            .filter((c) => c.isActive)
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Note: Failing silently for UI, but logging for debugging.
        // This is usually due to Firestore Permission Denied if not logged in.
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses =
    board && classLevel
      ? courses
        .filter((c) => {
          const courseBoard = c.board?.trim();
          const courseClass = c.class?.trim();

          return (
            courseBoard === board.trim() &&
            courseClass === classLevel.trim() &&
            c.isActive === true
          );
        })
        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
      : courses.filter(c => c.isActive === true).sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-surface-light relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute top-20 left-10 w-64 h-64 bg-classroom-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-classroom-yellow/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium mb-2"
          >
            <Sparkles size={16} className="text-classroom-yellow" />
            Admissions Open
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Find Your <span className="text-classroom-orange">Perfect Course</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Select your Board and Class to discover scientifically structured learning paths designed for mastery.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg border-2 border-slate-100 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Board
            </label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-slate-200 bg-slate-50 font-medium focus:border-classroom-blue focus:ring-0 outline-none transition-all cursor-pointer hover:bg-white"
            >
              <option value="">Select Board</option>
              {BOARDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Class
            </label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-slate-200 bg-slate-50 font-medium focus:border-classroom-blue focus:ring-0 outline-none transition-all cursor-pointer hover:bg-white"
            >
              <option value="">Select Class</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Info Message */}
        {(!board || !classLevel) && filteredCourses.length > 0 && (
          <div className="text-center py-6 text-slate-600 bg-primary/5 rounded-xl border border-primary/20">
            <p className="font-medium">📚 Showing all available courses. Use filters above to narrow your search.</p>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <CourseTicket
                key={course.id}
                course={course}
                index={index}
                onClick={() => setSelectedCourse(course)}
              />
            ))}
          </AnimatePresence>
        </div>

        {board && classLevel && filteredCourses.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No courses found for this selection yet.
          </div>
        )}
      </div>

      {/* Poster Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <CoursePosterModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components ---

function CourseTicket({
  course,
  index,
  onClick,
}: {
  course: Course;
  index: number;
  onClick: () => void;
}) {
  const theme = getTheme(course.subject);
  const Icon = theme.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="absolute inset-0 bg-slate-900 rounded-2xl transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
      <div className={`relative bg-white rounded-2xl border-2 border-slate-900 p-1 flex flex-col h-full overflow-hidden transition-transform group-hover:-translate-y-1`}>
        {/* Banner */}
        <div className={`h-24 rounded-xl bg-gradient-to-r ${theme.gradient} flex items-center justify-between px-6 relative overflow-hidden`}>
          <Icon className="text-white/20 absolute -right-4 -bottom-4 w-24 h-24 rotate-12" />
          <div className="text-white relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90 border border-white/30 px-2 py-0.5 rounded-md">
              {course.board} • Class {course.class}
            </span>
            <h3 className="text-xl font-bold mt-1 line-clamp-1">{course.subject || "Course"}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
            {course.name}
          </h4>

          <div className="space-y-3 mt-auto">
            {course.mode && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} />
                <span>{course.mode}</span>
              </div>
            )}
            {course.fees && (
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 p-2 rounded-lg">
                <span className="text-green-600">₹</span>
                <span>{course.fees}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
            <span>View Details</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              →
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CoursePosterModal({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  const theme = getTheme(course.subject);
  const Icon = theme.icon;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
        >
          <X size={20} />
        </button>

        {/* --- POSTER HEADER --- */}
        <div className={`relative h-48 bg-gradient-to-br ${theme.gradient} p-8 flex flex-col justify-end text-white overflow-hidden`}>
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent" />
          <Icon className="absolute -top-10 -right-10 w-64 h-64 text-white/10 rotate-12" />
          <Icon className="absolute top-10 left-10 w-12 h-12 text-white/20 -rotate-12" />

          <div className="relative z-10">
            <div className="flex gap-2 mb-3">
              <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20">
                {course.board}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20">
                Class {course.class}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-2">
              {course.name}
            </h2>
            {course.subject && (
              <p className="text-white/90 font-medium text-lg flex items-center gap-2">
                <Icon size={20} /> {course.subject}
              </p>
            )}
          </div>
        </div>

        {/* --- POSTER BODY --- */}
        <div className="p-8 space-y-8 bg-white relative">
          {/* Offer Badge (if exists) */}
          {course.offer && (
            <div className="absolute -top-6 right-8 bg-classroom-yellow text-slate-900 px-4 py-2 rounded-lg shadow-lg border-2 border-slate-900 font-bold transform rotate-2 animate-pulse">
              🎉 {course.offer}
            </div>
          )}

          {/* Structure / Key Highlights */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
              <Sparkles size={14} /> Key Highlights
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100">
              {course.structure ? (
                <ul className="space-y-3">
                  {course.structure.split(/•|,|\n/).filter(s => s.trim()).map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 font-medium leading-snug">
                      <CheckCircle2 className={`flex-shrink-0 w-5 h-5 ${theme.text}`} />
                      {item.trim()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 italic">Comprehensive syllabus coverage with focus on conceptual clarity.</p>
              )}
            </div>
          </div>

          {/* Info Grid (Fees, Mode, Timetable) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Fees */}
            <div className="col-span-2 sm:col-span-1 bg-green-50 p-4 rounded-2xl border border-green-100">
              <div className="text-green-800 text-xs font-bold uppercase tracking-wider mb-1">Course Fee</div>
              <div className="text-2xl font-black text-green-700">
                {course.fees || "Contact"}
              </div>
            </div>

            {/* Mode */}
            <div className="col-span-1 bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <div className="text-blue-800 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Users size={12} /> Mode
              </div>
              <div className="font-bold text-blue-900">
                {course.mode || "Offline"}
              </div>
            </div>

            {/* Timetable */}
            <div className="col-span-1 bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <div className="text-purple-800 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Clock size={12} /> Timetable
              </div>
              <div className="font-bold text-purple-900 text-sm leading-tight">
                {course.timetable || "Flexible"}
              </div>
            </div>

            {/* Batch Strength */}
            {course.batchStrength && (
              <div className="col-span-2 bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-orange-800 text-xs font-bold uppercase tracking-wider">Batch Size</div>
                  <div className="font-bold text-orange-900">{course.batchStrength}</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 space-y-3">
            {course.brochureUrl ? (
              <a
                href={course.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
              >
                <Download size={20} /> Download Brochure
              </a>
            ) : (
              <div className="w-full py-4 bg-slate-100 text-slate-400 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                Brochure Coming Soon
              </div>
            )}
            <p className="text-center text-xs text-slate-400 font-medium">
              * Limited seats available for the upcoming batch.
            </p>
          </div>
        </div>

        {/* Decor */}
        <div className="h-2 w-full bg-gradient-to-r from-classroom-blue via-classroom-purple to-classroom-orange" />
      </motion.div>
    </motion.div>,
    document.body
  );
}

