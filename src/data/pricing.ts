import type {
  MessageRate,
  PlanFit,
  PricingBenefit,
  PricingFeature,
  PricingMarket,
  PricingPlan,
} from "@/types";

/**
 * The four plans (§5.1 #9, §9.3), priced exactly as the COD King dashboard
 * prices them for India.
 *
 * This file is the only place a plan name, a price or a feature value is
 * written. The plan cards, the comparison table and the plan-fit band all read
 * from it, so a price change is one edit here and nothing else.
 *
 * `controlSlugs` is the single declaration of which controls a plan unlocks.
 * Control pages read it in reverse (§6.3 "which plan it needs"), so the two
 * surfaces cannot disagree.
 */
export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For starters & small businesses",
    price: { kind: "fixed", amount: 0, currency: "INR", period: "forever" },
    ctaLabel: "Start for Free",
    footnote: "No setup fees",
    recommended: false,
    controlSlugs: [
      "otp-verification",
      "partial-cod-payment",
      "abandoned-cart-recovery",
      "address-validation",
    ],
    highlights: [
      {
        label: "OTP verification via SMS/WhatsApp",
        feature: "otp-verification",
      },
      {
        label: "Competitive SMS rates",
        feature: "sms-rate",
        showValue: true,
        valueSuffix: "per message",
      },
      {
        label: "WhatsApp Business messaging",
        feature: "whatsapp-rate",
        showValue: true,
        valueSuffix: "per message",
      },
      {
        label: "Automated order confirmation messages (SMS/WhatsApp)",
        feature: "order-notifications",
      },
      { label: "Order fulfillment notifications" },
      { label: "Reliable SMS gateway infrastructure" },
      {
        label: "Abandoned cart recovery messages",
        feature: "abandoned-cart-recovery",
      },
      {
        label: "Partial payment collection",
        feature: "partial-payment",
        showValue: true,
        valueSuffix: "transaction fee per order",
      },
      { label: "COD to prepaid conversion incentives" },
      { label: "1-1 basic support", feature: "support" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing businesses",
    price: {
      kind: "fixed",
      amount: 899,
      currency: "INR",
      period: "month",
      previousAmount: 1299,
      savingsLabel: "Save ₹400/month",
      secondary: { amount: 9.99, currency: "USD" },
    },
    ctaLabel: "Choose Pro",
    footnote: "No setup fees",
    recommended: false,
    controlSlugs: ["cod-fees", "cod-show-hide", "cod-to-prepaid"],
    highlights: [
      { label: "All Free plan features included" },
      {
        label: "Premium SMS rates",
        feature: "sms-rate",
        showValue: true,
        valueSuffix: "per message",
      },
      {
        label: "WhatsApp rates",
        feature: "whatsapp-rate",
        showValue: true,
        valueSuffix: "per message",
      },
      {
        label: "Partial payment collection",
        feature: "partial-payment",
        showValue: true,
        valueSuffix: "transaction fee per order",
      },
      {
        label:
          "Advanced COD eligibility rules (15+ parameters including pincode, cart value, product categories)",
        feature: "cod-rules",
      },
      { label: "Configurable COD fees", feature: "cod-fees" },
      { label: "Abandoned cart recovery reminders" },
      {
        label: "Priority customer support via phone and chat",
        feature: "support",
      },
      { label: "Real-time order verification dashboard" },
      { label: "Auto-filled shipping addresses after OTP verification" },
      { label: "Any customization on payment rules is available" },
      {
        label:
          "Partial payment: shipping rate keyword (advanced settings — include this text in your shipping rate name)",
      },
    ],
    marketBenefits: ["Optimized for Tier-2 & Tier-3 cities"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For high-volume & custom needs",
    price: {
      kind: "fixed",
      amount: 1999,
      currency: "INR",
      period: "month",
      previousAmount: 3499,
      savingsLabel: "Save ₹1500/month",
      secondary: { amount: 21.99, currency: "USD" },
    },
    ctaLabel: "Select plan",
    footnote: "No setup fees",
    recommended: true,
    controlSlugs: ["messaging-gateways", "analytics", "order-verification"],
    highlights: [
      { label: "All Pro plan features included" },
      {
        label: "Enterprise SMS rates",
        feature: "sms-rate",
        showValue: true,
        valueSuffix: "per message (65% discount)",
      },
      {
        label: "WhatsApp rates",
        feature: "whatsapp-rate",
        showValue: true,
        valueSuffix: "per message (45% discount)",
      },
      {
        label:
          "Send WhatsApp from your own brand — claim 1,000 free messages every month from Meta",
        feature: "whatsapp-own-brand",
      },
      {
        label: "WhatsApp Chat Widget Support on Store",
        feature: "whatsapp-widget",
      },
      {
        label:
          "OnePass Verification — verify once and your session is validated across our entire partner network",
        feature: "onepass",
      },
      {
        label: "Partial payment collection",
        feature: "partial-payment",
        showValue: true,
        valueSuffix: "transaction fee per order",
      },
      {
        label: "Exportable abandoned cart and customer data",
        feature: "data-export",
      },
      { label: "Custom branded SMS sender ID support", feature: "sender-id" },
      { label: "Branded WhatsApp Business messaging" },
      {
        label: "Advanced analytics and reporting dashboard",
        feature: "analytics",
      },
      { label: "Dedicated Indian account manager", feature: "account-manager" },
      { label: "Priority routing for minimum latency" },
      { label: "Priority technical support", feature: "support" },
    ],
    marketBenefits: [
      "Dedicated Indian data centers",
      "India-based support",
      "Advanced fraud detection",
    ],
  },
  {
    id: "enterprise-plus",
    name: "Enterprise Plus",
    tagline: "For Shopify Plus & large brands",
    price: {
      kind: "fixed",
      amount: 4999,
      currency: "INR",
      period: "month",
      secondary: { amount: 59, currency: "USD" },
    },
    ctaLabel: "Select plan",
    footnote: "No setup fees",
    recommended: false,
    controlSlugs: [],
    highlights: [
      { label: "All Enterprise plan features included" },
      {
        label:
          "Send WhatsApp from your own brand — claim 1,000 free messages every month from Meta",
        feature: "whatsapp-own-brand",
      },
      { label: "Remove COD King branding", feature: "remove-branding" },
      {
        label: "OTP verification on Checkout Page (for Shopify Plus)",
        feature: "checkout-otp",
      },
      { label: "Dedicated Indian account manager", feature: "account-manager" },
      { label: "Priority routing for minimum latency" },
      { label: "Priority technical support", feature: "support" },
    ],
    marketBenefits: [
      "Dedicated Indian data centers",
      "India-based support",
      "Advanced fraud detection",
    ],
  },
];

/**
 * The market the plans above are priced for.
 *
 * Stated once, above the cards, rather than repeated as "in India" on four of
 * them. The badges are the three things that decide whether an Indian store
 * can use the app at all — a rupee price on a gateway that cannot clear DLT is
 * not a price they can act on.
 */
export const pricingMarket: PricingMarket = {
  title: "Built for Indian E-commerce",
  description:
    "COD King includes DLT compliance, local SMS gateways, and INR pricing.",
  badges: ["DLT Compliant", "Local SMS Gateway", "INR Pricing"],
  selectorLabel: "Select Country/Region",
  regions: [{ code: "IN", label: "India" }],
  defaultRegion: "IN",
};

/**
 * The comparison matrix, in the order the table prints it.
 *
 * Every value a plan card shows in a pill is read from here, so the table and
 * the cards cannot quote different rates.
 *
 * Only rows whose value is known for *every* plan live here. A line the
 * dashboard states for one plan and leaves unstated for the others — "Branded
 * WhatsApp Business messaging", say — stays a plain highlight on that card,
 * because a matrix column filled in by inference is a claim this repository
 * did not have the evidence to make.
 */
export const pricingFeatures: readonly PricingFeature[] = [
  {
    id: "otp-verification",
    label: "OTP Verification",
    values: {
      free: true,
      pro: true,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "sms-rate",
    label: "SMS Rate (per message)",
    values: {
      free: "₹1.00",
      pro: "₹0.85",
      enterprise: "₹0.35",
      "enterprise-plus": "₹0.35",
    },
  },
  {
    id: "whatsapp-rate",
    label: "WhatsApp Rate (per message)",
    values: {
      free: "₹1.60",
      pro: "₹1.30",
      enterprise: "₹0.95",
      "enterprise-plus": "₹0.95",
    },
  },
  {
    id: "notification-discount",
    label: "SMS Rate Discount",
    values: {
      free: false,
      pro: "15%",
      enterprise: "65%",
      "enterprise-plus": "65%",
    },
  },
  {
    id: "partial-payment",
    label: "Partial Payment (fee per order)",
    values: {
      free: "1.5%",
      pro: "0.8%",
      enterprise: "0.5%",
      "enterprise-plus": "0.5%",
    },
  },
  {
    id: "order-notifications",
    label: "Order Notifications (Alerts)",
    values: {
      free: true,
      pro: true,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "abandoned-cart-recovery",
    label: "Abandoned Cart Recovery",
    values: {
      free: true,
      pro: true,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "cod-fees",
    label: "COD Fees",
    values: {
      free: false,
      pro: true,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "cod-rules",
    label: "Show / Hide COD Rules",
    values: {
      free: false,
      pro: true,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "whatsapp-own-brand",
    label: "WhatsApp From Your Own Brand",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "whatsapp-widget",
    label: "WhatsApp Chat Widget",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "onepass",
    label: "OnePass Verification",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "sender-id",
    label: "Custom Branded SMS Sender ID",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "analytics",
    label: "Advanced Analytics & Reporting",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "data-export",
    label: "Exportable Cart & Customer Data",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "local-sms-gateway",
    label: "Local SMS Gateway",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "account-manager",
    label: "Dedicated Indian Account Manager",
    values: {
      free: false,
      pro: false,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "checkout-otp",
    label: "OTP on Checkout Page (Shopify Plus)",
    values: {
      free: false,
      pro: false,
      enterprise: false,
      "enterprise-plus": true,
    },
  },
  {
    id: "remove-branding",
    label: "Remove COD King Branding",
    values: {
      free: false,
      pro: false,
      enterprise: false,
      "enterprise-plus": true,
    },
  },
  {
    id: "unlimited-orders",
    label: "Unlimited Orders",
    values: {
      free: true,
      pro: true,
      enterprise: true,
      "enterprise-plus": true,
    },
  },
  {
    id: "support",
    label: "Support",
    values: {
      free: "1-1 basic",
      pro: "Priority (phone & chat)",
      enterprise: "Priority technical",
      "enterprise-plus": "Priority technical",
    },
  },
];

/** The reassurances under the hero's call to action. */
export const pricingAssurances: readonly string[] = [
  "Plans billed on your Shopify invoice",
  "Change or cancel anytime",
  "No order limit on any plan",
];

/** "Which plan is right for you?" — one column per plan, in plan order. */
export const planFits: readonly PlanFit[] = [
  {
    planId: "free",
    title: "Starting",
    description:
      "New stores or small volume businesses just getting started with COD.",
  },
  {
    planId: "pro",
    title: "Growing",
    description:
      "Businesses looking to reduce RTO, save on notifications and optimize COD.",
  },
  {
    planId: "enterprise",
    title: "Scaling",
    description:
      "High volume brands sending at their own rates, from their own WhatsApp brand.",
  },
  {
    planId: "enterprise-plus",
    title: "Shopify Plus",
    description:
      "Large brands that need checkout-page OTP and COD King branding removed.",
  },
];

/** "What you get with COD King" — the five cards under the table. */
export const pricingBenefits: readonly PricingBenefit[] = [
  {
    id: "otp-verification",
    title: "OTP Verification",
    description: "Block fake orders with secure OTP verification.",
  },
  {
    id: "partial-payments",
    title: "Partial Payments",
    description: "Collect upfront partial payments and reduce RTO.",
  },
  {
    id: "cod-fees",
    title: "COD Fees",
    description: "Add smart COD fees and encourage prepaid orders.",
  },
  {
    id: "abandoned-cart-recovery",
    title: "Abandoned Cart Recovery",
    description: "Recover lost sales with automated WhatsApp & SMS campaigns.",
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description: "Get actionable insights and track what matters most.",
  },
];

/**
 * The pricing page's questions, in the order it asks them.
 *
 * Ids into the single tagged pool (§11) rather than copies of the answers, so
 * a question shown here and on a control page is written once. The order is
 * the page's own, which is why it is a list rather than a filter.
 */
export const pricingFaqIds: readonly string[] = [
  "free-trial",
  "billing",
  "plan-change",
  "order-limit",
  "free-plan-charges",
];

/** The question the page opens with expanded. */
export const defaultPricingFaqId = "billing";

/** The note under the expanded answer — true of every question above it. */
export const pricingFaqNote =
  "You can upgrade, downgrade or cancel your plan anytime from your COD King dashboard.";

/**
 * Per-message rates by gateway (§3.1, §5.1 #9).
 *
 * Empty until per-gateway commercial rates are confirmed. The plan rate a
 * store pays before it connects its own gateway is a row of the comparison
 * matrix above.
 */
export const messageRates: readonly MessageRate[] = [];
