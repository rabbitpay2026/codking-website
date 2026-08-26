import {
  CheckCircle2,
  History,
  MapPinHouse,
  PackageCheck,
  Timer,
} from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getAddressOutcomes, getAddressPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its line is about.
 */
const iconFor: Record<string, LucideIcon> = {
  speed: Timer,
  accuracy: CheckCircle2,
  returning: History,
  delivery: PackageCheck,
};

/**
 * The results row.
 *
 * The shared band, so this page's case is argued in the same four cards as its
 * siblings'. What differs is what fills the figure line: the product publishes no completion rate and no time saved for this control, so all four read as outcomes rather than as measurements (§10.1).
 */
export async function Benefits() {
  const outcomes = await getAddressOutcomes();
  const copy = getAddressPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={MapPinHouse}
    />
  );
}
