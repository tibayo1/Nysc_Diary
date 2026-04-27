import { useState, useEffect } from 'react';
import { PenSquare, Loader2, RefreshCw } from 'lucide-react';
import { Thread } from '../../types';
import { getPinnedThread, getThreads } from '../../lib/threads';
import TagFilterBar from './TagFilterBar';
import ThreadCard from './ThreadCard';
import NewThreadModal from './NewThreadModal';

interface ThreadFeedProps {
  onSelectThread: (id: string) => void;
}

export default function ThreadFeed({ onSelectThread }: ThreadFeedProps) {
  const [activeTag, setActiveTag] = useState('All');
  const [pinnedThread, setPinnedThread] = useState<Thread | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function fetchThreads(tag: string) {
    setLoading(true);
    setError('');
    try {
      const [pinned, feed] = await Promise.all([
        getPinnedThread(),
        getThreads(tag),
      ]);
      setPinnedThread(pinned);
      setThreads(feed);
    } catch {
      setError('Failed to load threads. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchThreads(activeTag);
  }, [activeTag]);

  function handleNewThread(thread: Thread) {
    setShowModal(false);
    setThreads((prev) => [thread, ...prev]);
  }

  return (
    <div className="space-y-4">
      {/* Tag filter */}
      <TagFilterBar activeTag={activeTag} onChange={setActiveTag} />

      {/* Pinned thread — always show */}
      {pinnedThread && (
        <ThreadCard thread={pinnedThread} onClick={onSelectThread} />
      )}

      {/* Feed */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-nysc-600" size={28} />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-3">{error}</p>
          <button
            onClick={() => fetchThreads(activeTag)}
            className="inline-flex items-center gap-2 text-sm text-nysc-600 font-semibold hover:underline"
          >
            <RefreshCw size={14} /> Try again
          </button>
        </div>
      ) : threads.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium mb-1">No threads yet</p>
          <p className="text-sm">Be the first to start a conversation!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} onClick={onSelectThread} />
          ))}
        </div>
      )}

      {/* Start a Thread CTA */}
      <div className="pt-2">
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 active:scale-95"
          id="start-thread-btn"
        >
          <PenSquare size={17} />
          Start a New Thread
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <NewThreadModal
          onClose={() => setShowModal(false)}
          onSuccess={handleNewThread}
        />
      )}
    </div>
  );
}
