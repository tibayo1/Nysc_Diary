import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { TAGS } from './TagFilterBar';
import { createThread } from '../../lib/threads';
import { Thread } from '../../types';

interface NewThreadModalProps {
  onClose: () => void;
  onSuccess: (thread: Thread) => void;
}

export default function NewThreadModal({ onClose, onSuccess }: NewThreadModalProps) {
  const [form, setForm] = useState({ title: '', body: '', tag: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.length > 120) e.title = 'Max 120 characters';
    if (!form.body.trim() || form.body.length < 20) e.body = 'Body must be at least 20 characters';
    if (!form.tag) e.tag = 'Please pick a topic';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const id = await createThread({
        title: form.title.trim(),
        body: form.body.trim(),
        tag: form.tag,
        authorEmail: form.email.trim().toLowerCase(),
      });
      const newThread: Thread = {
        id,
        title: form.title.trim(),
        body: form.body.trim(),
        tag: form.tag,
        authorEmail: form.email.trim().toLowerCase(),
        authorUsername: form.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(),
        createdAt: Timestamp.now(),
        replyCount: 0,
        pinned: false,
      };
      onSuccess(newThread);
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const tagOptions = TAGS.filter((t) => t.label !== 'All');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-lg text-gray-900">Start a New Thread</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="yourname@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                errors.email
                  ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:border-nysc-500 focus:ring-2 focus:ring-nysc-100'
              }`}
            />
            <p className="mt-1 text-xs text-gray-500">
              Shown as your username (e.g. yourname). Never displayed in full.
            </p>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Thread Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="What's this thread about?"
              maxLength={120}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                errors.title
                  ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:border-nysc-500 focus:ring-2 focus:ring-nysc-100'
              }`}
            />
            <p className="mt-1 text-xs text-gray-400 text-right">{form.title.length}/120</p>
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Topic <span className="text-red-500">*</span>
            </label>
            <select
              value={form.tag}
              onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all appearance-none bg-white ${
                errors.tag
                  ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:border-nysc-500 focus:ring-2 focus:ring-nysc-100'
              }`}
            >
              <option value="">Select a topic...</option>
              {tagOptions.map(({ label, emoji }) => (
                <option key={label} value={label}>
                  {emoji} {label}
                </option>
              ))}
            </select>
            {errors.tag && <p className="mt-1 text-xs text-red-500">{errors.tag}</p>}
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Post <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Share your experience, question or info..."
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none ${
                errors.body
                  ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:border-nysc-500 focus:ring-2 focus:ring-nysc-100'
              }`}
            />
            {errors.body && <p className="mt-1 text-xs text-red-500">{errors.body}</p>}
          </div>

          {errors.submit && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{errors.submit}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-nysc-600 text-white text-sm font-bold hover:bg-nysc-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Posting…' : 'Post Thread'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
