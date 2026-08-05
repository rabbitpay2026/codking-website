import type { FaqItem } from "@/types";

/**
 * The tagged question pool (§11).
 *
 * One pool, surfaced on the right page by tag — homepage, pricing, calculator,
 * or a specific control — rather than one long list nobody reads. §5.1 #10
 * names the homepage set: theme safety, no-code, country coverage, cancel
 * anytime, and data handling.
 *
 * Empty until the answers are written and reviewed; the tag union already
 * constrains where each one may appear.
 */
export const faqs: readonly FaqItem[] = [];
