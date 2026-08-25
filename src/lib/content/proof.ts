import { appStoreListing, appStoreReviews } from "@/data/appStoreReviews";
import { proofMetrics } from "@/data/proof";
import { reviewSnippets, stagedTestimonials } from "@/data/socialProof";
import { getCustomerStories } from "@/lib/content/customers";

import type {
  AppStoreListing,
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
 * The App Store review feed (§5.1 #8, §11).
 *
 * Backed by the capture in `src/data/appStoreReviews.ts` rather than the empty
 * list this used to return. Still async, and still the seam a live sync would
 * replace: swapping the capture for a scheduled fetch is an edit to this
 * function and nothing else.
 *
 * An empty feed remains a valid state and consumers must render without it
 * rather than treat it as an error — the customers page does exactly that.
 */
export async function getAppStoreReviews(): Promise<readonly AppStoreReview[]> {
  return appStoreReviews;
}

/**
 * What the marketplace itself reports — its totals, its average, its
 * distribution, and the address they were read from.
 *
 * Deliberately separate from `getProofMetrics()`. That returns the figures the
 * site presents; this returns the App Store's own, and the two do not agree on
 * the rating. Any surface showing both has to be able to say which is which,
 * and it can only do that if they arrive from different functions.
 */
export async function getAppStoreListing(): Promise<AppStoreListing> {
  return appStoreListing;
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
 * actually wrote and are the strongest thing this section has; the App Store
 * entries in `socialProof` fill a carousel that would otherwise be two slides
 * long, and they follow rather than lead. Order here is not cosmetic — the
 * first slide is the only one most visitors see.
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
