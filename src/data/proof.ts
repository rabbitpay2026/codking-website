import type { ProofMetrics } from "@/types";

/**
 * The single source for every live number on the site (§11.1).
 *
 * Figures are the ones the product publishes. They are floors, and the UI is
 * responsible for rendering the "+".
 *
 * ── On `rating` ───────────────────────────────────────────────────────────
 * 5.0 is the presentation the site owner has asked the site to carry. It is
 * NOT the marketplace's own overall score: the COD King listing in the Shopify
 * App Store reads 4.9 across all 958 reviews, and the individual reviews the
 * band renders are genuinely five-star ones.
 *
 * The distinction matters for copy. Nothing on the site may describe this
 * figure as "the Shopify App Store rating" in so many words, because that
 * would state something the listing contradicts. The band shows the number and
 * its stars, which is the treatment that was asked for.
 *
 * Flagged here rather than quietly reconciled, because §11.1 makes this the
 * one place the figure is stated — and because the App Store sync below will
 * overwrite it with whatever the marketplace reports, at which point this note
 * and the override both need revisiting.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On `reviewCount` ──────────────────────────────────────────────────────
 * 958, the count the listing reports. Unlike the rating it is the
 * marketplace's own figure rather than a requested presentation, and it is a
 * floor in the sense every number in this record is: it only ever grows, which
 * is what earns the "+" the UI renders after it.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * TODO(content): replace this static record with the Shopify App Store sync
 * described in §11, so proof updates itself instead of being a manual task.
 * The consuming repository already returns this behind an async function, so
 * the swap does not touch any component.
 */
export const proofMetrics: ProofMetrics = {
  merchantCount: 10_000,
  rating: 5.0,
  reviewCount: 958,
  countriesServed: 100,
  ordersProcessed: 10_000_000,
  uptimePercent: 99.9,
};
