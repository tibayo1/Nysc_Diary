import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

// Warn clearly about missing env vars (visible in Cloudflare Pages build logs)
const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => `VITE_FIREBASE_${k.replace(/([A-Z])/g, '_$1').toUpperCase()}`);

if (missing.length > 0) {
  console.error(
    '[NYSC Diary] Missing Firebase env vars – set these in Cloudflare Pages → Settings → Environment variables:\n' +
    missing.join('\n')
  );
}

// Safe initialization: don't let a missing env var crash the whole app at module load time
let _app: FirebaseApp | null = null;
let _db: Firestore | null = null;

try {
  _app = initializeApp(firebaseConfig as Record<string, string>);
  _db = getFirestore(_app);
} catch (e) {
  console.error('[NYSC Diary] Firebase initialization failed:', e);
}

export const db = _db;
