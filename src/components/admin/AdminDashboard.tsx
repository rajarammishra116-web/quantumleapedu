import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../firebase";

import AdminLogin from "./AdminLogin";
import BrandAdmin from "./BrandAdmin";
import HomepageAdmin from "./HomepageAdmin";
import SocialAdmin from "./SocialAdmin";
import StudyMaterialAdmin from "./StudyMaterialAdmin";
import SimulationAdmin from "./SimulationAdmin";
import LegalAdmin from "./LegalAdmin";

const tabs = [
  "Brand",
  "Homepage",
  "Social",
  "Study Materials",
  "Simulations",
  "Legal",
] as const;

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<typeof tabs[number]>("Brand");

  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsub;
  }, []);

  /* ============================
     SECRET ADMIN TRIGGER BUTTON
     ============================ */
  if (!isOpen) {
    return (
      <div
        className="
          fixed bottom-4 right-4 z-50
          w-10 h-10
          opacity-0 hover:opacity-100
          transition-opacity duration-300
          cursor-pointer
        "
        onClick={() => setIsOpen(true)}
        aria-label="Open Admin Dashboard"
      >
        <div className="w-full h-full rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg">
          <Settings size={18} />
        </div>
      </div>
    );
  }

  /* ============================
     ADMIN DASHBOARD MODAL
     ============================ */
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>

          <div className="flex items-center gap-4">
            {user && (
              <button
                onClick={() => signOut(auth)}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black"
              aria-label="Close admin dashboard"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {user === undefined && (
            <p className="text-gray-500">Checking authentication…</p>
          )}

          {user === null && <AdminLogin />}

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
              {activeTab === "Legal" && <LegalAdmin />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
