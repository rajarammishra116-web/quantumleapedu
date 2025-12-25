import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase";

export type BrandSettings = {
  name?: string;
  tagline?: string;
  legalName?: string;
  logoUrl?: string;
};

export type SiteSettings = {
  brand?: BrandSettings;
  email?: string;
  phone?: string;
  address?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
};

export function useSiteSettings() {
  const [data, setData] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "siteSettings", "main");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.data() as SiteSettings);
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, loading };
}
