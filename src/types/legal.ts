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
 * `body`, `points` and `clauses` are separated because the three are read
 * differently: a paragraph is read, a bulleted list is scanned, and a numbered
 * clause is quoted. A policy that states an obligation inside a bullet is a
 * policy nobody can cite back at it, which is why anything a merchant is
 * actually agreeing to is a clause and not a bullet. `confirm` is none of the
 * three — see below.
 */
export interface LegalSection {
  /** Anchor id, also the `href` the contents rail links to. */
  readonly id: string;
  readonly heading: string;
  /**
   * Optional, because a section that is nothing but numbered clauses should not
   * be made to carry a sentence introducing them. A lead-in written only to
   * satisfy a required field is a lead-in that says "the following apply".
   */
  readonly body?: readonly string[];
  readonly points?: readonly string[];
  /**
   * Numbered obligations, rendered as an ordered list and numbered within the
   * section — so a clause can be referred to as "General conditions, 3" the way
   * the published document numbers it.
   */
  readonly clauses?: readonly string[];
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
  /**
   * What the review banner says, for a document that needs to say something
   * more specific than the default.
   *
   * A document reproducing terms the business already publishes is in a
   * different position from one drafted here, and the banner has to say which
   * it is: "in review" over text a merchant can find on the live site reads as
   * an error, and the default wording would be wrong about where the content
   * came from.
   */
  readonly notice?: string;
  /**
   * The short facts a reader checks before reading — who the document is with,
   * what it covers, where to ask. Rendered beside the title rather than buried
   * in the closing section, because "who am I agreeing with" is the first
   * question a merchant has and the last thing a legal page usually answers.
   */
  readonly facts?: readonly LegalFact[];
  readonly sections: readonly LegalSection[];
}

/** One line of the document's summary panel. */
export interface LegalFact {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  /** Set where the value is a destination rather than a statement. */
  readonly href?: string;
}
