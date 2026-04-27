/**
 * One-time seed script — creates the pinned central thread in Firestore.
 * Run once: node seed-pinned-thread.mjs
 *
 * Requires: VITE_ env vars in .env.local (or set them manually below)
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';

// Read .env.local manually
const envRaw = readFileSync('.env.local', 'utf-8');
const env = Object.fromEntries(
  envRaw.split('\n').filter(Boolean).map((l) => l.split('='))
);

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);

const ref = await addDoc(collection(db, 'threads'), {
  title: 'Welcome to NYSC Diary Community — Read First! 👋',
  body: `Hello and welcome to the NYSC Diary Community! 🇳🇬

This is your go-to space to connect with fellow corps members across Nigeria. Whether you're heading to camp, navigating your PPA, waiting on your allowance, or just need to share a win — you're in the right place.

📌 A few simple rules:
1. Be respectful — every corper is going through something different
2. No spam or fake job postings
3. Verify information before sharing — especially about allowances and postings
4. Support one another — that's what community is about

Start a thread, drop a reply, or just browse. We're glad you're here.

— The NYSC Diary Team`,
  tag: 'General',
  authorEmail: 'admin@nyscdiary.com',
  authorUsername: 'nyscdiary',
  createdAt: serverTimestamp(),
  replyCount: 0,
  pinned: true,
});

console.log('✅ Pinned thread created with ID:', ref.id);
process.exit(0);
