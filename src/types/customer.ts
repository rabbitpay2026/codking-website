import type { ControlSlug } from "@/types/controls";

/**
 * A named merchant story with exactly one metric (§5.1 #8, §12).
 *
 * The single-metric constraint is deliberate and enforced by the shape: §10.1
 * requires every claim to point at a source, and a story card that carries one
 * verifiable number is stronger than one carrying three vague ones.
 */
export interface CustomerStory {
  readonly id: string;
  readonly merchantName: string;
  /** What the metric measures, e.g. "RTO reduction". */
  readonly metricLabel: string;
  /** The metric itself, pre-formatted, e.g. "-34%". */
  readonly metricValue: string;
  readonly quote: string;
  /** Controls this merchant credits, so the story can be reused on their pages. */
  readonly controlSlugs: readonly ControlSlug[];
}
