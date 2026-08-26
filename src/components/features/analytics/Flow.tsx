import {
  ChartNoAxesCombined,
  FileText,
  Gauge,
  SlidersHorizontal,
} from "lucide-react";

import { FeatureFlowPanel } from "@/components/features/sections";
import {
  getAnalyticsFlowResult,
  getAnalyticsFlowSteps,
  getAnalyticsPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  run: SlidersHorizontal,
  record: FileText,
  report: ChartNoAxesCombined,
  decide: Gauge,
};

/**
 * How it runs.
 *
 * The shared flow slab — the one place a feature page raises its voice, because
 * it is the only band that is a *mechanism* rather than evidence.
 */
export function Flow() {
  const copy = getAnalyticsPageCopy();

  return (
    <FeatureFlowPanel
      eyebrow={copy.flowEyebrow}
      title={copy.flowTitle}
      description={copy.flowDescription}
      steps={getAnalyticsFlowSteps()}
      iconFor={iconFor}
      fallbackIcon={ChartNoAxesCombined}
      result={getAnalyticsFlowResult()}
    />
  );
}
