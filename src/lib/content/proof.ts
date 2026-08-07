import { proofMetrics } from "@/data/proof";
import { reviewSnippets, stagedTestimonials } from "@/data/socialProof";
import { getCustomerStories } from "@/lib/content/customers";

import type {
  AppStoreReview,
  MerchantTestimonial,
  ProofMetrics,
  ReviewSnippet,
} from "@/types";

/**
 * Live proof figures (§11.1).
 *
 * Deliberately `async` even though the current implementation is synchronous:
 * §11 requires these to be synced from the Shopify App Store, and returning a
 * promise now means that swap is an edit to this function alone rather than a
 * breaking change to every component that renders a rating.
 */
export async function getProofMetrics(): Promise<ProofMetrics> {
  return proofMetrics;
}

/**
 * The live App Store review feed (§5.1 #8, §11).
 *
 * Returns an empty list until the sync is implemented. Consumers must treat an
 * empty feed as a valid state and render without it, never as an error.
 */
export async function getAppStoreReviews(): Promise<readonly AppStoreReview[]> {
  return [];
}

/**
 * How many testimonials the homepage carousel is allowed.
 *
 * A cap rather than a page size. Nobody clicks to the fifth dot; past four
 * the extra entries are content nobody reads attached to a control that looks
 * longer than it is worth using.
 */
const CAROUSEL_LIMIT = 4;

/**
 * Merchant testimonials for the homepage carousel (§5.1 #8).
 *
 * Published reviews first, always. `customerStories` are the ones merchants
 * actually wrote and are the strongest thing this section has; the staged
 * entries exist to fill a carousel that would otherwise be two slides long,
 * and they follow rather than lead. Order here is not cosmetic — the first
 * slide is the only one most visitors see.
 *
 * The published stories are re-shaped rather than re-typed. A story's own
 * metric becomes the caption ("Fake orders · Solved"), so the line under the
 * merchant's name is a fact they reported and not a job title invented for
 * them. They are five-star by definition: these are the reviews the product
 * publishes.
 *
 * Async for the same reason as the figures above — these become the top of the
 * App Store feed once the sync lands, and that swap happens here rather than
 * in the section. An empty list is a valid state.
 */
export async function getMerchantTestimonials(): Promise<
  readonly MerchantTestimonial[]
> {
  const published: readonly MerchantTestimonial[] = getCustomerStories().map(
    (story) => ({
      id: story.id,
      store: story.merchantName,
      caption: `${story.metricLabel} · ${story.metricValue}`,
      rating: 5,
      quote: story.quote,
    }),
  );

  return [...published, ...stagedTestimonials].slice(0, CAROUSEL_LIMIT);
}

/** One-line App Store review previews, for the review list (§5.1 #8). */
export async function getReviewSnippets(): Promise<readonly ReviewSnippet[]> {
  return reviewSnippets;
}
