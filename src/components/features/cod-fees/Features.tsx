import {
  BadgeIndianRupee,
  Eye,
  IndianRupee,
  Percent,
  Tags,
  Weight,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getCodFeesFeatures, getCodFeesPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  fixed: IndianRupee,
  percentage: Percent,
  weight: Weight,
  range: Tags,
  transparent: Eye,
  label: BadgeIndianRupee,
};

/**
 * What the merchant can actually configure.
 *
 * Six, in the shared three-by-two grid, all the same size — because these are
 * peers. Every one of them is something the product publishes for this control:
 * a fixed or percentage-based fee, fees by weight and price range, complete
 * visibility to the customer at checkout, and the customisable fee labels the
 * `checkout-impact` answer already in the FAQ pool describes. Nothing here is a
 * capability this page invented for the grid to look full.
 */
export function Features() {
  const copy = getCodFeesPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getCodFeesFeatures()}
      iconFor={iconFor}
      fallbackIcon={BadgeIndianRupee}
    />
  );
}
