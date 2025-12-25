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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="whitespace-pre-line text-gray-700">
        {data.content}
      </p>
    </div>
  );
}
