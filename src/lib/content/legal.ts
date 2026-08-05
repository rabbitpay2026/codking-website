import { legalDocuments } from "@/data/legal";

import type { LegalDocument } from "@/types";

export function getLegalDocuments(): readonly LegalDocument[] {
  return legalDocuments;
}

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((document) => document.slug === slug);
}
