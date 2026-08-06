import { routes } from "@/constants/routes";

import type {
  ControlSlug,
  HowItWorksStep,
  OutcomeMetric,
  PainPoint,
  TrustedBrand,
} from "@/types";

/**
 * The hidden costs of COD (§5.1 #4).
 *
 * Every pain point names the control that removes it, so the section states a
 * problem and its fix in the same breath rather than leaving the merchant to
 * work out which feature applies to them (§6.4).
 */
export const painPoints: readonly PainPoint[] = [
  {
    id: "fake-orders",
    title: "Orders nobody meant to pay for",
    body: "A parcel goes out, comes back, and you have paid twice to move it. Nothing about the order looked wrong at checkout.",
    controlSlug: "otp-verification",
  },
  {
    id: "rto",
    title: "Returns you funded twice",
    body: "Freight out, freight back, and the packaging in between. One delivered order rarely covers the one that came home.",
    controlSlug: "partial-cod-payment",
  },
  {
    id: "prepaid",
    title: "Cash you wait weeks to see",
    body: "Every cash order ties up working capital until the courier settles. Prepaid buyers pay today; cash buyers pay eventually, if at all.",
    controlSlug: "prepaid-nudge",
  },
];

/**
 * Published results (§5.1 #3).
 *
 * Stated as the product states them — as ceilings, not averages — because a
 * figure a merchant cannot reproduce costs more trust than it buys (§10.1).
 */
export const outcomeMetrics: readonly OutcomeMetric[] = [
  {
    id: "fake-orders",
    value: 35,
    suffix: "%",
    label: "Fewer fake and RTO orders",
    caption: "Ceiling, once verification is switched on.",
  },
  {
    id: "sms-cost",
    value: 70,
    suffix: "%",
    label: "Saved on messaging",
    caption: "Ceiling, on a local messaging provider.",
  },
  {
    id: "roi",
    value: 3,
    prefix: "2–",
    suffix: "x",
    label: "Return within 30 days",
    caption: "Reported by merchants in month one.",
  },
];

/**
 * How long setup takes, in minutes (§5.1 #7).
 *
 * The one figure in the scale band that is not a proof metric. It is the same
 * claim the setup section makes, held here so the two cannot drift.
 */
export const setupMinutes = 10;

/**
 * The eight controls the homepage puts on the board (§5.1 #6).
 *
 * Slugs rather than copied names, so the hero checklist and the feature grid
 * are the same list read twice and a rename happens in one place.
 */
export const homepageControlSlugs: readonly ControlSlug[] = [
  "otp-verification",
  "partial-cod-payment",
  "cod-fees",
  "cod-rules",
  "prepaid-nudge",
  "messaging-gateways",
  "analytics",
  "abandoned-cart-recovery",
];

/**
 * Stores using COD King, shown as a logo wall (§5.1 #3).
 *
 * `id` points at the lockup in `components/brand/MerchantMarks`. Those are
 * built for this page rather than being the merchants' registered marks, and
 * every one is to be replaced with artwork the store supplies before launch —
 * a logo wall is a claim about someone else's brand, so the shipped version
 * has to be the version they handed over.
 */
export const trustedBrands: readonly TrustedBrand[] = [
  { id: "casio", name: "Casio" },
  { id: "himalaya", name: "The Himalaya Drug Company" },
  { id: "slobberman", name: "Slobberman" },
  { id: "vinod", name: "Vinod Cookware" },
];

/** Setup, stated with the effort it actually takes (§5.1 #7). */
export const howItWorksSteps: readonly HowItWorksStep[] = [
  {
    id: "install",
    title: "Add it to your store",
    body: "One click from the App Store. No theme edits, no developer, nothing to deploy.",
  },
  {
    id: "configure",
    title: "Decide how cash behaves",
    body: "Choose where COD is offered, what it costs, and what a buyer has to confirm.",
  },
  {
    id: "monitor",
    title: "Let it run",
    body: "Orders are verified, held, or released on their own. You get told what changed.",
  },
  {
    id: "scale",
    title: "Bring your own gateway",
    body: "Route messages through a regional provider and pay their rate, not an international one.",
  },
];

/** Where the homepage sends a merchant who wants to size the problem (§5.1 #4). */
export const calculatorHref = routes.codCalculator;
