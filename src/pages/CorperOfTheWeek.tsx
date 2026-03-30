import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';
import { Corper } from '../types';
import { Reveal } from '../hooks/useScrollReveal';

const corpers: Corper[] = [
  {
    id: '1',
    name: 'Adaeze Okonkwo',
    state: 'Lagos State',
    ppa: 'Ministry of Education',
    story: 'From starting a tech community in her LGA to impacting over 200 students, Adaeze is redefining what it means to serve. She developed a free coding bootcamp for secondary school students in her community.',
    image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-20'
  },
  {
    id: '2',
    name: 'Chukwuemeka Nwosu',
    state: 'Enugu State',
    ppa: 'General Hospital Enugu',
    story: 'As a medical doctor serving in rural Enugu, Chukwuemeka initiated a free medical outreach program that has served over 500 community members. His dedication to healthcare delivery in underserved areas is truly inspiring.',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-13'
  },
  {
    id: '3',
    name: 'Fatima Abubakar',
    state: 'Kano State',
    ppa: 'Community Secondary School',
    story: 'Fatima transformed her PPA by introducing a girls-in-STEM program that has enrolled over 150 female students. Her passion for bridging the gender gap in technology is making real impact.',
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-06'
  },
  {
    id: '4',
    name: 'Oluwaseun Adebayo',
    state: 'Oyo State',
    ppa: 'Ministry of Agriculture',
    story: 'Oluwaseun established a youth farming cooperative that has trained 80 young farmers in modern agricultural practices. His initiative has created sustainable income opportunities for youth in his community.',
    image: 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-02-28'
  },
  {
    id: '5',
    name: 'Blessing Eze',
    state: 'Rivers State',
    ppa: 'State Library Board',
    story: 'Blessing started a mobile library service that brings books to children in remote riverine communities. Her innovation has improved literacy rates and sparked a love for reading in hundreds of children.',
    image: 'https://images.pexels.com/photos/3783520/pexels-photo-3783520.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-02-21'
  },
  {
    id: '6',
    name: 'Ibrahim Yusuf',
    state: 'Kaduna State',
    ppa: 'Ministry of Youth Development',
    story: 'Ibrahim created a skills acquisition center that has trained over 300 youths in various vocational skills including tailoring, carpentry, and digital marketing, helping reduce unemployment in his community.',
    image: 'https://images.pexels.com/photos/5325890/pexels-photo-5325890.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-02-14'
  }
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

        {/* Previous Corpers */}
        <Reveal delay={0.2}>
          <h2 className="text-3xl font-display font-bold text-gray-900 mt-16 mb-8">Previous Featured Corpers</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corpers.slice(1).map((corper, index) => (
            <Reveal key={corper.id} delay={index * 0.1}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden card-hover border border-gray-100 group">
                <div className="relative overflow-hidden">
                  <img
                    src={corper.image}
                    alt={corper.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={256}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                    {corper.name}
                  </h3>
                  <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600 font-body">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-nysc-600" aria-hidden="true" />
                      {corper.state}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-accent-500" aria-hidden="true" />
                      {corper.ppa}
                    </div>
                  </div>
                  <p className="text-gray-700 font-body text-sm line-clamp-3">{corper.story}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-body">
                      Featured: {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(corper.date))}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
