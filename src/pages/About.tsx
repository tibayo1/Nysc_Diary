import { Target, Users, Heart, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower Nigerian corps members with the information, opportunities, and community support they need to make the most of their service year.'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe in building a strong, supportive community where corps members can connect, learn, and grow together.'
  },
  {
    icon: Heart,
    title: 'Authentic Stories',
    description: 'We share real experiences from real corps members, providing honest insights into the NYSC journey.'
  },
  {
    icon: TrendingUp,
    title: 'Growth & Opportunity',
    description: 'We connect corps members with opportunities for personal development, career growth, and entrepreneurship.'
  }
];

const stats = [
  { value: '75K+', label: 'Instagram Followers' },
  { value: '200K+', label: 'Monthly Reach' },
  { value: '5K+', label: 'WhatsApp Members' },
  { value: '500+', label: 'Stories Shared' }
];

const team = [
  {
    role: 'Content & Community',
    description: 'Creating valuable content and managing our engaged community of corps members'
  },
  {
    role: 'Partnerships',
    description: 'Connecting brands with our audience and securing opportunities for corps members'
  },
  {
    role: 'Operations',
    description: 'Ensuring smooth operations and delivering exceptional service to our community'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About NYSC Diary
            </h1>
            <p className="text-xl text-green-50">
              Your trusted companion through every stage of the NYSC journey
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            NYSC Diary is Nigeria's leading media platform dedicated to corps members. We started with a simple mission: to make the NYSC experience better for every corps member by providing accurate information, sharing inspiring stories, and building a supportive community.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, we reach over 200,000 corps members monthly through our Instagram page, WhatsApp community, and digital platforms. We've become the go-to source for NYSC news, opportunities, and authentic stories from corps members across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-8 text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8"
              >
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-8 text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.role}
              </h3>
              <p className="text-gray-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-green-50 mb-8">
              Be part of Nigeria's largest community of corps members. Get updates, opportunities, and connect with fellow corps members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/nyscdiary"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Follow on Instagram
              </a>
              <a
                href="mailto:help@nyscdiary.com"
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
