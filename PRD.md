# PRD: Cross Wave Media — Premium Christian Media Platform

## 1. Executive Summary

**Cross Wave Media** is a digital-first editorial and resource hub designed to bridge the gap between biblical truth and modern cultural discourse. It aims to replace the "cluttered" feel of traditional faith-based sites with an **Architectural, Minimalist, and High-Performance** interface.

* **Primary Goal:** Establish a "Digital Sanctuary" for intellectual and spiritual growth.
* **Target Audience:** Thoughtful Christians, ministry leaders, and news-literate believers seeking a biblical lens on current events.

---

## 2. User Personas

| Persona | Need | Platform Solution |
| --- | --- | --- |
| **The Analyst** | Needs to see how global news intersects with theology. | "The Ledger" with Scripture-linked insights. |
| **The Educator** | Needs high-quality, printable resources for small groups. | Filterable Resource Library with PDF previews. |
| **The Intercessor** | Needs a quiet space to pray for others and be heard. | The "Stories & Prayers" masonry wall with low-friction interaction. |

---

## 3. Design System & Brand Identity

The aesthetic is **"Modern Liturgical."** It should feel like a high-end architectural firm designed a cathedral.

### Design Tokens

* **Typography:** * *Headings:* Playfair Display or Lora (Elegant Serifs).
* *Body:* Inter or Geist Sans (Clean, High-Readability Sans).


* **Visual Language:** * **The Wave:** Symbolic of "living water" and the "cross-currents" of media.
* **Borders:** 1px "Muted" strokes (Slate-200/800) to create a blueprint-like structure.



---

## 4. Functional Specifications

### A. The Ledger (Editorial Engine)

* **Scripture Tooltips:** Using a library like `ibible-api`, any Scripture reference in the text should trigger a hover-state tooltip showing the full verse.
* **Reading Time & Progress:** A subtle top-border progress bar as the user scrolls through analytical pieces.
* **"The Deep Link":** A footer section on every article connecting the news piece to a specific "Resource" (Book/Worksheet) for further study.

### B. Resource Library (The Vault)

* **Search & Discovery:** Implement **Command+K (CMDK)** functionality for universal site search (Articles, Books, Prayers).
* **Instant Previews:** Hovering over a resource card initiates a "Quick View" modal to see the Table of Contents without leaving the page.

### C. Stories & Prayers (Community)

* **Anonymity Toggle:** Users can post as "Public," "Initials Only," or "Anonymous."
* **Engagement:** The "Prayed for This" button triggers a confetti-lite or "Wave" ripple animation using `framer-motion`.
* **Moderation:** Integration with a basic profanity filter API for community-submitted content.

---

## 5. Technical Architecture (Refined)

### Content Infrastructure

* **CMS:** Headless CMS (Payload CMS or Sanity.io) to manage "The Ledger" and "Resource" metadata.
* **Auth (Optional but Recommended):** **Clerk** or **NextAuth.js** for personalized prayer walls and "Saved Resources."
* **Search:** **Algolia** or **Meilisearch** for high-speed indexing of the Resource Library.

### Refined Data Models (`@/types/index.ts`)

```typescript
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: any; // Rich Text from CMS
  readingTime: number;
  linkedScripture: { reference: string; text?: string }[];
  author: { name: string; avatar: string };
  category: 'News' | 'Analysis' | 'Devotional';
  status: 'Draft' | 'Published';
}

export interface PrayerRequest {
  id: string;
  content: string;
  authorName: string;
  isAnonymized: boolean;
  supportCount: number;
  tags: string[]; // e.g., "Healing", "Guidance"
  createdAt: string;
}

```

---

## 6. Non-Functional Requirements (The "Premium" Bar)

### Performance & SEO

* **Core Web Vitals:** LCP < 1.2s. Use Next.js `priority` tags for Hero images.
* **Streaming:** Use React `Suspense` boundaries for the Prayer Wall and Ledger Feed to ensure the page frame loads instantly while data fetches.
* **Structured Data:** JSON-LD for "Articles" and "NewsMediaOrganization" to dominate SEO for faith-based analysis.

### Accessibility (A11y)

* **Screen Readers:** High-contrast ratios and descriptive `aria-labels` on the WaveDivider (marking it as decorative).
* **Keyboard Nav:** Focus-visible states must be custom-styled to match the Teal/Gold highlight palette.

---

## 7. Roadmap & Phases

### Phase 1: MVP (The Foundation)

* Next.js 16 Scaffold + Tailwind/shadcn setup.
* The Ledger (CMS integration) + Home Landing Page.
* Resource Library (Basic PDF downloads).

### Phase 2: Community (The Pulse)

* Prayer Wall integration.
* Search (CMDK) implementation.
* Newsletter integration (The Ledger Weekly).

### Phase 3: Premium Features

* User Profiles (Save for later).
* Interactive Bible Study Worksheets (In-browser form filling).
