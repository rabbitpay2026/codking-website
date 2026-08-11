import type { FeatureIndexEntry } from "@/types";

/**
 * The six controls the Features page shows, in the order it shows them, with
 * the weight each one carries.
 *
 * The controls repository holds all ten and is the source of every route,
 * name, outcome line and benefit list (§6.2). This is a separate, ordered
 * selection because "which controls does the Features page lead with, in what
 * order, and at what size" is a marketing decision that changes independently
 * of which controls exist — expressing it as its own list means a feature can
 * be promoted, demoted or dropped from the page without touching the record
 * the mega-menu, the footer and the control page all read.
 *
 * `title` is an override and is only set where this page's headline differs
 * from the control's name. Everything else is resolved from the record by
 * slug, so the page cannot describe a control differently from the rest of the
 * site.
 *
 * OTP verification leads because it is the control that answers the question
 * a merchant arrives with — how do I stop fake COD orders — and it is the one
 * with a demonstration that can be shown rather than described.
 */
export const featureIndexEntries: readonly FeatureIndexEntry[] = [
  { slug: "otp-verification", emphasis: "lead" },
  {
    slug: "partial-cod-payment",
    emphasis: "highlight",
    title: "Partial COD Payment – Upfront Payments",
  },
  { slug: "cod-to-prepaid", emphasis: "highlight" },
  { slug: "abandoned-cart-recovery", emphasis: "supporting" },
  {
    slug: "cod-show-hide",
    emphasis: "supporting",
    title: "COD Show/Hide – Configure Flexible Rules",
  },
  { slug: "cod-fees", emphasis: "supporting" },
];
