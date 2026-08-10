import { BadgePercent, Banknote, Truck, Wallet } from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getPrepaidFlowResult,
  getPrepaidFlowSteps,
  getPrepaidPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 *
 * The four read as a sentence left to right: a delivery van, a discount tag, a
 * wallet, and the money itself.
 */
const iconFor: Record<string, LucideIcon> = {
  cod: Truck,
  nudge: BadgePercent,
  switch: Wallet,
  paid: Banknote,
};

/**
 * How the conversion runs, in four beats.
 *
 * The shared flow slab — the one place a feature page raises its voice,
 * because it is the only band that is a *mechanism* rather than evidence.
 *
 * Every beat here belongs to the buyer or to the app; none belongs to the
 * merchant, which is the argument the section makes without ever claiming
 * setup is easy. It is also the same four beats the hero panel animates
 * through, so what a visitor reads here and what they watched up there are one
 * sequence rather than two.
 */
export function CodToPrepaidFlow() {
  const copy = getPrepaidPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getPrepaidFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={Truck}
      result={getPrepaidFlowResult()}
    />
  );
}
