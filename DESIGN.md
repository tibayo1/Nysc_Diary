# Design System: NYSC Diary

> **Tagline:** "Creating a community of opportunities"
> **Platform:** Web (Desktop & Mobile Responsive)
> **Stack:** Vite + React + TypeScript + TailwindCSS

---

## 1. Visual Theme & Atmosphere

NYSC Diary presents a **clean, institutional** digital presence rooted in the Nigerian National Youth Service Corps identity. The current atmosphere is **functional and professional** — a steady foundation built on the NYSC green that conveys trust and authority.

The design philosophy leans toward **structured clarity** — generous whitespace, predictable grids, and consistent component patterns create an accessible reading experience. However, the visual language currently lacks the **youthful energy and community warmth** that defines the brand's personality on social media.

**Mood Keywords:** Clean, Professional, Institutional Green, Community-Focused, Content-First

---

## 2. Color Palette & Roles

### Primary Colors

| Name | Hex | Role |
|---|---|---|
| **NYSC Green** | `#16a34a` | Primary actions, CTAs, active navigation, icons, badges |
| **Forest Canopy** | `#15803d` | Hero gradients, hover states, secondary buttons |
| **Deep Forest** | `#166534` | Dark button fills, emphatic hover states |

### Secondary / Accent (from Logo — currently underused)

| Name | Hex | Role |
|---|---|---|
| **Nigeria Orange** | `#F97316` | Logo accent color — should be used for highlights, tags, and energy elements |
| **Warm Amber** | `#FB923C` | Secondary accent for badges, notifications, and CTAs |

### Neutral Palette

| Name | Hex | Role |
|---|---|---|
| **Charcoal Night** | `#111827` | Page headings, footer background, strongest text |
| **Storm Slate** | `#374151` | Body text, secondary headings |
| **Fog Gray** | `#6b7280` | Meta information — dates, read times, captions |
| **Cloud Cover** | `#f9fafb` | Page backgrounds, alternating section fills |
| **Paper White** | `#ffffff` | Card backgrounds, primary content surfaces |

### Tint Palette (Greens)

| Name | Hex | Role |
|---|---|---|
| **Morning Dew** | `#f0fdf4` | Featured section backgrounds, subtle green tints |
| **Spring Mist** | `#dcfce7` | Icon container backgrounds, badge fills, tag backgrounds |
| **Meadow Light** | `#bbf7d0` | Progress indicators, light accents |

---

## 3. Typography Rules

**Current:** System sans-serif stack (generic, utilitarian)

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

**Recommended Upgrade:**
- **Display / Headings:** Outfit (Google Fonts) — modern, geometric, youthful
- **Body / UI:** DM Sans (Google Fonts) — clean, highly readable, pairs well

**Weight Scale:**
- `700` (Bold) — Page headings, hero titles, card titles
- `600` (Semibold) — Buttons, navigation labels, section headings
- `400` (Regular) — Body text, descriptions, meta info

**Size Scale (Tailwind):**
- Hero H1: `text-4xl md:text-6xl`
- Section H2: `text-3xl`
- Card Title: `text-xl`
- Body: `text-base` (16px)
- Meta: `text-sm` (14px)

---

## 4. Component Stylings

### Buttons
- **Primary CTA:** NYSC Green fill (`#16a34a`), white text, gently rounded corners (`rounded-lg`, ~8px), darkens to Forest Canopy on hover
- **Secondary:** Deep Forest fill or ghost style (green border + green text)
- **Inverted (on green):** Paper White fill, NYSC Green text

### Cards / Containers
- **Corner Roundness:** Generously rounded (`rounded-xl`, ~12px) for cards; luxuriously rounded (`rounded-2xl`, ~16px) for feature sections
- **Background:** Paper White on Cloud Cover sections
- **Depth:** Whisper-soft shadow at rest (`shadow-sm`), gentle elevation on hover (`shadow-md`)
- **Image containers:** Full width, cropped to fixed height (`h-48` to `h-80`), object-cover

### Inputs / Forms
- **Border:** Light gray stroke (`border-gray-300`)
- **Focus:** Double-ring NYSC Green (`focus:ring-2 focus:ring-green-600`) with border dissolve (`focus:border-transparent`)
- **Corner:** Softly rounded (`rounded-lg`)
- **Padding:** Comfortable (`px-4 py-3`)

### Navigation
- **Header:** Sticky white bar, slight shadow (`shadow-sm`), `z-50`
- **Active State:** NYSC Green text color
- **Mobile:** Hamburger menu expanding to full-width dropdown

### Hero Sections
- **Background:** Gradient from NYSC Green to Forest Canopy (`from-green-600 to-green-700`)
- **Text:** Centered white, bold headings with lighter subtitle text (`text-green-50`)
- **Padding:** Generous vertical (`py-16` to `py-28`)

---

## 5. Layout Principles

- **Container:** Max width `1280px` (`max-w-7xl`), centered with horizontal padding
- **Section Spacing:** `py-16` (64px) vertical padding between major sections
- **Grid:** Responsive 1→2→3 column grid using Tailwind's `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Card Gap:** `gap-6` (24px) between grid items
- **Content Width:** Prose sections constrained to `max-w-3xl` for readability

---

## 6. Brand Assets

- **Logo:** NYSC Diary notebook icon (diary with spiral binding, "NY SC DIARY" text)
- **Tagline:** "Creating a community of opportunities"
- **Social Handle:** @nyscdiary (Instagram)
- **Contact:** help@nyscdiary.com
