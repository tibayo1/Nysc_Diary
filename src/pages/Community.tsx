import { useState } from 'react';
import { MessageCircle, Send, Users, Mail } from 'lucide-react';

export default function Community() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    state: '',
    story: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = 'Story Submission from ' + formData.name;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
State: ${formData.state}

Story:
${formData.story}
    `;
    window.location.href = `mailto:help@nyscdiary.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community</h1>
            <p className="text-xl text-green-50">
              Connect with thousands of corps members across Nigeria
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our WhatsApp Group
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with fellow corps members, get instant updates, share experiences, and access exclusive opportunities in our active community.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <Users className="w-5 h-5 text-green-600 mr-3" />
                5,000+ Active Members
              </li>
              <li className="flex items-center text-gray-700">
                <Send className="w-5 h-5 text-green-600 mr-3" />
                Daily Updates & Opportunities
              </li>
              <li className="flex items-center text-gray-700">
                <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                24/7 Community Support
              </li>
            </ul>
            <a
              href="https://chat.whatsapp.com/nyscdiary"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Join WhatsApp Group
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Subscribe to Newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Get weekly updates, opportunities, and exclusive content delivered straight to your inbox. Never miss important NYSC information.
            </p>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              window.location.href = `mailto:help@nyscdiary.com?subject=Newsletter Subscription&body=Please subscribe me to the newsletter: ${email}`;
            }}>
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Submit Your Story
              </h2>
              <p className="text-xl text-gray-600">
                Share your NYSC experience and inspire other corps members
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State of Service
                </label>
                <input
                  type="text"
                  id="state"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="e.g., Lagos State"
                />
              </div>

              <div>
                <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story
                </label>
                <textarea
                  id="story"
                  rows={8}
                  required
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                  placeholder="Share your experience, achievements, challenges, or any inspiring moments from your service year..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                Submit Your Story
                <Send className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
