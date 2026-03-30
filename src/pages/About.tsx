import { Target, Heart, Users, Zap, Globe, Award } from 'lucide-react';
import { Reveal } from '../hooks/useScrollReveal';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const values = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'Building genuine connections between corps members across all 36 states and FCT.',
    color: 'from-accent-400 to-accent-500',
  },
  {
    icon: Zap,
    title: 'Opportunity Access',
    description: 'Providing real, actionable opportunities that help corps members thrive during and after service.',
    color: 'from-nysc-500 to-nysc-600',
  },
  {
    icon: Globe,
    title: 'Authentic Stories',
    description: 'Sharing real experiences from real corpers to guide, inspire, and prepare the next generation.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: Award,
    title: 'Excellence in Service',
    description: 'Celebrating and promoting outstanding community development service and impact across Nigeria.',
    color: 'from-nysc-600 to-nysc-700',
  },
];

const teamMembers = [
  { role: 'Founder & Editor-in-Chief', bio: 'Passionate about bridging the information gap for prospective and serving corps members.' },
  { role: 'Content Lead', bio: 'Curating the most relevant NYSC updates, opportunities, and stories from across Nigeria.' },
  { role: 'Community Manager', bio: 'Growing and nurturing our 5,000+ member WhatsApp community with daily value.' },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white">
        <div className="deco-circle w-72 h-72 bg-accent-500/10 -top-20 right-10 animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-40 h-40 bg-white/5 bottom-0 -left-10 animate-float" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About NYSC Diary</h1>
          <p className="text-xl text-nysc-100 font-body max-w-2xl">
            Your trusted companion through the National Youth Service Corps journey
          </p>
          <p className="text-lg mt-2 font-display font-medium italic text-accent-300">
            "Creating a community of opportunities"
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full"><path d="M0 20L720 40L1440 20V40H0V20Z" fill="#f9fafb"/></svg>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <span className="text-accent-500 font-display font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-1 mb-6">
                Empowering Every Corps Member
              </h2>
              <p className="text-gray-700 font-body text-lg leading-relaxed mb-4">
                NYSC Diary was born out of a simple observation — prospective and serving corps members often struggle to find reliable, up-to-date information about the NYSC program.
              </p>
              <p className="text-gray-700 font-body text-lg leading-relaxed mb-4">
                We created this platform to be the one-stop destination for everything NYSC — from your call-up letter to passing out. Our mission is to ensure no corps member navigates their service year alone.
              </p>
              <p className="text-gray-700 font-body text-lg leading-relaxed">
                Through our content, community, and connections, we're <span className="text-accent-500 font-semibold">creating a community of opportunities</span> that extends far beyond the service year.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="bg-gradient-to-br from-nysc-50 to-accent-50 rounded-3xl p-10 border border-nysc-100/50">
                <div className="w-16 h-16 bg-gradient-to-br from-nysc-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Target className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-700 font-body text-lg leading-relaxed">
                  To become Africa's most impactful youth service platform — connecting, informing, and empowering every corps member to make the most of their service year and beyond.
                </p>
              </div>
              <div className="deco-circle w-24 h-24 bg-accent-500/10 -bottom-8 -right-8" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-accent-500 font-display font-semibold text-sm uppercase tracking-wider">What Drives Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-1">Our Core Values</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 card-hover h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                    <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-accent-500 font-display font-semibold text-sm uppercase tracking-wider">The People</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-1">Our Team</h2>
            <p className="text-gray-600 font-body mt-3 max-w-xl mx-auto">
              A passionate team of former corps members dedicated to serving the NYSC community
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 card-hover text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-nysc-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Users className="w-8 h-8 text-nysc-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{member.role}</h3>
                <p className="text-gray-600 font-body text-sm">{member.bio}</p>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Join the NYSC Diary Community</h2>
            <p className="text-xl mb-4 text-nysc-100 font-body max-w-2xl mx-auto">
              Be part of Nigeria's largest NYSC community and never miss out on important updates
            </p>
            <p className="text-lg mb-8 font-display font-medium italic text-accent-300">
              "Creating a community of opportunities"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('community')}
                className="bg-white text-nysc-700 px-8 py-4 rounded-xl font-display font-semibold hover:bg-nysc-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Join Our Community
              </button>
              <a
                href="mailto:help@nyscdiary.com"
                className="bg-accent-500 text-white px-8 py-4 rounded-xl font-display font-semibold hover:bg-accent-400 transition-all duration-200 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
