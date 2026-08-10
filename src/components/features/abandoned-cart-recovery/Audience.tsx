import { Gauge, MessagesSquare, Store, Tag } from "lucide-react";

import { FeatureAudienceRow } from "@/components/features/sections";
import { getCartAudience, getCartPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  "cod-heavy": Store,
  "high-aov": Tag,
  traffic: Gauge,
  whatsapp: MessagesSquare,
};

/**
 * Who this is for.
 *
 * Four characterisations of the store rather than four claims about the
 * product: who loses most to a checkout nobody follows up. The product
 * publishes no use-case list for this control, so nothing here is dressed up
 * as one — and the row is not padded to five to match a sibling page.
 */
export function Audience() {
  const copy = getCartPageCopy();

  return (
    <FeatureAudienceRow
      title={copy.audienceTitle}
      segments={getCartAudience()}
      iconFor={iconFor}
      fallbackIcon={Store}
    />
  );
}
