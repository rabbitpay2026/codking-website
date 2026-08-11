import {
  BadgeIndianRupee,
  CheckCircle2,
  ReceiptIndianRupee,
  SlidersHorizontal,
  Truck,
} from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getCodFeesFlowResult,
  getCodFeesFlowSteps,
  getCodFeesPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 *
 * The five read as a sentence left to right: a fee being set, a buyer choosing
 * cash, the fee landing, the receipt it produces, and the order going through.
 */
const iconFor: Record<string, LucideIcon> = {
  configure: SlidersHorizontal,
  select: Truck,
  apply: BadgeIndianRupee,
  total: ReceiptIndianRupee,
  complete: CheckCircle2,
};

/**
 * How a COD fee reaches the buyer, in five beats.
 *
 * The shared flow slab — the one place a feature page raises its voice,
 * because it is the only band that is a *mechanism* rather than evidence.
 *
 * Five columns rather than the product's own two, and the extra beats earn
 * their place: the fee the merchant configured, the total the customer is left
 * looking at and the choice that total gives them are the whole difference
 * between this control and a surcharge nobody was told about.
 */
export function Flow() {
  const copy = getCodFeesPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getCodFeesFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={BadgeIndianRupee}
      result={getCodFeesFlowResult()}
    />
  );
}
