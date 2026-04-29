import { useState } from 'react';
import { Clock, Search } from 'lucide-react';
import { Reveal } from '../hooks/useScrollReveal';
import { allPosts } from '../data/posts';

const categories = ['All', 'Camp Life', 'NYSC Updates', 'Opportunities', 'Stories'];

const categoryColors: Record<string, string> = {
  'Camp Life': 'bg-nysc-600',
  'NYSC Updates': 'bg-accent-500',
  'Opportunities': 'bg-nysc-700',
  'Stories': 'bg-accent-600',
};

interface ContentProps {
  onSelectPost: (postId: string) => void;
}

export default function Content({ onSelectPost }: ContentProps) {
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
              <article
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer card-hover group border border-gray-100"
                onClick={() => onSelectPost(post.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectPost(post.id)}
                aria-label={`Read: ${post.title}`}
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
