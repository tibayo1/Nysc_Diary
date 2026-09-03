# NYSC Diary Blog — Design Spec
**Date:** 2026-09-03  
**Status:** Approved  
**Author:** Ayoade Adeyemi

---

## Overview

Add a full-featured blog to NYSC Diary where admins and editors can publish NYSC-related articles, guides, news, corps member stories, state guides, tips, and photo posts. Readers can search, filter by category, react with emojis, and leave comments.

---

## Tech Stack

| Concern | Tool |
|---|---|
| CMS / authoring | **Sanity** (hosted, free tier — up to 3 users) |
| Content API | Sanity GROQ queries via `@sanity/client` |
| Rendering | Existing React + Vite site (new Blog pages added) |
| Comments & reactions | **Firebase Firestore** (already in project) |
| Search | Client-side full-text search across fetched posts |
| Deployment | Existing Cloudflare Pages |

---

## Content Model (Sanity Schema)

### `post`
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Auto-generated from title |
| `category` | string (enum) | Guides, News, Stories, State Guides, Tips, Photos |
| `tags` | array of strings | e.g. ["camp", "PPA", "Kwara"] |
| `coverImage` | image | With alt text |
| `author` | reference → `author` | |
| `publishedAt` | datetime | Scheduled publishing supported |
| `excerpt` | text | Short preview (max 200 chars) |
| `body` | Portable Text (block) | Rich text with headings, images, lists, links |
| `readTime` | number | Calculated on publish (words / 200) |
| `featured` | boolean | Pins post to top of listing |
| `state` | string (optional) | For state-specific posts |

### `author`
| Field | Type |
|---|---|
| `name` | string |
| `bio` | text |
| `avatar` | image |
| `role` | string (Admin / Editor / Contributor) |

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/blog` | `BlogListing` | All posts, search, category tabs |
| `/blog/:slug` | `BlogPost` | Full article view |

Both pages are added to the existing state-based router in `App.tsx` (same pattern as current pages).

---

## Blog Listing Page (`/blog`)

- **Hero:** "NYSC Blog" heading + subtitle
- **Search bar:** Client-side filter across title, excerpt, tags
- **Category tabs:** All · Guides · News · Stories · State Guides · Tips · Photos
- **Post grid:** 3-column (desktop), 2-column (tablet), 1-column (mobile)
- **Post card:** Cover image, category badge, title, author avatar + name, date, read time, excerpt (truncated), "Read more" link
- **Featured post:** Full-width card pinned at top when `featured: true`
- **Empty state:** Friendly message if no posts match filter/search

---

## Blog Post Page (`/blog/:slug`)

- **Breadcrumb:** Home → Blog → [Category]
- **Cover image:** Full-width hero
- **Category badge** + **title** + **author row** (avatar, name, date, read time)
- **Share buttons:** Twitter/X, WhatsApp, Copy link
- **Article body:** Rendered Portable Text (headings, paragraphs, images, bullet lists, blockquotes, links)
- **Sidebar (desktop):**
  - Related posts (same category, max 3)
  - "Ask DiaryTalks" CTA — links to DiaryTalks with the post title pre-filled
- **Reactions:** Emoji row (👍 ❤️ 😮 😢 🔥) — stored in Firestore, anonymous or by session
- **Comments:** Firestore-backed, requires display name (no login needed), moderated by admin via Firebase Console

---

## Sanity Studio

- Hosted at `https://nyscdiary.sanity.studio` (Sanity's free hosting)
- Editors log in with Google/email
- Can draft, preview, and schedule posts
- Image uploads handled by Sanity's CDN (no extra storage cost)

---

## Navigation Integration

- Add **"Blog"** link to the main site navigation (between Home and DiaryTalks)
- Link from Home page hero section: "Read the Blog →"
- DiaryTalks assistant can suggest relevant blog posts in its answers

---

## Firebase Firestore Collections

| Collection | Purpose |
|---|---|
| `blog_reactions` | `{ postSlug, emoji, count }` — aggregated counts |
| `blog_comments` | `{ postSlug, name, body, createdAt, approved }` |

Comments require admin approval before showing publicly (simple `approved` boolean, toggled in Firebase Console).

---

## Error & Loading States

- **Loading:** Skeleton cards during fetch
- **Fetch error:** "Couldn't load posts — please refresh" with retry button
- **Empty search:** "No posts found for '[query]'. Try a different keyword."
- **Post not found:** Friendly 404 with link back to blog listing

---

## Out of Scope (this version)

- Author-facing submission portal for corps members (can add later)
- Newsletter signup
- RSS feed
- Pagination (will use infinite scroll or "Load more" if post count grows past 20)
- Full-text search via Algolia or Typesense (client-side search sufficient for now)

---

## Verification Plan

1. Sanity Studio is accessible and posts can be created/edited/published
2. Blog listing renders correctly on desktop, tablet, mobile
3. Search and category filters work correctly
4. Individual post pages render Portable Text correctly (headings, images, lists)
5. Reactions update in real time via Firestore
6. Comments submit, appear after approval
7. Share buttons work (Twitter, WhatsApp, copy link)
8. "Ask DiaryTalks" CTA pre-fills the question correctly
9. Cloudflare Pages build passes with new Sanity env vars
