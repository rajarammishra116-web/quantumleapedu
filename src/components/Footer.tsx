
import { Instagram, Send, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";
import { Page } from "../App";

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ }: FooterProps) {
  const { data, loading } = useSiteSettings();
  const brand = data?.brand;

  if (loading) {
    return <div className="h-64 bg-slate-950" />;
  }

  const socialLinks = [
    { icon: <Instagram size={18} />, url: data?.instagram, label: "Instagram" },
    { icon: <Facebook size={18} />, url: data?.facebook, label: "Facebook" },
    { icon: <Send size={18} />, url: data?.telegram, label: "Telegram" },
    { icon: <Youtube size={18} />, url: data?.youtube, label: "YouTube" },
  ].filter(link => link.url);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 mt-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-3">
                {brand?.logoUrl && (
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-24 w-auto brightness-0 invert opacity-100"
                  />
                )}
                {!brand?.logoUrl && (
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {brand?.name || "Quantum Leap"}
                  </h3>
                )}
              </div>
            </Link>

            <div className="space-y-3 text-sm">
              <p className="font-semibold text-white">Address:</p>
              <p className="leading-relaxed text-slate-400">
                {data?.address || "Quantum Leap Education"}
              </p>
            </div>

            <div className="space-y-2 text-sm text-slate-400">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={14} /> {data.email}
                </a>
              )}
              {data?.phone && (
                <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} /> {data.phone}
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              {/* Add more company links if needed */}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/materials" className="hover:text-white transition-colors">Study Materials</Link>
              </li>
              <li>
                <Link to="/simulations" className="hover:text-white transition-colors">Simulations</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help & Support (Legal) */}
          <div>
            <h4 className="text-white font-semibold mb-6">Help & Support</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            {brand?.name || "Quantum Leap"} All Right Reserved, {new Date().getFullYear()}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-950 transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
