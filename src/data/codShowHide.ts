import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

/**
 * Everything the COD Show/Hide page says that is not already said elsewhere
 * (§6.3, §11).
 *
 * The control record in `src/data/controls.ts` already holds the name, the
 * outcome line and the four published benefits, and the page reads those from
 * the repository rather than restating them. What lives here is the page's own
 * argument.
 *
 * ── On the name and the URL ───────────────────────────────────────────────
 * The controls repository calls this control "COD Rules", which is the name
 * the mega-menu and the footer have always shown and the name the product
 * uses inside the admin. The product *markets* it as "COD Show/Hide", the
 * Features index has always titled it so, and the published page for it sits
 * at a URL of that name — so the slug moved to `cod-show-hide` and this page
 * introduces itself the way the product introduces it. The old path redirects
 * permanently; see `next.config.ts`.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On the wording ────────────────────────────────────────────────────────
 * The product publishes, for this control: "Take full control of your COD
 * policy by defining where, when, and to whom COD is offered", "Set conditions
 * like order value, pin code, customer history, or product type", "15+ params
 * to create rules to hide or show COD", "Blacklist based on phone
 * numbers/email", "Complete flexibility with no latency", and three use cases
 * — custom products, pin codes a courier will not collect cash in, and
 * blacklisting a customer by phone number. The control record adds the four
 * benefits, and `src/data/pricing.ts` adds that the control is on the
 * Professional and Enterprise plans rather than on every plan.
 *
 * Everything below is built from those and nothing else. "15+" is the only
 * figure on this page, and it is the product's own; there is no RTO
 * percentage, no fake-order rate and no saving anywhere here, because the
 * product states none for this control (§10.1).
 * ──────────────────────────────────────────────────────────────────────────
 */

/** The hero checklist, in the blueprint's two columns. */
export const codShowHideCheckpoints: readonly FeatureCheckpoint[] = [
  { id: "rules", label: "Show or hide COD by rule" },
  { id: "params", label: "15+ rule parameters" },
  { id: "location", label: "Pin code and region rules" },
  { id: "value", label: "Cart value thresholds" },
  { id: "blacklist", label: "Blacklist by phone or email" },
  { id: "latency", label: "No latency at checkout" },
];

/**
 * The results band.
 *
 * Stated as outcomes rather than as measurements, exactly as the COD to
 * Prepaid and Abandoned Cart Recovery pages are. The figure a merchant most
 * wants here is how much RTO a rule prevents, and the product has never
 * published it; inventing one so this band looked like the OTP page's would be
 * the single most damaging thing on the page.
 *
 * The one exception is "15+", which is the product's own published count of
 * the parameters a rule can be built from.
 */
export const codShowHideOutcomes: readonly FeatureOutcome[] = [
  {
    id: "control",
    title: "Control your COD policy",
    value: "Your rules",
    body: "You decide where, when and to whom cash on delivery is offered.",
  },
  {
    id: "risk",
    title: "Keep risky orders out",
    value: "Before checkout",
    body: "COD never appears for the pin codes, carts or customers you exclude.",
  },
  {
    id: "params",
    title: "Conditions you can combine",
    value: "15+ params",
    body: "Order value, pin code, product, customer history and more.",
  },
  {
    id: "prepaid",
    title: "Prepaid stays available",
    value: "Still an option",
    body: "Hiding COD removes one way to pay, not the order itself.",
  },
];

/**
 * How a rule runs, as the buyer meets it (§6.3).
 *
 * Five beats rather than four, and the extra one earns its place: the product
 * describes this control as an engine that *decides*, so checking the
 * conditions and matching one of them are two separate moments, and collapsing
 * them would hide the only step COD King performs.
 *
 * The same sequence drives the animated scene in the hero, so what a visitor
 * reads here and what they watch up there are the same steps in the same
 * order.
 */
export const codShowHideFlowSteps: readonly FeatureFlowStep[] = [
  {
    id: "rule",
    title: "Create your rule",
    body: "Set the condition and the action from the COD King dashboard — no theme edits, no code.",
  },
  {
    id: "checkout",
    title: "Customer reaches checkout",
    body: "A buyer lands on your Shopify checkout and enters their details as usual.",
  },
  {
    id: "check",
    title: "COD King checks the conditions",
    body: "The engine reads the order against every condition you have set, with no latency.",
  },
  {
    id: "match",
    title: "The rule is matched",
    body: "The condition that fits this order decides what happens to cash on delivery.",
  },
  {
    id: "decide",
    title: "COD is shown or hidden",
    body: "Cash on delivery appears for the orders you want it on and disappears for the rest.",
  },
];

/** The one-line payoff under the flow. */
export const codShowHideFlowResult =
  "Your rule → Checked at checkout → COD shown or hidden";

/** The demo section's supporting points. */
export const codShowHideDemoPoints: readonly FeatureCheckpoint[] = [
  {
    id: "params",
    label: "Rules built from order value, pin code, product or customer",
  },
  {
    id: "blacklist",
    label: "Blacklists for specific phone numbers and email addresses",
  },
  {
    id: "checkout",
    label: "COD appearing and disappearing at the Shopify checkout",
  },
  { id: "setup", label: "Set up from the dashboard — no code, no theme edits" },
];

/** The key-features grid (§6.3). */
export const codShowHideFeatures: readonly FeatureCapability[] = [
  {
    id: "flexible",
    title: "Flexible COD rules",
    body: "Build a rule from 15+ parameters and combine the conditions that matter to your store.",
  },
  {
    id: "value",
    title: "Order value rules",
    body: "Show COD only above or below a cart value, so the baskets you choose pay upfront.",
  },
  {
    id: "location",
    title: "Pin code & region rules",
    body: "Hide COD for high-risk pin codes, or for regions your courier will not collect cash in.",
  },
  {
    id: "product",
    title: "Product & collection rules",
    body: "Enable or disable COD per product or collection — custom items included.",
  },
  {
    id: "customer",
    title: "Customer-based rules",
    body: "Segment rules by customer tag or order history, so past behaviour decides.",
  },
  {
    id: "blacklist",
    title: "Phone & email blacklists",
    body: "Block cash on delivery outright for specific phone numbers or email addresses.",
  },
];

/**
 * Who this control is a particularly good fit for.
 *
 * The first three are the product's own published use cases, in its own terms.
 * The last two follow from the control record's benefits — a cart-value rule
 * and a customer-history rule — rather than from anything this page invented.
 */
export const codShowHideAudience: readonly AudienceSegment[] = [
  {
    id: "custom",
    title: "Made-to-order stores",
    note: "Custom items you cannot restock",
  },
  {
    id: "coverage",
    title: "Restricted delivery areas",
    note: "Pin codes your courier will not cover",
  },
  {
    id: "blacklist",
    title: "Stores with repeat offenders",
    note: "Numbers and emails worth blocking",
  },
  {
    id: "value",
    title: "High-value carts",
    note: "Baskets too large to send as cash",
  },
  {
    id: "segments",
    title: "Segmented customer bases",
    note: "Tags and order history",
  },
];

/** The page's own headline and supporting copy. */
export const codShowHidePageCopy = {
  /**
   * What the page calls the control, for the breadcrumb, the headline and the
   * document title.
   *
   * The one place the page and the controls repository disagree, and
   * deliberately: the record's `name` is "COD Rules", the name the mega-menu
   * and the footer have always shown and the name the control has inside the
   * admin. This is the name the product markets it under.
   */
  name: "COD Show/Hide",
  /**
   * The category, not the feature. The headline directly below already carries
   * the name, and an eyebrow repeating it word for word is a label on a label.
   */
  eyebrow: "COD rules",
  headlineLead: "COD Show/Hide",
  headlineAccent: "Decide Who Gets COD.",
  headlineTail: "Rule by Rule.",
  description:
    "Take full control of your COD policy by defining where, when, and to whom cash on delivery is offered. Set conditions like order value, pin code, customer history or product type, and COD King applies them at your Shopify checkout.",
  outcomesEyebrow: "Why control COD availability?",
  outcomesTitle: "Not every order should be a COD order",
  outcomesDescription:
    "Some pin codes are never worth the freight, some baskets are too large to send as cash, and some buyers have refused a parcel before. A rule decides which of them ever sees cash on delivery.",
  flowEyebrow: "How COD Show/Hide works",
  flowTitle: "Set the rule. The checkout obeys it.",
  flowDescription:
    "Set conditions like order value, pin code, customer history or product type, and the COD show/hide engine decides whether cash on delivery is offered.",
  featuresTitle: "Key features",
  featuresDescription:
    "Everything you need to decide exactly when cash on delivery is offered.",
  audienceTitle: "Best suited for",
  demoTitle: "See COD Show/Hide in Action",
  demoDescription:
    "Watch a rule reach a live Shopify checkout: the conditions are read, the rule matches, and cash on delivery disappears while online payment stays exactly where it was.",
  testimonialsTitle: "What Shopify merchants say",
  faqTip:
    "Rules are built and edited from the COD King dashboard — no theme edits, no code, and no delay at checkout.",
  ctaTitle: "Ready to take control of COD?",
} as const;
