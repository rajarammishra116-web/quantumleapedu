import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import StudyMaterials from "./pages/StudyMaterials";
import Simulations from "./pages/Simulations";
import Courses from "./pages/Courses";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./components/admin/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";

export type Page =
  | "home"
  | "materials"
  | "simulations"
  | "courses"
  | "about"
  | "privacy"
  | "disclaimer";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: Page) => {
    window.history.pushState(
      { page },
      "",
      page === "home" ? "/" : `/${page}`
    );
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // 🔹 On first load → sync URL to state
    const path = window.location.pathname.replace("/", "") as Page;

    const validPages: Page[] = [
      "home",
      "materials",
      "simulations",
      "courses",
      "about",
      "privacy",
      "disclaimer",
    ];

    if (validPages.includes(path)) {
      setCurrentPage(path);
    }

    // 🔹 Back / forward navigation
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as { page?: Page } | null;
      setCurrentPage(state?.page ?? "home");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "materials":
        return <StudyMaterials />;
      case "simulations":
        return <Simulations />;
      case "courses":
        return <Courses />;
      case "about":
        return <AboutUs />;
      case "privacy":
        return <PrivacyPolicy />;
      case "disclaimer":
        return <Disclaimer />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={navigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
      <AdminDashboard />
    </div>
  );
}

export default App;
