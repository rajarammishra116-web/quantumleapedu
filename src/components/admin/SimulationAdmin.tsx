import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  CLASSES,
  SIMULATION_SUBJECTS,
} from "../../constants/studyOptions";
import { ChevronDown, ChevronRight, Gamepad2, Trash2, ExternalLink } from "lucide-react";

export default function SimulationAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const [form, setForm] = useState({
    // board: "", // Removed
    class: "",
    subject: "",
    topic: "",
    description: "",
    simulationUrl: "",
  });

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "simulations"));
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const save = async () => {
    if (!auth.currentUser) {
      setMessage("❌ Not authenticated");
      return;
    }

    if (
      // !form.board || 
      !form.class ||
      !form.subject ||
      !form.topic ||
      !form.simulationUrl
    ) {
      setMessage("❌ All required fields must be filled");
      return;
    }

    try {
      setSaving(true);
      setMessage("Saving…");

      await addDoc(collection(db, "simulations"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setForm({
        // board: "",
        class: "",
        subject: "",
        topic: "",
        description: "",
        simulationUrl: "",
      });

      setMessage("✅ Simulation saved");
      fetchItems();
    } catch (e) {
      console.error(e);
      setMessage("❌ Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this simulation?")) return;
    await deleteDoc(doc(db, "simulations", id));
    fetchItems();
  };

  const toggleSubject = (subject: string) => {
    if (expandedSubject === subject) {
      setExpandedSubject(null);
    } else {
      setExpandedSubject(subject);
    }
  };

  // Group items by subject
  const groupedItems = SIMULATION_SUBJECTS.reduce((acc, subject) => {
    acc[subject] = items.filter(item => item.subject === subject);
    return acc;
  }, {} as Record<string, any[]>);


  return (
    <div className="space-y-8 max-w-4xl mx-auto">

      {/* ADD SECTION */}
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="bg-slate-900 text-white p-1 rounded">
            <Gamepad2 size={18} />
          </span>
          Add New Simulation
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Removed Board Select */}

          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
          >
            <option value="">Select Class</option>
            {CLASSES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            <option value="">Select Subject</option>
            {SIMULATION_SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            placeholder="Topic Name"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
          />

          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            placeholder="Simulation URL (PhET / external)"
            value={form.simulationUrl}
            onChange={(e) =>
              setForm({ ...form, simulationUrl: e.target.value })
            }
          />

          <textarea
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all md:col-span-2 min-h-[80px]"
            placeholder="Short description (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            onClick={save}
            disabled={saving}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 active:scale-95 transition-all md:col-span-2 shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Add Simulation"}
          </button>

          {message && (
            <p className={`text-sm md:col-span-2 text-center font-bold ${message.includes('❌') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* LIST SECTION */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Manage Simulations</h3>

        <div className="grid gap-3">
          {SIMULATION_SUBJECTS.map((subject) => {
            const subjectItems = groupedItems[subject] || [];
            const count = subjectItems.length;
            const isExpanded = expandedSubject === subject;

            return (
              <div key={subject} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleSubject(subject)}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${count > 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                    <span className="font-bold text-slate-700 text-lg">{subject}</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                    {count} files
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-2">
                    {count === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-sm italic">
                        No simulations uploaded for {subject}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {subjectItems.map(item => (
                          <div key={item.id} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between group">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-800 truncate">{item.topic}</h4>
                              <div className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="bg-slate-100 px-1.5 py-0.5 rounded">Class {item.class}</span>
                                {item.board && <span className="bg-slate-100 px-1.5 py-0.5 rounded opacity-50">{item.board}</span>} {/* Show board if exists but legacy */}
                                <a href={item.simulationUrl} target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline flex items-center gap-1">
                                  Link <ExternalLink size={10} />
                                </a>
                              </div>
                            </div>
                            <button
                              onClick={() => remove(item.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Simulation"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
