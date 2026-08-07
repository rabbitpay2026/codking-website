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
  /**
   * Lifetime COD orders processed, stored whole.
   *
   * The scale band renders it compactly ("10M+"), but the compaction is the
   * presentation layer's job — storing the display string here would make the
   * figure impossible to compare, sum or sync against the source it will
   * eventually come from.
   */
  readonly ordersProcessed: number;
  /** Rolling platform availability as a percentage, e.g. 99.9. */
  readonly uptimePercent: number;
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

/**
 * A merchant testimonial, as the homepage carousel renders it.
 *
 * Deliberately flatter than `CustomerStory`. A story carries one verifiable
 * metric and the controls that produced it, because it is reused as evidence
 * on the control pages. This shape carries only what fits on a compact card:
 * a store, one supporting line, and the words.
 *
 * `caption` is that supporting line, and it is a plain string rather than a
 * set of fields because it is not the same fact on every card. A published
 * review carries the merchant's own metric; a staged one carries the person
 * and their role. Both are one muted line under a store name, and modelling
 * that as two optional shapes would buy nothing the renderer could use.
 */
export interface MerchantTestimonial {
  readonly id: string;
  /** The shop, which is also what the monogram is built from. */
  readonly store: string;
  /** One muted line under the store, e.g. "Fake orders · Solved". */
  readonly caption: string;
  /** Stars this merchant left, out of five. */
  readonly rating: number;
  readonly quote: string;
}

/**
 * One row of the App Store review list — a store, stars and a single line.
 *
 * The preview is stored already shortened rather than truncated at render
 * time: a review cut mid-clause reads as a bug, and only a human knows which
 * clause was the point.
 */
export interface ReviewSnippet {
  readonly id: string;
  readonly store: string;
  readonly rating: number;
  readonly preview: string;
}
