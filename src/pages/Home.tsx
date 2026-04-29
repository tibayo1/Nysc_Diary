import { ArrowRight, TrendingUp, Users, BookOpen, Sparkles, Star } from 'lucide-react';
import { Corper } from '../types';
import { Reveal } from '../hooks/useScrollReveal';
import { latestPosts } from '../data/posts';

interface HomeProps {
  onNavigate: (page: string, postId?: string) => void;
}


const featuredCorper: Corper = {
  id: '1',
  name: 'Adaeze Okonkwo',
  state: 'Lagos State',
  ppa: 'Ministry of Education',
  story: 'From starting a tech community in her LGA to impacting over 200 students, Adaeze is redefining service…',
  image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=800',
  date: '2024-03-20'
};

const trendingTopics = [
  { icon: BookOpen, title: 'Call-up Letters', count: '1.2k reading', color: 'from-nysc-500 to-nysc-600' },
  { icon: Users, title: 'Camp Life', count: '890 reading', color: 'from-accent-400 to-accent-500' },
  { icon: TrendingUp, title: 'PPA Tips', count: '654 reading', color: 'from-nysc-600 to-nysc-700' },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white">
        {/* Decorative floating circles */}
        <div className="deco-circle w-96 h-96 bg-nysc-500/20 -top-20 -left-20 animate-float" aria-hidden="true" />
        <div className="deco-circle w-72 h-72 bg-accent-500/10 top-10 right-[-5rem] animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-48 h-48 bg-white/5 bottom-10 left-1/3 animate-pulse-soft" aria-hidden="true" />
        <div className="deco-circle w-32 h-32 bg-nysc-400/15 top-1/3 right-1/4 animate-float" aria-hidden="true" />
        <div className="deco-circle w-20 h-20 bg-accent-400/10 bottom-20 right-20 animate-float-slow" aria-hidden="true" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent-400" aria-hidden="true" />
              <span className="text-sm font-body font-medium text-white/90">Nigeria's #1 NYSC Community</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.1] animate-fade-up">
              Your NYSC Plug for{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Everything</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-accent-500/40 rounded-sm -z-0" aria-hidden="true" />
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-4 text-nysc-100/90 font-body animate-fade-up stagger-2" style={{ animationDelay: '0.2s' }}>
              News, Opportunities, Stories, Community
            </p>

            {/* Tagline */}
            <p className="text-lg md:text-xl mb-10 font-display font-medium italic text-accent-300 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              "Creating a community of opportunities"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => onNavigate('content')}
                className="group bg-white text-nysc-700 px-8 py-4 rounded-xl font-display font-semibold hover:bg-nysc-50 transition-all duration-200 flex items-center justify-center shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 btn-shine"
              >
                Explore Content
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={() => onNavigate('advertise')}
                className="bg-accent-500 text-white px-8 py-4 rounded-xl font-display font-semibold hover:bg-accent-400 transition-all duration-200 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:-translate-y-0.5 btn-shine"
              >
                Advertise With Us
              </button>
            </div>

            {/* Stats bar */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              {[
                { value: '200K+', label: 'Monthly Reach' },
                { value: '75K+', label: 'Followers' },
                { value: '5K+', label: 'Community Members' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-nysc-200 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 70V80H0V40Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ===== LATEST POSTS ===== */}
      <section className="bg-gray-50 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-accent-500 font-display font-semibold text-sm uppercase tracking-wider">Fresh Content</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-1">Latest Posts</h2>
              </div>
              <button
                onClick={() => onNavigate('content')}
                className="group text-nysc-600 font-display font-semibold hover:text-nysc-700 flex items-center gap-1 transition-colors"
              >
                View All
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.1}>
                <article
                  className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer card-hover group"
                  onClick={() => onNavigate('post-detail', post.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={208}
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-nysc-600 text-white px-3 py-1 rounded-full text-xs font-display font-semibold shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-body text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-gray-900 mb-2 group-hover:text-nysc-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 font-body text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CORPER OF THE WEEK ===== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-accent-500 font-display font-semibold text-sm uppercase tracking-wider">Spotlight</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-1">Corper of the Week</h2>
              </div>
              <button
                onClick={() => onNavigate('corper-of-the-week')}
                className="group text-nysc-600 font-display font-semibold hover:text-nysc-700 flex items-center gap-1 transition-colors"
              >
                View All
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="relative bg-gradient-to-br from-nysc-50 via-white to-accent-50 rounded-3xl shadow-sm p-8 md:p-10 md:flex items-center gap-10 cursor-pointer card-hover border border-nysc-100/50 overflow-hidden"
              onClick={() => onNavigate('corper-of-the-week')}
            >
              {/* Decorative */}
              <div className="deco-circle w-40 h-40 bg-accent-500/5 -top-10 -right-10" aria-hidden="true" />

              <img
                src={featuredCorper.image}
                alt={featuredCorper.name}
                className="w-full md:w-72 h-72 object-cover rounded-2xl shadow-md"
                width={288}
                height={288}
                loading="lazy"
              />
              <div className="mt-6 md:mt-0 flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-nysc-600 to-nysc-500 text-white px-4 py-1.5 rounded-full text-sm font-display font-semibold mb-4 shadow-sm">
                  <Star className="w-4 h-4" aria-hidden="true" />
                  Featured Corper
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
                  {featuredCorper.name}
                </h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-sm font-body text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{featuredCorper.state}</span>
                  <span className="text-sm font-body text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{featuredCorper.ppa}</span>
                </div>
                <p className="text-gray-700 font-body text-lg leading-relaxed">{featuredCorper.story}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TRENDING TOPICS ===== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10">
              <span className="text-accent-500 font-display font-semibold text-sm uppercase tracking-wider">What's Hot</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-1">Trending Topics</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingTopics.map((topic, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className="bg-white rounded-2xl shadow-sm p-8 card-hover cursor-pointer group border border-gray-100"
                  onClick={() => onNavigate('content')}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <topic.icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-500 font-body text-sm">{topic.count}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white py-24">
        {/* Decorative */}
        <div className="deco-circle w-72 h-72 bg-accent-500/10 -top-20 right-10 animate-float-slow" aria-hidden="true" />
        <div className="deco-circle w-48 h-48 bg-white/5 bottom-0 left-20 animate-float" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-5">Join Our Community</h2>
            <p className="text-xl mb-4 text-nysc-100 font-body max-w-2xl mx-auto">
              Connect with thousands of corps members across Nigeria
            </p>
            <p className="text-lg mb-10 font-display font-medium italic text-accent-300">
              "Creating a community of opportunities"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('community')}
                className="bg-white text-nysc-700 px-8 py-4 rounded-xl font-display font-semibold hover:bg-nysc-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Join Our Community
              </button>
              <button
                onClick={() => onNavigate('community')}
                className="bg-accent-500 text-white px-8 py-4 rounded-xl font-display font-semibold hover:bg-accent-400 transition-all duration-200 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                Submit Your Story
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
