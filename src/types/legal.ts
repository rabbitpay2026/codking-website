/** The four legal documents in the §3 sitemap. */
export const LEGAL_SLUGS = ["privacy", "terms", "refund", "cookies"] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export interface LegalDocument {
  readonly slug: LegalSlug;
  readonly title: string;
  /** ISO-8601 date, or `null` until the document is published. */
  readonly lastUpdated: string | null;
}
