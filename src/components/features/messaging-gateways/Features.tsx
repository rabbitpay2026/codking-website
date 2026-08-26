import {
  Globe,
  Landmark,
  LayoutGrid,
  MessageCircle,
  MessageSquareText,
  Radio,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getGatewayFeatures, getGatewayPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  operators: Radio,
  whatsapp: MessageCircle,
  direct: Landmark,
  subscription: LayoutGrid,
  messages: MessageSquareText,
  coverage: Globe,
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
  const copy = getGatewayPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.featuresTitle}
      description={copy.featuresDescription}
      capabilities={getGatewayFeatures()}
      iconFor={iconFor}
      fallbackIcon={MessageSquareText}
    />
  );
}
