import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
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
  offer?: string;
  brochureUrl?: string;
  isActive: boolean;
};

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Course>({
    name: "",
    board: "",
    class: "",
    subject: "",
    batchStrength: "",
    structure: "",
    mode: "",
    offer: "",
    brochureUrl: "",
    isActive: true,
  });

  const fetchCourses = async () => {
    const snap = await getDocs(collection(db, "courses"));
    setCourses(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Course),
      }))
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async () => {
    if (!form.name || !form.board || !form.class) return;

    await addDoc(collection(db, "courses"), {
      ...form,
      createdAt: serverTimestamp(),
    });

    setForm({
      name: "",
      board: "",
      class: "",
      subject: "",
      batchStrength: "",
      structure: "",
      mode: "",
      offer: "",
      brochureUrl: "",
      isActive: true,
    });

    fetchCourses();
  };

  const deleteCourse = async (id?: string) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Add Course</h3>

      {/* Add Course Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["Course Name", "name"],
          ["Board", "board"],
          ["Class", "class"],
          ["Subject", "subject"],
          ["Batch Strength", "batchStrength"],
          ["Structure", "structure"],
          ["Mode", "mode"],
          ["Offer", "offer"],
        ].map(([label, key]) => (
          <input
            key={key}
            placeholder={label}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="input"
          />
        ))}

        <input
          placeholder="Brochure URL (PDF / PPT / Drive link)"
          value={form.brochureUrl}
          onChange={(e) =>
            setForm({ ...form, brochureUrl: e.target.value })
          }
          className="input"
        />
      </div>

      <button
        onClick={addCourse}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Add Course
      </button>

      <hr />

      {/* Existing Courses */}
      <h3 className="text-lg font-semibold">Existing Courses</h3>

      {courses.length === 0 && (
        <p className="text-gray-500 text-sm">
          No courses added yet.
        </p>
      )}

      <div className="space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border rounded p-4 text-sm flex justify-between items-start"
          >
            <div>
              <strong>{c.name}</strong>

              <div className="text-gray-600">
                {c.board} | Class {c.class}
              </div>

              {c.subject && (
                <div className="text-gray-600">
                  Subject: {c.subject}
                </div>
              )}

              {c.offer && (
                <div className="text-gray-500">
                  Offer: {c.offer}
                </div>
              )}

              {c.brochureUrl && (
                <a
                  href={c.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline mt-1 inline-block"
                >
                  View Brochure
                </a>
              )}
            </div>

            {/* ✅ DELETE BUTTON */}
            <button
              onClick={() => deleteCourse(c.id)}
              className="text-red-600 text-xs font-medium hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
