import {
  MapPinHouse,
  Smartphone,
  TrendingDown,
  Truck,
  Users,
} from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import { getAddressAudience, getAddressPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  mobile: Smartphone,
  repeat: Users,
  cod: Truck,
  dropoff: TrendingDown,
};

/**
 * Who this is for.
 *
 * Characterisations of the store rather than claims about the product. Each
 * follows from what the control does, and none of them is dressed up as a
 * published statistic or a customer the product named.
 */
export function Audience() {
  const copy = getAddressPageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      description={copy.audienceDescription}
      segments={getAddressAudience()}
      iconFor={iconFor}
      fallbackIcon={MapPinHouse}
    />
  );
}
