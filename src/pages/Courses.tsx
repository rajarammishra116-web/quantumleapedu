import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

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
  offer?: string;
  brochureUrl?: string;
  isActive: boolean;
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [board, setBoard] = useState("");
  const [classLevel, setClassLevel] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const snap = await getDocs(collection(db, "courses"));
      setCourses(
        snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Course) }))
          .filter((c) => c.isActive)
      );
    };

    fetchCourses();
  }, []);

  const filteredCourses =
    board && classLevel
      ? courses.filter(
          (c) => c.board === board && c.class === classLevel
        )
      : [];

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#1A233A]">
            Courses
          </h1>
          <p className="text-gray-600">
            Structured learning programs designed for conceptual mastery.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <select
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="input"
          >
            <option value="">Select Board</option>
            {BOARDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="input"
          >
            <option value="">Select Class</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>

        {/* Guidance */}
        {(!board || !classLevel) && (
          <p className="text-center text-gray-500">
            Please select Board and Class to view available courses.
          </p>
        )}

        {/* No results */}
        {board && classLevel && filteredCourses.length === 0 && (
          <p className="text-center text-gray-500">
            No courses available for the selected options.
          </p>
        )}

        {/* Course Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-[#1A233A]">
                {course.name}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {course.board} • Class {course.class}
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-700">

                {course.subject && (
                  <p>
                    <strong>Subject:</strong> {course.subject}
                  </p>
                )}

                {course.batchStrength && (
                  <p>
                    <strong>Batch Strength:</strong>{" "}
                    {course.batchStrength}
                  </p>
                )}

                {course.structure && (
                  <p>
                    <strong>Structure:</strong>{" "}
                    {course.structure}
                  </p>
                )}

                {course.mode && (
                  <p>
                    <strong>Mode:</strong> {course.mode}
                  </p>
                )}

                {course.offer && (
                  <p className="text-green-600 font-medium">
                    {course.offer}
                  </p>
                )}

                {course.brochureUrl && (
                  <a
                    href={course.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm font-medium text-blue-600 underline"
                  >
                    View Course Brochure
                  </a>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
