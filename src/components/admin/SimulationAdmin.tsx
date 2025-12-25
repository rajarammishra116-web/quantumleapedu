import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import {
  BOARDS,
  CLASSES,
  SUBJECTS,
} from "@/constants/studyOptions";

export default function SimulationAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    board: "",
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
      !form.board ||
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
        board: "",
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

  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-lg font-bold">Simulations</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="input"
          value={form.board}
          onChange={(e) => setForm({ ...form, board: e.target.value })}
        >
          <option value="">Select Board</option>
          {BOARDS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <select
          className="input"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
        >
          <option value="">Select Class</option>
          {CLASSES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className="input"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          <option value="">Select Subject</option>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Topic Name"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        />

        <textarea
          className="input md:col-span-2"
          placeholder="Short description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          className="input md:col-span-2"
          placeholder="Simulation URL (PhET / external)"
          value={form.simulationUrl}
          onChange={(e) =>
            setForm({ ...form, simulationUrl: e.target.value })
          }
        />

        <button
          onClick={save}
          disabled={saving}
          className="btn-primary md:col-span-2"
        >
          {saving ? "Saving…" : "Add Simulation"}
        </button>

        {message && (
          <p className="text-sm text-gray-600 md:col-span-2">
            {message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {items.map((i) => (
          <div
            key={i.id}
            className="border rounded p-3 flex justify-between"
          >
            <div>
              <div className="font-medium">
                {i.topic} — {i.subject}
              </div>
              <div className="text-xs text-gray-500">
                {i.board} | Class {i.class}
              </div>
            </div>
            <button
              onClick={() => remove(i.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
