import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Loading from "./components/Loading";

import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages for "0 lag" performance
const StudyMaterials = lazy(() => import("./pages/StudyMaterials"));
const Simulations = lazy(() => import("./pages/Simulations"));
const Courses = lazy(() => import("./pages/Courses"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));

export type Page =
  | "home"
  | "materials"
  | "simulations"
  | "courses"
  | "about"
  | "privacy"
  | "disclaimer"
  | "terms";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage onNavigate={() => { }} />} />
            {/* Note: HomePage prop onNavigate is handled via Layout context or we need to update HomePage to use Link */}

            <Route path="/materials" element={<StudyMaterials />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Admin Route */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
