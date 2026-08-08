import { HandCoins, ShieldOff, TrendingUp, Truck } from "lucide-react";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { cardHoverClass } from "@/constants/theme";
import { getPartialOutcomes, getPartialPageCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

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
 * The OTP page's band, to the pixel: four cards, one line, identical in every
 * dimension, mark on the left and the figure the largest thing in each. Two
 * feature pages arguing the same case in two different card shapes would tell
 * a merchant moving between them that they had left the site.
 *
 * That equality is structural rather than tuned. The row owns three tracks —
 * label, figure, caption — and every card adopts them with `subgrid` instead
 * of sizing its own, so a caption that wraps to two lines in one card cannot
 * push its figure out of line with the other three, and every card ends on the
 * same edge whatever it contains. A browser without subgrid falls back to each
 * card sizing itself: legible, slightly ragged, nothing hidden.
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
    <SectionShell
      size="compact"
      className="border-t border-ink/[0.07]"
      containerClassName="py-7 md:py-9"
    >
      <div className="flex flex-col items-center">
        <FeatureEyebrow>{copy.outcomesEyebrow}</FeatureEyebrow>
        <SectionHeading
          as="h2"
          title={copy.outcomesTitle}
          description={copy.outcomesDescription}
          className="mt-4 [&>h2]:mt-0"
        />
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
        {outcomes.map((outcome) => {
          const Icon = iconFor[outcome.id] ?? ShieldOff;

          return (
            <li
              key={outcome.id}
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 rounded-lg border border-ink/[0.08] bg-card px-4 py-3.5",
                "lg:row-span-3 lg:grid-rows-subgrid lg:gap-y-0",
                cardHoverClass,
              )}
            >
              <span
                aria-hidden
                className="col-start-1 row-start-1 grid size-8 shrink-0 place-items-center self-start rounded-lg border border-border bg-sky-50 text-ink/45"
              >
                <Icon className="size-4" strokeWidth={1.7} />
              </span>

              <p className="col-start-2 row-start-1 text-[11.5px] leading-tight font-semibold tracking-[0.01em] text-ink/45">
                {outcome.title}
              </p>

              <p className="col-start-2 row-start-2 mt-1.5 text-[1.375rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
                {outcome.value}
              </p>

              <p className="col-start-2 row-start-3 mt-2 text-[11.5px] leading-relaxed text-pretty text-ink/50">
                {outcome.body}
              </p>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
