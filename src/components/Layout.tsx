import { ReactNode, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";
import AdminDashboard from "./admin/AdminDashboard";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-300/20 blur-[120px] rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-grow pt-24 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Dashboard (Home only) */}
      {location.pathname === "/" && (
        <div className="relative z-[9999]">
          <Suspense fallback={null}>
            <AdminDashboard />
          </Suspense>
        </div>
      )}
    </div>
  );
}
