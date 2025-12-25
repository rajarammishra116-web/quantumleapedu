import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  BOARDS,
  CLASSES,
  SUBJECTS,
} from "@/constants/studyOptions";

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
  const [filters, setFilters] = useState({
    board: "",
    class: "",
    subject: "",
  });

  useEffect(() => {
    const fetchSimulations = async () => {
      const snap = await getDocs(collection(db, "simulations"));
      setItems(
        snap.docs.map(
          (d) => ({ id: d.id, ...(d.data() as Omit<Simulation, "id">) })
        )
      );
    };

    fetchSimulations();
  }, []);

  const filteredItems =
    filters.board && filters.class && filters.subject
      ? items.filter(
          (s) =>
            s.board === filters.board &&
            s.class === filters.class &&
            s.subject === filters.subject
        )
      : [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Simulations</h1>

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

      {/* Guidance */}
      {(!filters.board || !filters.class || !filters.subject) && (
        <p className="text-gray-500">
          Please select Board, Class, and Subject to view simulations.
        </p>
      )}

      {/* Results */}
      <div className="space-y-4">
        {filters.board &&
          filters.class &&
          filters.subject &&
          filteredItems.length === 0 && (
            <p className="text-gray-500">
              No simulations found for the selected options.
            </p>
          )}

        {filteredItems.map((s) => (
          <div
            key={s.id}
            className="border rounded p-4 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{s.topic}</p>
              {s.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {s.description}
                </p>
              )}
            </div>

            <a
              href={s.simulationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Open Simulation
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
