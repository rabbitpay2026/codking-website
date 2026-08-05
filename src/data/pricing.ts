import type { MessageRate, PricingPlan } from "@/types";

/**
 * The three plans (§5.1 #9, §9.3).
 *
 * Only Free and Enterprise have a knowable price shape at this stage — Free is
 * free, and Enterprise is quoted. Pro's price is `null` until commercial terms
 * are signed off, which is deliberate: a plan with an unset price must not be
 * able to render as free.
 *
 * `controlSlugs` is the single declaration of which controls a plan unlocks.
 * Control pages read it in reverse (§6.3 "which plan it needs"), so the two
 * surfaces cannot disagree.
 */
export const pricingPlans: readonly PricingPlan[] = [
  { id: "free", name: "Free", price: { kind: "free" }, controlSlugs: [] },
  { id: "pro", name: "Pro", price: null, controlSlugs: [] },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { kind: "custom" },
    controlSlugs: [],
  },
];

/**
 * Per-message rates by gateway and channel (§5.1 #9).
 *
 * Empty until the gateway list and commercial rates are confirmed. §11 keeps
 * these as data precisely because they change often and must never require a
 * developer to update.
 */
export const messageRates: readonly MessageRate[] = [];
