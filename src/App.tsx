import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import StudyMaterials from "./pages/StudyMaterials";
import Simulations from "./pages/Simulations";
import AdminDashboard from "./components/admin/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;

      case "materials":
        return <StudyMaterials />;

      case "simulations":
        return <Simulations />;

      case "privacy":
        return <PrivacyPolicy />;

      case "disclaimer":
        return <Disclaimer />;

      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
      <AdminDashboard />
    </div>
  );
}

export default App;
