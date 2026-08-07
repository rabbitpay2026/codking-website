import { faqs } from "@/data/faq";

import type { FaqItem, FaqTag } from "@/types";

/**
 * Questions for one surface, drawn from the single tagged pool (§11).
 *
 * Pages ask for what they need — `"home"`, `"pricing"`, `` `control:${slug}` ``
 * — rather than owning their own list, so the same answer is written once and
 * stays consistent wherever it appears.
 */
export function getFaqsByTag(tag: FaqTag): readonly FaqItem[] {
  return faqs.filter((faq) => faq.tags.includes(tag));
}
