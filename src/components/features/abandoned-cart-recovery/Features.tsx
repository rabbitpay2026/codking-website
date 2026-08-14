import {
  Clock3,
  Link2,
  MessagesSquare,
  Repeat2,
  ShoppingCart,
  Zap,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getCartFeatures, getCartPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  sequences: Repeat2,
  channels: MessagesSquare,
  link: Link2,
  timing: Clock3,
  autopilot: Zap,
  cod: ShoppingCart,
};

/**
 * What the merchant actually gets.
 *
 * Six, in the shared three-by-two grid, all the same size — because these are
 * peers. Every one of them is the product's own published benefit for this
 * control or the sentence the features page uses to describe it; nothing here
 * is a capability this page invented for the grid to look full.
 */
export function Features() {
  const copy = getCartPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getCartFeatures()}
      iconFor={iconFor}
      fallbackIcon={Repeat2}
    />
  );
}
