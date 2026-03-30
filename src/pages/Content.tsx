import { useState } from 'react';
import { Clock, Search } from 'lucide-react';
import { Post } from '../types';
import { Reveal } from '../hooks/useScrollReveal';

const categories = ['All', 'Camp Life', 'NYSC Updates', 'Opportunities', 'Stories'];

const allPosts: Post[] = [
  {
    id: '1',
    title: 'Everything You Need to Know About NYSC Call-up Letter',
    category: 'NYSC Updates',
    excerpt: 'A comprehensive guide on how to print your call-up letter, what documents you need, and common issues to avoid.',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-20',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: '10 Essential Items to Pack for NYSC Camp',
    category: 'Camp Life',
    excerpt: 'Don\'t make the mistake of going to camp unprepared. Here\'s everything you need to make your camp experience comfortable.',
    image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-18',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Top Side Hustles for Corps Members in 2024',
    category: 'Opportunities',
    excerpt: 'Make the most of your service year with these lucrative side hustle ideas that won\'t interfere with your PPA duties.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-15',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'How I Started a Business During NYSC',
    category: 'Stories',
    excerpt: 'One corper\'s journey from batch mate to successful entrepreneur, and how NYSC provided the perfect launching pad.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-12',
    readTime: '8 min read'
  },
  {
    id: '5',
    title: 'Navigating Your First Week at Camp',
    category: 'Camp Life',
    excerpt: 'Survival tips, what to expect, and how to make friends quickly during your first week in the orientation camp.',
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-10',
    readTime: '5 min read'
  },
  {
    id: '6',
    title: 'NYSC Allowance Increase: What You Need to Know',
    category: 'NYSC Updates',
    excerpt: 'Breaking down the new allowance structure, when it takes effect, and how it affects current corps members.',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-08',
    readTime: '4 min read'
  },
  {
    id: '7',
    title: 'Remote Job Opportunities for Corps Members',
    category: 'Opportunities',
    excerpt: 'Discover legitimate remote work opportunities perfect for corps members looking to earn extra income online.',
    image: 'https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-05',
    readTime: '6 min read'
  },
  {
    id: '8',
    title: 'My Most Memorable CDS Experience',
    category: 'Stories',
    excerpt: 'How community development service turned into a life-changing experience that shaped my career path.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-03',
    readTime: '7 min read'
  },
  {
    id: '9',
    title: 'Understanding PPA Posting and Redeployment',
    category: 'NYSC Updates',
    excerpt: 'Complete guide to PPA assignments, when and how to request redeployment, and what documents you need.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-01',
    readTime: '5 min read'
  }
];

const categoryColors: Record<string, string> = {
  'Camp Life': 'bg-nysc-600',
  'NYSC Updates': 'bg-accent-500',
  'Opportunities': 'bg-nysc-700',
  'Stories': 'bg-accent-600',
};

export default function Content() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPosts
    .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
    .filter(post =>
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nysc-700 via-nysc-600 to-nysc-800 text-white">
        <div className="deco-circle w-64 h-64 bg-accent-500/10 -top-20 right-0 animate-float-slow" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Content Library</h1>
          <p className="text-xl text-nysc-100 font-body max-w-2xl">
            Everything you need to navigate your NYSC journey successfully
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full"><path d="M0 20L720 40L1440 20V40H0V20Z" fill="#f9fafb"/></svg>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-display font-semibold text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-nysc-600 text-white shadow-md shadow-nysc-600/20'
                    : 'bg-white text-gray-600 hover:bg-nysc-50 hover:text-nysc-600 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-nysc-500 focus:border-transparent w-full md:w-64 transition-colors"
            />
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.05}>
              <article className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer card-hover group border border-gray-100">
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
                    <span className={`${categoryColors[post.category] || 'bg-nysc-600'} text-white px-3 py-1 rounded-full text-xs font-display font-semibold shadow-sm`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-display font-bold text-gray-900 mb-3 group-hover:text-nysc-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 font-body text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-body">
                      {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(post.date))}
                    </span>
                    <div className="flex items-center text-xs text-gray-400 font-body gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-display text-xl">No articles found</p>
            <p className="text-gray-400 font-body text-sm mt-2">Try adjusting your search or category filter</p>
          </div>
        )}
      </section>
    </div>
  );
}
