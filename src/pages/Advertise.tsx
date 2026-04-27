import { Check, Users, Eye, TrendingUp, BarChart3, Megaphone } from 'lucide-react';
import { Reveal } from '../hooks/useScrollReveal';

const stats = [
  { icon: Eye, value: '200K+', label: 'Monthly Reach', color: 'from-nysc-500 to-nysc-600' },
  { icon: Users, value: '75K+', label: 'Instagram Followers', color: 'from-accent-400 to-accent-500' },
  { icon: TrendingUp, value: '5K+', label: 'Facebook Community', color: 'from-nysc-600 to-nysc-700' },
  { icon: BarChart3, value: '50K+', label: 'Monthly Website Views', color: 'from-accent-500 to-accent-600' },
];

const plans = [
  {
    name: 'Growth Package',
    price: 'From ₦150,000',
    period: '',
    description: 'Most popular for growing brands',
    badge: 'Most Popular',
    features: ['Cross-platform feature (Instagram + Facebook)', 'Story placements', 'Priority visibility', 'Optimized content positioning'],
    cta: 'Request Campaign Plan',
    accent: true,
  },
  {
    name: 'Premium Campaign',
    price: 'From ₦350,000',
    period: '',
    description: 'Maximum exposure & results',
    badge: null,
    features: ['Multi-post campaign', 'Strategic content rollout', 'High-visibility placements', 'Performance insights'],
    cta: 'Work With Us',
    accent: false,
  },
  {
    name: 'Custom Campaigns',
    price: 'Custom Pricing',
    period: '',
    description: 'Built for brands targeting the NYSC audience',
    badge: null,
    features: ['Multi-week campaigns', 'Conversion-focused strategy', 'Tailored content plan', 'Dedicated brand strategy'],
    cta: 'Get Custom Quote',
    accent: false,
  },
];

export default function Advertise() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white">
        <div className="deco-circle w-72 h-72 bg-accent-500/10 -top-20 right-10 animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-40 h-40 bg-white/5 bottom-0 -left-10 animate-float" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/30 rounded-full px-4 py-1.5 mb-4">
            <Megaphone className="w-4 h-4 text-accent-400" aria-hidden="true" />
            <span className="text-sm font-display font-medium text-accent-200">Reach Your Audience</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Advertise With Us</h1>
          <p className="text-xl text-nysc-100 font-body max-w-2xl">
            Connect your brand with Nigeria's largest community of corps members and young professionals
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full"><path d="M0 20L720 40L1440 20V40H0V20Z" fill="#f9fafb"/></svg>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 card-hover">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 font-body mt-1">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-accent-500 font-display font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-1">Choose Your Plan</h2>
            <p className="text-gray-600 font-body mt-3 max-w-xl mx-auto">
              Flexible packages designed to help your brand reach the NYSC community effectively
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div
                className={`relative rounded-3xl p-8 card-hover flex flex-col h-full ${
                  plan.accent
                    ? 'bg-gradient-to-br from-nysc-600 to-nysc-700 text-white shadow-xl shadow-nysc-600/20 scale-[1.02] border-2 border-nysc-500'
                    : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-500 text-white px-6 py-1.5 rounded-full text-sm font-display font-semibold shadow-md whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm font-body mb-6 ${plan.accent ? 'text-nysc-100' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-8">
                    <span className={`text-3xl font-display font-bold ${plan.accent ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-body">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.accent ? 'text-accent-300' : 'text-nysc-500'}`} aria-hidden="true" />
                        <span className={plan.accent ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`mailto:help@nyscdiary.com?subject=${encodeURIComponent(plan.name + ' - Advertising Inquiry')}`}
                  className={`block text-center py-3.5 rounded-xl font-display font-semibold transition-all duration-200 mt-auto ${
                    plan.accent
                      ? 'bg-white text-nysc-700 hover:bg-nysc-50 shadow-lg'
                      : 'bg-nysc-600 text-white hover:bg-nysc-500 shadow-md shadow-nysc-600/20'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Advertise */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white py-20 mt-8">
        <div className="deco-circle w-48 h-48 bg-accent-500/10 top-0 right-20 animate-float-slow" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Grow Your Brand?</h2>
            <p className="text-xl mb-8 text-nysc-100 font-body max-w-2xl mx-auto">
              Contact us today and let's create a custom advertising strategy that delivers real results
            </p>
            <a
              href="mailto:help@nyscdiary.com?subject=Custom Advertising Inquiry"
              className="inline-block bg-accent-500 text-white px-8 py-4 rounded-xl font-display font-semibold hover:bg-accent-400 transition-all duration-200 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Our Team
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
