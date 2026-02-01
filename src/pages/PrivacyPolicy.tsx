import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function PrivacyPolicy() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDoc(doc(db, "legalPages", "privacyPolicy")).then((snap) => {
      if (snap.exists()) setData(snap.data());
    });
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-900">{data.title}</h1>
        <p className="whitespace-pre-line text-slate-700 leading-relaxed">
          {data.content}
        </p>
      </div>
    </div>
  );
}
