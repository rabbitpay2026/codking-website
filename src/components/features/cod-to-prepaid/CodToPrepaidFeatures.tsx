import {
  BadgePercent,
  Landmark,
  Megaphone,
  MessageSquareText,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getPrepaidFeatures, getPrepaidPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  rules: SlidersHorizontal,
  discount: BadgePercent,
  placement: Megaphone,
  messaging: MessageSquareText,
  gateway: Landmark,
  simple: Settings2,
};

/**
 * What the merchant can actually configure.
 *
 * Six, in the shared three-by-two grid, all the same size — because these are
 * peers. Four are the capabilities the product publishes for this control; the
 * other two are its own listed benefits, worded as settings rather than as
 * outcomes so the grid reads as a specification and not as a second results
 * band.
 */
export function CodToPrepaidFeatures() {
  const copy = getPrepaidPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getPrepaidFeatures()}
      iconFor={iconFor}
      fallbackIcon={SlidersHorizontal}
    />
  );
}
