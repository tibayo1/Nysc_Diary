import { Check, Instagram, TrendingUp, Users } from 'lucide-react';
import { PricingPlan } from '../types';

const pricingPlans: PricingPlan[] = [
  {
    name: 'Instagram Post',
    price: '₦15,000',
    features: [
      '1 Instagram feed post',
      'Reach: 50,000+ engaged followers',
      'Story mention included',
      '24-hour story highlight',
      'Performance report'
    ]
  },
  {
    name: 'Story Package',
    price: '₦8,000',
    features: [
      '3 Instagram stories',
      'Swipe-up link included',
      '24-hour exposure',
      'Engagement tracking',
      'Same-day posting'
    ]
  },
  {
    name: 'Full Campaign',
    price: '₦35,000',
    popular: true,
    features: [
      '2 Instagram feed posts',
      '5 Instagram stories',
      'WhatsApp group promotion',
      '3-day story highlight',
      'Newsletter feature',
      'Detailed analytics report'
    ]
  }
];

const stats = [
  { icon: Users, label: 'Monthly Reach', value: '200K+' },
  { icon: Instagram, label: 'Instagram Followers', value: '75K+' },
  { icon: TrendingUp, label: 'Engagement Rate', value: '8.5%' }
];

export default function Advertise() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Advertise With Us</h1>
            <p className="text-xl text-green-50 mb-8">
              Reach thousands of Nigerian corps members with your brand message
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Package
          </h2>
          <p className="text-xl text-gray-600">
            Flexible options to fit your marketing goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden ${
                plan.popular ? 'ring-2 ring-green-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-green-600 text-white text-center py-2 font-semibold text-sm">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:help@nyscdiary.com?subject=Advertisement Request"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Request Invoice
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600">
                Contact us for custom packages and long-term partnerships
              </p>
            </div>
            <a
              href="mailto:help@nyscdiary.com"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Advertise With NYSC Diary?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-green-600 font-bold text-xl mb-2">
                Targeted Audience
              </div>
              <p className="text-gray-600">
                Reach Nigerian corps members actively seeking products and services
              </p>
            </div>
            <div>
              <div className="text-green-600 font-bold text-xl mb-2">
                High Engagement
              </div>
              <p className="text-gray-600">
                Our community is highly engaged and responsive to relevant content
              </p>
            </div>
            <div>
              <div className="text-green-600 font-bold text-xl mb-2">
                Trusted Platform
              </div>
              <p className="text-gray-600">
                Built strong credibility within the NYSC community
              </p>
            </div>
            <div>
              <div className="text-green-600 font-bold text-xl mb-2">
                Proven Results
              </div>
              <p className="text-gray-600">
                Track record of successful campaigns with measurable ROI
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
