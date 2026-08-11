import {
  IndianRupee,
  MapPin,
  Package,
  SlidersHorizontal,
  UserRound,
  UserX,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getCodShowHideFeatures, getCodShowHidePageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  flexible: SlidersHorizontal,
  value: IndianRupee,
  location: MapPin,
  product: Package,
  customer: UserRound,
  blacklist: UserX,
};

/**
 * What the merchant can actually configure.
 *
 * Six, in the shared three-by-two grid, all the same size — because these are
 * peers. Every one of them is a parameter the product publishes for this
 * control or a benefit listed on the control record; nothing here is a
 * capability this page invented for the grid to look full.
 */
export function Features() {
  const copy = getCodShowHidePageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getCodShowHideFeatures()}
      iconFor={iconFor}
      fallbackIcon={SlidersHorizontal}
    />
  );
}
