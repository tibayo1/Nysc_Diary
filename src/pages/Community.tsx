import { MessageCircle, Mail, Send, Users, FileText, Heart } from 'lucide-react';
import { Reveal } from '../hooks/useScrollReveal';

export default function Community() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white">
        <div className="deco-circle w-72 h-72 bg-accent-500/10 -top-20 right-10 animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-40 h-40 bg-white/5 bottom-0 -left-10 animate-float" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-4 h-4 text-accent-400" aria-hidden="true" />
            <span className="text-sm font-display font-medium text-white/90">Be Part of Something Special</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Join Our Community</h1>
          <p className="text-xl text-nysc-100 font-body max-w-2xl">
            Connect with thousands of corps members across Nigeria
          </p>
          <p className="text-lg mt-2 font-display font-medium italic text-accent-300">
            "Creating a community of opportunities"
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full"><path d="M0 20L720 40L1440 20V40H0V20Z" fill="#f9fafb"/></svg>
        </div>
      </section>

      {/* Join Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Group */}
          <Reveal>
            <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-gray-100 card-hover h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-nysc-500 to-nysc-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <MessageCircle className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Join Our WhatsApp Group</h2>
              <p className="text-gray-600 font-body mb-6 leading-relaxed">
                Connect with fellow corps members, get instant updates, share experiences, and access exclusive opportunities in our active community.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: Users, text: '5,000+ Active Members' },
                  { icon: Send, text: 'Daily Updates & Opportunities' },
                  { icon: MessageCircle, text: '24/7 Community Support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center text-sm font-body text-gray-600">
                    <item.icon className="w-5 h-5 mr-3 text-nysc-600" aria-hidden="true" />
                    {item.text}
                  </div>
                ))}
              </div>
              <a
                href="https://chat.whatsapp.com/nyscdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-nysc-600 text-white py-3.5 rounded-xl font-display font-semibold hover:bg-nysc-500 transition-all duration-200 shadow-md shadow-nysc-600/20"
              >
                Join WhatsApp Group
              </a>
            </div>
          </Reveal>

          {/* Newsletter */}
          <Reveal delay={0.15}>
            <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-gray-100 card-hover h-full">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-400 to-accent-500 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Mail className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Subscribe to Newsletter</h2>
              <p className="text-gray-600 font-body mb-6 leading-relaxed">
                Get weekly updates, opportunities, and exclusive content delivered straight to your inbox. Never miss important NYSC information.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const email = (form.elements.namedItem('newsletterEmail') as HTMLInputElement).value;
                  window.location.href = `mailto:help@nyscdiary.com?subject=Newsletter Subscription&body=Please subscribe me: ${email}`;
                }}
              >
                <label htmlFor="newsletterEmail" className="block text-sm font-display font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="newsletterEmail"
                  name="newsletterEmail"
                  placeholder="your@email.com"
                  required
                  spellCheck={false}
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-nysc-500 focus:border-transparent transition-colors mb-4"
                />
                <button
                  type="submit"
                  className="w-full bg-accent-500 text-white py-3.5 rounded-xl font-display font-semibold hover:bg-accent-400 transition-all duration-200 shadow-md shadow-accent-500/20"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Submit Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Reveal>
          <div className="bg-gradient-to-br from-nysc-50 via-white to-accent-50 rounded-3xl shadow-sm p-8 md:p-12 border border-nysc-100/50 relative overflow-hidden">
            <div className="deco-circle w-32 h-32 bg-accent-500/5 -top-8 -right-8" aria-hidden="true" />
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-nysc-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FileText className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Submit Your Story</h2>
              <p className="text-gray-600 font-body mb-8 text-lg">
                Have an inspiring NYSC story? Share your experience and inspire thousands of corps members across Nigeria.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem('storyName') as HTMLInputElement).value;
                  const email = (form.elements.namedItem('storyEmail') as HTMLInputElement).value;
                  const story = (form.elements.namedItem('storyContent') as HTMLTextAreaElement).value;
                  window.location.href = `mailto:help@nyscdiary.com?subject=Story Submission from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nStory:\n${story}`)}`;
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="storyName" className="block text-sm font-display font-semibold text-gray-800 mb-1.5 text-left">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="storyName"
                      name="storyName"
                      placeholder="Your name…"
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-nysc-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="storyEmail" className="block text-sm font-display font-semibold text-gray-800 mb-1.5 text-left">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="storyEmail"
                      name="storyEmail"
                      placeholder="your@email.com"
                      required
                      spellCheck={false}
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-nysc-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="storyContent" className="block text-sm font-display font-semibold text-gray-800 mb-1.5 text-left">
                    Your Story
                  </label>
                  <textarea
                    id="storyContent"
                    name="storyContent"
                    rows={5}
                    placeholder="Share your NYSC journey…"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-nysc-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-nysc-600 to-nysc-500 text-white px-8 py-3.5 rounded-xl font-display font-semibold hover:from-nysc-500 hover:to-nysc-400 transition-all duration-200 shadow-md shadow-nysc-600/20"
                >
                  Submit Your Story
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
