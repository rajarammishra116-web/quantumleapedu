import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

type LegalKey = "privacyPolicy" | "termsOfService" | "disclaimer";

const DEFAULT_TERMS = `
# Terms and Conditions

## 1. Introduction
Throughout this document, the terms "We" / "Us" / "Our" / "Company" / "Website" individually and collectively refer to **Quantum Leap** and the terms "You" / "Your" / "Yourself" refer to the "User" / "Customer" / "Subscriber" of our website.

By accessing, browsing, or using this website, you agree to be bound by these Terms and Conditions. Please read them carefully.

## 2. Services
We provide ("Services") educational resources including:
- Interactive Simulations (External/Third-Party)
- Study Materials
- Courses for competitive exams and academic learning

Content of the website (all text, documents, videos, code) is the property of Quantum Leap, excluding external simulations which belong to their respective owners.

## 3. User Account
- You may be asked to submit personal information (Name, Email, etc.) for registration.
- You are responsible for maintaining the confidentiality of your account information.
- We reserve the right to suspend/terminate accounts if provided information is false or if the account is misused.
- Accounts are non-transferable.

## 4. Usage Rights
- **Personal Use Only**: Authorized users can access content for personal educational use.
- **No Resale**: You shall not resell, distribute, or use our content for commercial purposes.
- **No Downloading**: Unless explicitly allowed, users shall not download proprietary code or protected assets.

## 5. Intellectual Property Rights ("IPR")
All original content, design, text, graphics, and code belong to **Quantum Leap** and are protected by copyright and IPR laws. 
**Note on Simulations**: Simulations provided on this platform are aggregated from third-party sources for educational purposes. We do not claim ownership of these external simulations. All rights belong to their original creators.

## 6. Liability & Disclaimer
- We make no representations about the absolute accuracy or completeness of the data. 
- We provide content "as is" and assume no liability for any damages resulting from the use of our services.
- We reserve the right to modify or discontinue services at any time.

## 7. Changes to Terms
We reserve the right to change these Terms of Use at any time without prior notice. Continued use of the website implies acceptance of the updated terms.

## 8. Contact Us
For issues or grievances, please contact us at our support email provided on the website.
`;

export default function LegalAdmin() {
  const [active, setActive] = useState<LegalKey>("privacyPolicy");
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "legalPages", active));
        if (snap.exists()) {
          setForm(snap.data() as typeof form);
        } else {
          // Reset form if document doesn't exist yet, use default for Terms
          if (active === "termsOfService") {
            setForm({ title: "Terms and Conditions", content: DEFAULT_TERMS.trim() });
          } else {
            setForm({ title: "", content: "" });
          }
        }
      } catch (error) {
        console.error("Error fetching legal page:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [active]);

  const save = async () => {
    try {
      setSaving(true);
      setMessage("Saving...");
      // Use setDoc with merge: true to create if not exists
      await setDoc(doc(db, "legalPages", active), {
        ...form,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setMessage("✅ Saved successfully");
    } catch (error) {
      console.error("Error saving legal page:", error);
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
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${active === "privacyPolicy" ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActive("termsOfService")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${active === "termsOfService" ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
        >
          Terms & Conditions
        </button>
        <button
          onClick={() => setActive("disclaimer")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${active === "disclaimer" ? "bg-primary text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
        >
          Disclaimer
        </button>
      </div>

      <input
        className="input-field"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Page Title"
      />

      <textarea
        className="input-field min-h-[400px] font-mono text-sm"
        rows={15}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder="Markdown Content"
      />

      <div className="flex items-center gap-4">
        <button onClick={save} className="btn-primary" disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {message && <p className="text-sm font-medium animate-fade-in">{message}</p>}
      </div>
    </div>
  );
}
