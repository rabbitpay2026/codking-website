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
 * A single Shopify App Store review, captured from the listing rather than
 * hand-copied (§11), so the reviewer and their words cannot be separated.
 *
 * `id` is the marketplace's own review id, which is what makes a capture
 * idempotent: re-running the harvester recognises a review it already holds
 * instead of appending a second copy under a new key.
 */
export interface AppStoreReview {
  readonly id: string;
  /** The store that left the review, as the marketplace prints it. */
  readonly author: string;
  /** Stars left, 1–5. Never rounded, never adjusted. */
  readonly rating: number;
  /**
   * The review text, verbatim. Newlines are the reviewer's own paragraph
   * breaks; an empty string is a rating left without words, which the
   * marketplace allows and which the UI must render rather than discard.
   */
  readonly body: string;
  /** ISO-8601 date. */
  readonly publishedAt: string;
  /** The marketplace marks a review the merchant later revised. */
  readonly edited?: boolean;
  /** Where the store trades, where the listing shows it. */
  readonly country?: string;
}

/**
 * What the marketplace itself reports about the listing.
 *
 * Kept apart from `ProofMetrics` on purpose. That record holds the figures the
 * site presents; this one holds the App Store's own, and the two currently
 * disagree on the rating by design — see the note in `src/data/proof.ts`. A
 * page that shows both has to be able to name which is which.
 */
export interface AppStoreListing {
  /** The public reviews page these figures and reviews were read from. */
  readonly url: string;
  /** Every review on the listing, not only the ones captured locally. */
  readonly totalReviews: number;
  /** The marketplace's own average, to one decimal. */
  readonly averageRating: number;
  /** How many reviews sit at each star level, five down to one. */
  readonly distribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
  /** ISO-8601 date the capture was taken. */
  readonly capturedOn: string;
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
