import { Instagram, Send, Youtube, Mail } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Page } from "../App";
import { Facebook } from "lucide-react";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { data, loading } = useSiteSettings();
  const brand = data?.brand;

  if (loading) {
    return <div className="h-16 bg-white shadow-sm" />;
  }

  return (
    <footer className="bg-[#1A233A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {brand?.logoUrl && (
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-10 w-auto"
                />
              )}
              <div>
                <div className="text-lg font-bold">
                  {brand?.name}
                </div>
                <div className="text-sm text-gray-300">
                  {brand?.tagline}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate("privacy");
                }}
                className="block text-gray-300 hover:text-white text-sm"
              >
                Privacy Policy
              </button>

              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  onNavigate("disclaimer");
                }}
                className="block text-gray-300 hover:text-white text-sm"
              >
                Disclaimer
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>

           <div className="flex gap-4 mb-4">
  {data?.instagram && (
    <a
      href={data.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <Instagram size={20} />
    </a>
  )}

  {data?.facebook && (
    <a
      href={data.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <Facebook size={20} />
    </a>
  )}

  {data?.telegram && (
    <a
      href={data.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <Send size={20} />
    </a>
  )}

  {data?.youtube && (
    <a
      href={data.youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <Youtube size={20} />
    </a>
  )}
</div>


            <div className="space-y-2 text-sm text-gray-300">
              {data?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {data.email}
                </div>
              )}
              {data?.phone && <div>📞 {data.phone}</div>}
              {data?.address && <div>📍 {data.address}</div>}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          © 2025 {brand?.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
