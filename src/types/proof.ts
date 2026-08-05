/**
 * Live proof — the numbers that appear in the hero trust line, the proof strip,
 * the footer badges and the pricing page.
 *
 * §11.1 is explicit: no live number is typed into page copy. Every surface
 * reads from this one shape, so the rating and review count can never disagree
 * between pages.
 */
export interface ProofMetrics {
  readonly merchantCount: number;
  /** App Store rating, e.g. 4.9. */
  readonly rating: number;
  readonly reviewCount: number;
  /**
   * `null` when not yet verified. The proof strip omits the figure rather than
   * rendering a placeholder (§5.1 #3).
   */
  readonly countriesServed: number | null;
}

/**
 * A single Shopify App Store review, synced rather than hand-copied (§11), so
 * proof updates itself instead of becoming a manual task.
 */
export interface AppStoreReview {
  readonly id: string;
  readonly author: string;
  readonly rating: number;
  readonly body: string;
  /** ISO-8601 date. */
  readonly publishedAt: string;
}
