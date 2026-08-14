import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the Abandoned Cart Recovery page says that is not already said
 * elsewhere (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name, the
 * outcome line and the four published benefits, and the page reads those from
 * the repository rather than restating them. What lives here is the page's own
 * argument.
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * This control is the most thinly documented of the four built so far. The
 * product publishes one sentence for it — "Recover lost sales by sending
 * timely SMS/WhatsApp reminders for COD buyers who didn't complete checkout"
 * — plus the four benefits on the control record and the fact, from
 * `src/data/pricing.ts`, that it is included on every plan.
 *
 * Everything below is built from those and nothing else. There is no recovery
 * rate, no revenue figure and no message-count claim anywhere on this page,
 * because the product states none; the results band is qualitative for the
 * same reason the COD to Prepaid page's is (§10.1).
 * ──────────────────────────────────────────────────────────────────────────
 */

/** The hero checklist, in the blueprint's two columns. */
export const cartCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "recover", label: "Recover lost COD sales" },
  { id: "sequences", label: "Automated reminder sequences" },
  { id: "channels", label: "SMS or WhatsApp delivery" },
  { id: "link", label: "Direct checkout link" },
  { id: "autopilot", label: "Runs on autopilot" },
  { id: "plans", label: "Included on every plan" },
];

/**
 * The results band.
 *
 * Stated as outcomes rather than as figures, exactly as the COD to Prepaid
 * page's is. A recovery percentage is the number a merchant most wants here
 * and the one the product has never published; inventing it so this band looks
 * like the OTP page's would be the single most damaging thing on the page.
 *
 * Each `value` is the shape of the outcome — what a merchant reads at that
 * size — and each caption follows from the mechanism rather than from a
 * measurement.
 */
export const cartOutcomes: readonly FeatureOutcome[] = [
  {
    id: "revenue",
    title: "Recover lost revenue",
    value: "Win it back",
    body: "A checkout that was abandoned becomes an order again.",
  },
  {
    id: "reach",
    title: "Reach buyers where they are",
    value: "SMS & WhatsApp",
    body: "Reminders arrive on the channel the buyer actually reads.",
  },
  {
    id: "return",
    title: "A one-tap way back",
    value: "Direct link",
    body: "Every reminder carries a link straight back to the cart.",
  },
  {
    id: "autopilot",
    title: "No manual chasing",
    value: "On autopilot",
    body: "The sequence runs itself once you have switched it on.",
  },
];

/**
 * How a recovery runs, as the buyer experiences it (§6.3).
 *
 * Five beats rather than the four the sibling pages use, and the fifth is
 * load-bearing: "left the checkout" and "was reminded" are two different
 * events, and collapsing them would hide the only moment the product acts.
 *
 * The same sequence drives the animated panel in the hero, so what a visitor
 * reads here and what they watch up there are the same steps in the same
 * order.
 */
export const cartFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "checkout",
    title: "Customer starts checkout",
    body: "They reach your Shopify checkout with a cash-on-delivery cart ready to place.",
  },
  {
    id: "abandoned",
    title: "They leave without ordering",
    body: "The checkout is abandoned, and the sale is lost unless somebody follows it up.",
  },
  {
    id: "reminder",
    title: "COD King sends a reminder",
    body: "A timely message goes out over SMS or WhatsApp, as part of an automated sequence.",
  },
  {
    id: "return",
    title: "Customer taps the link",
    body: "The reminder carries a direct checkout link, so returning is one tap rather than a search.",
  },
  {
    id: "recovered",
    title: "The sale is recovered",
    body: "The order is placed, and revenue that had already been written off comes back.",
  },
];

/** The one-line payoff under the flow. */
export const cartFlowResult =
  "Abandoned checkout → Timely reminder → Recovered order";

/** The demo section's supporting points. */
export const cartDemoPoints: readonly FeatureCheckpoint[] = [
  { id: "sequences", label: "Automated multi-step reminder sequences" },
  { id: "channels", label: "Sent over SMS or WhatsApp, whichever suits" },
  { id: "link", label: "A direct checkout link in every reminder" },
  { id: "plans", label: "Included on every plan, including the free one" },
];

/** The key-features grid (§6.3). */
export const cartFeatures: readonly FeatureCapability[] = [
  {
    id: "sequences",
    title: "Multi-step sequences",
    body: "Automated reminder sequences rather than one message that is easy to miss.",
  },
  {
    id: "channels",
    title: "SMS or WhatsApp",
    body: "Send over whichever channel your buyers actually read and reply on.",
  },
  {
    id: "link",
    title: "Direct checkout link",
    body: "Every reminder carries a link back to the cart, so returning takes one tap.",
  },
  {
    id: "timing",
    title: "Timely reminders",
    body: "Messages go out while the checkout is still fresh in the buyer's mind.",
  },
  {
    id: "autopilot",
    title: "Runs on autopilot",
    body: "Set the sequence once and recovery keeps running without you touching it.",
  },
  {
    id: "cod",
    title: "Built for COD buyers",
    body: "Aimed at the cash-on-delivery checkouts that were started and never finished.",
  },
];

/**
 * Who this control is a particularly good fit for.
 *
 * Unlike the COD to Prepaid page, whose use cases are published as a list,
 * these are characterisations of the store rather than claims about the
 * product: who loses most to an abandoned checkout. Nothing here says the
 * control does anything the source does not already say it does.
 */
export const cartAudience: readonly AudienceSegment[] = [
  { id: "cod-heavy", title: "COD-heavy stores", note: "Carts left unfinished" },
  { id: "high-aov", title: "High-value carts", note: "Each one worth chasing" },
  {
    id: "traffic",
    title: "High-traffic stores",
    note: "Many checkouts started",
  },
  {
    id: "whatsapp",
    title: "WhatsApp-first markets",
    note: "India, UAE, Philippines",
  },
];

/** The page's own headline and supporting copy. */
export const cartPageCopy = {
  eyebrow: "Cart recovery",
  headlineLead: "Abandoned Cart Recovery",
  headlineAccent: "Win Back Lost Sales.",
  headlineTail: "Automatically.",
  description:
    "Recover lost sales by sending timely SMS and WhatsApp reminders to COD buyers who didn't complete checkout. Every reminder carries a link straight back to the cart, so coming back takes one tap.",
  outcomesEyebrow: "Why recover abandoned carts?",
  outcomesTitle: "A started checkout is not a lost one",
  outcomesDescription:
    "A buyer who left mid-checkout has already chosen your product. A timely reminder on the channel they read is often all that stands between an abandoned cart and an order.",
  flowEyebrow: "How cart recovery works",
  flowTitle: "Left the checkout. Reminded. Recovered.",
  flowDescription:
    "Recover lost sales by sending timely SMS/WhatsApp reminders for COD buyers who didn't complete checkout.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to bring an abandoned cash-on-delivery checkout back.",
  audienceTitle: "Best suited for",
  demoTitle: "See Abandoned Cart Recovery in Action",
  demoDescription:
    "Watch how COD King spots an abandoned COD checkout, sends the reminder, and brings the buyer back to a cart that is still waiting.",
  testimonialsTitle: "What Shopify merchants say",
  faqTip:
    "Reminder timing, channel and message are all set from the COD King dashboard — no theme edits, no code.",
  ctaTitle: "Ready to recover your lost checkouts?",
} as const;
