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
 * Four beats, restated at the reviewer's instruction as the journey the buyer
 * actually takes — they pick something, they go to checkout, they prove the
 * number is theirs, the order is placed. The earlier version started at
 * "customer enters mobile number", which begins the story halfway through and
 * makes the verification look like a form the store added rather than one step
 * inside a checkout the buyer was already in.
 *
 * The merchant performs none of the four, which is the argument the section
 * makes without stating it.
 */
export const otpFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "select",
    title: "Customer selects the product",
    body: "The buyer adds what they want to the cart on your Shopify store, exactly as they do today.",
  },
  {
    id: "checkout",
    title: "Clicks on checkout",
    body: "They reach checkout and choose cash on delivery. Nothing about the page changes.",
  },
  {
    id: "verify",
    title: "Verifies mobile number via OTP",
    body: "COD King sends a one-time password over SMS or WhatsApp, and the buyer enters it to prove the number is theirs.",
  },
  {
    id: "placed",
    title: "Order placed",
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

/**
 * The capability grid (§6.3).
 *
 * ── Where these come from ─────────────────────────────────────────────────
 * Every entry is a setting the COD King documentation describes for OTP
 * verification — https://docs.codking.tech/setting-otp-verification-on-shopify
 * — rather than a capability written to fill a grid. The review asked this
 * section to explain more of what a merchant can actually configure, naming
 * country targeting and blocked numbers specifically; both are here, with the
 * rest of the documented set beside them.
 *
 * "Smart auto detect" was removed at the reviewer's instruction and nothing
 * was invented to take its place — the grid simply carries the settings that
 * exist.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const otpCapabilities: readonly FeatureCapability[] = [
  {
    id: "countries",
    title: "Country targeting",
    body: "Ask for verification only in the countries you select, or in every country by default.",
  },
  {
    id: "blocklist",
    title: "Blocked phone numbers",
    body: "Blacklist specific numbers so they can never verify an order on your store.",
  },
  {
    id: "channels",
    title: "SMS, WhatsApp or both",
    body: "Choose which channel carries the one-time password, or send it over both.",
  },
  {
    id: "branding",
    title: "Custom OTP branding",
    body: "Your store name, your message, your logo on the verification your buyers see.",
  },
  {
    id: "trigger",
    title: "Choose what to verify",
    body: "Trigger verification on every order, or only on the cash-on-delivery ones.",
  },
  {
    id: "address",
    title: "Prefilled shipping address",
    body: "Fill the buyer's address in from their verified number. Available in India.",
  },
  {
    id: "autocancel",
    title: "Auto-cancel timer",
    body: "Set how long an order waits for confirmation. Unverified orders are cancelled automatically.",
  },
  {
    id: "onepass",
    title: "One-pass verification",
    body: "A buyer who has already verified is not asked again across tabs or stores.",
  },
  {
    id: "devices",
    title: "Multi-device optimised",
    body: "Renders correctly on mobile, tablet and desktop checkout.",
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
  capabilitiesTitle: "Advanced capabilities",
  capabilitiesDescription:
    "Everything you can configure about how, where and when a buyer is asked to verify.",
} as const;
