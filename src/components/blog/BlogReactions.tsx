import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

const EMOJIS = [
  { emoji: '👍', label: 'Helpful' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '😮', label: 'Surprised' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '🔥', label: 'Fire' },
];

interface BlogReactionsProps {
  postSlug: string;
}

type Counts = Record<string, number>;

export default function BlogReactions({ postSlug }: BlogReactionsProps) {
  const [counts, setCounts] = useState<Counts>({});
  const [reacted, setReacted] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Session-based dedup key
  const sessionKey = `blog_reaction_${postSlug}`;

  useEffect(() => {
    const stored = sessionStorage.getItem(sessionKey);
    if (stored) setReacted(stored);

    const fetchCounts = async () => {
      const result: Counts = {};
      await Promise.all(
        EMOJIS.map(async ({ emoji }) => {
          const id = `${postSlug}_${emoji}`;
          const snap = await getDoc(doc(collection(db, 'blog_reactions'), id));
          result[emoji] = snap.exists() ? (snap.data().count ?? 0) : 0;
        })
      );
      setCounts(result);
      setLoading(false);
    };

    fetchCounts();
  }, [postSlug, sessionKey]);

  const handleReact = async (emoji: string) => {
    if (reacted) return; // already reacted this session

    const id = `${postSlug}_${emoji}`;
    const ref = doc(collection(db, 'blog_reactions'), id);

    // Optimistic update
    setCounts((prev) => ({ ...prev, [emoji]: (prev[emoji] ?? 0) + 1 }));
    setReacted(emoji);
    sessionStorage.setItem(sessionKey, emoji);

    // Persist
    await setDoc(ref, { postSlug, emoji, count: increment(1) }, { merge: true });
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <p className="text-sm font-medium text-gray-500 mb-3">
        {reacted ? 'Thanks for your reaction!' : 'Was this helpful?'}
      </p>
      <div className="flex gap-2 flex-wrap">
        {EMOJIS.map(({ emoji, label }) => (
          <button
            key={emoji}
            onClick={() => handleReact(emoji)}
            disabled={!!reacted || loading}
            aria-label={label}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm border transition-all duration-200 ${
              reacted === emoji
                ? 'bg-nysc-50 border-nysc-300 scale-110'
                : reacted
                ? 'opacity-50 cursor-not-allowed border-gray-200 bg-white'
                : 'border-gray-200 bg-white hover:border-nysc-300 hover:bg-nysc-50 hover:scale-105 cursor-pointer'
            }`}
          >
            <span className="text-base">{emoji}</span>
            {!loading && (
              <span className="text-gray-600 font-medium min-w-[1ch]">
                {counts[emoji] ?? 0}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
