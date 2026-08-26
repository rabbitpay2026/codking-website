import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { cn } from "@/lib/utils";

import type { FeatureOutcome } from "@/types";

import type { LucideIcon } from "lucide-react";

interface FeatureOutcomeGridProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly outcomes: readonly FeatureOutcome[];
  /** Icons are presentation, so they are mapped from the record's id here. */
  readonly iconFor: Record<string, LucideIcon>;
  /** Drawn when an outcome's id has no mark of its own. */
  readonly fallbackIcon: LucideIcon;
}

/**
 * The results band every feature page (§6.3) argues its worth with.
 *
 * One panel divided into four, rather than four cards in a row — and the
 * change is not cosmetic. These four readings are one measurement of the
 * control taken from four sides; four separate rectangles say they are four
 * separate things, and on a page where the band above and the band below were
 * also rows of rectangles, it said it three times. A ruled panel says "one
 * instrument, four dials", which is what this actually is, and it removes a
 * third of the borders from the page in the process.
 *
 * The figure is the largest thing in each cell and the caption the smallest,
 * so the row can be read at two speeds: the four numbers on their own, or the
 * whole argument. The `value` line is a display string rather than a number,
 * because the pages state these as the product states them — as ceilings, as
 * ranges, or as the shape of an outcome where no measured figure exists
 * (§10.1).
 *
 * The dividers are drawn per cell rather than with `divide-*`, because the
 * rule has to move as the grid reflows: vertical between columns at `lg`,
 * horizontal between stacked rows below it. `divide-x` cannot do both, and a
 * panel with a vertical rule running through a stacked column is worse than no
 * rule at all.
 */
export function FeatureOutcomeGrid({
  eyebrow,
  title,
  description,
  outcomes,
  iconFor,
  fallbackIcon,
}: FeatureOutcomeGridProps) {
  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <div className="flex flex-col items-center">
        <FeatureEyebrow>{eyebrow}</FeatureEyebrow>
        <SectionHeading
          as="h2"
          title={title}
          description={description}
          className="mt-4 [&>h2]:mt-0"
        />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-ink/[0.08] bg-card shadow-card">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, index) => {
            const Icon = iconFor[outcome.id] ?? fallbackIcon;

            return (
              <li
                key={outcome.id}
                className={cn(
                  "flex flex-col px-5 py-6 sm:px-6",
                  /* Stacked: a rule above every cell but the first. */
                  index > 0 && "border-t border-ink/[0.07]",
                  /* Two across: the rule moves to the left of the odd column. */
                  "sm:border-t-0",
                  index >= 2 && "sm:border-t sm:border-ink/[0.07]",
                  index % 2 === 1 && "sm:border-l sm:border-ink/[0.07]",
                  /* Four across: one row, rules between the columns only. */
                  "lg:border-t-0",
                  index > 0 && "lg:border-l lg:border-ink/[0.07]",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-sky-50 text-ink/45"
                  >
                    <Icon className="size-4" strokeWidth={1.7} />
                  </span>
                  <span className="text-[12px] leading-tight font-semibold tracking-[0.01em] text-ink/45">
                    {outcome.title}
                  </span>
                </span>

                <p className="mt-4 text-[1.625rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-ink">
                  {outcome.value}
                </p>

                <p className="mt-auto pt-3 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                  {outcome.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
