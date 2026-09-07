import {
  messageRates,
  planFits,
  pricingAssurances,
  pricingBenefits,
  pricingFeatures,
  pricingMarket,
  pricingPlans,
} from "@/data/pricing";

import type {
  ControlSlug,
  MessageRate,
  PlanFeatureValue,
  PlanFit,
  PlanId,
  PricingBenefit,
  PricingFeature,
  PricingFeatureId,
  PricingMarket,
  PricingPlan,
} from "@/types";

export function getPricingPlans(): readonly PricingPlan[] {
  return pricingPlans;
}

export function getPricingPlan(id: PlanId): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === id);
}

/** The comparison matrix, in the order the table prints it. */
export function getPricingFeatures(): readonly PricingFeature[] {
  return pricingFeatures;
}

/**
 * One cell of the matrix.
 *
 * The plan cards call this to fill their value pills, so a percentage on a
 * card is the same declaration the table prints — never a second copy of it.
 * A feature that does not exist resolves to `false`, which renders as "not
 * included" rather than as a crash.
 */
export function getPlanFeatureValue(
  featureId: PricingFeatureId,
  planId: PlanId,
): PlanFeatureValue {
  return (
    pricingFeatures.find((feature) => feature.id === featureId)?.values[
      planId
    ] ?? false
  );
}

/** The market band above the cards — who the rupee prices are quoted for. */
export function getPricingMarket(): PricingMarket {
  return pricingMarket;
}

export function getPricingAssurances(): readonly string[] {
  return pricingAssurances;
}

export function getPlanFits(): readonly PlanFit[] {
  return planFits;
}

export function getPricingBenefits(): readonly PricingBenefit[] {
  return pricingBenefits;
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
