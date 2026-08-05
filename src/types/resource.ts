import type { Route } from "next";

/**
 * The four resource surfaces (§7). Kept closed and deliberately small — the
 * architecture limits resources to four so each one stays maintained.
 */
export const RESOURCE_KINDS = ["guide", "blog", "docs", "help"] as const;

export type ResourceKind = (typeof RESOURCE_KINDS)[number];

/**
 * Where an article sends the reader next.
 *
 * §7.1 is a rule, not a suggestion: every guide ends by pointing at the
 * relevant tool or control page, never at a generic sign-up band. Making this
 * field required means an article that does not comply cannot be published —
 * the omission is a type error, not a content-review miss.
 */
export interface ResourceNextStep {
  readonly label: string;
  readonly href: Route;
}

/**
 * One of the four resource surfaces, described by its job (§7).
 * Drives the Resources hub and keeps Docs and Help visibly distinct.
 */
export interface ResourceSection {
  readonly kind: ResourceKind;
  readonly title: string;
  readonly href: Route;
  /** What this surface is for, in one line (§7 "What it is"). */
  readonly purpose: string;
}

export interface ResourceArticle {
  readonly slug: string;
  readonly kind: ResourceKind;
  readonly title: string;
  readonly description: string;
  /** ISO-8601 date. Blog is ordered by this, newest first (§7). */
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly nextStep: ResourceNextStep;
}
