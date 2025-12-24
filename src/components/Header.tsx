import { Mail } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Study Materials', id: 'materials' },
    { name: 'Simulations', id: 'simulations' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-[#1A233A] hover:opacity-80 transition-opacity"
            >
              Quantum Leap
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-[#1A233A]'
                    : 'text-gray-600 hover:text-[#1A233A]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <a
            href="mailto:quantumleap.org@zohomail.in"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1A233A] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-medium"
          >
            <Mail size={16} />
            Contact Us
          </a>

          <button
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu?.classList.toggle('hidden');
            }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div id="mobile-menu" className="hidden md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className={`text-left px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === item.id
                    ? 'bg-gray-100 text-[#1A233A]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </button>
            ))}
            <a
              href="mailto:quantumleap.org@zohomail.in"
              className="flex items-center gap-2 px-4 py-2 bg-[#1A233A] text-white rounded-lg hover:bg-opacity-90 text-sm font-medium"
            >
              <Mail size={16} />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
