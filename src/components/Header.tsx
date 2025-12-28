import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Page } from "../App";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { data, loading } = useSiteSettings();
  const brand = data?.brand;
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return <div className="h-16 bg-white shadow-sm" />;
  }

  const navItems: { name: string; id: Page }[] = [
    { name: "Home", id: "home" },
    { name: "Study Materials", id: "materials" },
    { name: "Simulations", id: "simulations" },
    { name: "Courses", id: "courses" },
    { name: "About Us", id: "about" },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔹 FIXED FLEX LAYOUT */}
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            {brand?.logoUrl && (
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-8 w-auto"
              />
            )}
            <div className="leading-tight text-left">
              <div className="text-lg font-bold text-[#1A233A]">
                {brand?.name}
              </div>
              <div className="text-xs text-gray-500">
                {brand?.tagline}
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? "text-[#1A233A]"
                    : "text-gray-600 hover:text-[#1A233A]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button — GUARANTEED VISIBLE */}
          <button
            className="md:hidden text-[#1A233A] flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-left text-base font-medium ${
                  currentPage === item.id
                    ? "text-[#1A233A]"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
