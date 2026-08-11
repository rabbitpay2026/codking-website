import { BadgeIndianRupee, CreditCard, Eye, Users } from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getCodFeesOutcomes, getCodFeesPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about — the
 * fee itself, the card the buyer is being nudged toward, the visibility the
 * checkout gives it, and the merchants already doing this.
 */
const iconFor: Record<string, LucideIcon> = {
  cover: BadgeIndianRupee,
  prepaid: CreditCard,
  transparent: Eye,
  norm: Users,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. What differs is what fills the figure line: the product publishes
 * no conversion lift, no saving and no RTO figure for this control, and a
 * percentage invented so this band matched the OTP page's would be the most
 * damaging sentence on the page. So three of these read as outcomes rather than
 * as measurements (§10.1), and the one figure that does appear — "70%+ of
 * merchants" — is the product's own claim about the industry rather than a
 * result; the note at the head of `src/data/codFees.ts` records why.
 */
export async function Benefits() {
  const outcomes = await getCodFeesOutcomes();
  const copy = getCodFeesPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={BadgeIndianRupee}
    />
  );
}
