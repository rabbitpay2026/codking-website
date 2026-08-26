import { IndianRupee, Package, Undo2, Users } from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import {
  getOrderVerificationAudience,
  getOrderVerificationPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  highvalue: IndianRupee,
  custom: Package,
  rto: Undo2,
  manual: Users,
};

/**
 * Who this is for.
 *
 * Characterisations of the store rather than claims about the product. Each
 * follows from what the control does, and none of them is dressed up as a
 * published statistic or a customer the product named.
 */
export function Audience() {
  const copy = getOrderVerificationPageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      description={copy.audienceDescription}
      segments={getOrderVerificationAudience()}
      iconFor={iconFor}
      fallbackIcon={Package}
    />
  );
}
