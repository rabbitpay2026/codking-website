import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the Analytics & Reports page says that is not already said
 * elsewhere (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name and the
 * outcome line, and the page reads those from the repository rather than
 * restating them. What lives here is the page's own argument.
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * Four places in this repository describe what the product reports, and this
 * page says exactly what they say and nothing else:
 *
 * - the control record: "See RTO, fake-order, and prepaid trends in one place";
 * - `src/data/pricing.ts`, whose Analytics & Insights benefit is "Get
 *   actionable insights and track what matters most", and which puts the
 *   control on the Enterprise plan;
 * - the OTP control's published benefit, "See verified against unverified
 *   order reports";
 * - the COD to Prepaid control's, "Track COD-to-prepaid conversion in real
 *   time".
 *
 * The knowledge layer's reporting entry gathers those into one sentence —
 * verified against unverified orders, prepaid share and recovered carts,
 * reported inside the app — and that sentence is the outline of this page.
 *
 * There is no export, no scheduled report, no cohort, no attribution and no
 * date-range picker anywhere here. A reporting page is the easiest place on a
 * site to describe a dashboard nobody has built.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On figures ────────────────────────────────────────────────────────────
 * There are none, and on this page in particular there must not be. Every
 * number this control would show belongs to the merchant reading it; printing
 * an example of one on the page that sells the report is the fastest way to
 * turn "here is what you will be able to measure" into "here is what we
 * promise you will measure" (§10.1).
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
export const analyticsCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "verified", label: "Verified vs unverified" },
  { id: "prepaid", label: "Prepaid share" },
  { id: "recovered", label: "Recovered carts" },
  { id: "rto", label: "RTO trends" },
  { id: "fake", label: "Fake-order trends" },
  { id: "one", label: "All inside the app" },
];

/**
 * The results band.
 *
 * Four things the report answers, stated as questions the merchant currently
 * cannot answer rather than as results. Not one of these carries a figure, for
 * the reason at the head of this file.
 */
export const analyticsOutcomes: readonly FeatureOutcome[] = [
  {
    id: "verified",
    title: "Verification, counted",
    value: "Verified vs unverified",
    body: "How many of your cash orders had a real, reachable buyer behind them.",
  },
  {
    id: "prepaid",
    title: "Prepaid share",
    value: "Cash against online",
    body: "What proportion of your orders arrive already paid — and which way that is moving.",
  },
  {
    id: "recovered",
    title: "Carts brought back",
    value: "Recovered checkouts",
    body: "How many abandoned checkouts the reminder sequence actually returned.",
  },
  {
    id: "rto",
    title: "RTO and fake orders",
    value: "In one place",
    body: "The two figures cash on delivery costs you, reported together rather than reconstructed.",
  },
];

/**
 * How a number reaches the report, in four beats (§6.3).
 *
 * Four rather than five, and the first is not a setup step: nothing is
 * configured to make this work. The controls run, what they did is recorded,
 * and the recording is what the report shows — which is also the argument for
 * why the figures are trustworthy.
 */
export const analyticsFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "run",
    title: "The controls run",
    body: "Verification, rules, fees, prepaid nudges and reminders act on your orders as you configured them.",
  },
  {
    id: "record",
    title: "Every decision is recorded",
    body: "Which orders verified, which moved to prepaid, which carts came back — kept as it happens.",
  },
  {
    id: "report",
    title: "It is reported in one place",
    body: "RTO, fake-order and prepaid trends are shown together inside COD King rather than assembled by hand.",
  },
  {
    id: "decide",
    title: "You change what is not working",
    body: "A control is tightened, loosened or switched off against a figure rather than against a feeling.",
  },
];

/** The one-line payoff under the flow. */
export const analyticsFlowResult =
  "The controls act → COD King records what happened → One place to see whether it worked";

/** The key-features grid (§6.3). */
export const analyticsFeatures: readonly FeatureCapability[] = [
  {
    id: "verified",
    title: "Verified order reports",
    body: "See verified against unverified orders, so the effect of OTP verification is a figure.",
  },
  {
    id: "prepaid",
    title: "COD-to-prepaid conversion",
    body: "Track how many cash orders moved to online payment, in real time.",
  },
  {
    id: "recovery",
    title: "Cart recovery reporting",
    body: "See how many abandoned checkouts the reminder sequence brought back.",
  },
  {
    id: "rto",
    title: "RTO trends",
    body: "Watch return-to-origin move as the controls in front of it are tightened.",
  },
  {
    id: "fake",
    title: "Fake-order trends",
    body: "See how many of your cash orders never had a real buyer behind them.",
  },
  {
    id: "one",
    title: "One place",
    body: "All of it reported inside COD King, beside the controls the figures came from.",
  },
];

/**
 * Who this control is a particularly good fit for.
 *
 * Characterisations of the store rather than claims about the product. Each
 * follows from what a report is for — deciding what to change next — rather
 * than from a segment invented to fill the row.
 */
export const analyticsAudience: readonly AudienceSegment[] = [
  {
    id: "volume",
    title: "High-volume stores",
    note: "Where a percentage is money",
  },
  {
    id: "tuning",
    title: "Merchants tuning rules",
    note: "Change one thing, then check",
  },
  {
    id: "teams",
    title: "Teams reporting upward",
    note: "A figure, not a feeling",
  },
  {
    id: "multi",
    title: "Multi-market brands",
    note: "Every market behaves differently",
  },
];

/** The page's own headline and supporting copy. */
export const analyticsPageCopy = {
  /** What the page calls the control — the controls repository's name too. */
  name: "Analytics & Reports",
  /**
   * The category, not the feature. The headline directly below already carries
   * the name, and an eyebrow repeating it word for word is a label on a label.
   */
  eyebrow: "Reporting",
  headlineLead: "Analytics & Reports",
  /**
   * Kept short enough to hold one line inside the hero's text column at every
   * width. The shared hero draws this statement in brand across a measure of
   * `max-w-xl`, and a middle line that breaks in two stops being one
   * statement — which is the whole reason the headline is three fields rather
   * than one string.
   */
  headlineAccent: "Know What Worked.",
  headlineTail: "All in One Place.",
  description:
    "Every control COD King runs leaves a number behind it. Verified against unverified orders, prepaid share, recovered carts, and RTO and fake-order trends — all reported inside the app, so the effect of what you switched on is something you can check rather than something you assume.",
  outcomesEyebrow: "Why report on COD?",
  outcomesTitle: "Cash on delivery is the part of the business nobody measures",
  outcomesDescription:
    "The orders that were never real, the ones that came back, the share that arrived already paid — all of it is in the data somewhere, and none of it is anywhere a merchant can look at once.",
  flowEyebrow: "How Analytics & Reports works",
  flowTitle: "Nothing to set up. The controls report themselves.",
  flowDescription:
    "The figures are a record of what the controls already did, which is why there is no tracking to install and nothing to tag.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything COD King reports about your cash-on-delivery orders, and where each figure comes from.",
  audienceTitle: "Best suited for",
  audienceDescription:
    "The stores where cash on delivery is large enough that guessing at it is expensive.",
  testimonialsTitle: "What Shopify merchants say",
  faqTip:
    "Analytics & Reports is on the Enterprise plan. Everything it shows is recorded by the controls you already have switched on — there is nothing extra to install.",
  ctaTitle: "See what your COD operation is really costing you.",
  ctaDescription:
    "Verified orders, prepaid share, recovered carts and RTO trends, reported together inside the app.",
} as const;
