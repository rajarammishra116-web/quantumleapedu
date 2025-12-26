import { Mail } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Page } from "../App";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { data, loading } = useSiteSettings();
  const brand = data?.brand;

  if (loading) {
    return <div className="h-16 bg-white shadow-sm" />;
  }

  const gmailLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=quantumleap.org@zohomail.in";

  const navItems: { name: string; id: Page }[] = [
    { name: "Home", id: "home" },
    { name: "Study Materials", id: "materials" },
    { name: "Simulations", id: "simulations" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
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

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
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

          {/* Contact */}
          <a
            href={gmailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1A233A] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-medium"
          >
            <Mail size={16} />
            Contact Us
          </a>

        </div>
      </div>
    </header>
  );
}
