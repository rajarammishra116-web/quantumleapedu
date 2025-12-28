import {
  Instagram,
  Send,
  Youtube,
  Mail,
  Facebook,
  MapPin,
  Phone,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const { data, loading } = useSiteSettings();
  const brand = data?.brand;

  if (loading) {
    return <div className="h-64 bg-slate-900" />;
  }

  const socialLinks = [
    { icon: <Instagram size={20} />, url: data?.instagram, label: "Instagram" },
    { icon: <Facebook size={20} />, url: data?.facebook, label: "Facebook" },
    { icon: <Send size={20} />, url: data?.telegram, label: "Telegram" },
    { icon: <Youtube size={20} />, url: data?.youtube, label: "YouTube" },
  ].filter((link) => link.url);

  return (
    <footer className="relative bg-slate-900 text-white pt-20 pb-10 overflow-hidden mt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/30 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-secondary/30 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">              {brand?.logoUrl && (
                <img
  src={brand.logoUrl}
  alt={brand.name}
  className="h-14 w-auto translate-y-[2px] brightness-0 invert group-hover:scale-105 transition-transform"
/>

              )}
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {brand?.name}
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed -mt-4">              {brand?.tagline ||
                "Empowering students with interactive learning and conceptual mastery."}
            </p>

            {/* Socials */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Quick Links
              <span className="w-12 h-0.5 bg-primary/50 rounded-full" />
            </h4>
            <ul className="space-y-3">
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
                    className="text-gray-400 hover:text-primary hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Legal
              <span className="w-12 h-0.5 bg-secondary/50 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Disclaimer", path: "/disclaimer" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-secondary hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Contact
              <span className="w-12 h-0.5 bg-green-500/50 rounded-full" />
            </h4>
            <ul className="space-y-4 text-gray-400">
              {data?.email && (
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm">{data.email}</span>
                </li>
              )}
              {data?.phone && (
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="text-sm">{data.phone}</span>
                </li>
              )}
              {data?.address && (
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="text-sm">{data.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            {brand?.legalName || brand?.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/disclaimer" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
