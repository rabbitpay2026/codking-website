import type { MessageRate, PricingPlan } from "@/types";

/**
 * The three plans (§5.1 #9, §9.3), priced as published on codking.tech.
 *
 * `controlSlugs` is the single declaration of which controls a plan unlocks.
 * Control pages read it in reverse (§6.3 "which plan it needs"), so the two
 * surfaces cannot disagree.
 *
 * The message rate is quoted for India: it is the largest COD market the
 * product serves and the only region with published per-message pricing.
 */
export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: { kind: "free" },
    messageRate: "₹1 per SMS",
    recommended: false,
    controlSlugs: [
      "otp-verification",
      "partial-cod-payment",
      "abandoned-cart-recovery",
      "address-validation",
    ],
    highlights: [
      "COD order verification via OTP",
      "Partial, advance, and deposit payments",
      "Confirmation and tracking messages on SMS and WhatsApp",
      "Abandoned cart recovery",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: { kind: "fixed", amount: 9.99, currency: "USD", period: "month" },
    messageRate: "₹0.85 per SMS",
    recommended: true,
    controlSlugs: ["cod-fees", "cod-rules", "prepaid-nudge"],
    highlights: [
      "Everything in Free",
      "COD fees",
      "Rules to limit the COD payment method",
      "15% discount on message cost",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { kind: "fixed", amount: 39, currency: "USD", period: "month" },
    messageRate: "₹0.7 per SMS",
    recommended: false,
    controlSlugs: ["messaging-gateways", "analytics", "order-verification"],
    highlights: [
      "Everything in Pro",
      "Branded SMS with custom templates",
      "Local SMS gateway integration",
      "35% discount on message cost",
    ],
  },
];

/**
 * Per-message rates by gateway (§5.1 #9).
 *
 * Empty until per-gateway commercial rates are confirmed. The plan-level rate
 * merchants actually compare lives on the plan above; this is the finer table
 * the pricing page will need.
 */
export const messageRates: readonly MessageRate[] = [];
