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
  {
    id: "countries",
    value: 100,
    suffix: "+",
    label: "Countries supported",
    caption: "Every major cash-on-delivery market.",
  },
];

/**
 * Stores using COD King, shown as a logo row (§5.1 #3).
 *
 * Names only. Rendering a brand's actual logo is a trademark question, and a
 * wordmark set nobody has cleared is not worth the exposure.
 */
export const trustedBrands: readonly TrustedBrand[] = [
  { name: "Casio" },
  { name: "The Himalaya Drug Company" },
  { name: "Slobberman" },
  { name: "Vinod Cookware" },
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
 * Deliberately the three controls that carry the most of the loss, so the
 * preview answers "what does it actually do" for the merchant who has just
 * recognised their own problem two sections earlier.
 */
export const productPreviewPanels: readonly ProductPreviewPanel[] = [
  {
    controlSlug: "otp-verification",
    label: "OTP Verification",
    headline: "Only real buyers get through",
    body: "The buyer confirms their number over SMS or WhatsApp before the order is accepted. Bots, mistyped numbers, and fake buyers never reach your dispatch queue.",
    href: routeFor.control("otp-verification"),
  },
  {
    controlSlug: "partial-cod-payment",
    label: "Partial COD Payment",
    headline: "A buyer with a stake turns up",
    body: "Collect a fixed amount or a percentage at checkout. The rest is still collected on delivery, but now the buyer has something to lose by rejecting the parcel.",
    href: routeFor.control("partial-cod-payment"),
  },
  {
    controlSlug: "cod-rules",
    label: "COD Rules",
    headline: "Risky orders never get placed",
    body: "Turn COD off by pin code, cart value, product, or customer tag. The orders you would have paid twice to ship simply never enter the system.",
    href: routeFor.control("cod-rules"),
  },
];

/** Where the homepage sends a merchant who wants to size the problem (§5.1 #4). */
export const calculatorHref = routes.codCalculator;
