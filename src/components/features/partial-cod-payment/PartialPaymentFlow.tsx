import {
  CreditCard,
  HandCoins,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getPartialFlowResult,
  getPartialFlowSteps,
  getPartialPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  order: ShoppingCart,
  advance: CreditCard,
  shipped: PackageCheck,
  balance: HandCoins,
};

/**
 * How a partial payment runs, in four beats.
 *
 * The shared flow slab (`FeatureFlowPanel`) — the one place a feature page
 * raises its voice, and the only band on it that is a *mechanism* rather than
 * evidence. Three of the four beats here are the buyer's and none are the
 * merchant's, which is the argument the section makes without ever claiming
 * setup is easy.
 */
export function PartialPaymentFlow() {
  const steps = getPartialFlowSteps();
  const copy = getPartialPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={steps}
      iconFor={iconFor}
      fallbackIcon={ShoppingCart}
      result={getPartialFlowResult()}
    />
  );
}
