import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the COD Fees page says that is not already said elsewhere (§6.3,
 * §11).
 *
 * The control record in `src/data/controls.ts` already holds the name and the
 * outcome line, and the page reads those from the repository rather than
 * restating them. What lives here is the page's own argument.
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * The product publishes, for this control: "Charge an additional fee for COD
 * orders to encourage prepaid conversions and cover logistics costs", "Set a
 * fixed or percentage-based COD fee", "Display fee clearly at checkout (full
 * transparency)", "Reduce COD adoption naturally without disabling it", "Why
 * to leave money on the table when collecting additional COD fees is the norm
 * in the industry", "More than 70% of merchants are taking a small additional
 * fee on COD orders", "Also incentivize the prepaid conversions", "Complete
 * visibility to customers while placing the order", "Increases prepaid
 * conversions", and "Set COD fees based on weight and price range". Its own
 * how-it-works rail is two beats: the customer selects cash on delivery, and
 * an additional fee is applied.
 *
 * `src/data/pricing.ts` adds that the control is on the Professional and
 * Enterprise plans rather than on every plan, and the `checkout-impact`
 * question already in the pool adds that COD fee labels and messaging at
 * checkout are customisable.
 *
 * Everything below is built from those and nothing else. "70%+" is the only
 * figure on this page and it is the product's own — a statement about what
 * merchants do, not a result this product measured. There is no RTO
 * percentage, no conversion lift and no revenue figure anywhere here, because
 * the product publishes none for this control (§10.1).
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On the fee amounts ────────────────────────────────────────────────────
 * No amount is stated as a default. The product's own example is "say 100
 * rupees" and the hero scene's is ₹49; both are illustrations of a number the
 * merchant chooses, and the scene labels its fee "Configured by merchant" for
 * exactly that reason. Nothing on this page may present a figure as the fee
 * COD King charges or recommends.
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
export const codFeesCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "amount", label: "Fixed or percentage fee" },
  { id: "visible", label: "Fee shown at checkout" },
  { id: "rules", label: "Fees by weight & price" },
  { id: "cost", label: "Covers extra COD cost" },
  { id: "prepaid", label: "Encourages prepaid" },
  { id: "available", label: "COD stays available" },
];

/**
 * The results band.
 *
 * Stated as outcomes rather than as measurements, exactly as the COD to
 * Prepaid, Abandoned Cart Recovery and COD Show/Hide pages are. The figure a
 * merchant most wants here is how much a fee lifts prepaid share, and the
 * product has never published it; inventing one so this band looked like the
 * OTP page's would be the single most damaging thing on the page.
 *
 * The one exception is "70%+ of merchants", which is the product's own
 * published claim about the industry — and it is worded here as what merchants
 * do rather than as something this app achieved.
 */
export const codFeesOutcomes: readonly FeatureOutcome[] = [
  {
    id: "cover",
    title: "Cover what COD costs",
    value: "Per COD order",
    body: "An additional fee on cash-on-delivery orders goes toward the logistics cost prepaid orders never carry.",
  },
  {
    id: "prepaid",
    title: "Encourage prepaid",
    value: "Without hiding COD",
    body: "A visible fee reduces COD adoption naturally, and cash on delivery stays on the checkout.",
  },
  {
    id: "transparent",
    title: "Nothing hidden at checkout",
    value: "Shown before paying",
    body: "The customer sees the fee and the final total while they are placing the order.",
  },
  {
    id: "norm",
    title: "Already the industry norm",
    value: "70%+ of merchants",
    body: "More than 70% of merchants take a small additional fee on COD orders.",
  },
];

/**
 * How a COD fee reaches the buyer, in five beats (§6.3).
 *
 * The product's own rail is two — the customer picks cash on delivery, and the
 * fee is applied. The three beats around them are the parts a merchant is
 * actually deciding between: the fee they configure before any of this, the
 * total the customer is shown afterwards, and the choice that total leaves
 * them with. Collapsing those would reduce the control to a surcharge appearing
 * out of nowhere, which is the one thing its transparency claim rules out.
 *
 * The same sequence drives the animated scene in the hero, so what a visitor
 * reads here and what they watch up there are the same steps in the same
 * order.
 */
export const codFeesFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "configure",
    title: "Configure your COD fee",
    body: "Set a fixed amount or a percentage from the COD King dashboard — no theme edits, no code.",
  },
  {
    id: "select",
    title: "Customer selects COD",
    body: "A buyer reaches your Shopify checkout and chooses cash on delivery over paying online.",
  },
  {
    id: "apply",
    title: "The COD fee is applied",
    body: "COD King adds your fee to the order summary as its own clearly labelled line.",
  },
  {
    id: "total",
    title: "The total updates",
    body: "The customer sees the fee and the new total before they commit to anything.",
  },
  {
    id: "complete",
    title: "Customer completes the order",
    body: "They place the COD order at the total on screen — or switch to online payment, which carries no COD fee.",
  },
];

/** The one-line payoff under the flow. */
export const codFeesFlowResult =
  "Your fee → Applied when COD is chosen → A total the customer can see";

/** The demo section's supporting points. */
export const codFeesDemoPoints: readonly FeatureCheckpoint[] = [
  {
    id: "amount",
    label: "A fixed or percentage COD fee, set from the dashboard",
  },
  {
    id: "apply",
    label: "The fee appearing in the order summary when COD is selected",
  },
  { id: "total", label: "The order total updating in front of the customer" },
  {
    id: "prepaid",
    label: "Online payment still on the checkout, without the COD fee",
  },
];

/** The key-features grid (§6.3). */
export const codFeesFeatures: readonly FeatureCapability[] = [
  {
    id: "fixed",
    title: "Fixed fee amount",
    body: "Charge a flat additional amount on every cash-on-delivery order.",
  },
  {
    id: "percentage",
    title: "Percentage-based fee",
    body: "Charge a share of the order value instead, so larger baskets carry a larger fee.",
  },
  {
    id: "weight",
    title: "Fees by weight",
    body: "Set COD fees by parcel weight, so a heavy shipment carries more of its own freight.",
  },
  {
    id: "range",
    title: "Fees by price range",
    body: "Set different fees for different order value bands rather than one fee for every cart.",
  },
  {
    id: "transparent",
    title: "Full checkout transparency",
    body: "Complete visibility to customers while placing the order — the fee and the final total are both on screen.",
  },
  {
    id: "label",
    title: "Customisable fee labels",
    body: "COD fee labels and checkout messaging are yours to word, and nothing else about your theme changes.",
  },
];

/**
 * Who this control is a particularly good fit for.
 *
 * Characterisations of the store rather than claims about the product. Each
 * follows from what the control is for — covering the logistics cost of cash
 * on delivery and nudging buyers toward prepaid — rather than from a segment
 * this page invented to fill the row.
 */
export const codFeesAudience: readonly AudienceSegment[] = [
  {
    id: "logistics",
    title: "High COD handling costs",
    note: "Cash collection and return freight",
  },
  {
    id: "heavy",
    title: "Heavy or bulky products",
    note: "Freight a refused parcel doubles",
  },
  {
    id: "codheavy",
    title: "COD-heavy catalogues",
    note: "Most orders arriving unpaid",
  },
  {
    id: "prepaid",
    title: "Stores shifting to prepaid",
    note: "Without removing COD",
  },
  {
    id: "margin",
    title: "Thin-margin categories",
    note: "Where the COD cost shows",
  },
];

/** The page's own headline and supporting copy. */
export const codFeesPageCopy = {
  /** What the page calls the control — the controls repository's name too. */
  name: "COD Fees",
  /**
   * The category, not the feature. The headline directly below already carries
   * the name, and an eyebrow repeating it word for word is a label on a label.
   */
  eyebrow: "COD charges",
  headlineLead: "COD Fees",
  /**
   * Kept short enough to hold one line inside the hero's text column at every
   * width. The shared hero draws this statement in brand across a measure of
   * `max-w-xl`, and a middle line that breaks in two stops being one
   * statement — which is the whole reason the headline is three fields rather
   * than one string.
   */
  headlineAccent: "Make COD Pay Its Way.",
  headlineTail: "Right at Checkout.",
  description:
    "Charge an additional fee for COD orders to cover logistics costs and encourage prepaid conversions. Set a fixed or percentage-based fee, and COD King displays it clearly at your Shopify checkout so the customer sees the total before they order.",
  outcomesEyebrow: "Why charge a COD fee?",
  outcomesTitle: "A COD order costs more to fulfil than a prepaid one",
  outcomesDescription:
    "Cash on delivery carries handling and return freight a prepaid order never does. A small additional fee covers some of that — and gives the customer a reason to pay online instead.",
  flowEyebrow: "How COD Fees works",
  flowTitle: "Set the fee. The checkout shows it.",
  flowDescription:
    "Set a fixed or percentage-based COD fee, and it is applied the moment a customer chooses cash on delivery — as its own line, in front of them.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to charge for cash on delivery, and to show the customer exactly what they are paying.",
  audienceTitle: "Best suited for",
  demoTitle: "See COD Fees in Action",
  demoDescription:
    "Watch a COD fee reach a live Shopify checkout: the customer picks cash on delivery, the fee appears as its own line in the order summary, and the total updates while online payment stays exactly where it was.",
  testimonialsTitle: "What Shopify merchants say",
  faqTip:
    "COD fees are set from the COD King dashboard — no theme edits, no code, and the fee label your customers read is yours to word.",
  ctaTitle: "Ready to make COD work better for your store?",
} as const;
