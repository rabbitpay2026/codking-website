import { legalDocuments } from "@/data/legal";

import type { LegalDocument, LegalSlug } from "@/types";

export function getLegalDocuments(): readonly LegalDocument[] {
  return legalDocuments;
}

/**
 * One document, by slug.
 *
 * The parameter is the slug union rather than a string: each of the four
 * documents now has a static page of its own, so there is no dynamic segment
 * left that could ask for one that does not exist. Returning `LegalDocument`
 * rather than `LegalDocument | undefined` would need a non-null assertion here
 * instead of a `notFound()` in the page, and the page is the honest place for
 * it — a document deleted from the repository should 404, not throw.
 */
export function getLegalDocument(slug: LegalSlug): LegalDocument | undefined {
  return legalDocuments.find((document) => document.slug === slug);
}
