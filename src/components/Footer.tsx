import { Instagram, Send, Youtube, Mail, Facebook, MapPin, Phone, ArrowRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Page } from "../App";

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ }: FooterProps) {
  const { data, loading } = useSiteSettings();
  const brand = data?.brand;

  if (loading) {
    return <div className="h-64 bg-slate-900" />;
  }

  const socialLinks = [
    { icon: <Instagram size={18} />, url: data?.instagram, label: "Instagram", color: "hover:bg-pink-500 hover:border-pink-500" },
    { icon: <Facebook size={18} />, url: data?.facebook, label: "Facebook", color: "hover:bg-blue-600 hover:border-blue-600" },
    { icon: <Send size={18} />, url: data?.telegram, label: "Telegram", color: "hover:bg-sky-500 hover:border-sky-500" },
    { icon: <Youtube size={18} />, url: data?.youtube, label: "YouTube", color: "hover:bg-red-600 hover:border-red-600" },
  ].filter(link => link.url);

  return (
    <footer className="relative bg-slate-950 text-white pt-24 pb-12 overflow-hidden mt-24">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen will-change-transform"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen will-change-transform"
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[30%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen will-change-transform"
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-16 mb-20">

          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3">
                {brand?.logoUrl && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="relative h-20 w-auto brightness-0 invert group-hover:scale-105 transition-transform duration-500 translate-y-1"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    {brand?.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-cyan-400 uppercase font-bold mt-1">
                    From Ignorance to Enlightenment
                  </p>
                </div>
              </div>
            </Link>

            {/* Socials - Funky Pills */}
            <div className="flex flex-wrap gap-3 -mt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className={`w-11 h-11 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-lg group ${social.color}`}
                  aria-label={social.label}
                >
                  <span className="group-hover:text-white transition-colors">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Study Materials", path: "/materials" },
                { name: "Simulations", path: "/simulations" },
                { name: "Courses", path: "/courses" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 relative inline-block">
              Legal
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full" />
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/disclaimer" },
                { name: "Disclaimer", path: "/disclaimer" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-secondary" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-green-500 rounded-full" />
            </h4>

            <div className="space-y-5">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Email Us</p>
                    <p className="text-sm font-medium text-white break-all">{data.email}</p>
                  </div>
                </a>
              )}

              {data?.phone && (
                <a href={`tel:${data.phone}`} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Call Us</p>
                    <p className="text-sm font-medium text-white">{data.phone}</p>
                  </div>
                </a>
              )}

              {data?.address && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Visit Us</p>
                    <p className="text-sm font-medium text-white">{data.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} {brand?.legalName || brand?.name}. <span className="hidden sm:inline">All rights reserved.</span>
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy</Link>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <Link to="/disclaimer" className="text-slate-500 hover:text-white transition-colors">Terms</Link>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <Link to="/disclaimer" className="text-slate-500 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
