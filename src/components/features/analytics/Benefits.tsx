import {
  ChartNoAxesCombined,
  CreditCard,
  ShieldCheck,
  ShoppingCart,
  Undo2,
} from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getAnalyticsOutcomes, getAnalyticsPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about.
 */
const iconFor: Record<string, LucideIcon> = {
  verified: ShieldCheck,
  prepaid: CreditCard,
  recovered: ShoppingCart,
  rto: Undo2,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. What differs is what fills the figure line: every number this control would show belongs to the merchant reading the page, so all four name what the report answers rather than what anybody's answer was (§10.1).
 */
export async function Benefits() {
  const outcomes = await getAnalyticsOutcomes();
  const copy = getAnalyticsPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={ChartNoAxesCombined}
    />
  );
}
