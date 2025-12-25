import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

type LegalKey = "privacyPolicy" | "disclaimer";

export default function LegalAdmin() {
  const [active, setActive] = useState<LegalKey>("privacyPolicy");
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const snap = await getDoc(doc(db, "legalPages", active));
      if (snap.exists()) {
        setForm(snap.data() as typeof form);
      }
      setLoading(false);
    };
    fetchData();
  }, [active]);

  const save = async () => {
    try {
      setSaving(true);
      setMessage("Saving...");
      await updateDoc(doc(db, "legalPages", active), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      setMessage("✅ Saved successfully");
    } catch {
      setMessage("❌ Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="space-y-4 max-w-3xl">
      <h3 className="text-lg font-bold">Legal Pages</h3>

      <div className="flex gap-4">
        <button
          onClick={() => setActive("privacyPolicy")}
          className={active === "privacyPolicy" ? "font-bold" : ""}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActive("disclaimer")}
          className={active === "disclaimer" ? "font-bold" : ""}
        >
          Disclaimer
        </button>
      </div>

      <input
        className="input"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
      />

      <textarea
        className="input"
        rows={10}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder="Content"
      />

      <button onClick={save} className="btn-primary" disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </button>

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
