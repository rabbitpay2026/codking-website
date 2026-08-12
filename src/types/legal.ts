/** The four legal documents in the §3 sitemap. */
export const LEGAL_SLUGS = [
  "privacy-policy",
  "terms-and-conditions",
  "refund-policy",
  "cookies",
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

/**
 * One numbered section of a legal document.
 *
 * `body` and `points` are separated because the two are read differently: a
 * paragraph is read, a list is scanned, and a policy that states an obligation
 * inside a bullet is a policy nobody can quote back. `confirm` is neither — see
 * below.
 */
export interface LegalSection {
  /** Anchor id, also the `href` the contents rail links to. */
  readonly id: string;
  readonly heading: string;
  readonly body: readonly string[];
  readonly points?: readonly string[];
  /**
   * Details this section cannot state until the business confirms them — a
   * registered entity name, a retention period, a governing jurisdiction.
   *
   * Held as data rather than written into the prose as "TBD" so that the page
   * can render them as an explicit, visible list of open items, and so the
   * section becomes final by deleting one array rather than by hunting through
   * a paragraph for the placeholder someone left in it.
   */
  readonly confirm?: readonly string[];
}

export interface LegalDocument {
  readonly slug: LegalSlug;
  readonly title: string;
  /** The one-line answer to "what is this document for". */
  readonly summary: string;
  /** ISO-8601 date, or `null` until the document is published. */
  readonly lastUpdated: string | null;
  /**
   * `draft` renders the review banner. A legal page that reads as final while
   * its jurisdiction and entity name are still unset is worse than one that
   * says plainly it is in review.
   */
  readonly status: "draft" | "published";
  readonly sections: readonly LegalSection[];
}
