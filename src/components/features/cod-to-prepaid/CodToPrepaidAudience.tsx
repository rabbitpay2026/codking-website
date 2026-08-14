import { Bike, RefreshCcw, Shirt, Store } from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import { getPrepaidAudience, getPrepaidPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  custom: Shirt,
  shipping: Bike,
  refurbished: RefreshCcw,
  "cod-heavy": Store,
};

/**
 * Who this is for.
 *
 * The four use cases the product publishes for this control, in the shared
 * pill row. Four rather than the sibling page's five, and deliberately not
 * padded to match it: a fifth category invented so the row looks symmetrical
 * is a claim about who should buy this made for a layout reason.
 */
export function CodToPrepaidAudience() {
  const copy = getPrepaidPageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      segments={getPrepaidAudience()}
      iconFor={iconFor}
      fallbackIcon={Store}
    />
  );
}
