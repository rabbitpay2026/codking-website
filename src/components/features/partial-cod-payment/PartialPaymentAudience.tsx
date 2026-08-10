import { PencilRuler, RefreshCcw, Shirt, Sofa, Store } from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import { getPartialAudience, getPartialPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  custom: Shirt,
  shipping: Sofa,
  refurbished: RefreshCcw,
  "made-to-order": PencilRuler,
  "cod-heavy": Store,
};

/**
 * Who this is for.
 *
 * Five categories on one line in the shared pill row, deliberately the
 * smallest objects on the page. Two of the five carry no examples and that is
 * on purpose — "refurbished products" and "made-to-order items" are already
 * concrete, and inventing a parenthetical for them would be padding the row to
 * look symmetrical.
 */
export function PartialPaymentAudience() {
  const audience = getPartialAudience();
  const copy = getPartialPageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      segments={audience}
      iconFor={iconFor}
      fallbackIcon={Store}
    />
  );
}
