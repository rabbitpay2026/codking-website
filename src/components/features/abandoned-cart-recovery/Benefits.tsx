import { Link2, MessagesSquare, Repeat2, Undo2 } from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getCartOutcomes, getCartPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about — a
 * sale turning back, the channels it travels on, the link that carries it, and
 * the loop that repeats without anyone starting it.
 */
const iconFor: Record<string, LucideIcon> = {
  revenue: Undo2,
  reach: MessagesSquare,
  return: Link2,
  autopilot: Repeat2,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. What differs is what fills the figure line: the product publishes
 * no recovery rate for this control, and a percentage invented so this band
 * matched the OTP page's would be the most damaging sentence on the page. So
 * these read as outcomes rather than as measurements (§10.1); the note at the
 * head of `src/data/abandonedCartRecovery.ts` records why.
 */
export async function Benefits() {
  const outcomes = await getCartOutcomes();
  const copy = getCartPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={Undo2}
    />
  );
}
