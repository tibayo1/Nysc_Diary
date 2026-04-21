# Community Threads Feature — Design Spec
**Date:** 2026-04-21  
**Status:** Approved for implementation

---

## Overview

Add a community discussion section to NYSC Diary where corps members can create threads, reply to others, and browse by topic — no login required. Users only need to provide an email address to post or reply. The feature lives in the existing `/community` page (replacing the current newsletter-only layout) with Firebase Firestore as the data store.

The design is inspired by Nairaland's open-forum energy but modernized: a scrollable thread feed with tag filtering, a permanent pinned "central thread" at the top, and full-page thread detail views.

---

## Core Decisions

| Decision | Choice | Reason |
|---|---|---|
| Structure | Tag-filtered feed | Flexible, no hard categories, grows naturally |
| Identity | Auto-username from email | Personal feel without exposing full email |
| Storage | Firebase Firestore (free tier) | Real-time, zero backend cost, easy setup |
| Thread view | Full-page detail view | Gives each conversation proper space |
| Auth | Email-only (no login) | Zero friction, enough to reduce spam |

---

## Data Model (Firestore)

### Collection: `threads`

```
threads/{threadId}
  id: string
  title: string
  body: string
  tag: string               // one of the 8 tags below, or "General"
  authorEmail: string       // stored privately, never displayed
  authorUsername: string    // derived: text before @ in email, e.g. "chioma_k"
  createdAt: Timestamp
  replyCount: number        // denormalized counter for feed display
  pinned: boolean           // true only for the central thread
```

### Sub-collection: `threads/{threadId}/replies`

```
replies/{replyId}
  id: string
  body: string
  authorEmail: string       // stored privately
  authorUsername: string    // derived from email
  createdAt: Timestamp
```

**Username derivation rule:** Take the part before `@`, replace non-alphanumeric chars with `_`, lowercase. e.g. `Chioma.K@gmail.com` → `chioma_k`.

**Email privacy:** `authorEmail` is written to Firestore but never fetched by the client — the app only ever reads `authorUsername`, `title`, `body`, `tag`, `createdAt`, and `replyCount`. Firestore does not support field-level read restrictions, so privacy is enforced by convention: no client query ever selects `authorEmail`. It is only visible via the Firebase Console to the site admin.

---

## Tags

Eight fixed tags (plus the implicit "General" for the pinned thread):

| Emoji | Tag Name | Use case |
|---|---|---|
| 🏕️ | Camp Life | Orientation camp tips, stories, experiences |
| 🏢 | PPA | Primary Place of Assignment |
| 💸 | Allowance | Payment, delays, amounts |
| 💼 | Jobs & Opportunities | Internships, job postings |
| 📣 | Rant | Venting, frustrations |
| 📖 | Advice | Guidance, questions |
| 🏆 | Wins | Celebrating achievements |
| 🗺️ | State Guide | State-specific tips |

---

## Screen 1 — Community Feed (`/community`)

### Layout

1. **Page hero** — Existing community hero section (keep as-is)
2. **Pinned Central Thread card** — Always at top, visually distinct (green border + "📌 PINNED" badge). Links to the thread detail page for that thread.
3. **Tag filter bar** — Horizontal scrollable row of pill buttons. "All" is selected by default. Clicking a tag filters the feed below. Does not filter the pinned thread.
4. **Thread feed** — Ordered by `createdAt` descending (newest first). Each card shows:
   - Thread title
   - Tag badge (colored by tag)
   - `authorUsername` + relative time (e.g. "3h ago") + reply count
5. **"+ Start a Thread" button** — Fixed orange button below the feed. Opens the new-thread modal.

### New Thread Modal (or inline form)

Fields:
- **Title** (required, max 120 chars)
- **Body** (required, min 20 chars)
- **Tag** (required dropdown — one of the 8 tags)
- **Your email** (required, validated, never displayed)

On submit:
1. Derive `authorUsername` from email
2. Write to Firestore `threads` collection
3. Close modal, new thread appears at top of feed
4. Show a brief toast: *"Thread posted!"*

---

## Screen 2 — Thread Detail View

Triggered when a thread card is clicked. Renders as a new view/state (not a real route change since the app is SPA without a router — use a `selectedThreadId` state in the Community component).

### Layout

1. **Back link** — "← Back to Community" at top
2. **Original Post card** — Full post: avatar circle (first letter of username, colored), username, relative time, tag badge, title (large), body
3. **Replies section** — Header "💬 N Replies". Each reply shows: avatar, username, relative time, body. Ordered oldest-first (chronological).
4. **Reply form** — At bottom of page:
   - **Email** field (required, placeholder: `your@email.com`)
   - **Reply body** textarea (required, min 10 chars)
   - **"Post Reply"** button (green)
   - On submit: derive username, write to `replies` sub-collection, increment `replyCount` on parent thread (use Firestore transaction or increment), show reply immediately in list

---

## Pinned Central Thread

- Created manually via Firebase Console (or a one-time seed script)
- `pinned: true`, `tag: "General"`, title: `"Welcome to NYSC Diary Community — Read First! 👋"`
- Body: welcoming message explaining community rules (no spam, be respectful, etc.)
- Always shown at the top of the feed regardless of active tag filter

---

## Firebase Setup Requirements

1. Create a Firebase project at console.firebase.google.com
2. Enable Firestore in production mode
3. Add Firebase SDK config to the project (via `.env` variables)
4. Set Firestore Security Rules:
   - `threads`: allow read (all), allow create (authenticated by email presence in request)
   - `replies`: allow read (all), allow create (email presence check)
   - `authorEmail` field: deny reads via field-level rules (mask with `.data` rule)
5. Add Firebase config to `.env.local` (not committed to git)

---

## Component Architecture

```
src/
  pages/
    Community.tsx          ← MODIFY: replace newsletter card with full community UI
  components/
    community/
      ThreadFeed.tsx        ← NEW: feed list + tag filter bar
      ThreadCard.tsx        ← NEW: single thread card in feed
      ThreadDetail.tsx      ← NEW: full-page thread + replies view
      ReplyList.tsx         ← NEW: ordered list of replies
      NewThreadModal.tsx    ← NEW: modal/form for creating threads
      TagFilterBar.tsx      ← NEW: horizontal scrollable tag pills
  lib/
    firebase.ts             ← NEW: Firebase app init + Firestore instance
    threads.ts              ← NEW: Firestore read/write helpers (getThreads, createThread, getReplies, createReply)
  types.ts                  ← MODIFY: add Thread and Reply interfaces
```

---

## Spam & Moderation

- **Email requirement** — basic friction to deter bots
- **No anonymous posting** — username always visible
- **Moderation:** NYSC Diary team can delete documents directly from Firebase Console
- **Future:** add reportThread() that flags a document for review (out of scope for v1)

---

## Out of Scope (v1)

- Login / accounts
- Upvotes / likes
- Thread search
- Notifications / email digests
- Pagination (load first 50 threads, add "Load more" later)
- Image uploads in threads
- Thread editing / deletion by users
