import { Instagram, Mail, Facebook, Twitter } from 'lucide-react';
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
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:scale-110 transition-all duration-200"
                aria-label="Follow NYSC Diary on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/nyscdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-sky-500 hover:scale-110 transition-all duration-200"
                aria-label="Follow NYSC Diary on Twitter"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com/nyscdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-200"
                aria-label="Follow NYSC Diary on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://tiktok.com/@nyscdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all duration-200"
                aria-label="Follow NYSC Diary on TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z"/>
                </svg>
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

            {/* WhatsApp CTA */}
            <a
              href="https://chat.whatsapp.com/nyscdiary"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-display font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-green-600/20 w-fit"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join WhatsApp Community
            </a>

            {/* Mini newsletter */}
            <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <p className="text-xs font-display font-semibold text-white mb-2">Stay Updated</p>
              <p className="text-xs text-gray-400 mb-3">Weekly NYSC news & opportunities</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).footerEmail.value;
                  window.open(`https://docs.google.com/forms/d/e/your-form-id/viewform?entry.email=${encodeURIComponent(email)}`, '_blank');
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
