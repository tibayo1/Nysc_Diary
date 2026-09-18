import { MapPin, Briefcase, Calendar, Star, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Corper } from '../types';
import { Reveal } from '../hooks/useScrollReveal';

const corpers: Corper[] = [
  {
    id: '1',
    name: 'Afolagboye Solomon Irenitemi',
    state: 'Kwara State',
    ppa: 'Omu-Aran High School',
    story: `Afolagboye Solomon Irenitemi's NYSC journey did not begin smoothly. After graduating in August 2024, he waited for months without seeing his call-up number. When his call-up letter finally came in July, he was posted to Kwara State.

Even before camp, Solomon faced one of his first major challenges: a four-day registration struggle. But despite the rough beginning, he remained determined to complete his service year with purpose.

Although he studied Quantity Surveying, Solomon was posted to Omu-Aran High School, where he served as an assistant Physics and trade subject teacher. For someone trained in a different field, teaching subjects such as animal husbandry was unexpected, but it became one of the surprisingly fulfilling parts of his service year.

Like many corps members, Solomon had to deal with the realities of service: finding accommodation, commuting daily, and raising funds for his personal CDS project. However, his most memorable moments came from his CDS meetings and the support of his colleagues.

As CDS President, Solomon found leadership easier because of the people around him. His colleagues rallied behind his project, which included the construction of two incinerators, provision of chairs, lockers, hand-wash stands, and a whiteboard.

For Solomon, the service year became more than just fulfilling a national requirement. It became a journey of courage, leadership, impact, and gratitude.

"I've learnt that fear avoided becomes our limit. I'm grateful my story inspired colleagues, students, and management. By God's grace and the wonderful people around me, the journey ended smoothly."

Solomon's story reminds us that even when the journey starts roughly, it can still end with impact, growth, and purpose.`,
    image: '/solomon-irenitemi.jpg',
    date: '2026-07-17'
  },
];

// ─── EmailJS config ──────────────────────────────────────────────────────────
// Sign up free at https://www.emailjs.com → create a Service + Template,
// then add these three IDs to your .env.local:
//   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

export default function CorperOfTheWeek() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      formRef.current?.reset();
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white">
        <div className="deco-circle w-72 h-72 bg-accent-500/10 -top-20 right-10 animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-48 h-48 bg-white/5 bottom-0 left-20 animate-float" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/30 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-4 h-4 text-accent-400" aria-hidden="true" />
            <span className="text-sm font-display font-medium text-accent-200">Weekly Feature</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Corper of the Week</h1>
          <p className="text-xl text-nysc-100 font-body max-w-2xl">
            Celebrating corps members making extraordinary impact across Nigeria
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full"><path d="M0 20L720 40L1440 20V40H0V20Z" fill="#f9fafb"/></svg>
        </div>
      </section>

      {/* Featured Corper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <div className="relative bg-gradient-to-br from-nysc-50 via-white to-accent-50 rounded-3xl shadow-lg p-8 md:p-10 md:flex items-center gap-10 border border-nysc-100/50 overflow-hidden">
            <div className="deco-circle w-40 h-40 bg-accent-500/5 -top-10 -right-10" aria-hidden="true" />
            <img
              src={corpers[0].image}
              alt={corpers[0].name}
              className="w-full md:w-80 h-80 object-cover rounded-2xl shadow-md"
              width={320}
              height={320}
              loading="lazy"
            />
            <div className="mt-6 md:mt-0 flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-400 text-white px-4 py-1.5 rounded-full text-sm font-display font-semibold mb-5 shadow-sm">
                <Star className="w-4 h-4" aria-hidden="true" />
                Featured This Week
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                {corpers[0].name}
              </h2>
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center text-gray-600 font-body text-sm">
                  <MapPin className="w-5 h-5 mr-2 text-nysc-600" aria-hidden="true" />
                  {corpers[0].state}
                </div>
                <div className="flex items-center text-gray-600 font-body text-sm">
                  <Briefcase className="w-5 h-5 mr-2 text-nysc-600" aria-hidden="true" />
                  {corpers[0].ppa}
                </div>
                <div className="flex items-center text-gray-600 font-body text-sm">
                  <Calendar className="w-5 h-5 mr-2 text-nysc-600" aria-hidden="true" />
                  {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(corpers[0].date))}
                </div>
              </div>
              <p className="text-gray-700 font-body text-lg leading-relaxed">{corpers[0].story}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Nomination Form */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white py-20">
        <div className="deco-circle w-48 h-48 bg-accent-500/10 top-0 right-20 animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-32 h-32 bg-white/5 bottom-10 left-10 animate-float" aria-hidden="true" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Know an Amazing Corper?</h2>
              <p className="text-xl text-nysc-100 font-body">
                Fill the form below — your nomination goes straight to our inbox!
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 text-center">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold mb-2">Nomination Sent! 🎉</h3>
                <p className="text-nysc-100 font-body mb-6">
                  Thanks! We'll review it and get back to you via email shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-accent-500 hover:bg-accent-400 text-white px-6 py-3 rounded-xl font-display font-semibold transition-all duration-200"
                >
                  Submit Another Nomination
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-5"
                noValidate
              >
                {/* Hidden field — EmailJS template variable for recipient */}
                <input type="hidden" name="to_email" value="help@nyscdiary.com" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nominee_name" className="block text-sm font-display font-semibold mb-1.5 text-white/90">
                      Nominee's Full Name <span className="text-accent-300">*</span>
                    </label>
                    <input
                      id="nominee_name"
                      name="nominee_name"
                      type="text"
                      required
                      placeholder="e.g. Amaka Okonkwo"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="nominee_state" className="block text-sm font-display font-semibold mb-1.5 text-white/90">
                      State of Deployment <span className="text-accent-300">*</span>
                    </label>
                    <input
                      id="nominee_state"
                      name="nominee_state"
                      type="text"
                      required
                      placeholder="e.g. Lagos State"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="nominee_ppa" className="block text-sm font-display font-semibold mb-1.5 text-white/90">
                    Place of Primary Assignment (PPA) <span className="text-accent-300">*</span>
                  </label>
                  <input
                    id="nominee_ppa"
                    name="nominee_ppa"
                    type="text"
                    required
                    placeholder="e.g. Ministry of Education, Ikeja"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="nominee_story" className="block text-sm font-display font-semibold mb-1.5 text-white/90">
                    Why do they deserve this? <span className="text-accent-300">*</span>
                  </label>
                  <textarea
                    id="nominee_story"
                    name="nominee_story"
                    required
                    rows={5}
                    placeholder="Tell us about their impact, projects, challenges overcome, or why they stand out…"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nominator_name" className="block text-sm font-display font-semibold mb-1.5 text-white/90">
                      Your Name <span className="text-accent-300">*</span>
                    </label>
                    <input
                      id="nominator_name"
                      name="nominator_name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="nominator_email" className="block text-sm font-display font-semibold mb-1.5 text-white/90">
                      Your Email <span className="text-accent-300">*</span>
                    </label>
                    <input
                      id="nominator_email"
                      name="nominator_email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition text-sm"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-sm text-red-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errorMsg || 'Failed to send. Please try again or email us directly at help@nyscdiary.com'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-display font-semibold transition-all duration-200 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Nomination
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/50 font-body">
                  Your nomination goes directly to <span className="text-white/70">help@nyscdiary.com</span>
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

