import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { ChevronLeft, Clock, Calendar } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, urlFor } from '../lib/sanity';
import type { BlogPost } from '../types/blog';
import ShareButtons from '../components/blog/ShareButtons';
import BlogReactions from '../components/blog/BlogReactions';
import BlogComments from '../components/blog/BlogComments';
import BlogCard from '../components/blog/BlogCard';

const CATEGORY_COLORS: Record<string, string> = {
  Guides: 'bg-blue-100 text-blue-700',
  News: 'bg-red-100 text-red-700',
  Stories: 'bg-purple-100 text-purple-700',
  'State Guides': 'bg-orange-100 text-orange-700',
  Tips: 'bg-yellow-100 text-yellow-700',
  Photos: 'bg-pink-100 text-pink-700',
};

// Portable text components for rendering Sanity block content
const ptComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(900).url()}
          alt={value.alt ?? ''}
          className="w-full rounded-2xl object-cover"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string; blank?: boolean } }) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="text-nysc-600 underline underline-offset-2 hover:text-nysc-700"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-heading font-bold text-2xl text-gray-900 mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-heading font-bold text-xl text-gray-900 mt-6 mb-2">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="font-heading font-semibold text-lg text-gray-900 mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-nysc-400 pl-4 py-1 my-4 italic text-gray-600 bg-nysc-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
  },
};

interface BlogPostPageProps {
  slug: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

function readTime(body?: unknown[]): number {
  if (!body) return 1;
  const text = JSON.stringify(body);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function BlogPostPage({ slug, onBack, onNavigate }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getPostBySlug(slug)
      .then((p) => {
        if (!p) { setError('Post not found.'); return; }
        setPost(p);
        getRelatedPosts(p.category, slug).then(setRelated);
      })
      .catch(() => setError('Could not load post. Please try again.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse space-y-4">
        <div className="h-6 w-32 bg-gray-200 rounded-full" />
        <div className="h-80 bg-gray-200 rounded-2xl" />
        <div className="h-8 bg-gray-200 rounded-lg" />
        <div className="h-4 w-48 bg-gray-100 rounded-full" />
        <div className="space-y-3 pt-4">
          {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-100 rounded-full" style={{width: `${70 + i * 5}%`}} />)}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <span className="text-5xl mb-4 block">😕</span>
        <p className="text-gray-500 mb-6">{error || 'Post not found.'}</p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-nysc-600 text-white rounded-xl font-medium hover:bg-nysc-700 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const badgeClass = CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700';
  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(520).fit('crop').crop('focalpoint').url()
    : null;
  const authorAvatarUrl = post.author?.avatar
    ? urlFor(post.author.avatar).width(48).height(48).fit('crop').url()
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back + breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-nysc-600 transition-colors mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </button>
        <p className="text-xs text-gray-400">
          Home &rsaquo; Blog &rsaquo;{' '}
          <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
            {post.category}
          </span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16 flex flex-col lg:flex-row gap-10">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Cover image */}
          {coverUrl && (
            <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden mb-8 mt-4">
              <img src={coverUrl} alt={post.coverImage?.alt ?? post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Title + meta */}
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>{post.category}</span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-gray-900 mt-3 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Author row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {authorAvatarUrl ? (
                <img src={authorAvatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-nysc-100 flex items-center justify-center">
                  <span className="font-bold text-nysc-600">{post.author?.name?.[0]}</span>
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{post.author?.name}</p>
                <p className="text-xs text-gray-400">{post.author?.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime(post.body)} min read
              </span>
              <ShareButtons title={post.title} slug={post.slug.current} />
            </div>
          </div>

          {/* Article body */}
          <div className="prose-base max-w-none">
            {post.body ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <PortableText value={post.body} components={ptComponents as any} />
            ) : (
              <p className="text-gray-400 italic">No content yet.</p>
            )}
          </div>

          <BlogReactions postSlug={post.slug.current} />
          <BlogComments postSlug={post.slug.current} />
        </article>

        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0 space-y-6">
          {/* Ask DiaryTalks CTA */}
          <div className="bg-gradient-to-br from-nysc-600 to-nysc-700 rounded-2xl p-5 text-white shadow-lg">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-heading font-bold text-lg mb-1">Have a question?</h3>
            <p className="text-nysc-100 text-sm mb-4">
              Ask DiaryTalks — our AI assistant knows everything about NYSC.
            </p>
            <button
              onClick={() => onNavigate('diarytalks')}
              className="w-full bg-white text-nysc-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-nysc-50 transition-colors"
            >
              Ask DiaryTalks →
            </button>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-gray-900 text-base mb-4">Related Posts</h3>
              <div className="space-y-3">
                {related.map((rp) => (
                  <BlogCard key={rp._id} post={rp} onSelect={(s) => { window.scrollTo({ top: 0 }); onBack(); setTimeout(() => onNavigate('blog-post'), 10); }} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
