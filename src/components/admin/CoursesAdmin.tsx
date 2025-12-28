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

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Course>({
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
    priority: undefined,
    isActive: true,
  });

  const fetchCourses = async () => {
    const snap = await getDocs(collection(db, "courses"));
    setCourses(
      snap.docs.map((d) => ({ id: d.id, ...(d.data() as Course) }))
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const saveCourse = async () => {
    if (!form.name || !form.board || !form.class) return;

    const payload = {
      name: form.name,
      board: form.board,
      class: form.class,
      subject: form.subject || undefined,
      batchStrength: form.batchStrength || undefined,
      structure: form.structure || undefined,
      mode: form.mode || undefined,
      fees: form.fees || undefined,
      timetable: form.timetable || undefined,
      offer: form.offer || undefined,
      brochureUrl: form.brochureUrl || undefined,
      priority: form.priority ?? undefined,
      isActive: true,
      createdAt: serverTimestamp(),
    };

    if (editingId) {
      await updateDoc(doc(db, "courses", editingId), payload);
    } else {
      await addDoc(collection(db, "courses"), payload);
    }

    setEditingId(null);
    setForm({
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
      priority: undefined,
      isActive: true,
    });

    fetchCourses();
  };

  const deleteCourse = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this course?")) return;
    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">
        {editingId ? "Edit Course" : "Add Course"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["Course Name", "name"],
          ["Board", "board"],
          ["Class", "class"],
          ["Subject", "subject"],
          ["Batch Strength", "batchStrength"],
          ["Structure", "structure"],
          ["Mode", "mode"],
          ["Fees", "fees"],
          ["Timetable", "timetable"],
          ["Offer", "offer"],
        ].map(([label, key]) => (
          <input
            key={key}
            placeholder={label}
            value={(form as any)[key] ?? ""}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="input"
          />
        ))}

        <input
          type="number"
          placeholder="Priority (1 = highest)"
          value={form.priority ?? ""}
          onChange={(e) =>
            setForm({ ...form, priority: Number(e.target.value) })
          }
          className="input"
        />

        <input
          placeholder="Brochure URL"
          value={form.brochureUrl ?? ""}
          onChange={(e) =>
            setForm({ ...form, brochureUrl: e.target.value })
          }
          className="input"
        />
      </div>

      <button
        onClick={saveCourse}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {editingId ? "Update Course" : "Add Course"}
      </button>

      <hr />

      <h3 className="text-lg font-semibold">Existing Courses</h3>

      <div className="space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border rounded p-4 flex justify-between items-start text-sm"
          >
            <div>
              <strong>{c.name}</strong>
              <div className="text-gray-600">
                {c.board} | Class {c.class}
              </div>
              {c.priority !== undefined && (
                <div className="text-gray-500">
                  Priority: {c.priority}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  setEditingId(c.id!);
                  setForm({ ...c });
                }}
                className="text-blue-600 text-xs hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCourse(c.id)}
                className="text-red-600 text-xs hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
