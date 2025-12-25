import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const normalizeUrl = (value: string, base: string) => {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `${base}${value}`;
};

export default function BrandAdmin() {
  const { data, loading } = useSiteSettings();

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    legalName: "",
    logoUrl: "",
    email: "",
    phone: "",
    address: "",
    instagram: "",
    telegram: "",
    youtube: "",
  });

  useEffect(() => {
    if (!data) return;

    setForm({
      name: data.brand?.name ?? "",
      tagline: data.brand?.tagline ?? "",
      legalName: data.brand?.legalName ?? "",
      logoUrl: data.brand?.logoUrl ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      address: data.address ?? "",
      instagram: data.instagram ?? "",
      telegram: data.telegram ?? "",
      youtube: data.youtube ?? "",
    });
  }, [data]);

  if (loading) return <p>Loading brand settings…</p>;

  const save = async () => {
    try {
      setSaving(true);
      setMessage("Saving…");

      await updateDoc(doc(db, "siteSettings", "main"), {
        brand: {
          name: form.name,
          tagline: form.tagline,
          legalName: form.legalName,
          logoUrl: form.logoUrl,
        },
        email: form.email,
        phone: form.phone,
        address: form.address,

        // ✅ normalized social links
        instagram: normalizeUrl(form.instagram, "https://instagram.com/"),
        telegram: normalizeUrl(form.telegram, "https://t.me/"),
        youtube: normalizeUrl(form.youtube, "https://youtube.com/"),
      });

      setMessage("✅ Brand settings saved");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const input = (label: string, key: keyof typeof form) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        value={form[key]}
        onChange={(e) =>
          setForm({ ...form, [key]: e.target.value })
        }
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-lg font-bold">Brand</h3>

      {input("Brand Name", "name")}
      {input("Tagline", "tagline")}
      {input("Legal Name", "legalName")}
      {input("Logo URL", "logoUrl")}

      {form.logoUrl && (
        <img
          src={form.logoUrl}
          alt="Logo preview"
          className="h-16 w-auto border rounded p-2"
        />
      )}

      <h3 className="text-lg font-bold pt-4">Contact</h3>

      {input("Email", "email")}
      {input("Phone", "phone")}
      {input("Address", "address")}

      <h3 className="text-lg font-bold pt-4">Social</h3>

      {input("Instagram (username or URL)", "instagram")}
      {input("Telegram (username or URL)", "telegram")}
      {input("YouTube (channel or URL)", "youtube")}

      <button
        onClick={save}
        disabled={saving}
        className="bg-[#1A233A] text-white px-6 py-2 rounded hover:bg-opacity-90 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>

      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
