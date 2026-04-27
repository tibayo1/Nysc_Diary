# Community Forum Design Spec

> **Date:** 2026-04-09
> **Feature:** Nairaland-style community forum for NYSC Diary
> **Status:** Approved

---

## 1. Overview

Transform the existing Community page (WhatsApp links + newsletter) into a full discussion forum where users can browse boards, create threads, and reply — all publicly without login. Data persists in Firebase Firestore with real-time sync.

### Goals
- Open, anonymous community forum (nickname per post, no auth)
- Pre-defined category boards (6 boards)
- Real-time thread/reply data via Firebase Firestore
- Nairaland-style bump ordering (last reply pushes thread to top)
- Integrates with existing app navigation (no router needed)

### Non-Goals (for this phase)
- User authentication / login
- Admin moderation tools
- Image/media uploads in posts
- Search functionality
- URL-based thread routing

---

## 2. UI Flow

Three internal views managed by local state in Community.tsx:

### View 1: Board List (landing)
- Hero section (updated text for forum context)
- 2-column grid of 6 board cards on desktop, 1 column on mobile
- Each card: icon, name, description, thread count, last post preview
- Floating "Create Thread" button

### View 2: Thread List (inside a board)
- Breadcrumb: Community > Board Name
- Board header with name + description
- "New Thread" button at top
- Thread rows: title, author, timestamp, reply count, last reply info
- Sorted by lastReplyAt descending (bump-to-top)
- "Load More" pagination

### View 3: Thread View (single thread)
- Breadcrumb: Community > Board Name > Thread Title
- Original post: author, timestamp, full content
- Reply list: chronological (oldest first)
- Reply form at bottom: nickname + content + submit

### Navigation
Board List -> click board -> Thread List -> click thread -> Thread View
Thread List -> "New Thread" -> CreateThreadForm

Back buttons at each level.

---

## 3. Data Model (Firestore)

### boards/{boardId}
| Field | Type | Description |
|---|---|---|
| name | string | "Camp Life" |
| slug | string | "camp-life" |
| description | string | Board description |
| icon | string | Icon identifier (lucide icon name) |
| order | number | Display sort order |
| threadCount | number | Denormalized counter |
| lastPost | map | { title, author, timestamp } |

### threads/{threadId}
| Field | Type | Description |
|---|---|---|
| boardId | string | Reference to parent board slug |
| title | string | Thread title |
| content | string | Thread body text |
| author | string | Nickname |
| createdAt | Timestamp | Creation time |
| lastReplyAt | Timestamp | Last reply time (for sorting) |
| replyCount | number | Denormalized counter |
| lastReply | map | { author, timestamp } |

### threads/{threadId}/replies/{replyId}
| Field | Type | Description |
|---|---|---|
| content | string | Reply body |
| author | string | Nickname |
| createdAt | Timestamp | Creation time |

---

## 4. File Structure

### New files
- src/firebase.ts — Firebase config and init
- src/components/community/BoardList.tsx — Board grid
- src/components/community/BoardCard.tsx — Individual board card
- src/components/community/ThreadList.tsx — Thread listing for a board
- src/components/community/ThreadRow.tsx — Single thread row
- src/components/community/ThreadView.tsx — Full thread + replies
- src/components/community/ReplyItem.tsx — Single reply
- src/components/community/CreateThreadForm.tsx — New thread form
- src/components/community/ReplyForm.tsx — Reply form

### Modified files
- src/types.ts — Add Board, Thread, Reply interfaces
- src/pages/Community.tsx — Full rewrite as forum shell
- package.json — Add firebase dependency

---

## 5. Component Details

| Component | Responsibility |
|---|---|
| Community.tsx | View state management (boards/threads/thread), delegates to sub-components |
| BoardList | Fetches boards from Firestore, renders BoardCard grid |
| BoardCard | Board icon, name, thread count, last post preview, click to enter |
| ThreadList | Fetches threads for a board, renders ThreadRow list + New Thread button |
| ThreadRow | Thread title, author, reply count, last activity — clickable |
| ThreadView | Fetches thread + replies, renders OP + ReplyItem list + ReplyForm |
| CreateThreadForm | Nickname + title + content, writes to Firestore, updates board counter |
| ReplyForm | Nickname + content, writes reply, updates thread counter + lastReply |

---

## 6. Firebase Configuration

### Security Rules (open access MVP)
Wide open for MVP: allow read/write on all collections. Lock to authenticated users when auth is added.

### Board Seeding
Auto-seed function in firebase.ts creates the 6 boards if they don't exist:
1. Camp Life — Camp experiences, tips, what to expect
2. PPA Discussions — Place of Primary Assignment talk, relocation, redeployment
3. NYSC News and Updates — Official announcements, policy changes, batch info
4. Opportunities — Jobs, scholarships, grants, side hustles for corpers
5. General Discussion — Off-topic, random banter, anything goes
6. Questions and Help — Ask the community anything NYSC-related

### User Requirement
User must create a Firebase project and provide config values (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).

---

## 7. Styling

Follows existing NYSC Diary design system:
- NYSC Green primary, Nigeria Orange accents
- Outfit (display) + DM Sans (body) fonts
- Rounded cards (rounded-2xl), soft shadows
- Consistent with existing page patterns (hero, reveal animations)
- Board cards use gradient icon containers matching existing trending topic cards
