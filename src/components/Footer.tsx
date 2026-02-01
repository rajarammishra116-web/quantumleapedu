import { Instagram, Send, Youtube, Facebook, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";
import { Page } from "../App";
import { motion } from "framer-motion";

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ }: FooterProps) {
  const { data, loading } = useSiteSettings();
  const brand = data?.brand;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3">
                {brand?.logoUrl && (
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-28 w-auto brightness-0 invert opacity-100 group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                {!brand?.logoUrl && (
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                    {brand?.name || "Quantum Leap"}
                  </h3>
                )}
              </div>
            </Link>

            <div className="space-y-3 text-sm">
              {data?.address && (
                <div className="flex items-start gap-2 text-slate-400 hover:text-white transition-colors">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{data.address}</span>
                </div>
              )}
              {data?.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <Mail size={16} />
                  <span>{data.email}</span>
                </a>
              )}
              {data?.phone && (
                <a href={`tel:${data.phone}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <Phone size={16} />
                  <span>{data.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Study Materials", path: "/materials" },
                { name: "Simulations", path: "/simulations" },
                { name: "Courses", path: "/courses" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Disclaimer", path: "/disclaimer" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-slate-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 hover:bg-primary flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} {brand?.name || "Quantum Leap"}. All rights reserved.
            </p>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
}
