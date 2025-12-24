import { Instagram, Send, Youtube, Mail } from 'lucide-react';
import { contentData } from '../data/contentData';

export default function Footer() {
  const { email, socials } = contentData.footer;

  return (
    <footer className="bg-[#1A233A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quantum Leap</h3>
            <p className="text-gray-300 text-sm">
              From ignorance to enlightenment
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#privacy" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#disclaimer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                Disclaimer
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
              <a
                href={socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors"
            >
              <Mail size={16} />
              {email}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© 2025 Quantum Leap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
