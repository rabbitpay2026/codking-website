import {
  CheckCircle2,
  EyeOff,
  ScanSearch,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getCodShowHideFlowResult,
  getCodShowHideFlowSteps,
  getCodShowHidePageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 *
 * The five read as a sentence left to right: a rule being set, a cart arriving
 * at checkout, the conditions being read, the one that fits, and what the
 * buyer is left looking at.
 */
const iconFor: Record<string, LucideIcon> = {
  rule: SlidersHorizontal,
  checkout: ShoppingCart,
  check: ScanSearch,
  match: CheckCircle2,
  decide: EyeOff,
};

/**
 * How a rule runs, in five beats.
 *
 * The shared flow slab — the one place a feature page raises its voice,
 * because it is the only band that is a *mechanism* rather than evidence.
 *
 * Five columns rather than the OTP page's four, and the extra beat earns its
 * place: the product describes this control as an engine that decides, so
 * reading the conditions and matching one of them are two separate events, and
 * collapsing them would hide the only moment COD King acts.
 */
export function Flow() {
  const copy = getCodShowHidePageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getCodShowHideFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={SlidersHorizontal}
      result={getCodShowHideFlowResult()}
    />
  );
}
