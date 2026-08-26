import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the Order Verification page says that is not already said
 * elsewhere (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name and the
 * outcome line, and the page reads those from the repository rather than
 * restating them. What lives here is the page's own argument.
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * The product publishes one line for this control — "Confirm, hold, or cancel
 * COD orders before they ship" — and the homepage board says the same thing in
 * the same words. Two other places in this repository bear on it: the
 * `after-the-order` stage in the controls repository, whose stated problem is
 * that "unverified orders ship anyway and come back", and `src/data/pricing.ts`,
 * which puts the control on the Enterprise plan.
 *
 * Every sentence below is an elaboration of those three verbs and that one
 * problem. There is no rule engine here, no automatic risk score, no courier
 * integration and no bulk action, because the product publishes none of them —
 * and an order queue is precisely the kind of screen a reader would credit with
 * features nobody promised.
 *
 * The control is deliberately not described as verifying the *buyer*. That is
 * OTP Verification's job and it has its own page; this one is the merchant
 * deciding, after the order exists, whether to send it.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On figures ────────────────────────────────────────────────────────────
 * There are none. The product publishes no cancellation rate, no RTO
 * reduction and no saving for this control, so the results band states
 * outcomes rather than measurements (§10.1).
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
export const orderVerificationCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "confirm", label: "Confirm before dispatch" },
  { id: "hold", label: "Hold anything doubtful" },
  { id: "cancel", label: "Cancel what shouldn't ship" },
  { id: "cod", label: "Cash orders only" },
  { id: "queue", label: "Every COD order reviewed" },
  { id: "install", label: "No theme edits" },
];

/**
 * The results band.
 *
 * Four statements of what the control changes, none of them a measurement. The
 * last one is the order stage's own published problem, stated as the thing this
 * control closes — which is the only claim on this page that comes from outside
 * the record, and it comes from the same repository.
 */
export const orderVerificationOutcomes: readonly FeatureOutcome[] = [
  {
    id: "confirm",
    title: "A decision, not a default",
    value: "Before dispatch",
    body: "A cash order waits on a confirm, a hold or a cancel rather than moving to fulfilment by itself.",
  },
  {
    id: "hold",
    title: "Somewhere to put a maybe",
    value: "Hold, then decide",
    body: "An order that needs a second look does not have to be cancelled in order to be stopped.",
  },
  {
    id: "cancel",
    title: "Stopped at the cheapest moment",
    value: "Before it is packed",
    body: "An order cancelled here costs no picking, no packing, no freight out and no freight back.",
  },
  {
    id: "stage",
    title: "The last gate on a cash order",
    value: "After the order",
    body: "Unverified orders shipping anyway and coming back is the problem this stage exists to close.",
  },
];

/**
 * How an order is reviewed, in four beats (§6.3).
 *
 * Four rather than five, because there is no configuration step in front of it:
 * the merchant does not set this control up, they use it. Inventing a first
 * beat so the rail matched its siblings' length would be describing a screen
 * that does not exist.
 */
export const orderVerificationFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "placed",
    title: "A COD order is placed",
    body: "A buyer completes your Shopify checkout and the cash-on-delivery order lands in the store.",
  },
  {
    id: "queue",
    title: "It arrives for review",
    body: "COD King holds the order for a decision rather than passing it straight through to fulfilment.",
  },
  {
    id: "decide",
    title: "You confirm, hold or cancel",
    body: "Confirm the ones you are happy to send, hold the ones you want to look at again, cancel the rest.",
  },
  {
    id: "ship",
    title: "Only confirmed orders ship",
    body: "The parcel is packed for an order somebody decided to send, not for one that was never stopped.",
  },
];

/** The one-line payoff under the flow. */
export const orderVerificationFlowResult =
  "Every cash order → Confirmed, held or cancelled → Only the confirmed ones ship";

/** The key-features grid (§6.3). */
export const orderVerificationFeatures: readonly FeatureCapability[] = [
  {
    id: "confirm",
    title: "Confirm an order",
    body: "Mark a cash-on-delivery order as good to send, and it carries on to fulfilment.",
  },
  {
    id: "hold",
    title: "Hold an order",
    body: "Park an order you are not sure about, without cancelling it and without shipping it.",
  },
  {
    id: "cancel",
    title: "Cancel an order",
    body: "Stop an order outright, before it is picked, packed or handed to a courier.",
  },
  {
    id: "before",
    title: "Ahead of dispatch",
    body: "The decision happens before the parcel exists, which is the cheapest moment to make it.",
  },
  {
    id: "cod",
    title: "Cash orders only",
    body: "This is the gate on cash on delivery. An order already paid online is not waiting on anything.",
  },
  {
    id: "dashboard",
    title: "From the COD King dashboard",
    body: "Orders are reviewed inside the app — no theme edits, no code, nothing added to your checkout.",
  },
];

/**
 * Who this control is a particularly good fit for.
 *
 * Characterisations of the store rather than claims about the product. Each
 * follows from what the control is — a decision made before a parcel is packed
 * — rather than from a segment invented to fill the row.
 */
export const orderVerificationAudience: readonly AudienceSegment[] = [
  {
    id: "highvalue",
    title: "High-value cash orders",
    note: "Where one refusal hurts",
  },
  {
    id: "custom",
    title: "Made-to-order products",
    note: "Refused stock cannot be resold",
  },
  {
    id: "rto",
    title: "Stores fighting RTO",
    note: "Stopped before it leaves",
  },
  {
    id: "manual",
    title: "Teams already calling buyers",
    note: "One place to record the answer",
  },
];

/** The page's own headline and supporting copy. */
export const orderVerificationPageCopy = {
  /**
   * What the page calls the control.
   *
   * "COD Order Verification", not the record's bare `name`. The control is
   * called Order Verification inside the product, but the site sells it beside
   * OTP Verification and a merchant scanning a menu of ten controls needs the
   * two told apart at a glance — so the features index publishes it under the
   * longer name and this page agrees with the index. The record, the slug and
   * the URL are all unchanged.
   */
  name: "COD Order Verification",
  /**
   * The category, not the feature. The headline directly below already carries
   * the name, and an eyebrow repeating it word for word is a label on a label.
   */
  eyebrow: "Before dispatch",
  headlineLead: "COD Order Verification",
  /**
   * Kept short enough to hold one line inside the hero's text column at every
   * width. The shared hero draws this statement in brand across a measure of
   * `max-w-xl`, and a middle line that breaks in two stops being one
   * statement — which is the whole reason the headline is three fields rather
   * than one string.
   */
  headlineAccent: "Decide Before You Ship.",
  headlineTail: "Not After It Returns.",
  description:
    "Cash-on-delivery orders reach COD King as a queue rather than as a decision already made. Confirm the ones you are happy to send, hold the ones you want to look at again, and cancel the rest — all of it before the parcel is picked, packed or dispatched.",
  outcomesEyebrow: "Why review a cash order?",
  outcomesTitle: "A refused parcel is decided long before it is refused",
  outcomesDescription:
    "It is decided at the moment nobody looked at the order. Everything after that — the picking, the packing, the freight out and the freight back — is the cost of not having looked.",
  flowEyebrow: "How COD Order Verification works",
  flowTitle: "Every cash order waits for a decision",
  flowDescription:
    "Confirm, hold or cancel. Three answers, taken before the order becomes a parcel rather than after it becomes a return.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to decide which cash-on-delivery orders leave your warehouse.",
  audienceTitle: "Best suited for",
  audienceDescription:
    "The stores where one refused parcel costs more than the minute it takes to look at the order.",
  testimonialsTitle: "What Shopify merchants say",
  faqTip:
    "COD Order Verification is on the Enterprise plan. Orders are reviewed from the COD King dashboard — no theme edits, no code.",
  ctaTitle: "Decide which COD orders actually ship.",
  ctaDescription:
    "Confirm, hold or cancel every cash order before it is picked, packed or dispatched.",
} as const;
