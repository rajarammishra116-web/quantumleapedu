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
  BOARDS,
  CLASSES,
  SUBJECTS,
} from "../../constants/studyOptions";

export default function StudyMaterialAdmin() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    board: "",
    class: "",
    subject: "",
    pdfUrl: "",
  });

  const fetchMaterials = async () => {
    const snap = await getDocs(collection(db, "studyMaterials"));
    setMaterials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      setMessage("❌ Please log in again");
      return;
    }

    if (!form.board || !form.class || !form.subject || !form.pdfUrl) {
      setMessage("❌ All fields required");
      return;
    }

    try {
      setSaving(true);
      setMessage("Saving...");

      await addDoc(collection(db, "studyMaterials"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Saved successfully");
      setForm({ board: "", class: "", subject: "", pdfUrl: "" });
      fetchMaterials();
    } catch (e) {
      console.error(e);
      setMessage("❌ Permission error");
    } finally {
      setSaving(false);
    }
  };

  const deleteMaterial = async (id: string) => {
    if (!confirm("Delete?")) return;
    await deleteDoc(doc(db, "studyMaterials", id));
    fetchMaterials();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Study Materials Admin</h2>

      <select
        className="input"
        value={form.board}
        onChange={(e) => setForm({ ...form, board: e.target.value })}
      >
        <option value="">Board</option>
        {BOARDS.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <select
        className="input"
        value={form.class}
        onChange={(e) => setForm({ ...form, class: e.target.value })}
      >
        <option value="">Class</option>
        {CLASSES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <select
        className="input"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      >
        <option value="">Subject</option>
        {SUBJECTS.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <input
        className="input"
        placeholder="Google Drive / PDF link"
        value={form.pdfUrl}
        onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="btn-primary"
        disabled={saving}
      >
        {saving ? "Saving..." : "Add Link"}
      </button>

      {message && <p>{message}</p>}

      <div className="space-y-2">
        {materials.map((m) => (
          <div key={m.id} className="border p-2 flex justify-between">
            <span>
              {m.board} | {m.class} | {m.subject}
            </span>
            <button
              className="text-red-500"
              onClick={() => deleteMaterial(m.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
