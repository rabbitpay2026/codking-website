import {
  BadgePercent,
  Globe,
  Landmark,
  LayoutGrid,
  MessageSquareText,
} from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getGatewayOutcomes, getGatewayPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about.
 */
const iconFor: Record<string, LucideIcon> = {
  cost: BadgePercent,
  direct: Landmark,
  subscription: LayoutGrid,
  choice: Globe,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. One measured figure and three statements of what the arrangement
 * is: the product publishes a ceiling on the saving and nothing else, and a
 * per-message rate invented so this band matched the OTP page's would be the
 * most damaging sentence on the page.
 */
export async function Benefits() {
  const outcomes = await getGatewayOutcomes();
  const copy = getGatewayPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={MessageSquareText}
    />
  );
}
