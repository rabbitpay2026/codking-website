import { messageRates, pricingPlans } from "@/data/pricing";

import type { ControlSlug, MessageRate, PlanId, PricingPlan } from "@/types";

export function getPricingPlans(): readonly PricingPlan[] {
  return pricingPlans;
}

export function getPricingPlan(id: PlanId): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === id);
}

export function getMessageRates(): readonly MessageRate[] {
  return messageRates;
}

/**
 * The cheapest plan that includes this control (§6.3 "which plan it needs").
 *
 * Derived from the plan definitions in plan order, so the answer on a control
 * page always matches the pricing page.
 */
export function getPlanForControl(slug: ControlSlug): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.controlSlugs.includes(slug));
}
