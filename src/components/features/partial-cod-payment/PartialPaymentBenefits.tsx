import { HandCoins, ShieldOff, TrendingUp, Truck } from "lucide-react";

import { FeatureOutcomeGrid } from "@/components/features/sections";
import { getPartialOutcomes, getPartialPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its figure is about — a
 * blocked shield, a returning van, cash arriving, a rising line.
 */
const iconFor: Record<string, LucideIcon> = {
  "fake-orders": ShieldOff,
  rto: Truck,
  "cash-flow": HandCoins,
  conversions: TrendingUp,
};

/**
 * The results row.
 *
 * The shared band (`FeatureOutcomeGrid`), which is the OTP page's to the pixel
 * — two feature pages arguing the same case in two different card shapes would
 * tell a merchant moving between them that they had left the site. This file
 * supplies the words and the marks and nothing else.
 *
 * ── On the figures ────────────────────────────────────────────────────────
 * They are the marketing blueprint's, supplied by the site owner, and they are
 * the one band on this page not drawn from the proof repository. The note at
 * the head of `src/data/partialCodPayment.ts` records that and carries the
 * TODO.
 */
export async function PartialPaymentBenefits() {
  const outcomes = await getPartialOutcomes();
  const copy = getPartialPageCopy();

  return (
    <FeatureOutcomeGrid
      eyebrow={copy.outcomesEyebrow}
      title={copy.outcomesTitle}
      description={copy.outcomesDescription}
      outcomes={outcomes}
      iconFor={iconFor}
      fallbackIcon={ShieldOff}
    />
  );
}
