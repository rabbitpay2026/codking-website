import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the Partial COD Payment page says that is not already said
 * elsewhere (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name, the
 * outcome line and the four published benefits, and the page reads those from
 * the repository rather than restating them. What lives here is the page's own
 * argument.
 */

/** The hero checklist, in the blueprint's two columns. */
export const partialCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "fake-orders", label: "Reduce fake COD orders" },
  { id: "rto", label: "Lower RTO & return losses" },
  { id: "cash-flow", label: "Improve cash flow" },
  { id: "trust", label: "Increase customer trust" },
  { id: "products", label: "Works with all products" },
  { id: "rules", label: "Set flexible rules" },
];

/**
 * The results band.
 *
 * ── Read this before shipping ──────────────────────────────────────────────
 * These figures are the marketing blueprint's, supplied and confirmed by the
 * site owner. They are NOT drawn from `src/data/proof.ts` or from the
 * homepage's `outcomeMetrics`, and no source for them exists in this
 * repository — which puts them outside what §10.1 asks of a published claim.
 *
 * They match the OTP Verification page's band deliberately: the two controls
 * are marketed with the same three numbers, and a sibling page quoting
 * different ones would be worse than either figure on its own.
 *
 * TODO(content): attach a source to each of these — or replace them with the
 * proof repository's figures — before the page is indexed. Every other number
 * on this page reads from `getProofMetrics()`; this band does not.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const partialOutcomes: readonly FeatureOutcome[] = [
  {
    id: "fake-orders",
    title: "Reduce fake orders",
    value: "70%+",
    body: "Only serious buyers place orders",
  },
  {
    id: "rto",
    title: "Lower RTO",
    value: "40%+",
    body: "Lower return-to-origin losses",
  },
  {
    id: "cash-flow",
    title: "Better cash flow",
    value: "Money upfront",
    body: "Collected even on COD orders",
  },
  {
    id: "conversions",
    title: "Increase conversions",
    value: "25%+",
    body: "With higher buyer trust",
  },
];

/**
 * How a partial payment runs, as the buyer experiences it (§6.3).
 *
 * Four beats, and the merchant performs none of them. The same sequence drives
 * the animated panel in the hero, so what a visitor reads here and what they
 * watch up there are the same four steps in the same order.
 */
export const partialFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "order",
    title: "Customer places order",
    body: "Adds products to the cart and proceeds to checkout as usual.",
  },
  {
    id: "advance",
    title: "Pays a small amount now",
    body: "A fixed amount or a percentage, paid online through your gateway.",
  },
  {
    id: "shipped",
    title: "Order is confirmed & shipped",
    body: "You ship with confidence, because only genuine buyers got this far.",
  },
  {
    id: "balance",
    title: "Customer pays the remaining",
    body: "The balance is collected as cash on delivery, exactly as before.",
  },
];

/** The one-line payoff under the flow. */
export const partialFlowResult =
  "Only genuine buyers continue → Lower RTO → Higher profits";

/** The demo section's supporting points. */
export const partialDemoPoints: readonly FeatureCheckpoint[] = [
  { id: "rules", label: "Flexible rules based on % or fixed amount" },
  { id: "shipping", label: "Collect shipping charges upfront" },
  {
    id: "scope",
    label: "Works on selected products, collections or your whole store",
  },
  { id: "setup", label: "Easy setup — enable it in one click" },
];

/** The key-features grid (§6.3). */
export const partialFeatures: readonly FeatureCapability[] = [
  {
    id: "rules",
    title: "Flexible rules",
    body: "Set the partial payment as a percentage of the cart or a fixed value.",
  },
  {
    id: "discount",
    title: "Offer a discount",
    body: "Apply a discount to prepaid or partial-payment orders to nudge buyers.",
  },
  {
    id: "shipping",
    title: "Cover shipping charges",
    body: "Collect the shipping cost upfront so a refused parcel costs you less.",
  },
  {
    id: "scope",
    title: "Product & collection based",
    body: "Enable it for specific products, collections or tags rather than everything.",
  },
  {
    id: "messaging",
    title: "Custom messaging",
    body: "Show your own text at checkout to explain the deposit and build confidence.",
  },
  {
    id: "setup",
    title: "Easy to configure",
    body: "Enable it in minutes from the dashboard. No coding, no theme edits.",
  },
];

/** Who this control is a particularly good fit for. */
export const partialAudience: readonly AudienceSegment[] = [
  { id: "custom", title: "Custom products", note: "T-shirts, mugs" },
  {
    id: "shipping",
    title: "High shipping cost items",
    note: "Furniture, appliances",
  },
  { id: "refurbished", title: "Refurbished products" },
  { id: "made-to-order", title: "Made-to-order items" },
  { id: "cod-heavy", title: "All COD-heavy stores" },
];

/** The page's own headline and supporting copy. */
export const partialPageCopy = {
  eyebrow: "Buyer validation",
  headlineLead: "Partial Payments",
  headlineAccent: "Collect Payment Upfront.",
  headlineTail: "Reduce COD Risk.",
  description:
    "Take a small token amount from the customer at checkout and collect the remaining balance on delivery. Genuine buyers commit, non-serious ones drop out, and the parcel you ship is one somebody has already paid for.",
  outcomesEyebrow: "Why use partial payments?",
  outcomesTitle: "A smarter way to handle COD orders",
  outcomesDescription:
    "A small upfront payment filters out the orders that were never going to be accepted, and starts recovering your costs before the parcel leaves.",
  flowEyebrow: "How partial payments work",
  flowTitle: "Simple. Flexible. Effective.",
  flowDescription:
    "Turn a risky cash-on-delivery order into a secured one with a single small payment at checkout.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to make cash-on-delivery orders safer and more profitable.",
  audienceTitle: "Best suited for",
} as const;
