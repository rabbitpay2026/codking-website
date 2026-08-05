import type { ProofMetrics } from "@/types";

/**
 * The single source for every live number on the site (§11.1).
 *
 * Figures are the ones the product publishes. They are floors, and the UI is
 * responsible for rendering the "+".
 *
 * TODO(content): replace this static record with the Shopify App Store sync
 * described in §11, so proof updates itself instead of being a manual task.
 * The consuming repository already returns this behind an async function, so
 * the swap does not touch any component.
 */
export const proofMetrics: ProofMetrics = {
  merchantCount: 10_000,
  rating: 4.9,
  reviewCount: 850,
  countriesServed: 100,
};
