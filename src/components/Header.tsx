import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'content', label: 'Content' },
    { id: 'corper-of-the-week', label: 'Corper of the Week' },
    { id: 'advertise', label: 'Advertise' },
    { id: 'community', label: 'Community' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-nysc-900/5'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <button
            onClick={() => {
              onNavigate('home');
              setIsMenuOpen(false);
            }}
            className="flex items-center"
            aria-label="Go to homepage"
          >
            <Logo size="md" variant="full" />
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-nysc-600 bg-nysc-50'
                    : 'text-gray-600 hover:text-nysc-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-white border-t border-gray-100 px-4 py-3 space-y-1" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              className={`flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-body font-medium transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-nysc-50 text-nysc-600 border-l-4 border-accent-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nysc-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
