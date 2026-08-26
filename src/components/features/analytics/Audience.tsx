import {
  Boxes,
  ChartNoAxesCombined,
  Globe,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import { getAnalyticsAudience, getAnalyticsPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  volume: Boxes,
  tuning: SlidersHorizontal,
  teams: Users,
  multi: Globe,
};

/**
 * Who this is for.
 *
 * Characterisations of the store rather than claims about the product. Each
 * follows from what the control does, and none of them is dressed up as a
 * published statistic or a customer the product named.
 */
export function Audience() {
  const copy = getAnalyticsPageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      segments={getAnalyticsAudience()}
      iconFor={iconFor}
      fallbackIcon={ChartNoAxesCombined}
    />
  );
}
