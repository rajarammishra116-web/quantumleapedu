import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

type Course = {
  id?: string;
  name: string;
  board: "CBSE" | "Odisha Board" | "";
  class: "9" | "10" | "11" | "12" | "";
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

const EMPTY_FORM: Course = {
  name: "",
  board: "",
  class: "",
  subject: "",
  batchStrength: "",
  structure: "",
  mode: "",
  fees: "",
  timetable: "",
  offer: "",
  brochureUrl: "",
  priority: 999,
  isActive: true,
};

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Course>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCourses = async () => {
    const snap = await getDocs(collection(db, "courses"));
    setCourses(
      snap.docs.map(d => ({ id: d.id, ...(d.data() as Course) }))
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const saveCourse = async () => {
    if (!form.name || !form.board || !form.class) {
      alert("Course name, Board and Class are required");
      return;
    }

    const payload = {
  name: form.name.trim(),
  board: form.board.trim(),          // MUST match frontend exactly
  class: form.class.trim(),          // "9" | "10" | "11" | "12"
  subject: form.subject?.trim() || undefined,
  batchStrength: form.batchStrength || undefined,
  structure: form.structure || undefined,
  mode: form.mode || undefined,
  fees: form.fees || undefined,
  timetable: form.timetable || undefined,
  offer: form.offer || undefined,
  brochureUrl: form.brochureUrl || undefined,
  priority: form.priority ?? 999,
  isActive: true,
  createdAt: serverTimestamp(),
};


    if (editingId) {
      await updateDoc(doc(db, "courses", editingId), payload);
    } else {
      await addDoc(collection(db, "courses"), payload);
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    fetchCourses();
  };

  const deleteCourse = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this course?")) return;
    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <h2 className="text-xl font-bold">
        {editingId ? "Edit Course" : "Add Course"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" placeholder="Course Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <select className="input"
          value={form.board}
          onChange={e => setForm({ ...form, board: e.target.value as any })}
        >
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="Odisha Board">Odisha Board</option>
        </select>

        <select className="input"
          value={form.class}
          onChange={e => setForm({ ...form, class: e.target.value as any })}
        >
          <option value="">Select Class</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>

        <input className="input" placeholder="Subject"
          value={form.subject ?? ""}
          onChange={e => setForm({ ...form, subject: e.target.value })}
        />

        <input className="input" placeholder="Batch Strength"
          value={form.batchStrength ?? ""}
          onChange={e => setForm({ ...form, batchStrength: e.target.value })}
        />

        <input className="input" placeholder="Mode"
          value={form.mode ?? ""}
          onChange={e => setForm({ ...form, mode: e.target.value })}
        />

        <input className="input" placeholder="Fees"
          value={form.fees ?? ""}
          onChange={e => setForm({ ...form, fees: e.target.value })}
        />

        <input className="input" placeholder="Timetable"
          value={form.timetable ?? ""}
          onChange={e => setForm({ ...form, timetable: e.target.value })}
        />

        <input className="input" placeholder="Offer"
          value={form.offer ?? ""}
          onChange={e => setForm({ ...form, offer: e.target.value })}
        />

        <input className="input" placeholder="Brochure URL"
          value={form.brochureUrl ?? ""}
          onChange={e => setForm({ ...form, brochureUrl: e.target.value })}
        />

        <input type="number" className="input"
          placeholder="Priority (1 = highest)"
          value={form.priority ?? ""}
          onChange={e => setForm({ ...form, priority: Number(e.target.value) })}
        />

        <textarea className="input md:col-span-2"
          placeholder="Course Structure / Highlights"
          value={form.structure ?? ""}
          onChange={e => setForm({ ...form, structure: e.target.value })}
        />
      </div>

      <button onClick={saveCourse} className="px-6 py-2 bg-black text-white rounded">
        {editingId ? "Update Course" : "Add Course"}
      </button>

      <hr />

      {courses.map(c => (
        <div key={c.id} className="border p-4 rounded flex justify-between">
          <div>
            <strong>{c.name}</strong>
            <div className="text-sm text-gray-600">
              {c.board} • Class {c.class}
            </div>
          </div>
          <div className="text-sm space-y-1">
            <button className="text-blue-600"
              onClick={() => {
                setEditingId(c.id!);
                setForm({ ...c });
              }}
            >
              Edit
            </button>
            <button className="text-red-600"
              onClick={() => deleteCourse(c.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
