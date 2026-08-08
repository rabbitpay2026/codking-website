import type {
  CheckoutStage,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the OTP Verification page says that is not already said
 * elsewhere (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name, the
 * outcome line and the four published benefits, and the page reads those from
 * the repository rather than restating them. What lives here is the page's own
 * argument: the hero checklist, the four beats of a verification, the outcomes
 * band, the checkout walkthrough and the capability row.
 */

/**
 * The hero checklist, in the blueprint's two columns.
 *
 * Six capability statements and not one number. The figures belong to the
 * outcomes band below, where each of them can carry the qualification that
 * makes it honest; a bare percentage beside a tick in a hero is a promise with
 * nowhere to put its footnote.
 *
 * The left column is what the control does to an order, the right is what it
 * does *not* do to the store — which is the objection a merchant actually
 * arrives with once they believe the first three.
 */
export const otpCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "verify", label: "Verify mobile numbers in real time" },
  { id: "block", label: "Block fake and spam orders instantly" },
  { id: "branding", label: "Custom OTP message and branding" },
  { id: "channels", label: "Delivered over SMS or WhatsApp" },
  { id: "design", label: "No change to your store design" },
  { id: "experience", label: "Seamless for genuine customers" },
];

/**
 * How a verification runs, as the buyer experiences it (§6.3).
 *
 * Four beats, and the merchant performs none of them — which is the argument
 * the section is making without stating it. The same sequence drives the
 * animated panel in the hero, so what a visitor reads here and what they watch
 * up there are the same four steps in the same order.
 */
export const otpFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "number",
    title: "Customer enters mobile number",
    body: "The buyer reaches checkout and enters the number the parcel will be delivered to.",
  },
  {
    id: "send",
    title: "OTP is sent instantly",
    body: "COD King sends a one-time password to that number over SMS or WhatsApp.",
  },
  {
    id: "verify",
    title: "Customer enters the OTP",
    body: "The buyer types the code back into checkout, proving the number is theirs.",
  },
  {
    id: "placed",
    title: "Order is placed successfully",
    body: "Only verified orders are accepted. Everything else never becomes a parcel.",
  },
];

/**
 * The outcomes band.
 *
 * ── Read this before shipping ──────────────────────────────────────────────
 * These four figures are the ones on the marketing blueprint this page was
 * built from, supplied and confirmed by the site owner. They are NOT drawn
 * from `src/data/proof.ts` or from the homepage's `outcomeMetrics`, and no
 * source for them exists in this repository — which puts them outside what
 * §10.1 asks of a published claim.
 *
 * An earlier pass rendered the repository's own numbers here instead (35%
 * fewer fake and RTO orders, 70% saved on messaging, 2–3× in month one). That
 * was overridden deliberately; this note exists so the next person does not
 * quietly "fix" it back, and so the substitution is visible when the figures
 * are checked.
 *
 * TODO(content): attach a source to each of these — or replace them with the
 * proof repository's figures — before the page is indexed. The homepage, the
 * hero trust line and the footer all read from `getProofMetrics()`, so this is
 * currently the only band on the page that does not.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const otpOutcomes: readonly FeatureOutcome[] = [
  {
    id: "fake-orders",
    title: "Reduce fake orders",
    value: "70%+",
    body: "Fake & spam orders reduced instantly",
  },
  {
    id: "rto",
    title: "Lower RTO",
    value: "40%+",
    body: "Lower RTO with genuine customers only",
  },
  {
    id: "costs",
    title: "Save costs",
    value: "Save ₹1,000s",
    body: "On shipping, packaging & return costs",
  },
  {
    id: "profits",
    title: "Increase profits",
    value: "25%+",
    body: "Increase in profit margins",
  },
];

/**
 * The checkout walkthrough.
 *
 * The section exists to answer one objection — "you are putting a step in
 * front of my buyers" — and it answers it by showing the checkout on either
 * side of the verification rather than by claiming the step is small. The
 * first and third stages are deliberately the same screen.
 */
export const otpCheckoutStages: readonly CheckoutStage[] = [
  {
    id: "before",
    title: "Before COD King",
    body: "The buyer fills in checkout and places a cash-on-delivery order. Nothing confirms the number is real.",
  },
  {
    id: "verify",
    title: "With COD King OTP",
    body: "One verification step appears in your own store's styling. The code arrives in seconds.",
  },
  {
    id: "after",
    title: "After verification",
    body: "The order is placed and moves on exactly as it did before — only now it belongs to a real buyer.",
  },
];

/** The capability row (§6.3). Five, compact, one line each. */
export const otpCapabilities: readonly FeatureCapability[] = [
  {
    id: "auto-detect",
    title: "Smart auto detect",
    body: "Detects a COD order at checkout and triggers verification on its own.",
  },
  {
    id: "branding",
    title: "Custom OTP branding",
    body: "Your store name, your message, your wording on every code that goes out.",
  },
  {
    id: "fraud",
    title: "Fraud protection",
    body: "Repeat offenders and unverified numbers never make it into dispatch.",
  },
  {
    id: "devices",
    title: "Multi-device optimised",
    body: "Renders correctly on mobile, tablet and desktop checkout.",
  },
  {
    id: "realtime",
    title: "Real-time verification",
    body: "The code is sent and checked in seconds, without leaving checkout.",
  },
];

/**
 * The demo section's supporting points.
 *
 * Four, and each one names something visible in the recording rather than a
 * benefit the video does not show — a checklist beside a player is a caption,
 * and a caption that describes a different video is worse than none.
 */
export const otpDemoPoints: readonly FeatureCheckpoint[] = [
  { id: "checkout", label: "The verification step, in a live checkout" },
  { id: "delivery", label: "A code arriving over SMS and WhatsApp" },
  { id: "blocked", label: "What happens to an order nobody confirms" },
  { id: "admin", label: "Verified against unverified orders in the admin" },
];

/** The page's own headline and supporting line. */
export const otpPageCopy = {
  eyebrow: "OTP Verification",
  /*
    Title case here and sentence case on every heading below it, which is the
    site's existing split rather than an inconsistency: the homepage's own `h1`
    is title case and its section headings are not. A page's one headline is a
    name; the rules down the page are sentences.
  */
  headlineLead: "Block Fake COD Orders",
  headlineAccent: "with OTP Verification",
  description:
    "Verify every cash-on-delivery order with a single OTP step, so genuine buyers sail through and fake orders never become a parcel you pay to ship twice.",
} as const;
