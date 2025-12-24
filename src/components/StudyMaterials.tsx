import { useState, useMemo } from 'react';
import { FileText, Download } from 'lucide-react';
import { contentData } from '../data/contentData';
import { Board, Class, Subject } from '../types';

const CLASS_11_12_SUBJECTS: Subject[] = ['Physics'];
const CLASS_9_10_SUBJECTS: Subject[] = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Polity',
  'Economics',
  'Philosophy'
];

export default function StudyMaterials() {
  const [selectedBoard, setSelectedBoard] = useState<Board | 'all'>('all');
  const [selectedClass, setSelectedClass] = useState<Class | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');

  const availableSubjects = useMemo(() => {
    if (selectedClass === '11' || selectedClass === '12') {
      return CLASS_11_12_SUBJECTS;
    } else if (selectedClass === '9' || selectedClass === '10') {
      return CLASS_9_10_SUBJECTS;
    }
    return [...CLASS_9_10_SUBJECTS, ...CLASS_11_12_SUBJECTS].filter(
      (v, i, a) => a.indexOf(v) === i
    );
  }, [selectedClass]);

  const filteredMaterials = useMemo(() => {
    return contentData.studyMaterials.filter((material) => {
      const boardMatch = selectedBoard === 'all' || material.board === selectedBoard;
      const classMatch = selectedClass === 'all' || material.class === selectedClass;
      const subjectMatch = selectedSubject === 'all' || material.subject === selectedSubject;
      return boardMatch && classMatch && subjectMatch;
    });
  }, [selectedBoard, selectedClass, selectedSubject]);

  const handleMaterialClick = (pdfPath: string) => {
    window.open(pdfPath, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A233A] mb-4">
            Study Materials
          </h1>
          <p className="text-lg text-gray-600">
            Access comprehensive learning resources tailored to your curriculum
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board
              </label>
              <select
                value={selectedBoard}
                onChange={(e) => {
                  setSelectedBoard(e.target.value as Board | 'all');
                  setSelectedSubject('all');
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A] focus:border-transparent transition-all"
              >
                <option value="all">All Boards</option>
                <option value="CBSE">CBSE</option>
                <option value="Odisha">Odisha Board</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value as Class | 'all');
                  setSelectedSubject('all');
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A] focus:border-transparent transition-all"
              >
                <option value="all">All Classes</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as Subject | 'all')}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A] focus:border-transparent transition-all"
              >
                <option value="all">All Subjects</option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No materials found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see available study materials
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <button
                key={material.id}
                onClick={() => handleMaterialClick(material.pdfPath)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <Download size={20} className="text-gray-400 group-hover:text-[#1A233A] transition-colors" />
                </div>

                <h3 className="text-lg font-semibold text-[#1A233A] mb-2 line-clamp-2">
                  {material.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                    {material.board}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                    Class {material.class}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                    {material.subject}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
