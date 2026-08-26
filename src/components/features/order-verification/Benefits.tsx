import { BadgeCheck, PackageX, PauseCircle, ShieldCheck } from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import {
  getOrderVerificationOutcomes,
  getOrderVerificationPageCopy,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about.
 */
const iconFor: Record<string, LucideIcon> = {
  confirm: BadgeCheck,
  hold: PauseCircle,
  cancel: PackageX,
  stage: ShieldCheck,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. What differs is what fills the figure line: the product publishes no cancellation rate and no RTO reduction for this control, so all four read as outcomes rather than as measurements (§10.1).
 */
export async function Benefits() {
  const outcomes = await getOrderVerificationOutcomes();
  const copy = getOrderVerificationPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={BadgeCheck}
    />
  );
}
