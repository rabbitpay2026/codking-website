import {
  CheckCircle2,
  History,
  MapPinHouse,
  PenLine,
  ShoppingCart,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getAddressFeatures, getAddressPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  phone: Smartphone,
  history: History,
  auto: Sparkles,
  editable: PenLine,
  typos: CheckCircle2,
  checkout: ShoppingCart,
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
  const copy = getAddressPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getAddressFeatures()}
      iconFor={iconFor}
      fallbackIcon={MapPinHouse}
    />
  );
}
