import { ReactNode, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Page } from "../App";
import { motion, AnimatePresence } from "framer-motion";

import AdminDashboard from "./admin/AdminDashboard";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();

    // Mapping URL path to the 'Page' type expected by Header/Footer
    // This is a temporary compatibility layer until Header/Footer are fully refactored
    const getCurrentPage = (): Page => {
        const path = location.pathname.replace("/", "") || "home";
        const validPages: Page[] = [
            "home",
            "materials",
            "simulations",
            "courses",
            "about",
            "privacy",
            "disclaimer",
        ];
        return validPages.includes(path as Page) ? (path as Page) : "home";
    };

    const handleNavigate = (page: Page) => {
        navigate(page === "home" ? "/" : `/${page}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-x-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none hidden md:block">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply opacity-70 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-300/20 blur-[120px] rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <Header currentPage={getCurrentPage()} onNavigate={handleNavigate} />

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

            <Footer onNavigate={handleNavigate} />

            {/* Admin Dashboard: Rendered as a modal, secret button visible only on Home */}
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
