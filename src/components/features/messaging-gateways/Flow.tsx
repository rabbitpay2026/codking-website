import {
  BadgeCheck,
  Landmark,
  ListChecks,
  MessageSquareText,
  Send,
  SlidersHorizontal,
} from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getGatewayFlowResult,
  getGatewayFlowSteps,
  getGatewayPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  choose: ListChecks,
  plan: BadgeCheck,
  connect: SlidersHorizontal,
  route: Send,
  settle: Landmark,
};

/**
 * How it runs.
 *
 * The shared flow slab — the one place a feature page raises its voice, because
 * it is the only band that is a *mechanism* rather than evidence.
 */
export function Flow() {
  const copy = getGatewayPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getGatewayFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={MessageSquareText}
      result={getGatewayFlowResult()}
    />
  );
}
