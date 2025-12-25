import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";

import AdminLogin from "./AdminLogin";
import BrandAdmin from "./BrandAdmin";
import HomepageAdmin from "./HomepageAdmin";
import SocialAdmin from "./SocialAdmin";
import StudyMaterialAdmin from "./StudyMaterialAdmin";
import SimulationAdmin from "./SimulationAdmin";
import LegalAdmin from "./LegalAdmin"; // ✅ ADD THIS

// ✅ ALL ADMIN TABS
const tabs = [
  "Brand",
  "Homepage",
  "Social",
  "Study Materials",
  "Simulations",
  "Legal", // ✅ ADD THIS
] as const;

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<typeof tabs[number]>("Brand");

  // 🔐 Single source of truth for auth
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // User | null
    });
    return unsub;
  }, []);

  // Floating settings button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-gray-800 text-white rounded-full shadow-lg opacity-30 hover:opacity-100 z-50"
        aria-label="Open Admin Dashboard"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Auth loading */}
          {user === undefined && (
            <p className="text-gray-500">Checking authentication…</p>
          )}

          {/* Not logged in */}
          {user === null && <AdminLogin />}

          {/* Logged in */}
          {user && (
            <>
              {/* Tabs */}
              <div className="flex border-b mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab
                        ? "border-b-2 border-black text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "Brand" && <BrandAdmin />}
              {activeTab === "Homepage" && <HomepageAdmin />}
              {activeTab === "Social" && <SocialAdmin />}
              {activeTab === "Study Materials" && <StudyMaterialAdmin />}
              {activeTab === "Simulations" && <SimulationAdmin />}
              {activeTab === "Legal" && <LegalAdmin />} {/* ✅ */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
