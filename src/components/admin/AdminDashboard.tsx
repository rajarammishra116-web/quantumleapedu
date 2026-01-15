import { useEffect, useState } from "react";
// import { Settings } from "lucide-react"; // Removed
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../firebase";

import AdminLogin from "./AdminLogin";
import BrandAdmin from "./BrandAdmin";
import HomepageAdmin from "./HomepageAdmin";
// import SocialAdmin from "./SocialAdmin"; // Removed
import StudyMaterialAdmin from "./StudyMaterialAdmin";
import SimulationAdmin from "./SimulationAdmin";
import LegalAdmin from "./LegalAdmin";
import CoursesAdmin from "./CoursesAdmin";

const tabs = [
  "Brand",
  "Homepage",

  "Study Materials",
  "Simulations",
  "Courses",
  "Legal",
] as const;

export default function AdminDashboard() {
  // const [isOpen, setIsOpen] = useState(false); // Removed
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Brand");
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsub;
  }, []);

  /* ============================
     ADMIN DASHBOARD
     ============================ */
  return (
    <div className="fixed inset-0 bg-white z-[10000] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Admin Console</h2>

        <div className="flex items-center gap-4">
          <a href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Back to Home
          </a>

          {user && (
            <button
              onClick={() => signOut(auth)}
              className="text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="max-w-7xl mx-auto w-full">
          {user === undefined && (
            <div className="flex h-full items-center justify-center text-gray-500">Checking authentication...</div>
          )}

          {user === null && (
            <div className="flex h-full items-center justify-center min-h-[60vh]">
              <div className="w-full max-w-md">
                <AdminLogin onSuccess={() => { }} />
              </div>
            </div>
          )}

          {user && (
            <>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto pb-1 bg-white rounded-xl px-2 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-slate-700 hover:bg-gray-50"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
                {activeTab === "Brand" && <BrandAdmin />}
                {activeTab === "Homepage" && <HomepageAdmin />}
                {/* {activeTab === "Social" && <SocialAdmin />} */}
                {activeTab === "Study Materials" && <StudyMaterialAdmin />}
                {activeTab === "Simulations" && <SimulationAdmin />}
                {activeTab === "Legal" && <LegalAdmin />}
                {activeTab === "Courses" && <CoursesAdmin />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
