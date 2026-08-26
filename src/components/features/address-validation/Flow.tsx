import {
  CheckCircle2,
  MapPinHouse,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getAddressFlowResult,
  getAddressFlowSteps,
  getAddressPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  arrive: ShoppingCart,
  identify: Smartphone,
  fetch: Search,
  prefill: Sparkles,
  place: CheckCircle2,
};

/**
 * How it runs.
 *
 * The shared flow slab — the one place a feature page raises its voice, because
 * it is the only band that is a *mechanism* rather than evidence.
 */
export function Flow() {
  const copy = getAddressPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getAddressFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={MapPinHouse}
      result={getAddressFlowResult()}
    />
  );
}
