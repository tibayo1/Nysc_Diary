import { urlFor } from '../../lib/sanity';
import type { BlogPost } from '../../types/blog';

const CATEGORY_COLORS: Record<string, string> = {
  Guides: 'bg-blue-100 text-blue-700',
  News: 'bg-red-100 text-red-700',
  Stories: 'bg-purple-100 text-purple-700',
  'State Guides': 'bg-orange-100 text-orange-700',
  Tips: 'bg-yellow-100 text-yellow-700',
  Photos: 'bg-pink-100 text-pink-700',
};

function readTime(excerpt?: string): number {
  const words = (excerpt ?? '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface BlogCardProps {
  post: BlogPost;
  onSelect: (slug: string) => void;
  featured?: boolean;
}

export default function BlogCard({ post, onSelect, featured }: BlogCardProps) {
  const badgeClass = CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700';
  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(featured ? 1200 : 600).height(featured ? 480 : 340).fit('crop').crop('focalpoint').url()
    : null;

  return (
    <article
      onClick={() => onSelect(post.slug.current)}
      className={`group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col ${
        featured ? 'md:flex-row md:h-72' : ''
      }`}
    >
      {/* Cover image */}
      <div className={`relative overflow-hidden bg-gray-100 ${featured ? 'md:w-1/2 h-48 md:h-full' : 'h-48'}`}>
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={post.coverImage?.alt ?? post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-nysc-50 to-nysc-100">
            <span className="text-4xl">📰</span>
          </div>
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
          {post.category}
        </span>
        {featured && (
          <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-500 text-white">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading font-bold text-gray-900 text-lg leading-snug group-hover:text-nysc-600 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
        )}

        <div className="mt-auto flex items-center gap-3">
          {/* Author avatar */}
          {post.author?.avatar ? (
            <img
              src={urlFor(post.author.avatar).width(32).height(32).fit('crop').url()}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-nysc-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-nysc-600">
                {post.author?.name?.[0] ?? '?'}
              </span>
            </div>
          )}
          <div className="text-xs text-gray-500 min-w-0">
            <p className="font-medium text-gray-700 truncate">{post.author?.name}</p>
            <p>
              {formatDate(post.publishedAt)}
              {post.excerpt ? ` · ${readTime(post.excerpt)} min read` : ''}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
