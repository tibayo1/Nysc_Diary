import { Instagram, Mail } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="deco-circle w-64 h-64 bg-nysc-600/5 -top-32 -right-16" aria-hidden="true" />
      <div className="deco-circle w-40 h-40 bg-accent-500/5 bottom-10 -left-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Logo size="md" variant="full" className="mb-5" />
            <p className="text-gray-400 mb-2 text-sm leading-relaxed max-w-sm">
              Your trusted NYSC plug for everything — News, Opportunities, Stories, and Community.
            </p>
            <p className="text-accent-400 font-display font-semibold text-sm mb-6 italic">
              "Creating a community of opportunities"
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/nyscdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-nysc-600 hover:scale-110 transition-all duration-200"
                aria-label="Follow NYSC Diary on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:help@nyscdiary.com"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-nysc-600 hover:scale-110 transition-all duration-200"
                aria-label="Email NYSC Diary"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-base font-display font-bold mb-5 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { id: 'content', label: 'Content' },
                { id: 'corper-of-the-week', label: 'Corper of the Week' },
                { id: 'advertise', label: 'Advertise' },
                { id: 'community', label: 'Community' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-gray-400 hover:text-accent-400 transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-base font-display font-bold mb-5 text-white">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:help@nyscdiary.com" className="text-gray-400 hover:text-accent-400 transition-colors duration-200">
                  help@nyscdiary.com
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-400 hover:text-accent-400 transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
            </ul>

            {/* Mini newsletter */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <p className="text-xs font-display font-semibold text-white mb-2">Stay Updated</p>
              <p className="text-xs text-gray-400 mb-3">Weekly NYSC news & opportunities</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).footerEmail.value;
                  window.location.href = `mailto:help@nyscdiary.com?subject=Newsletter Subscription&body=Please subscribe me: ${email}`;
                }}
              >
                <input
                  type="email"
                  name="footerEmail"
                  placeholder="your@email.com"
                  required
                  spellCheck={false}
                  autoComplete="email"
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-white placeholder-gray-500 focus:ring-1 focus:ring-nysc-500 focus:border-nysc-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-nysc-600 hover:bg-nysc-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NYSC Diary. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs font-display">
            Creating a community of <span className="text-accent-400">opportunities</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
