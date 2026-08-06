import { routeFor, routes } from "@/constants/routes";

import type {
  HowItWorksStep,
  OutcomeMetric,
  PainPoint,
  ProductPreviewPanel,
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

/**
 * The interactive preview panels (§5.1 #6).
 *
 * Deliberately the three controls that carry most of the loss, so the preview
 * answers "what does it actually do" for the merchant who has just recognised
 * their own problem two sections earlier.
 *
 * Written from the merchant's chair, not the buyer's. The flagship section
 * above already shows each control as the buyer meets it; this one shows the
 * surface the merchant works in, and saying the same thing twice from the same
 * angle would make the second telling redundant.
 */
export const productPreviewPanels: readonly ProductPreviewPanel[] = [
  {
    controlSlug: "otp-verification",
    label: "OTP Verification",
    headline: "A dispatch queue that is already filtered",
    body: "Every order arrives marked verified, waiting, or blocked. The ones nobody confirmed sit in the queue instead of in a van, and you never find out which was which at the doorstep.",
    href: routeFor.control("otp-verification"),
  },
  {
    controlSlug: "partial-cod-payment",
    label: "Partial COD Payment",
    headline: "A deposit, and the ledger that tracks it",
    body: "Take a fixed amount or a percentage at checkout. Each order carries what was paid and what is still owed on delivery, so reconciliation is a column rather than an afternoon.",
    href: routeFor.control("partial-cod-payment"),
  },
  {
    controlSlug: "cod-rules",
    label: "COD Rules",
    headline: "One rule list, running on every cart",
    body: "Order the conditions, set the action, first match wins. Change a rule and it applies at the next checkout — no theme edit, no deploy, no developer.",
    href: routeFor.control("cod-rules"),
  },
];

/** Where the homepage sends a merchant who wants to size the problem (§5.1 #4). */
export const calculatorHref = routes.codCalculator;
