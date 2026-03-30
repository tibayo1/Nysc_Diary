import { Instagram, Mail, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ND</span>
              </div>
              <span className="ml-3 text-xl font-bold">
                NYSC <span className="text-green-500">Diary</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted NYSC plug for everything - News, Opportunities, Stories, and Community.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/nyscdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:help@nyscdiary.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('content')}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Content
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('corper-of-the-week')}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Corper of the Week
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('advertise')}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Advertise
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('community')}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Community
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>help@nyscdiary.com</li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-green-500 transition-colors"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NYSC Diary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
