import { MessageCircle, Pin } from 'lucide-react';
import { Thread } from '../../types';
import { TAG_COLORS } from './TagFilterBar';
import { relativeTime } from '../../lib/threads';

interface ThreadCardProps {
  thread: Thread;
  onClick: (id: string) => void;
}

function avatarColor(username: string): string {
  const colors = [
    'bg-nysc-600', 'bg-orange-500', 'bg-blue-600',
    'bg-purple-600', 'bg-pink-600', 'bg-teal-600',
  ];
  const i = username.charCodeAt(0) % colors.length;
  return colors[i];
}

export default function ThreadCard({ thread, onClick }: ThreadCardProps) {
  const isPinned = thread.pinned;
  const tagColor = TAG_COLORS[thread.tag] ?? 'bg-gray-100 text-gray-700';

  return (
    <button
      onClick={() => onClick(thread.id)}
      className={`w-full text-left rounded-xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group ${
        isPinned
          ? 'border-nysc-500 bg-nysc-50 hover:border-nysc-600'
          : 'border-gray-200 bg-white hover:border-nysc-300'
      }`}
      aria-label={`Open thread: ${thread.title}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-full ${avatarColor(
                thread.authorUsername
              )} flex items-center justify-center text-white font-bold text-sm`}
            >
              {thread.authorUsername[0]?.toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              {/* Pinned badge */}
              {isPinned && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-nysc-700 bg-nysc-100 px-2 py-0.5 rounded-full mb-1">
                  <Pin size={10} />
                  PINNED
                </span>
              )}

              {/* Title */}
              <p className="font-semibold text-gray-900 leading-snug group-hover:text-nysc-700 transition-colors line-clamp-2">
                {thread.title}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 flex-wrap">
                <span className="font-medium text-gray-700">{thread.authorUsername}</span>
                <span>·</span>
                <span>{relativeTime(thread.createdAt)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={11} />
                  {thread.replyCount} {thread.replyCount === 1 ? 'reply' : 'replies'}
                </span>
              </div>
            </div>
          </div>

          {/* Tag badge */}
          <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor}`}>
            {thread.tag}
          </span>
        </div>
      </div>
    </button>
  );
}
