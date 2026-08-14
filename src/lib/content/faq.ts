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

/**
 * Named questions, in the order asked for.
 *
 * A tag says which questions a surface may show; it cannot say which order to
 * ask them in, and the pricing page's order is an argument — trial, then bill,
 * then the two ways out of it. Unknown ids are dropped rather than rendered as
 * gaps, so removing a question from the pool cannot break a page.
 */
export function getFaqsByIds(ids: readonly string[]): readonly FaqItem[] {
  return ids
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq): faq is FaqItem => faq !== undefined);
}
