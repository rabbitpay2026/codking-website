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
 * These are the merchants' own marks, supplied as artwork, not lockups drawn
 * for this page — a logo wall is a claim about someone else's brand, so the
 * shipped version has to be the version they handed over.
 *
 * Every file is trimmed to the artwork's own bounding box before it lands in
 * `public/logos/merchants`. Press-kit exports usually carry generous built-in
 * padding (Casio's arrived as a 350px wordmark inside a 1080px frame), and a
 * wall that respects that padding renders one brand a third the size of its
 * neighbours. The untouched downloads are kept in `assets/brand-source`.
 *
 * `width`/`height` are the rendered box, balanced by eye rather than set to a
 * shared height — see `BrandLogo`.
 */
export const trustedBrands: readonly TrustedBrand[] = [
  {
    id: "casio",
    name: "Casio",
    logo: { src: "/logos/merchants/casio.png", width: 130, height: 24 },
  },
  {
    id: "himalaya",
    name: "Himalaya Herbals",
    logo: { src: "/logos/merchants/himalaya.png", width: 117, height: 40 },
  },
  {
    id: "redtape",
    name: "RedTape",
    logo: { src: "/logos/merchants/redtape.png", width: 131, height: 38 },
  },
  {
    id: "slobberman",
    name: "Slobberman",
    logo: { src: "/logos/merchants/slobberman.png", width: 191, height: 22 },
  },
  {
    id: "qwerty-cases",
    name: "Qwerty Cases",
    logo: { src: "/logos/merchants/qwerty-cases.png", width: 138, height: 38 },
  },
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
