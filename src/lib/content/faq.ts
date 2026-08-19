import { faqPageCategories, faqPageCopy, faqPageFacts, faqs } from "@/data/faq";

import type { FaqItem, FaqTag, ResolvedFaqPageCategory } from "@/types";

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

/** The FAQ page's own headings and close. */
export function getFaqPageCopy(): typeof faqPageCopy {
  return faqPageCopy;
}

/** The four facts the FAQ hero summarises the page with. */
export function getFaqPageFacts(): typeof faqPageFacts {
  return faqPageFacts;
}

/**
 * The FAQ page's categories, with every id resolved to a real question (§2).
 *
 * Resolution happens here rather than in the page for the reason every other
 * reader in this folder gives: the page should depend on the shape of the
 * content, not on where it lives. It also means the page and the FAQPage
 * structured data are built from one object, so the schema cannot list a
 * question the page does not render — which is the failure mode this kind of
 * markup is penalised for.
 *
 * A category whose entries all resolve to nothing is dropped rather than
 * rendered as a heading over empty space.
 */
export function getFaqPageCategories(): readonly ResolvedFaqPageCategory[] {
  return faqPageCategories
    .map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
      items: category.entries.flatMap((entry) => {
        const faq = faqs.find((item) => item.id === entry.id);
        return faq ? [{ faq, links: entry.links ?? [] }] : [];
      }),
    }))
    .filter((category) => category.items.length > 0);
}
