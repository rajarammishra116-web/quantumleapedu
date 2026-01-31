import { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {
  FileText,
  Settings,
  BookOpen,
  GraduationCap,
  Home,
  Info
} from "lucide-react";

import AdminLogin from "./AdminLogin";
import BrandAdmin from "./BrandAdmin";
import ContentAdmin from "./ContentAdmin";
import AboutAdmin from "./AboutAdmin";
import StudyMaterialAdmin from "./StudyMaterialAdmin";
import SimulationAdmin from "./SimulationAdmin";
import LegalAdmin from "./LegalAdmin";
import CoursesAdmin from "./CoursesAdmin";

// Categorized tabs structure
const tabCategories = [
  {
    name: "Content Management",
    icon: FileText,
    tabs: [
      { id: "homepage", label: "Homepage", icon: Home },
      { id: "about", label: "About Page", icon: Info },
    ],
  },
  {
    name: "Site Settings",
    icon: Settings,
    tabs: [
      { id: "brand", label: "Brand & Contact", icon: Settings },
      { id: "legal", label: "Legal Pages", icon: FileText },
    ],
  },
  {
    name: "Learning Resources",
    icon: GraduationCap,
    tabs: [
      { id: "materials", label: "Study Materials", icon: BookOpen },
      { id: "simulations", label: "Simulations", icon: GraduationCap },
      { id: "courses", label: "Courses", icon: GraduationCap },
    ],
  },
];

type TabId = "homepage" | "about" | "brand" | "legal" | "materials" | "simulations" | "courses";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("homepage");
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsub;
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-50 z-[10000] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Console</h2>
          <p className="text-sm text-slate-500">Manage your website content and settings</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
          >
            ← Back to Home
          </a>

          {user && (
            <button
              onClick={() => signOut(auth)}
              className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {user === undefined && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Checking authentication...
          </div>
        )}

        {user === null && (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              <AdminLogin onSuccess={() => { }} />
            </div>
          </div>
        )}

        {user && (
          <>
            {/* Sidebar with categorized tabs */}
            <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
              <div className="p-4 space-y-6">
                {tabCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <category.icon size={14} />
                      {category.name}
                    </div>
                    <div className="mt-2 space-y-1">
                      {category.tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabId)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? "bg-primary text-white shadow-md"
                                : "text-slate-700 hover:bg-slate-100"
                              }`}
                          >
                            <Icon size={18} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
                  {activeTab === "homepage" && <ContentAdmin />}
                  {activeTab === "about" && <AboutAdmin />}
                  {activeTab === "brand" && <BrandAdmin />}
                  {activeTab === "legal" && <LegalAdmin />}
                  {activeTab === "materials" && <StudyMaterialAdmin />}
                  {activeTab === "simulations" && <SimulationAdmin />}
                  {activeTab === "courses" && <CoursesAdmin />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
