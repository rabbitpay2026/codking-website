import type { ControlSlug } from "@/types/controls";

/**
 * Where a question is allowed to surface.
 *
 * §11 requires a single tagged pool rather than one long list per page, so the
 * same answer can appear on the homepage and a control page without being
 * written twice. The `control:` template literal keeps control tags tied to the
 * closed `ControlSlug` union — a tag for a control that does not exist is a
 * compile error.
 */
export type FaqTag =
  "home" | "pricing" | "calculator" | "integrations" | `control:${ControlSlug}`;

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly tags: readonly FaqTag[];
}
