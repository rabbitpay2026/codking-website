import { BadgeIndianRupee, ShieldCheck, TrendingUp, Undo2 } from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getPrepaidOutcomes, getPrepaidPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about — a
 * rising curve, a shield, money arriving, a parcel turning back.
 */
const iconFor: Record<string, LucideIcon> = {
  "prepaid-orders": TrendingUp,
  risk: ShieldCheck,
  "cash-flow": BadgeIndianRupee,
  rto: Undo2,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. What differs is what fills the figure line: the OTP and Partial
 * COD Payment pages carry percentages the site owner supplied, and no such set
 * exists for this control — so these read as outcomes rather than as
 * measurements, and no number is invented to make the three pages match
 * (§10.1). The note at the head of `src/data/codToPrepaid.ts` records why.
 */
export async function CodToPrepaidBenefits() {
  const outcomes = await getPrepaidOutcomes();
  const copy = getPrepaidPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={TrendingUp}
    />
  );
}
