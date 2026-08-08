import { IndianRupee, ShieldOff, TrendingUp, Truck } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { cardHoverClass } from "@/constants/theme";
import { getOtpOutcomes } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it. Each is the literal object its figure is about — a
 * blocked shield, a returning van, a rupee, a rising line — because a results
 * row is scanned rather than read, and a mark that needs interpreting costs
 * more than it saves.
 */
const iconFor: Record<string, LucideIcon> = {
  "fake-orders": ShieldOff,
  rto: Truck,
  costs: IndianRupee,
  profits: TrendingUp,
};

/**
 * The results row.
 *
 * Four cards, one line, identical in every dimension. Identical is the whole
 * effect: a row where one card is taller or one figure sits a few pixels lower
 * than its neighbours reads as four separate claims that happened to be put
 * side by side, and this has to read as one result stated four ways.
 *
 * That equality is structural rather than tuned. The row owns three tracks —
 * label, figure, caption — and every card adopts them with `subgrid` instead
 * of sizing its own, so a caption that wraps to two lines in one card cannot
 * push its figure out of line with the other three, and every card ends on the
 * same edge whatever it contains. A browser without subgrid falls back to each
 * card sizing itself: legible, slightly ragged, nothing hidden.
 *
 * The mark sits to the left of the text rather than above it, which is what
 * keeps the row short — stacked, four marks add their own height to a band
 * that is meant to be taken in at a glance. It is a small tile rather than a
 * bare glyph so the four line up optically at their own left edge; a rupee and
 * a van have very different silhouettes and nothing else in the card would
 * hold them to the same box.
 *
 * A hairline border, a small radius and no shadow. These are cards because the
 * blueprint has cards, but they are the quietest cards on the page: the figure
 * is the only thing in here that should catch the eye.
 *
 * ── On the figures ────────────────────────────────────────────────────────
 * They are the marketing blueprint's, supplied by the site owner, and they are
 * the one band on this page not drawn from the proof repository. The note at
 * the head of `src/data/otpVerification.ts` records that and carries the TODO.
 */
export async function OtpVerificationBenefits() {
  const outcomes = await getOtpOutcomes();

  return (
    <SectionShell
      size="compact"
      className="border-t border-ink/[0.07]"
      /*
        A step tighter than `compact`. This band is four short cards, and at
        the page's standard rhythm the rule above it and the row below it end
        up far enough apart that the divider stops reading as a join.
      */
      containerClassName="py-7 md:py-9"
    >
      <SectionHeading
        as="h2"
        title="Why merchants love COD King OTP verification"
      />

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
        {outcomes.map((outcome) => {
          const Icon = iconFor[outcome.id] ?? ShieldOff;

          return (
            <li
              key={outcome.id}
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 rounded-lg border border-ink/[0.08] bg-card px-4 py-3.5",
                "lg:row-span-3 lg:grid-rows-subgrid lg:gap-y-0",
                /*
                  Informational, so it lifts and warms its border and nothing
                  else — no ring, no colour change, nothing that would promise
                  a destination these cards do not have.
                */
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
