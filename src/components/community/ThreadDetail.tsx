import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { Thread, Reply } from '../../types';
import { getThreadById, getReplies, createReply } from '../../lib/threads';
import { relativeTime } from '../../lib/threads';
import { TAG_COLORS } from './TagFilterBar';

interface ThreadDetailProps {
  threadId: string;
  onBack: () => void;
}

function avatarColor(username: string): string {
  const colors = [
    'bg-nysc-600', 'bg-orange-500', 'bg-blue-600',
    'bg-purple-600', 'bg-pink-600', 'bg-teal-600',
  ];
  return colors[username.charCodeAt(0) % colors.length];
}

export default function ThreadDetail({ threadId, onBack }: ThreadDetailProps) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyForm, setReplyForm] = useState({ email: '', body: '' });
  const [replyErrors, setReplyErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [t, r] = await Promise.all([getThreadById(threadId), getReplies(threadId)]);
      setThread(t);
      setReplies(r);
      setLoading(false);
    }
    load();
  }, [threadId]);

  function validateReply() {
    const e: Record<string, string> = {};
    if (!replyForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyForm.email))
      e.email = 'Valid email required';
    if (!replyForm.body.trim() || replyForm.body.length < 10)
      e.body = 'Reply must be at least 10 characters';
    return e;
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateReply();
    if (Object.keys(errs).length) { setReplyErrors(errs); return; }
    setSubmitting(true);
    try {
      const newReply = await createReply(threadId, {
        body: replyForm.body.trim(),
        authorEmail: replyForm.email.trim().toLowerCase(),
      });
      setReplies((prev) => [...prev, newReply]);
      setThread((t) => t ? { ...t, replyCount: t.replyCount + 1 } : t);
      setReplyForm({ email: '', body: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setReplyErrors({ submit: 'Failed to post reply. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-nysc-600" size={28} />
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Thread not found.</p>
        <button onClick={onBack} className="mt-3 text-nysc-600 font-semibold hover:underline">
          ← Back
        </button>
      </div>
    );
  }

  const tagColor = TAG_COLORS[thread.tag] ?? 'bg-gray-100 text-gray-700';

  return (
    <div className="space-y-6">
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-nysc-600 font-semibold text-sm hover:text-nysc-700 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Community
      </button>

      {/* Original post */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 sm:p-6">
          {/* Author row */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full ${avatarColor(thread.authorUsername)} flex items-center justify-center text-white font-bold`}>
              {thread.authorUsername[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{thread.authorUsername}</p>
              <p className="text-xs text-gray-400">{relativeTime(thread.createdAt)}</p>
            </div>
            <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor}`}>
              {thread.tag}
            </span>
          </div>

          {/* Title + body */}
          <h1 className="font-display font-bold text-xl text-gray-900 mb-3 leading-snug">
            {thread.title}
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{thread.body}</p>
        </div>
      </div>

      {/* Replies section */}
      <div>
        <h2 className="font-display font-bold text-gray-900 mb-3">
          💬 {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
        </h2>

        {replies.length === 0 ? (
          <p className="text-sm text-gray-400 italic mb-4">
            No replies yet — be the first to respond!
          </p>
        ) : (
          <div className="space-y-3 mb-6">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className="flex gap-3 bg-white rounded-xl border border-gray-100 p-4"
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${avatarColor(reply.authorUsername)} flex items-center justify-center text-white text-xs font-bold`}>
                  {reply.authorUsername[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-gray-900">{reply.authorUsername}</span>
                    <span className="text-xs text-gray-400">{relativeTime(reply.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {reply.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reply form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
          <h3 className="font-display font-bold text-gray-900 mb-4">Join the conversation</h3>

          {submitted && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-xl">
              Reply posted! ✓
            </div>
          )}

          <form onSubmit={handleReply} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="yourname@example.com"
                value={replyForm.email}
                onChange={(e) => setReplyForm((f) => ({ ...f, email: e.target.value }))}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                  replyErrors.email
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 focus:border-nysc-500 focus:ring-2 focus:ring-nysc-100'
                }`}
              />
              <p className="mt-1 text-xs text-gray-400">
                Shown as your username only. Never displayed in full.
              </p>
              {replyErrors.email && <p className="mt-1 text-xs text-red-500">{replyErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your Reply <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Write your reply..."
                value={replyForm.body}
                onChange={(e) => setReplyForm((f) => ({ ...f, body: e.target.value }))}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none ${
                  replyErrors.body
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 focus:border-nysc-500 focus:ring-2 focus:ring-nysc-100'
                }`}
              />
              {replyErrors.body && <p className="mt-1 text-xs text-red-500">{replyErrors.body}</p>}
            </div>

            {replyErrors.submit && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{replyErrors.submit}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-nysc-600 hover:bg-nysc-700 text-white font-bold text-sm transition-all disabled:opacity-70"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              {submitting ? 'Posting…' : 'Post Reply'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
