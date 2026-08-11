import { IndianRupee, MapPin, Package, Tags, UserX } from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import { getCodShowHideAudience, getCodShowHidePageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  custom: Package,
  coverage: MapPin,
  blacklist: UserX,
  value: IndianRupee,
  segments: Tags,
};

/**
 * Who this is for.
 *
 * Five characterisations of the store rather than five claims about the
 * product. The first three are the product's own published use cases in its
 * own terms; the last two follow from the control record's benefits, and none
 * of them is dressed up as something the source does not already say.
 */
export function Audience() {
  const copy = getCodShowHidePageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      segments={getCodShowHideAudience()}
      iconFor={iconFor}
      fallbackIcon={Package}
    />
  );
}
