import {
  BadgePercent,
  MessageSquareText,
  Settings2,
  SlidersHorizontal,
  Tags,
  Truck,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getPartialFeatures, getPartialPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  rules: SlidersHorizontal,
  discount: BadgePercent,
  shipping: Truck,
  scope: Tags,
  messaging: MessageSquareText,
  setup: Settings2,
};

/**
 * What the merchant can actually configure.
 *
 * Six, in the shared three-by-two grid, all the same size — because these are
 * peers. The moment one of six settings is drawn larger than the others the
 * grid becomes a ranking, and a merchant reads the largest card as the one
 * that matters rather than as the one that happened to have the longest line.
 */
export function PartialPaymentFeatures() {
  const features = getPartialFeatures();
  const copy = getPartialPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={features}
      iconFor={iconFor}
      fallbackIcon={SlidersHorizontal}
    />
  );
}
