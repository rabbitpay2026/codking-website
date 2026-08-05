import type { Control, OrderStage } from "@/types";

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
    slug: "cod-rules",
    name: "COD Rules",
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
    slug: "prepaid-nudge",
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
    featured: true,
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
    stage: "across-the-store",
    outcome:
      "Connect a local SMS provider and cut messaging costs by up to 70%.",
    featured: false,
    benefits: [
      "Route messages through regional providers",
      "Pay your provider directly in local currency",
      "Reach customers in their preferred language and number format",
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
