import type { Control, ControlSlug, OrderStage } from "@/types";

/**
 * The four order stages and their problems, transcribed from §6.1.
 *
 * Declared in order — Before → At → After → Across — because that sequence is
 * itself part of the argument: it shows the merchant the whole system and the
 * stages they are not yet using (§6.4).
 */
export const orderStages: readonly OrderStage[] = [
  {
    id: "before-the-order",
    label: "Before the order",
    problem:
      "A bad COD order gets placed at all — a risky area, a repeat offender, or a low-value basket that should never have had COD.",
  },
  {
    id: "at-the-order",
    label: "At the order",
    problem:
      "The order is placed but may be fake or half-hearted, with no commitment from the buyer.",
  },
  {
    id: "after-the-order",
    label: "After the order",
    problem:
      "Orders are placed but carts are abandoned, or unverified orders ship anyway and come back.",
  },
  {
    id: "across-the-store",
    label: "Across the store",
    problem:
      "Messaging cost adds up, and the merchant cannot see what is working.",
  },
];

/**
 * The name the product markets the `cod-show-hide` control under.
 *
 * Declared once and read twice: the control record below carries it as its
 * `alias`, and the page's own copy uses it for the headline, the breadcrumb
 * and the document title. One marketing name written in two files is the drift
 * this repository is built to avoid.
 */
export const COD_SHOW_HIDE_ALIAS = "COD Show/Hide";

/**
 * The name the product markets the `messaging-gateways` control under.
 *
 * "Messaging Gateways" is what the subsystem is called; "Local SMS Gateway" is
 * what the Enterprise plan row in `src/data/pricing.ts` calls it, what the
 * `local-sms` answer in the FAQ pool describes, and what a merchant actually
 * searches for. The review asked for it to be visible in the features list
 * under that name, so — exactly as COD Show/Hide does — the record keeps its
 * canonical `name` and publishes the marketing one as its `alias`, and the
 * Features index carries the headline override.
 */
export const MESSAGING_GATEWAYS_ALIAS = "Local SMS Gateway";

/**
 * The ten controls (§6.2), in stage order.
 *
 * Where the product markets a control today, its `outcome` and `benefits` are
 * taken from codking.tech so the site says what the product says. The four
 * that are not yet marketed keep the architecture's own description and carry
 * no benefits rather than invented ones.
 *
 * `featured` marks the four controls the homepage highlights (§5.1 #6).
 */
export const controls: readonly Control[] = [
  {
    slug: "cod-show-hide",
    name: "COD Rules",
    alias: COD_SHOW_HIDE_ALIAS,
    stage: "before-the-order",
    outcome: "Restrict COD based on zip codes, cart value, or customer risk.",
    featured: true,
    benefits: [
      "Hide COD for high-risk pin codes or regions",
      "Show COD only above or below a cart value",
      "Enable or disable COD per product or collection",
      "Segment rules by customer tag or order history",
    ],
  },
  {
    slug: "cod-fees",
    name: "COD Fees",
    stage: "before-the-order",
    outcome: "Add a fee on COD orders so prepaid looks more attractive.",
    featured: false,
  },
  {
    slug: "cod-to-prepaid",
    name: "COD to Prepaid",
    stage: "before-the-order",
    outcome: "Convert COD users with smart discounts during the checkout flow.",
    featured: true,
    benefits: [
      "Offer an exclusive prepaid discount at checkout",
      "Show the nudge at checkout or after the order is placed",
      "Track COD-to-prepaid conversion in real time",
      "Customise messaging and discount conditions",
    ],
  },
  {
    slug: "otp-verification",
    name: "OTP Verification",
    stage: "at-the-order",
    outcome:
      "Authenticate orders via SMS or WhatsApp to block fake buyers instantly.",
    featured: true,
    benefits: [
      "Block fake and fraudulent orders instantly",
      "Send the OTP over SMS or WhatsApp",
      "Works on Shopify checkout without code changes",
      "See verified against unverified order reports",
    ],
  },
  {
    slug: "partial-cod-payment",
    name: "Partial COD Payment",
    stage: "at-the-order",
    outcome:
      "Collect a fixed or percentage deposit upfront to secure buyer commitment.",
    featured: false,
    benefits: [
      "Set the deposit as a fixed amount or a percentage",
      "Collect it through Shopify Payments or any gateway",
      "Show the prepaid option alongside COD at checkout",
      "Reduce cancellations and improve delivery rates",
    ],
  },
  {
    slug: "address-validation",
    name: "Prefilled Address",
    stage: "at-the-order",
    outcome:
      "Speed up checkout by fetching customer details from their phone number or past orders.",
    featured: false,
    benefits: [
      "Fetch customer details automatically",
      "Cut typing errors that send parcels to the wrong address",
    ],
  },
  {
    slug: "abandoned-cart-recovery",
    name: "Abandoned Cart Recovery",
    stage: "after-the-order",
    outcome:
      "Win back lost revenue with automated reminders on WhatsApp and SMS.",
    featured: false,
    benefits: [
      "Automated multi-step reminder sequences",
      "Send over SMS or WhatsApp, whichever the buyer prefers",
      "Include a direct checkout link for a one-tap return",
      "Recover lost COD revenue on autopilot",
    ],
  },
  {
    slug: "order-verification",
    name: "Order Verification",
    stage: "after-the-order",
    outcome: "Confirm, hold, or cancel COD orders before they ship.",
    featured: false,
  },
  {
    slug: "messaging-gateways",
    name: "Messaging Gateways",
    alias: MESSAGING_GATEWAYS_ALIAS,
    stage: "across-the-store",
    outcome:
      "Connect a local SMS operator and cut messaging costs by up to 60%.",
    featured: false,
    benefits: [
      "Route messages through a local SMS or WhatsApp operator",
      "Pay the operator directly, with no markup added",
      "Choose the operator listed for the market you sell in",
    ],
  },
  {
    slug: "analytics",
    name: "Analytics & Reports",
    stage: "across-the-store",
    outcome: "See RTO, fake-order, and prepaid trends in one place.",
    featured: false,
  },
];

/**
 * The controls that have a hand-built feature page of their own (§6.3).
 *
 * All ten, as of the review that asked for the four missing features to be
 * added to the menu, to the Features page and to pages of their own. Until
 * then the last four were served by the generic `features/[control]` template,
 * which rendered the control's record above a line saying the page was
 * implemented in a later phase — so they were `noIndex` and belonged in
 * neither the sitemap nor `llms.txt`.
 *
 * The template still exists and still serves nothing. That is deliberate: it
 * is the safety net for a control added to the repository before its page is
 * written, and removing it would turn that state from a thin page into a 404.
 *
 * This list lived inside `features/[control]/page.tsx`, where it existed only
 * to keep `generateStaticParams` from prerendering a path another file owns.
 * It is here now because a second consumer appeared: the sitemap has to answer
 * the same question — which control pages are real — and answering it from a
 * copy of this list is how the two drift the first time a page lands.
 *
 * A slug joins this list in the same commit that gives it a page.
 */
export const dedicatedControlPages: readonly ControlSlug[] = [
  "otp-verification",
  "partial-cod-payment",
  "cod-to-prepaid",
  "abandoned-cart-recovery",
  "cod-show-hide",
  "cod-fees",
  "messaging-gateways",
  "address-validation",
  "order-verification",
  "analytics",
];
