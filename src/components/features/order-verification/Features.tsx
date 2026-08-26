import {
  BadgeCheck,
  Banknote,
  CircleSlash,
  LayoutDashboard,
  PackageCheck,
  PauseCircle,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import {
  getOrderVerificationFeatures,
  getOrderVerificationPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  confirm: BadgeCheck,
  hold: PauseCircle,
  cancel: CircleSlash,
  before: PackageCheck,
  cod: Banknote,
  dashboard: LayoutDashboard,
};

/**
 * What the merchant can actually configure.
 *
 * Six, in the shared three-by-two grid, all the same size — because these are
 * peers. Every one of them is something this repository already publishes for
 * the control; nothing here is a capability the page invented so the grid would
 * look full.
 */
export function Features() {
  const copy = getOrderVerificationPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getOrderVerificationFeatures()}
      iconFor={iconFor}
      fallbackIcon={BadgeCheck}
    />
  );
}
