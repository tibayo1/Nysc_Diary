import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Thread, Reply } from '../types';

// ─── Username derivation ──────────────────────────────────────────────────────
export function deriveUsername(email: string): string {
  return email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

// ─── Threads ──────────────────────────────────────────────────────────────────

// Fetch all threads once, filter in JS to avoid composite index requirements
async function fetchAllThreads(): Promise<Thread[]> {
  const q = query(collection(db, 'threads'), orderBy('createdAt', 'desc'), limit(100));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Thread, 'id'>) }));
}

export async function getPinnedThread(): Promise<Thread | null> {
  const all = await fetchAllThreads();
  return all.find((t) => t.pinned) ?? null;
}

export async function getThreads(tag?: string): Promise<Thread[]> {
  const all = await fetchAllThreads();
  const unpinned = all.filter((t) => !t.pinned);
  if (!tag || tag === 'All') return unpinned;
  return unpinned.filter((t) => t.tag === tag);
}

export async function getThreadById(threadId: string): Promise<Thread | null> {
  const ref = doc(db, 'threads', threadId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Thread, 'id'>) };
}

export async function createThread(data: {
  title: string;
  body: string;
  tag: string;
  authorEmail: string;
}): Promise<string> {
  const ref = await addDoc(collection(db, 'threads'), {
    title: data.title,
    body: data.body,
    tag: data.tag,
    authorEmail: data.authorEmail,
    authorUsername: deriveUsername(data.authorEmail),
    createdAt: serverTimestamp(),
    replyCount: 0,
    pinned: false,
  });
  return ref.id;
}

// ─── Replies ──────────────────────────────────────────────────────────────────
export async function getReplies(threadId: string): Promise<Reply[]> {
  const q = query(
    collection(db, 'threads', threadId, 'replies'),
    orderBy('createdAt', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Reply, 'id'>) }));
}

export async function createReply(
  threadId: string,
  data: { body: string; authorEmail: string }
): Promise<Reply> {
  const repliesRef = collection(db, 'threads', threadId, 'replies');
  const ref = await addDoc(repliesRef, {
    body: data.body,
    authorEmail: data.authorEmail,
    authorUsername: deriveUsername(data.authorEmail),
    createdAt: serverTimestamp(),
  });
  // Increment reply count on parent thread
  await updateDoc(doc(db, 'threads', threadId), { replyCount: increment(1) });

  return {
    id: ref.id,
    body: data.body,
    authorEmail: data.authorEmail,
    authorUsername: deriveUsername(data.authorEmail),
    createdAt: Timestamp.now(),
  };
}

// ─── Time helper ─────────────────────────────────────────────────────────────
export function relativeTime(ts: Timestamp | null | undefined): string {
  if (!ts) return '';
  const seconds = Math.floor((Date.now() - ts.toMillis()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
