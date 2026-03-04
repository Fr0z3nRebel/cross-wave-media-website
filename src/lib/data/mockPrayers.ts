import type { PrayerRequest } from "@/types";

/**
 * Mock prayer requests for development, testing, or fallback.
 * Kept in codebase for future use (e.g. storybook, tests, offline demo).
 */
export const MOCK_PRAYERS: PrayerRequest[] = [
  {
    id: "prayer-1",
    content:
      "Praying for wisdom and courage to follow Jesus faithfully in a polarized workplace.",
    authorName: "Daniel K.",
    isAnonymized: false,
    supportCount: 18,
    tags: ["Wisdom", "Vocation"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prayer-2",
    content:
      "Asking the Lord to comfort a close friend walking through grief and uncertainty this year.",
    authorName: "Anonymous",
    isAnonymized: true,
    supportCount: 32,
    tags: ["Comfort", "Grief"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "prayer-3",
    content:
      "Seeking clarity about how to serve my local church and neighborhood with the gifts God has given.",
    authorName: "Maria",
    isAnonymized: false,
    supportCount: 9,
    tags: ["Calling", "Church"],
    createdAt: new Date().toISOString(),
  },
];
