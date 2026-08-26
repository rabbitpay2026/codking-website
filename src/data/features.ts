import type { FeatureIndexEntry } from "@/types";

/**
 * The controls the Features page shows, in the order it shows them, with the
 * weight each one carries.
 *
 * The controls repository holds the records and is the source of every route,
 * name, outcome line and benefit list (§6.2). This is a separate, ordered
 * selection because "which controls does the Features page lead with, in what
 * order, and at what size" is a marketing decision that changes independently
 * of which controls exist — expressing it as its own list means a feature can
 * be promoted, demoted or dropped from the page without touching the record
 * the mega-menu, the footer and the control page all read.
 *
 * It listed six of the ten. The reviewer asked for the missing four to appear
 * in the menu and on the page, so it now lists all ten and the page, the
 * mega-menu, the mobile drawer and the footer's Features column are once again
 * a complete answer to "what does this product do" rather than a shortlist of
 * it. Each of the four also gained a page of its own in the same change; a
 * menu entry pointing at a template that says "implemented in a later phase"
 * would have been worse than the omission it replaced.
 *
 * `title` is an override and is only set where this page's headline differs
 * from the control's name. Everything else is resolved from the record by
 * slug, so the page cannot describe a control differently from the rest of the
 * site.
 *
 * ── On the two tiers ──────────────────────────────────────────────────────
 * There used to be three, and the first of them — `lead` — gave the top
 * control the page's full measure. The reviewer asked for that block to be a
 * card like the others rather than a full-width panel, so the tier is gone and
 * OTP Verification is a `highlight`: the same card as its neighbours, still
 * first, still the control that answers the question a merchant arrives with.
 *
 * What is left is a pair that divides cleanly. `highlight` is two across and
 * carries what the control actually does, so it is where the controls with a
 * published benefit list go; `supporting` is a compact row that carries the
 * outcome line alone, which is the honest shape for the records that publish
 * no benefits.
 *
 * Six and four, and the counts are not accidental: six fills three rows of two
 * and four fills one row of four, so neither block ends on a short row with a
 * gap beside it.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * OTP verification leads because it is the control that answers the question
 * a merchant arrives with — how do I stop fake COD orders — and it is the one
 * with a demonstration that can be shown rather than described.
 */
export const featureIndexEntries: readonly FeatureIndexEntry[] = [
  { slug: "otp-verification", emphasis: "highlight" },
  {
    slug: "partial-cod-payment",
    emphasis: "highlight",
    title: "Partial COD Payment – Upfront Payments",
  },
  { slug: "cod-to-prepaid", emphasis: "highlight" },
  {
    slug: "cod-show-hide",
    emphasis: "highlight",
    title: "COD Show/Hide – Configure Flexible Rules",
  },
  { slug: "abandoned-cart-recovery", emphasis: "highlight" },
  {
    /*
      Titled for the capability rather than for the subsystem. The record is
      named "Messaging Gateways", which is what it is called inside the product;
      "Local SMS Gateway Integration" is what a merchant is looking for, what
      the Enterprise plan already calls it in `src/data/pricing.ts`, and what
      the review asked to see in the features list. The record it resolves to,
      and therefore the page it links to, is unchanged.
    */
    slug: "messaging-gateways",
    emphasis: "highlight",
    title: "Local SMS Gateway Integration",
  },
  { slug: "cod-fees", emphasis: "supporting" },
  { slug: "address-validation", emphasis: "supporting" },
  {
    /*
      Titled for the order it acts on rather than for the action alone. The
      record is named "Order Verification", which is what the control is called
      inside the product; "COD Order Verification" is what it verifies, and it
      is also what keeps it apart from OTP Verification two rows above in a
      menu where both are read at a glance. The record it resolves to, and
      therefore the page it links to, is unchanged.
    */
    slug: "order-verification",
    emphasis: "supporting",
    title: "COD Order Verification",
  },
  { slug: "analytics", emphasis: "supporting" },
];
