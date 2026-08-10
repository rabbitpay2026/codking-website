import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { cardHoverClass } from "@/constants/theme";
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
 * The results row every feature page (§6.3) argues its worth with.
 *
 * Four cards, one line, identical in every dimension, mark on the left and the
 * figure the largest thing in each. Two feature pages arguing the same case in
 * two different card shapes would tell a merchant moving between them that
 * they had left the site — which is exactly why this is one component taking
 * content rather than one copy of the markup per page.
 *
 * That equality is structural rather than tuned. The row owns three tracks —
 * label, figure, caption — and every card adopts them with `subgrid` instead
 * of sizing its own, so a caption that wraps to two lines in one card cannot
 * push its figure out of line with the other three, and every card ends on the
 * same edge whatever it contains. A browser without subgrid falls back to each
 * card sizing itself: legible, slightly ragged, nothing hidden.
 *
 * The `value` line is a display string rather than a number, because the pages
 * state these as the product states them — as ceilings, as ranges, or as the
 * shape of an outcome where no measured figure exists (§10.1).
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
    <SectionShell
      size="compact"
      className="border-t border-ink/[0.07]"
      containerClassName="py-7 md:py-9"
    >
      <div className="flex flex-col items-center">
        <FeatureEyebrow>{eyebrow}</FeatureEyebrow>
        <SectionHeading
          as="h2"
          title={title}
          description={description}
          className="mt-4 [&>h2]:mt-0"
        />
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
        {outcomes.map((outcome) => {
          const Icon = iconFor[outcome.id] ?? fallbackIcon;

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
