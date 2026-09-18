import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';
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

export default function CorperOfTheWeek() {
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white py-20">
        <div className="deco-circle w-48 h-48 bg-accent-500/10 top-0 right-20 animate-float-slow" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Know an Amazing Corper?</h2>
            <p className="text-xl mb-8 text-nysc-100 font-body">
              Nominate them to be featured as Corper of the Week
            </p>
            <a
              href="mailto:help@nyscdiary.com?subject=Corper of the Week Nomination"
              className="inline-block bg-accent-500 text-white px-8 py-4 rounded-xl font-display font-semibold hover:bg-accent-400 transition-all duration-200 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Submit Nomination
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
