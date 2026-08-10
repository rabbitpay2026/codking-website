import {
  CheckCircle2,
  MessageSquareText,
  MousePointerClick,
  ShoppingCart,
  Undo2,
} from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getCartFlowResult,
  getCartFlowSteps,
  getCartPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 *
 * The five read as a sentence left to right: a cart, a cart walked away from,
 * a message, a tap, and the order that came of it.
 */
const iconFor: Record<string, LucideIcon> = {
  checkout: ShoppingCart,
  abandoned: Undo2,
  reminder: MessageSquareText,
  return: MousePointerClick,
  recovered: CheckCircle2,
};

/**
 * How a recovery runs, in five beats.
 *
 * The shared flow slab — the one place a feature page raises its voice,
 * because it is the only band that is a *mechanism* rather than evidence.
 *
 * Five columns rather than the sibling pages' four, and the extra beat earns
 * its place: leaving the checkout and being reminded are two different events,
 * and collapsing them would hide the only moment the product acts.
 */
export function Flow() {
  const copy = getCartPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getCartFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={ShoppingCart}
      result={getCartFlowResult()}
    />
  );
}
