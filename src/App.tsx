import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";

// Lazy-loaded pages
const StudyMaterials = lazy(() => import("./pages/StudyMaterials"));
const Simulations = lazy(() => import("./pages/Simulations"));
const Courses = lazy(() => import("./pages/Courses"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/materials" element={<StudyMaterials />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
