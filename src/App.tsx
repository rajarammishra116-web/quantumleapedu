import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages for "0 lag" performance
const HomePage = lazy(() => import("./components/HomePage"));
const StudyMaterials = lazy(() => import("./pages/StudyMaterials"));
const Simulations = lazy(() => import("./pages/Simulations"));
const Courses = lazy(() => import("./pages/Courses"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));

export type Page =
  | "home"
  | "materials"
  | "simulations"
  | "courses"
  | "about"
  | "privacy"
  | "disclaimer";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <HomePage />
                  </Layout>
                }
              />
              <Route
                path="/materials"
                element={
                  <Layout>
                    <StudyMaterials />
                  </Layout>
                }
              />
              <Route
                path="/simulations"
                element={
                  <Layout>
                    <Simulations />
                  </Layout>
                }
              />
              <Route
                path="/courses"
                element={
                  <Layout>
                    <Courses />
                  </Layout>
                }
              />
              <Route
                path="/about"
                element={
                  <Layout>
                    <AboutUs />
                  </Layout>
                }
              />
              <Route
                path="/privacy"
                element={
                  <Layout>
                    <PrivacyPolicy />
                  </Layout>
                }
              />
              <Route
                path="/terms"
                element={
                  <Layout>
                    <TermsOfService />
                  </Layout>
                }
              />
              <Route
                path="/disclaimer"
                element={
                  <Layout>
                    <Disclaimer />
                  </Layout>
                }
              />

              {/* Admin Route */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
