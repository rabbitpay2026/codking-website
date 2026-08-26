import { BadgeCheck, ListChecks, ShoppingCart, Truck } from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getOrderVerificationFlowResult,
  getOrderVerificationFlowSteps,
  getOrderVerificationPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  placed: ShoppingCart,
  queue: ListChecks,
  decide: BadgeCheck,
  ship: Truck,
};

/**
 * How it runs.
 *
 * The shared flow slab — the one place a feature page raises its voice, because
 * it is the only band that is a *mechanism* rather than evidence.
 */
export function Flow() {
  const copy = getOrderVerificationPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getOrderVerificationFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={BadgeCheck}
      result={getOrderVerificationFlowResult()}
    />
  );
}
