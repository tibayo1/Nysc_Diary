import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { getAllPosts } from '../lib/sanity';
import type { BlogPost } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';
import BlogSkeleton from '../components/blog/BlogSkeleton';

const CATEGORIES = ['All', 'Guides', 'News', 'Stories', 'State Guides', 'Tips', 'Photos'];

interface BlogListingProps {
  onSelectPost: (slug: string) => void;
}

export default function BlogListing({ onSelectPost }: BlogListingProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setError('Could not load posts. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rest.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? '').toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [rest, search, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-nysc-600 bg-nysc-50 px-3 py-1 rounded-full mb-4">
            NYSC Diary Blog
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-gray-900 mb-4">
            Guides, News &amp; Stories
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to navigate your NYSC service year — written by corps members, for corps members.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nysc-300 bg-gray-50"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-nysc-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading && <BlogSkeleton />}

        {error && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-nysc-600 text-white rounded-lg text-sm font-medium hover:bg-nysc-700"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Featured post */}
            {featured && activeCategory === 'All' && !search && (
              <div className="mb-8">
                <BlogCard post={featured} onSelect={onSelectPost} featured />
              </div>
            )}

            {/* Post grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl mb-4 block">🔍</span>
                <p className="text-gray-500">
                  No posts found{search ? ` for "${search}"` : ''}.
                </p>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="mt-3 text-sm text-nysc-600 underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <BlogCard key={post._id} post={post} onSelect={onSelectPost} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
