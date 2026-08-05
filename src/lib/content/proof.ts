import { proofMetrics } from "@/data/proof";

import type { AppStoreReview, ProofMetrics } from "@/types";

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
