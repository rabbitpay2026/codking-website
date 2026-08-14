import {
  CreditCard,
  ListFilter,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getCodShowHideOutcomes, getCodShowHidePageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about — the
 * controls the merchant sets, the shield those controls raise, the conditions
 * they are built from, and the card that is still there once cash is gone.
 */
const iconFor: Record<string, LucideIcon> = {
  control: SlidersHorizontal,
  risk: ShieldCheck,
  params: ListFilter,
  prepaid: CreditCard,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. What differs is what fills the figure line: the product publishes
 * no RTO or fake-order rate for this control, and a percentage invented so
 * this band matched the OTP page's would be the most damaging sentence on the
 * page. So three of these read as outcomes rather than as measurements
 * (§10.1), and the one figure that does appear — "15+ params" — is the
 * product's own; the note at the head of `src/data/codShowHide.ts` records
 * why.
 */
export async function Benefits() {
  const outcomes = await getCodShowHideOutcomes();
  const copy = getCodShowHidePageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={SlidersHorizontal}
    />
  );
}
