import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the Prefilled Address page says that is not already said
 * elsewhere (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name, the
 * outcome line and the two published benefits, and the page reads those from
 * the repository rather than restating them. What lives here is the page's own
 * argument.
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * This is the thinnest control in the repository by published copy: an outcome
 * line — "Speed up checkout by fetching customer details from their phone
 * number or past orders" — and two benefits, "Fetch customer details
 * automatically" and "Cut typing errors that send parcels to the wrong
 * address". The homepage board adds a one-line blurb saying the same thing,
 * and `src/data/pricing.ts` puts the control on every plan including the free
 * Standard one.
 *
 * Everything below is an elaboration of those, and deliberately nothing more.
 * There is no address-book feature, no pin-code database, no autocomplete
 * provider and no deliverability check anywhere on this page, because the
 * product publishes none of them and a checkout feature is exactly the kind of
 * thing a reader would assume from a single invented word.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On figures ────────────────────────────────────────────────────────────
 * There are none. The product publishes no completion-rate lift, no time
 * saved and no RTO reduction for this control, so the results band states
 * outcomes rather than measurements — the same treatment the COD Fees page
 * gives its own unmeasured band (§10.1).
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
export const addressCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "phone", label: "Filled from their number" },
  { id: "history", label: "Details from past orders" },
  { id: "auto", label: "Fetched automatically" },
  { id: "typos", label: "Fewer address typos" },
  { id: "speed", label: "A shorter checkout" },
  { id: "install", label: "No theme edits" },
];

/**
 * The results band.
 *
 * Four statements of what the control changes, none of them a measurement. The
 * figure a merchant would most want here is how much prefilling lifts checkout
 * completion, and the product has never published it; inventing one so this
 * band looked like the OTP page's would be the single most damaging thing on
 * the page.
 */
export const addressOutcomes: readonly FeatureOutcome[] = [
  {
    id: "speed",
    title: "A shorter checkout",
    value: "Fewer fields",
    body: "Details the customer has already given you are filled in rather than asked for a second time.",
  },
  {
    id: "accuracy",
    title: "Fewer wrong addresses",
    value: "Less to mistype",
    body: "Every field a customer does not type is a field they cannot get wrong.",
  },
  {
    id: "returning",
    title: "Returning buyers recognised",
    value: "From past orders",
    body: "A customer who has ordered before does not start again from an empty form.",
  },
  {
    id: "delivery",
    title: "A parcel the courier can deliver",
    value: "Right at checkout",
    body: "An address corrected at the checkout is one nobody has to chase after the parcel has left.",
  },
];

/**
 * How a checkout fills itself, in five beats (§6.3).
 *
 * The middle two are the control; the three around them are the checkout the
 * merchant already has. Stating them is what keeps the page describing a
 * shorter form rather than a new one.
 */
export const addressFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "arrive",
    title: "The customer reaches checkout",
    body: "A buyer opens your Shopify checkout to place a cash-on-delivery order.",
  },
  {
    id: "identify",
    title: "They enter their phone number",
    body: "The number the parcel will be delivered to is the one thing the checkout asks for first.",
  },
  {
    id: "fetch",
    title: "COD King fetches their details",
    body: "Details are looked up from that number, or from the orders the customer has placed with you before.",
  },
  {
    id: "prefill",
    title: "The form arrives filled in",
    body: "Name and delivery address are populated automatically, ready to be checked rather than composed.",
  },
  {
    id: "place",
    title: "The order goes through",
    body: "The buyer confirms what is on screen and places the cash-on-delivery order.",
  },
];

/** The one-line payoff under the flow. */
export const addressFlowResult =
  "Their number → Details you already hold → A checkout with almost nothing left to type";

/** The key-features grid (§6.3). */
export const addressFeatures: readonly FeatureCapability[] = [
  {
    id: "phone",
    title: "Lookup by phone number",
    body: "Fetch a customer's details from the mobile number the parcel will be delivered to.",
  },
  {
    id: "history",
    title: "Details from past orders",
    body: "A returning customer's previous delivery details are offered rather than retyped.",
  },
  {
    id: "auto",
    title: "Filled automatically",
    body: "Fields populate as soon as the customer is recognised. There is nothing for them to press.",
  },
  {
    id: "editable",
    title: "Checked, not committed",
    body: "Prefilled values are ordinary checkout fields, so a buyer who has moved simply changes them.",
  },
  {
    id: "typos",
    title: "Fewer typing errors",
    body: "Cut the typing errors that send parcels to the wrong address in the first place.",
  },
  {
    id: "checkout",
    title: "Inside your existing checkout",
    body: "It runs on the Shopify checkout you already have — no theme edits, no code, no developer.",
  },
];

/**
 * Who this control is a particularly good fit for.
 *
 * Characterisations of the store rather than claims about the product. Each
 * follows from what the control does — removing typing from a checkout — and
 * none of them is dressed up as a published statistic.
 */
export const addressAudience: readonly AudienceSegment[] = [
  { id: "mobile", title: "Mobile-first stores", note: "Typing on a phone" },
  {
    id: "repeat",
    title: "Stores with repeat buyers",
    note: "Details already on file",
  },
  {
    id: "cod",
    title: "COD-heavy catalogues",
    note: "Where the address is the delivery",
  },
  {
    id: "dropoff",
    title: "Long checkout forms",
    note: "Where buyers give up part-way",
  },
];

/** The page's own headline and supporting copy. */
export const addressPageCopy = {
  /** What the page calls the control — the controls repository's name too. */
  name: "Prefilled Address",
  /**
   * The category, not the feature. The headline directly below already carries
   * the name, and an eyebrow repeating it word for word is a label on a label.
   */
  eyebrow: "Checkout speed",
  headlineLead: "Prefilled Address",
  /**
   * Kept short enough to hold one line inside the hero's text column at every
   * width. The shared hero draws this statement in brand across a measure of
   * `max-w-xl`, and a middle line that breaks in two stops being one
   * statement — which is the whole reason the headline is three fields rather
   * than one string.
   */
  headlineAccent: "Less to Type.",
  headlineTail: "Fewer Wrong Parcels.",
  description:
    "COD King fills your Shopify checkout from what the customer has already given you — their phone number, or the details on the orders they placed before. There is less to type, so there is less to mistype, and fewer parcels leave on an address that was never right.",
  outcomesEyebrow: "Why prefill the address?",
  outcomesTitle: "The longest part of a COD checkout is the address",
  outcomesDescription:
    "It is typed on a phone, in a hurry, by someone who has typed it before. Every field the customer fills again is another chance for the parcel to go somewhere it cannot be delivered.",
  flowEyebrow: "How Prefilled Address works",
  flowTitle: "They give you a number. The form does the rest.",
  flowDescription:
    "One field the customer was going to fill anyway is enough to bring back everything you already hold about them.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to take the typing out of a cash-on-delivery checkout, without changing the checkout itself.",
  audienceTitle: "Best suited for",
  audienceDescription:
    "The stores where the address is the slowest part of the checkout and the most expensive thing to get wrong.",
  testimonialsTitle: "What Shopify merchants say",
  faqTip:
    "Prefilled Address is on every plan, including the free Standard plan. It runs on your existing Shopify checkout — no theme edits, no code.",
  ctaTitle: "Take the typing out of your COD checkout.",
  ctaDescription:
    "One field the customer was going to fill anyway brings back everything you already hold about them.",
} as const;
