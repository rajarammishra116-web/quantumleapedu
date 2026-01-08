import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Page } from "../App";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  currentPage?: Page;
  onNavigate?: (page: Page) => void;
}

export default function Header({ }: HeaderProps) {
  const { data } = useSiteSettings();
  const brand = data?.brand;
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine brand details with defaults so we render immediately
  const brandName = brand?.name || "Quantum Leap";
  const brandTagline = brand?.tagline || "";
  const brandLogo = brand?.logoUrl || "/logo.png";

  const navItems: { name: string; id: Page; path: string }[] = [
    { name: "Home", id: "home", path: "/" },
    { name: "Study Materials", id: "materials", path: "/materials" },
    { name: "Simulations", id: "simulations", path: "/simulations" },
    { name: "Courses", id: "courses", path: "/courses" },
    { name: "About Us", id: "about", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
        ? "bg-white/85 backdrop-blur-xl shadow-sm border-slate-200/50 py-3"
        : "bg-transparent border-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={brandLogo}
                alt={brandName}
                className="relative h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110 translate-y-2"
              />
            </div>

            <div className="flex flex-col justify-center">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors duration-300"
              >
                {brandName}
              </motion.span>
              {brandTagline && (
                <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase overflow-hidden">
                  {brandTagline}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/20 shadow-sm">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                    ? "text-primary bg-white shadow-sm ring-1 ring-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-lg font-medium transition-all ${isActive
                      ? "bg-primary/5 text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
