import { ArrowRight, ShieldCheck } from "lucide-react";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

import type { FeatureFlowStep } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The connector between two steps.
 *
 * A row of four things is a set; a row of four things with arrows between them
 * is a sequence, and sequence is the entire claim this section makes. The
 * arrow turns with the layout — down the page when the steps stack, across the
 * gap when they sit in a row — and is not drawn at the middle breakpoint,
 * where two-by-two has no single reading order for an arrow to assert.
 *
 * Drawn in brand rather than in ink. On the tinted slab a grey arrow at
 * twenty-five percent is very nearly the panel it sits on, and a sequence
 * whose direction has to be looked for is a set again.
 *
 * Pinned to the mark's own centre line rather than to the middle of the block:
 * the titles below run to one line or two depending on the measure, so a
 * connector centred on the block would sit at a different height in each gap.
 */
function StepConnector() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute top-full left-1/2 mt-3.5 block -translate-x-1/2 text-brand/45 sm:hidden"
      >
        <ArrowRight className="size-5 rotate-90" strokeWidth={2} />
      </span>

      {/*
        `4.625rem` is the mark's centre: a 28px index, a 12px gap and half of a
        68px halo. `-right-[1.875rem]` centres a 20px glyph inside the row's
        40px gutter.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[4.625rem] -right-[1.875rem] hidden -translate-y-1/2 text-brand/45 lg:block"
      >
        <ArrowRight className="size-5" strokeWidth={2} />
      </span>
    </>
  );
}

/**
 * The rail's width at `lg`, keyed by how many beats there are.
 *
 * Written out rather than interpolated, because a class name assembled at
 * runtime is a class name the compiler never sees and therefore never emits.
 * Anything outside this range falls back to four across and wraps, which is
 * ragged rather than broken.
 *
 * Five is the widest a flow should get. Past that the columns are narrower
 * than the marks they hold, and a sequence nobody can read across is a list.
 */
const columnsClass: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

interface FeatureFlowPanelProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly steps: readonly FeatureFlowStep[];
  readonly iconFor: Record<string, LucideIcon>;
  readonly fallbackIcon: LucideIcon;
  /** The one-line payoff in the banner under the steps. */
  readonly result: string;
}

/**
 * How a control runs, in four beats.
 *
 * Set on its own tinted slab rather than on the page surface, which is the one
 * place a feature page raises its voice. The blueprint does the same, and the
 * reason holds: every other band is evidence — figures, features, quotes — and
 * this is the only one that is a *mechanism*. Lifting it onto a panel says
 * "this is the part to actually read" without a word of copy claiming so.
 *
 * The steps themselves stay flat inside it. Four cards on a tinted panel would
 * be boxes inside a box, and the panel would stop reading as one object; an
 * index, a mark, a title, a line, and the arrows carrying the direction is all
 * a flow needs.
 *
 * One component rather than one per page. The beats differ between controls;
 * the geometry that keeps them level, the numbering, the connectors and the
 * result banner do not, and a second copy of this markup is a second place for
 * the two pages to drift apart.
 */
export function FeatureFlowPanel({
  eyebrow,
  title,
  description,
  steps,
  iconFor,
  fallbackIcon,
  result,
}: FeatureFlowPanelProps) {
  return (
    <SectionShell
      size="compact"
      className="border-t border-ink/[0.07]"
      containerClassName="py-7 md:py-9"
    >
      <BlurFade>
        <div className="rounded-[1.5rem] border border-ink/[0.06] bg-sky-100 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col items-center text-center">
            <FeatureEyebrow className="border-brand/25 bg-white/70">
              {eyebrow}
            </FeatureEyebrow>

            <h2 className="mt-4 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[2.125rem]">
              {title}
            </h2>

            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-pretty text-ink/55">
              {description}
            </p>
          </div>

          {/*
            Three shared tracks — the mark, the title, the line — adopted by
            every column with `subgrid`. The mark block is a fixed height by
            construction, but the titles are not: at the narrow end of `lg` two
            of the four take a second line, and four independently sized
            columns would then start their descriptions at two different
            heights. Sharing the tracks is what holds the row level at every
            width rather than at the one it was checked on.
          */}
          <ol
            className={cn(
              "mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2",
              columnsClass[steps.length] ?? "lg:grid-cols-4",
              "lg:grid-rows-[auto_auto_auto] lg:gap-y-0",
            )}
          >
            {steps.map((step, index) => {
              const Icon = iconFor[step.id] ?? fallbackIcon;

              return (
                <li
                  key={step.id}
                  className="relative grid justify-items-center text-center lg:row-span-3 lg:grid-rows-subgrid lg:gap-y-0"
                >
                  <div className="row-start-1 flex flex-col items-center">
                    {/*
                      Filled rather than outlined. An index is the one thing in
                      this row that has to be read as an index and not as
                      decoration, and a hollow ring at eleven pixels reads as a
                      bullet.
                    */}
                    <span className="grid size-7 place-items-center rounded-full bg-brand text-[12px] leading-none font-bold text-white tabular-nums shadow-[0_2px_6px_-2px_var(--brand)]">
                      {index + 1}
                    </span>

                    {/*
                      A disc rather than a tile, and large enough to be the
                      thing the eye lands on in each column. The blueprint sets
                      the mark inside a soft halo; on this tinted slab a white
                      circle at a hairline ring is the same effect built from
                      the tokens this site already has.
                    */}
                    <span
                      aria-hidden
                      className="mt-3 grid size-[68px] place-items-center rounded-full bg-white text-brand ring-1 ring-ink/[0.05] ring-inset"
                    >
                      <Icon className="size-8" strokeWidth={1.5} />
                    </span>
                  </div>

                  <h3 className="row-start-2 mt-5 text-[14px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                    {step.title}
                  </h3>

                  <p className="row-start-3 mt-2.5 max-w-[15rem] text-[12.5px] leading-relaxed text-pretty text-ink/50">
                    {step.body}
                  </p>

                  {index < steps.length - 1 ? <StepConnector /> : null}
                </li>
              );
            })}
          </ol>

          {/*
            The payoff, as a banner rather than a footnote.

            It is the one green thing on the page and the sentence the whole
            slab exists to earn, so it is given a field of its own instead of
            being tucked under the last column. One line, though: it summarises
            the four steps above it, and a summary that takes longer to read
            than what it summarises is not one.

            The green is a tint and a border — never the type. `--brand-check`
            clears 1.8:1 against white, which is fine for a mark and nowhere
            near enough for text, so the words stay ink and only the shield and
            the field carry the colour.
          */}
          <p className="mx-auto mt-9 flex w-full max-w-3xl items-center justify-center gap-3 rounded-xl border border-brand-check/35 bg-brand-check/12 px-5 py-3.5 text-center">
            <ShieldCheck
              aria-hidden
              className="size-5 shrink-0 text-brand-check"
              strokeWidth={2}
            />
            <span className="text-[13.5px] leading-snug font-semibold text-balance text-ink/80">
              <span className="font-bold text-ink/50">Result:</span> {result}
            </span>
          </p>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
