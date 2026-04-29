import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { allPosts } from '../data/posts';
import { PostSection } from '../types';

interface PostDetailProps {
  postId: string;
  onBack: () => void;
}

const categoryColors: Record<string, string> = {
  'Camp Life': 'bg-nysc-600',
  'NYSC Updates': 'bg-accent-500',
  'Opportunities': 'bg-nysc-700',
  'Stories': 'bg-accent-600',
};

function renderSection(section: PostSection, index: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          key={index}
          className="text-2xl font-display font-bold text-gray-900 mt-10 mb-4"
        >
          {section.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p
          key={index}
          className="text-gray-700 font-body text-lg leading-relaxed mb-5"
        >
          {section.text}
        </p>
      );
    case 'list':
      return (
        <ul key={index} className="mb-6 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-nysc-500 flex-shrink-0" />
              <span className="font-body text-gray-700 text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'tip':
      return (
        <div
          key={index}
          className="my-6 border-l-4 border-accent-500 bg-accent-50 rounded-r-xl px-6 py-4"
        >
          <p className="text-accent-800 font-body text-base leading-relaxed">
            <span className="font-display font-semibold text-accent-600">💡 Tip: </span>
            {section.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function PostDetail({ postId, onBack }: PostDetailProps) {
  const post = allPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 font-display text-xl mb-4">Article not found.</p>
          <button
            onClick={onBack}
            className="text-nysc-600 font-display font-semibold hover:underline"
          >
            ← Back to Content
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.date));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-72 md:h-[420px] w-full overflow-hidden bg-gray-200">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-display font-semibold text-sm shadow-md hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Category badge */}
        <div className="absolute bottom-6 left-6">
          <span
            className={`${categoryColors[post.category] || 'bg-nysc-600'} text-white px-3 py-1 rounded-full text-xs font-display font-semibold shadow-sm`}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-5 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 pb-8 mb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 font-body text-sm">
            <Calendar className="w-4 h-4 text-nysc-500" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-body text-sm">
            <Clock className="w-4 h-4 text-nysc-500" />
            {post.readTime}
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-body text-sm">
            <Tag className="w-4 h-4 text-nysc-500" />
            {post.category}
          </div>
        </div>

        {/* Excerpt (intro) */}
        <p className="text-xl text-gray-600 font-body leading-relaxed mb-8 italic">
          {post.excerpt}
        </p>

        {/* Content sections */}
        {post.content && post.content.length > 0 ? (
          <div>{post.content.map((section, i) => renderSection(section, i))}</div>
        ) : (
          <p className="text-gray-400 font-body text-center py-10">
            Full article content coming soon.
          </p>
        )}

        {/* Footer nav */}
        <div className="mt-14 pt-8 border-t border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-nysc-600 font-display font-semibold hover:text-nysc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Content Library
          </button>
        </div>
      </div>
    </div>
  );
}
