export interface SubmitPrayerRequest {
  content: string;
  authorName: string;
  isAnonymized: boolean;
  tags?: string[];
  /**
   * Cloudflare Turnstile response token.
   */
  turnstileToken: string;
}

export interface SubmitPrayerResponse {
  success: true;
  prayer: {
    id: string;
    content: string;
    authorName: string;
    isAnonymized: boolean;
    supportCount: number;
    tags: string[];
    createdAt: string;
  };
}

export interface SubmitPrayerError {
  success: false;
  error: string;
}

export type SubmitPrayerResult = SubmitPrayerResponse | SubmitPrayerError;

export interface SupportPrayerResponse {
  success: true;
  supportCount: number;
}

export interface SupportPrayerError {
  success: false;
  error: string;
  supportCount?: number;
}

export type SupportPrayerResult =
  | SupportPrayerResponse
  | SupportPrayerError;

