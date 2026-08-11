import { Boxes, CreditCard, Package, TrendingDown, Truck } from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import { getCodFeesAudience, getCodFeesPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  logistics: Truck,
  heavy: Package,
  codheavy: Boxes,
  prepaid: CreditCard,
  margin: TrendingDown,
};

/**
 * Who this is for.
 *
 * Five characterisations of the store rather than five claims about the
 * product. Each follows from what the control is for — covering the logistics
 * cost of cash on delivery and nudging buyers toward prepaid — and none of them
 * is dressed up as a published statistic or a customer the product named.
 */
export function Audience() {
  const copy = getCodFeesPageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      segments={getCodFeesAudience()}
      iconFor={iconFor}
      fallbackIcon={Package}
    />
  );
}
