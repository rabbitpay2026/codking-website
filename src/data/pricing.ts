import type {
  MessageRate,
  PlanFit,
  PricingBenefit,
  PricingFeature,
  PricingPlan,
} from "@/types";

/**
 * The three plans (§5.1 #9, §9.3), priced as published on codking.tech.
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
    id: "standard",
    name: "Standard",
    tagline: "For starters & small businesses",
    price: { kind: "fixed", amount: 0, currency: "USD", period: "month" },
    recommended: false,
    controlSlugs: [
      "otp-verification",
      "partial-cod-payment",
      "abandoned-cart-recovery",
      "address-validation",
    ],
    highlights: [
      { label: "OTP Verification", feature: "otp-verification" },
      { label: "Abandoned Cart Recovery", feature: "abandoned-cart-recovery" },
      { label: "Partial Payment", feature: "partial-payment", showValue: true },
      { label: "Order Notifications (Alerts)", feature: "order-notifications" },
      { label: "Unlimited Orders", feature: "unlimited-orders" },
      { label: "1-to-1 Setup Assistance", feature: "setup-assistance" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing businesses",
    price: { kind: "fixed", amount: 7.99, currency: "USD", period: "month" },
    recommended: true,
    controlSlugs: ["cod-fees", "cod-rules", "cod-to-prepaid"],
    highlights: [
      { label: "Everything in Standard" },
      { label: "Partial Payment", feature: "partial-payment", showValue: true },
      {
        label: "Notification Discount",
        feature: "notification-discount",
        showValue: true,
      },
      { label: "COD Fees", feature: "cod-fees" },
      { label: "Show/Hide COD Rules", feature: "cod-rules" },
      { label: "Priority Support", feature: "support" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For high-volume & custom needs",
    price: { kind: "fixed", amount: 39, currency: "USD", period: "month" },
    recommended: false,
    controlSlugs: ["messaging-gateways", "analytics", "order-verification"],
    highlights: [
      { label: "Everything in Professional" },
      { label: "Partial Payment", feature: "partial-payment", showValue: true },
      {
        label: "Notification Discount",
        feature: "notification-discount",
        showValue: true,
      },
      { label: "Local SMS Gateway", feature: "local-sms-gateway" },
      { label: "Dedicated Account Manager", feature: "account-manager" },
      { label: "24/7 Priority Support", feature: "support" },
    ],
  },
];

/**
 * The comparison matrix, in the order the table prints it.
 *
 * Every value a plan card shows in a pill is read from here, so the table and
 * the cards cannot quote different percentages.
 */
export const pricingFeatures: readonly PricingFeature[] = [
  {
    id: "otp-verification",
    label: "OTP Verification",
    values: { standard: true, professional: true, enterprise: true },
  },
  {
    id: "abandoned-cart-recovery",
    label: "Abandoned Cart Recovery",
    values: { standard: true, professional: true, enterprise: true },
  },
  {
    id: "partial-payment",
    label: "Partial Payment",
    values: { standard: "1%", professional: "0.8%", enterprise: "0.5%" },
  },
  {
    id: "cod-fees",
    label: "COD Fees",
    values: { standard: false, professional: true, enterprise: true },
  },
  {
    id: "cod-rules",
    label: "Show / Hide COD Rules",
    values: { standard: false, professional: true, enterprise: true },
  },
  {
    id: "order-notifications",
    label: "Order Notifications (Alerts)",
    values: { standard: true, professional: true, enterprise: true },
  },
  {
    id: "notification-discount",
    label: "Notification Discount",
    values: { standard: false, professional: "15%", enterprise: "35%" },
  },
  {
    id: "unlimited-orders",
    label: "Unlimited Orders",
    values: { standard: true, professional: true, enterprise: true },
  },
  {
    id: "setup-assistance",
    label: "Setup Assistance",
    values: {
      standard: "1-to-1",
      professional: false,
      enterprise: "Dedicated",
    },
  },
  {
    id: "local-sms-gateway",
    label: "Local SMS Gateway",
    values: { standard: false, professional: false, enterprise: true },
  },
  {
    id: "account-manager",
    label: "Dedicated Account Manager",
    values: { standard: false, professional: false, enterprise: true },
  },
  {
    id: "support",
    label: "Support",
    values: {
      standard: "Standard",
      professional: "Priority",
      enterprise: "24/7 Priority",
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
    planId: "standard",
    title: "Starting",
    description:
      "New stores or small volume businesses just getting started with COD.",
  },
  {
    planId: "professional",
    title: "Growing",
    description:
      "Businesses looking to reduce RTO, save on notifications and optimize COD.",
  },
  {
    planId: "enterprise",
    title: "Scaling",
    description:
      "High volume brands with advanced needs and custom integrations.",
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
 * Per-message rates by gateway (§5.1 #9).
 *
 * Empty until per-gateway commercial rates are confirmed. The discount each
 * plan earns against them is a row of the comparison matrix above.
 */
export const messageRates: readonly MessageRate[] = [];
