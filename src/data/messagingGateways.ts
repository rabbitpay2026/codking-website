import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the Local SMS Operator Integration page says that is not already
 * said elsewhere (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` holds the name, the alias the
 * product markets it under and the outcome line; `src/data/smsOperators.ts`
 * holds the operators themselves. The page reads both from the repository
 * rather than restating them. What lives here is the page's own argument.
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * Every sentence below is built from the product's own Local SMS Operators
 * screen and from this repository, and from nothing else:
 *
 * - the screen's title and lead — "Direct-to-Operator Payment Model",
 *   "Integrate with local SMS/WhatsApp operators and benefit from transparent,
 *   cost-effective messaging";
 * - its two published benefits — "Pay directly to SMS operators / No markup,
 *   competitive local rates" and "Subscription to COD King / Pay only for
 *   platform features and support";
 * - its section note — "Available for all regions except India. Choose your
 *   preferred local operator for optimal delivery rates and pricing";
 * - its picker helper — "Select a local network operator to integrate. You'll
 *   pay SMS charges directly to the operator at their standard rates";
 * - its upgrade note, which is where the 60% comes from;
 * - `src/data/smsOperators.ts`, the operator list, read directly by the page's
 *   own board rather than copied here;
 * - `src/data/pricing.ts`, which puts Local SMS Gateway on Enterprise.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On the 60% ────────────────────────────────────────────────────────────
 * The product's own screen states the saving as "up to 60%", so that is the
 * figure the site states. It is a ceiling and it is worded as one everywhere
 * it appears. It is never an average, never a promise and never attached to a
 * currency amount (§10.1).
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On what is deliberately absent ────────────────────────────────────────
 * The screen names two plans that carry this control, "Enterprise or India
 * Budget". Only Enterprise exists in `src/data/pricing.ts`, and the control is
 * unavailable in India in any case, so the page names Enterprise alone rather
 * than publishing a plan the pricing repository does not carry.
 *
 * No operator on this page is described as a partner, is rated, ranked, or
 * given a delivery figure, a rate or a market the picker does not list for it.
 * The picker is the whole of what the product claims about them.
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * The hero checklist, in the blueprint's two columns.
 *
 * Kept to roughly twenty characters each. The hero sets these two-up beside the
 * product scene, so each has about half of half the measure; a label that runs
 * past that wraps, and six items wrapping at different points is a paragraph
 * cut into pieces rather than a specification.
 */
export const gatewayCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "operators", label: "15 local operators" },
  { id: "direct", label: "Pay operators directly" },
  { id: "markup", label: "No messaging markup" },
  { id: "rates", label: "Competitive local rates" },
  { id: "messages", label: "OTP, alerts & reminders" },
  { id: "coverage", label: "All regions except India" },
];

/**
 * The results band.
 *
 * One measured figure and three statements of what the arrangement is. The
 * figure is the product's own published ceiling and is worded as a ceiling;
 * the other three describe how the arrangement works rather than what it
 * produced, because the product publishes no per-message rate, no volume and
 * no saving in currency for anyone to reproduce.
 */
export const gatewayOutcomes: readonly FeatureOutcome[] = [
  {
    id: "cost",
    title: "Local rates, not marked-up ones",
    value: "Up to 60% less",
    body: "Integrating a local operator is what reduces the messaging cost, and the saving is a ceiling rather than an average.",
  },
  {
    id: "direct",
    title: "Paid to the operator, not through us",
    value: "No markup",
    body: "SMS charges are settled with the operator you selected, at that operator's own standard rates.",
  },
  {
    id: "subscription",
    title: "The subscription buys the platform",
    value: "Features & support",
    body: "Your COD King plan pays for the platform features and the support behind them, and nothing else.",
  },
  {
    id: "choice",
    title: "An operator for your market",
    value: "15 operators",
    body: "Four with worldwide coverage and eleven listed for a single market, available in all regions except India.",
  },
];

/**
 * How a message leaves on a local operator, in five beats (§6.3).
 *
 * The first and last are the two things a merchant is actually deciding
 * between — which account the messages leave on, and who bills for them.
 * Collapsing either would reduce the control to a settings toggle, and the
 * settlement is the whole reason the cost changes.
 */
export const gatewayFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "choose",
    title: "Choose your operator",
    body: "Pick the local operator for your market from the fifteen listed further down this page.",
  },
  {
    id: "plan",
    title: "Move to Enterprise",
    body: "Local SMS Operator Integration is the Enterprise plan's, so the operator picker unlocks with the upgrade.",
  },
  {
    id: "connect",
    title: "Select it in the dashboard",
    body: "Choose the operator from the network operator dropdown. No theme edits, no code, nothing to deploy.",
  },
  {
    id: "route",
    title: "Messages route through it",
    body: "Every OTP, order notification and abandoned-cart reminder COD King sends leaves on that operator.",
  },
  {
    id: "settle",
    title: "You pay the operator",
    body: "SMS charges are billed by the operator directly, at their standard rates, with no markup added.",
  },
];

/** The one-line payoff under the flow. */
export const gatewayFlowResult =
  "COD King → Your selected operator → Your customer";

/** The key-features grid (§6.3). */
export const gatewayFeatures: readonly FeatureCapability[] = [
  {
    id: "operators",
    title: "Fifteen local operators",
    body: "Four with worldwide coverage and eleven listed for a single market, from Pakistan and Oman to Vietnam and Thailand.",
  },
  {
    id: "whatsapp",
    title: "SMS and WhatsApp",
    body: "Chat API is listed for WhatsApp worldwide, so the channel your customers read on is a choice rather than a constraint.",
  },
  {
    id: "direct",
    title: "Direct-to-operator billing",
    body: "SMS charges go to the operator you selected at their standard rates, with no markup added by COD King.",
  },
  {
    id: "subscription",
    title: "A subscription for the platform",
    body: "Your plan pays for platform features and support — it is not a messaging bundle you buy through.",
  },
  {
    id: "messages",
    title: "Every message COD King sends",
    body: "OTP codes, order notifications and abandoned-cart reminders all leave on the same operator.",
  },
  {
    id: "coverage",
    title: "Available outside India",
    body: "Local operator integration is available for all regions except India, where messaging stays on COD King's own sending.",
  },
];

/**
 * Who this control is a particularly good fit for.
 *
 * Characterisations of the store rather than claims about the product. None of
 * them names an operator for a market the operator picker does not list it
 * for, and none of them names India — the one region this control excludes.
 *
 * Read by the knowledge repository (`src/lib/content/knowledge.ts`) rather
 * than by a band on the page: the page closes on the operator board and the
 * picker, which answer "is my market covered" far better than a row of
 * characterisations does.
 */
export const gatewayAudience: readonly AudienceSegment[] = [
  {
    id: "volume",
    title: "High message volume",
    note: "A code on every COD order",
  },
  {
    id: "regional",
    title: "Selling in one COD market",
    note: "An operator listed for it",
  },
  {
    id: "whatsapp",
    title: "Selling over WhatsApp",
    note: "Chat API, worldwide",
  },
  { id: "multi", title: "Multi-market brands", note: "A worldwide operator" },
];

/** The page's own headline and supporting copy. */
export const gatewayPageCopy = {
  /** What the page calls the control — the record's `alias`, spelled out. */
  name: "Local SMS Operator Integration",
  /**
   * The product's own name for the arrangement, and the reason the page
   * exists. It is a label on the whole page rather than on the headline
   * beneath it, which is why it is set as the eyebrow and not as a second line
   * of the title.
   */
  eyebrow: "Direct-to-Operator Payment Model",
  headlineLead: "Connect With Your",
  /**
   * Kept short enough to hold one line inside the hero's text column at every
   * width. The shared hero draws this statement in brand across a measure of
   * `max-w-xl`, and a middle line that breaks in two stops being one
   * statement — which is the whole reason the headline is three fields rather
   * than one string.
   */
  headlineAccent: "Local SMS Operator.",
  headlineTail: "Pay Them Directly.",
  description:
    "Integrate with local SMS and WhatsApp operators and benefit from transparent, cost-effective messaging. COD King sends every one-time password, order notification and cart reminder through the operator you select, and the SMS charges are settled with that operator directly at their standard rates.",

  paymentEyebrow: "Where each payment goes",
  paymentTitle: "Two bills, and neither one is a markup",
  paymentDescription:
    "The operator is paid for the messages it carries. COD King is paid for the platform. Nothing sits in between the two, which is the whole of the direct-to-operator model.",

  outcomesEyebrow: "Why integrate a local operator?",
  outcomesTitle: "Cash on delivery runs on messages, and messages have a price",
  outcomesDescription:
    "A verification code on every COD order, an update when it ships, a reminder when a checkout is abandoned. Routed through the operator that already serves your market, that line item gets smaller.",

  flowEyebrow: "How local operators work",
  flowTitle: "Select the operator. Everything sends on it.",
  flowDescription:
    "One choice in the COD King dashboard changes where every message leaves from and who bills you for it.",

  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to move COD King's messaging onto an operator that already serves the market you sell in.",

  operatorsEyebrow: "Local messaging partners",
  operatorsTitle: "Supported local operators",
  operatorsDescription:
    "Available for all regions except India. Choose your preferred local operator for optimal delivery rates and pricing.",
  recommendedTitle: "Recommended for United States",
  recommendedNote:
    "Both carry worldwide coverage rather than United States coverage, and they are the two the dashboard recommends for a United States store.",
  worldwideTitle: "Worldwide coverage",
  regionalTitle: "Regional operators",
  operatorsNote:
    "Every operator above is listed exactly as the COD King dashboard lists it, and local operator integration is on the Enterprise plan.",

  configureEyebrow: "Configure your operator",
  configureTitle: "Select a local network operator to integrate",
  configureDescription:
    "You'll pay SMS charges directly to the operator at their standard rates. Until you choose one, messages leave on COD King's own sending.",
  configureNote:
    "This is the network operator picker as it appears in your COD King dashboard. Changing it here previews the setting; the operator your store sends on is set from the dashboard itself.",

  testimonialsTitle: "What Shopify merchants say",
  faqTip:
    "Local SMS Operator Integration is on the Enterprise plan. The operator is chosen from a dropdown in the COD King dashboard — no theme edits, no code.",
  ctaTitle: "Keep every customer update on brand.",
  ctaDescription:
    "OTP codes, order updates and cart reminders, sent on the operator you selected and billed by them directly.",
} as const;
