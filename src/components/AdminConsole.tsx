import { useState } from 'react';
import { X, Copy, Check, Settings } from 'lucide-react';
import { Board, Class, Subject, StudyMaterial } from '../types';
import { contentData } from '../data/contentData';

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

export default function AdminConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedJSON, setGeneratedJSON] = useState('');

  const [formData, setFormData] = useState({
    board: 'CBSE' as Board,
    class: '9' as Class,
    subject: 'Physics' as Subject,
    title: '',
    filename: ''
  });

  const availableSubjects =
    formData.class === '11' || formData.class === '12'
      ? CLASS_11_12_SUBJECTS
      : CLASS_9_10_SUBJECTS;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, filename: file.name });
    }
  };

  const generateConfig = () => {
    const newMaterial: StudyMaterial = {
      id: String(Date.now()),
      board: formData.board,
      class: formData.class,
      subject: formData.subject,
      title: formData.title,
      pdfPath: `/assets/pdfs/${formData.filename}`
    };

    const updatedData = {
      ...contentData,
      studyMaterials: [...contentData.studyMaterials, newMaterial]
    };

    const jsonOutput = JSON.stringify(updatedData, null, 2);
    setGeneratedJSON(jsonOutput);
    setShowPopup(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      board: 'CBSE',
      class: '9',
      subject: 'Physics',
      title: '',
      filename: ''
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all opacity-20 hover:opacity-100 z-50"
        aria-label="Open Admin Console"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1A233A]">Admin Console</h2>
              <p className="text-sm text-gray-600">Content Data Generator</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board
              </label>
              <select
                value={formData.board}
                onChange={(e) =>
                  setFormData({ ...formData, board: e.target.value as Board })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A]"
              >
                <option value="CBSE">CBSE</option>
                <option value="Odisha">Odisha Board</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                value={formData.class}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    class: e.target.value as Class,
                    subject: (e.target.value === '11' || e.target.value === '12')
                      ? 'Physics'
                      : formData.subject
                  })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A]"
              >
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
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value as Subject })
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A]"
              >
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Motion in a Straight Line - Chapter 1"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A233A]"
              />
              {formData.filename && (
                <p className="mt-2 text-sm text-gray-600">
                  Path: <code className="bg-gray-100 px-2 py-1 rounded">/assets/pdfs/{formData.filename}</code>
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={generateConfig}
                disabled={!formData.title || !formData.filename}
                className="flex-1 px-6 py-3 bg-[#1A233A] text-white rounded-xl font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Config
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1A233A]">Generated Configuration</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm text-gray-600 mb-4">
                Copy this JSON and paste it into <code className="bg-gray-100 px-2 py-1 rounded">src/data/contentData.ts</code>
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                {generatedJSON}
              </pre>
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Close
              </button>
              <button
                onClick={copyToClipboard}
                className="px-6 py-2 bg-[#1A233A] text-white rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
