import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the COD to Prepaid page says that is not already said elsewhere
 * (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name, the
 * outcome line and the four published benefits, and the page reads those from
 * the repository rather than restating them. What lives here is the page's own
 * argument.
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * Every claim below is traceable to codking.tech/cod-to-prepaid — the four key
 * features it lists, the two-beat "how it works" description, the use cases,
 * and the control record's own published benefits. Nothing here states a
 * conversion rate, an RTO reduction or any other figure, because the product
 * publishes none for this control. The sibling pages carry a results band of
 * percentages supplied by the site owner; this one deliberately does not
 * invent a matching set (§10.1), and its results band is qualitative instead.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** The hero checklist, in the blueprint's two columns. */
export const prepaidCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "prepaid", label: "Increase prepaid orders" },
  { id: "risk", label: "Reduce COD risk & RTO" },
  { id: "rules", label: "Flexible discount rules" },
  { id: "value", label: "Percentage or fixed value" },
  { id: "gateway", label: "Works with your payment gateway" },
  { id: "simple", label: "Simple for customers" },
];

/**
 * The results band.
 *
 * Stated as outcomes rather than as figures. The OTP and Partial COD Payment
 * pages open their bands with percentages the site owner supplied; no such set
 * exists for this control, and inventing four numbers so the three pages match
 * would be the one thing §10.1 rules out. The `value` line here carries the
 * shape of the outcome instead — which is what a merchant actually reads at
 * that size — and the caption explains it in a sentence that follows from the
 * mechanism rather than from a measurement.
 */
export const prepaidOutcomes: readonly FeatureOutcome[] = [
  {
    id: "prepaid-orders",
    title: "More prepaid orders",
    value: "Paid online",
    body: "A discount the buyer can see at checkout moves the order off cash.",
  },
  {
    id: "risk",
    title: "Lower COD risk",
    value: "Nothing to refuse",
    body: "An order already settled cannot be turned away at the door.",
  },
  {
    id: "cash-flow",
    title: "Better cash flow",
    value: "Money upfront",
    body: "The full order value arrives before the parcel leaves your shelf.",
  },
  {
    id: "rto",
    title: "Reduced RTO exposure",
    value: "Fewer round trips",
    body: "Every order converted is one less parcel that can return unpaid.",
  },
];

/**
 * How the conversion runs, as the buyer experiences it (§6.3).
 *
 * The product describes this in two beats — the customer places a COD order,
 * and COD King shows a banner offering a discount and sends a reminder with a
 * payment link. Those two are beats one and two here; three and four are the
 * consequence rather than new capability, and neither claims anything the
 * control record does not already publish.
 *
 * The same sequence drives the animated panel in the hero, so what a visitor
 * reads here and what they watch up there are the same four steps in the same
 * order.
 */
export const prepaidFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "cod",
    title: "Customer chooses COD",
    body: "They reach checkout and select cash on delivery, exactly as they do today.",
  },
  {
    id: "nudge",
    title: "COD King offers a discount",
    body: "A banner presents an exclusive prepaid discount, backed by a reminder carrying a payment link.",
  },
  {
    id: "switch",
    title: "Customer switches to prepaid",
    body: "The discount applies to the online payment option, so paying now costs less than paying later.",
  },
  {
    id: "paid",
    title: "Order is paid online",
    body: "The full amount is collected upfront and the order carries no cash-on-delivery risk.",
  },
];

/** The one-line payoff under the flow. */
export const prepaidFlowResult =
  "More prepaid orders → Lower COD risk → Healthier cash flow";

/**
 * The captions beside the preview of the two surfaces.
 *
 * Each line names something visible in the banner and the message drawn beside
 * them, rather than a benefit neither shows — a checklist next to a preview is
 * read as a description of it.
 */
export const prepaidDemoPoints: readonly FeatureCheckpoint[] = [
  {
    id: "banner",
    label: "A banner on your Thank You and Order Status pages",
  },
  {
    id: "reminder",
    label: "A WhatsApp or SMS reminder carrying a secure payment link",
  },
  {
    id: "rules",
    label:
      "Your own wording, and a discount set as a percentage or a fixed value",
  },
  { id: "tracking", label: "Track COD-to-prepaid conversion in real time" },
];

/** The key-features grid (§6.3). */
export const prepaidFeatures: readonly FeatureCapability[] = [
  {
    id: "rules",
    title: "Flexible rules",
    body: "Set the prepaid discount as a percentage of the cart or as a fixed value.",
  },
  {
    id: "discount",
    title: "Offer a discount",
    body: "Apply it to a specific payment option, so only prepaid orders receive it.",
  },
  {
    id: "placement",
    title: "Banner & reminder",
    body: "Show the nudge at checkout, or send a reminder with a payment link afterwards.",
  },
  {
    id: "messaging",
    title: "Custom messaging",
    body: "Set your own wording, and the conditions the discount applies under.",
  },
  {
    /*
      Replaces a "flexible tax options" card the review flagged as wrong, and
      says the thing it asked for instead. Both sentences are the product's
      own: the COD King documentation sets a payment gateway up for this
      control by API key and secret, so the link the reminder carries is
      generated by the merchant's own gateway, and it names Razorpay as a
      commonly used one rather than as the only one. No other provider is
      claimed here, because none is documented.
    */
    id: "gateway",
    title: "Your own payment gateway",
    body: "Connect a gateway with its API key and secret so the payment link is raised on your account. Razorpay is a commonly used option.",
  },
  {
    id: "simple",
    title: "Easy & simple",
    body: "Simple for the customer at checkout, and simple for you to switch on.",
  },
];

/** Who this control is a particularly good fit for. */
export const prepaidAudience: readonly AudienceSegment[] = [
  { id: "custom", title: "Custom products", note: "T-shirts, mugs" },
  {
    id: "shipping",
    title: "High shipping cost goods",
    note: "Furniture, bicycles",
  },
  { id: "refurbished", title: "Refurbished goods", note: "Mobiles, printers" },
  { id: "cod-heavy", title: "COD-heavy stores", note: "Fake orders, high RTO" },
];

/** The page's own headline and supporting copy. */
export const prepaidPageCopy = {
  eyebrow: "Prepaid conversion",
  headlineLead: "COD to Prepaid",
  headlineAccent: "Get Paid Online.",
  headlineTail: "Before You Ship.",
  description:
    "Nudge COD buyers to pay fully online with smart discounts and reminders. Convert your COD orders to prepaid by offering a discount, with rules that are fully configurable to your business needs.",
  outcomesEyebrow: "Why convert COD to prepaid?",
  outcomesTitle: "A cash order that arrives already paid",
  outcomesDescription:
    "A discount the buyer can see at checkout is often all it takes to move an order off cash on delivery — and a prepaid order carries none of the risk a cash one does.",
  flowEyebrow: "How COD to Prepaid works",
  flowTitle: "A discount, a nudge, and a paid order",
  flowDescription:
    "Convert your COD orders to prepaid by offering a discount. Fully configurable discount rules as per your business needs.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to move cash-on-delivery buyers onto online payment.",
  audienceTitle: "Best suited for",
  demoTitle: "See COD to Prepaid in Action",
  demoDescription:
    "The moment a cash-on-delivery order is placed, a banner offers the buyer a discount for paying online — and a reminder follows it with a secure payment link. This is what both look like.",
  faqTip:
    "Every discount rule, message and payment gateway here is set from the COD King dashboard — no theme edits, no code.",
  ctaTitle: "Ready to turn COD into prepaid?",
} as const;
