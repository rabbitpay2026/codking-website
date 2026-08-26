import {
  ChartNoAxesCombined,
  CreditCard,
  LayoutDashboard,
  PackageX,
  ShieldCheck,
  ShoppingCart,
  Undo2,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getAnalyticsFeatures, getAnalyticsPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  verified: ShieldCheck,
  prepaid: CreditCard,
  recovery: ShoppingCart,
  rto: Undo2,
  fake: PackageX,
  one: LayoutDashboard,
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
  const copy = getAnalyticsPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getAnalyticsFeatures()}
      iconFor={iconFor}
      fallbackIcon={ChartNoAxesCombined}
    />
  );
}
