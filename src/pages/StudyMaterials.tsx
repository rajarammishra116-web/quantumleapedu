import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  BOARDS,
  CLASSES,
  SUBJECTS,
} from "../constants/studyOptions";

type StudyMaterial = {
  id: string;
  board: string;
  class: string;
  subject: string;
  pdfUrl: string;
};

export default function StudyMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [filters, setFilters] = useState({
    board: "",
    class: "",
    subject: "",
  });

  useEffect(() => {
    const fetchMaterials = async () => {
      const snap = await getDocs(collection(db, "studyMaterials"));
      setMaterials(
        snap.docs.map(
          (d) => ({ id: d.id, ...(d.data() as Omit<StudyMaterial, "id">) })
        )
      );
    };

    fetchMaterials();
  }, []);

  // ✅ CORRECT FILTER LOGIC
  const filteredMaterials =
    filters.board && filters.class && filters.subject
      ? materials.filter(
          (m) =>
            m.board === filters.board &&
            m.class === filters.class &&
            m.subject === filters.subject
        )
      : [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Study Materials</h1>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">
        <select
          className="input"
          value={filters.board}
          onChange={(e) =>
            setFilters({ ...filters, board: e.target.value })
          }
        >
          <option value="">Select Board</option>
          {BOARDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={filters.class}
          onChange={(e) =>
            setFilters({ ...filters, class: e.target.value })
          }
        >
          <option value="">Select Class</option>
          {CLASSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={filters.subject}
          onChange={(e) =>
            setFilters({ ...filters, subject: e.target.value })
          }
        >
          <option value="">Select Subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Guidance message */}
      {(!filters.board || !filters.class || !filters.subject) && (
        <p className="text-gray-500">
          Please select Board, Class, and Subject to view study materials.
        </p>
      )}

      {/* Results */}
      <div className="space-y-3">
        {filters.board &&
          filters.class &&
          filters.subject &&
          filteredMaterials.length === 0 && (
            <p className="text-gray-500">
              No study materials found for the selected options.
            </p>
          )}

        {filteredMaterials.map((m) => (
          <div
            key={m.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {m.board} | Class {m.class} | {m.subject}
              </p>
            </div>
            <a
              href={m.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
