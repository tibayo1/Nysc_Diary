import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { BlogComment } from '../../types/blog';
import { MessageSquare, Send } from 'lucide-react';

interface BlogCommentsProps {
  postSlug: string;
}

export default function BlogComments({ postSlug }: BlogCommentsProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'blog_comments'),
      where('postSlug', '==', postSlug),
      where('approved', '==', true),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setComments(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<BlogComment, 'id'>),
        }))
      );
    });
    return unsub;
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    if (body.length > 2000) { setError('Comment is too long.'); return; }

    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'blog_comments'), {
        postSlug,
        name: name.trim(),
        body: body.trim(),
        createdAt: serverTimestamp(),
        approved: false,
      });
      setSubmitted(true);
      setName('');
      setBody('');
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  function formatDate(ts: string) {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('en-NG', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <h3 className="font-heading font-bold text-gray-900 text-lg flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-nysc-500" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 italic mb-6">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-4 mb-8">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-nysc-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-nysc-600">{c.name[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-800">{c.name}</span>
                  <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit form */}
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
          ✅ Your comment has been submitted and is awaiting moderation. Thanks!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-nysc-300"
          />
          <textarea
            placeholder="Write a comment…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            maxLength={2000}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-nysc-300 resize-none"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-nysc-600 text-white text-sm font-semibold rounded-xl hover:bg-nysc-700 disabled:opacity-60 transition-colors"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Submitting…' : 'Post comment'}
          </button>
        </form>
      )}
    </div>
  );
}
