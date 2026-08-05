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
    title: "Fake orders and fraud",
    body: "Customers place COD orders with no intention to pay. You lose on product, packaging, and courier costs every single time.",
    controlSlug: "otp-verification",
  },
  {
    id: "rto",
    title: "RTO drains profit",
    body: "Return-to-origin charges eat into your margins. On average, Indian D2C brands lose 15–30% of COD revenue to RTOs.",
    controlSlug: "partial-cod-payment",
  },
  {
    id: "prepaid",
    title: "Low prepaid conversion",
    body: "COD customers are harder to convert to prepaid. Without the right nudges, you are missing out on better margins and faster cash flow.",
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
    caption: "Up to, once OTP verification is switched on.",
  },
  {
    id: "sms-cost",
    value: 70,
    suffix: "%",
    label: "Saved on messaging",
    caption: "Up to, after connecting a local SMS provider.",
  },
  {
    id: "roi",
    value: 3,
    prefix: "2–",
    suffix: "x",
    label: "Return within 30 days",
    caption: "What merchants report in their first month.",
  },
  {
    id: "countries",
    value: 100,
    suffix: "+",
    label: "Countries supported",
    caption: "Including every major COD market.",
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
    title: "Install from the Shopify App Store",
    body: "Search for COD King and click install. One click, and it connects to your store automatically.",
  },
  {
    id: "configure",
    title: "Configure your COD rules",
    body: "Turn on OTP verification, set partial payment amounts, and create your show/hide rules — all from one dashboard.",
  },
  {
    id: "monitor",
    title: "Monitor results",
    body: "COD King works silently in the background. Get notified as orders are verified, reminders go out, and RTO rates fall.",
  },
  {
    id: "scale",
    title: "Scale globally",
    body: "Connect your local SMS provider to cut messaging costs, and reach customers in their preferred language and number format.",
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
