import { ReactNode, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Page } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { ToastProvider } from "./Toast";
import { ScrollProgress } from "./ScrollProgress";
import { FloatingActionButton } from "./FloatingActionButton";
import { useIsMobile } from "@/hooks/useMediaQuery";

// import AdminDashboard from "./admin/AdminDashboard"; // Removed

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

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

    if (location.pathname.startsWith("/admin")) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </div>
        );
    }

    return (
        <ToastProvider>
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 relative overflow-x-hidden transition-colors duration-300">
                {/* Scroll Progress Indicator */}
                <ScrollProgress />

                {/* Background Gradients - Hidden on mobile for performance, dark mode aware */}
                {!isMobile && (
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 dark:bg-primary/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob"></div>
                        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-secondary/20 dark:bg-secondary/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-classroom-purple/20 dark:bg-classroom-purple/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-4000"></div>
                    </div>
                )}

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

                {/* Floating Action Button */}
                <FloatingActionButton />
            </div>
        </ToastProvider>
    );
}
