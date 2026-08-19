import type { ControlSlug } from "@/types/controls";
import type { NavItem } from "@/types/navigation";

/**
 * Where a question is allowed to surface.
 *
 * §11 requires a single tagged pool rather than one long list per page, so the
 * same answer can appear on the homepage and a control page without being
 * written twice. The `control:` template literal keeps control tags tied to the
 * closed `ControlSlug` union — a tag for a control that does not exist is a
 * compile error.
 *
 * `faq` marks a question written for the dedicated FAQ page and shown nowhere
 * else. The page itself selects by id rather than by tag — it needs an order
 * and a grouping, which a filter cannot express — so the tag is a statement
 * about where an answer belongs, not the mechanism that puts it there.
 */
export type FaqTag =
  | "home"
  | "pricing"
  | "calculator"
  | "integrations"
  | "faq"
  | `control:${ControlSlug}`;

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly tags: readonly FaqTag[];
}

/**
 * One question on the FAQ page, and where its answer sends the reader next.
 *
 * The links are declared here rather than on `FaqItem` because they belong to
 * this page rather than to the answer: the same words shown inside a control
 * page should not carry a link back to the control page the reader is already
 * on. They are rendered beside the answer rather than inside it, so the visible
 * answer text and the text in the FAQPage schema stay identical.
 */
export interface FaqPageEntry {
  /** An id into the tagged pool. Unknown ids are dropped rather than rendered. */
  readonly id: string;
  readonly links?: readonly NavItem[];
}

/**
 * A group of questions on the FAQ page (§2).
 *
 * Groups are the page's own structure, not a property of the pool — a question
 * can be asked on the homepage, a control page and here, and only here does it
 * need to sit under a heading with a stable anchor.
 */
export interface FaqPageCategory {
  /** Also the section's DOM id, so the contents rail can link to it. */
  readonly id: string;
  readonly title: string;
  /** One line under the heading, saying what this group covers. */
  readonly description: string;
  readonly entries: readonly FaqPageEntry[];
}

/** A category with its pool ids resolved to real questions. */
export interface ResolvedFaqPageItem {
  readonly faq: FaqItem;
  readonly links: readonly NavItem[];
}

export interface ResolvedFaqPageCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly ResolvedFaqPageItem[];
}
