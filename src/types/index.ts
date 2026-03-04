/**
 * Data models for Cross Wave Media.
 * Shared between Ledger, Resource Library, and Community features.
 */

export type ArticleCategory = "News" | "Analysis" | "Devotional";

export type ArticleStatus = "Draft" | "Published";

export interface ScriptureReference {
  reference: string;
  text?: string;
}

export interface ArticleAuthor {
  name: string;
  avatar: string;
}

export type PrayerTag = string;

export type ISODateString = string;

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  /**
   * Rich text payload from the CMS.
   * Keep as unknown so callers must explicitly narrow.
   */
  content: unknown;
  readingTime: number;
  linkedScripture: ScriptureReference[];
  author: ArticleAuthor;
  category: ArticleCategory;
  status: ArticleStatus;
  /**
   * Optional slug and imagery for routing and card layouts.
   * Not all Article sources are required to provide these.
   */
  slug?: string;
  imageUrl?: string;
}

export interface PrayerRequest {
  id: string;
  content: string;
  authorName: string;
  isAnonymized: boolean;
  supportCount: number;
  tags: PrayerTag[]; // e.g., "Healing", "Guidance"
  createdAt: ISODateString;
}

export * from "./prayer";

