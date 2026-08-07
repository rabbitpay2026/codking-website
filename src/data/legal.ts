import type { LegalDocument } from "@/types";

/**
 * The four legal documents (§3).
 *
 * `lastUpdated` stays `null` until the business supplies the copy — a legal
 * page showing a fabricated revision date is worse than one showing none.
 */
export const legalDocuments: readonly LegalDocument[] = [
  { slug: "privacy", title: "Privacy Policy", lastUpdated: null },
  { slug: "terms", title: "Terms of Service", lastUpdated: null },
  { slug: "refund", title: "Refund Policy", lastUpdated: null },
  { slug: "cookies", title: "Cookie Policy", lastUpdated: null },
];
