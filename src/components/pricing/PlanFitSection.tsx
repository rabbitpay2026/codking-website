import { Building2, TrendingUp, UserRound } from "lucide-react";

import { SectionShell } from "@/components/sections/SectionShell";
import { getPlanFits } from "@/lib/content";

import type { PlanId } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * One outline mark per stage.
 *
 * Kept in the component rather than in the data: an icon is a rendering
 * decision, and putting a component reference in the content repository would
 * make the plans un-serialisable for no gain. Keyed by plan id, so a stage
 * cannot be drawn with the wrong mark.
 */
const fitIcon: Record<PlanId, LucideIcon> = {
  standard: UserRound,
  professional: TrendingUp,
  enterprise: Building2,
};

/**
 * Which plan is right for you (§3.1).
 *
 * Directly under the cards, because the question a merchant asks the moment
 * they finish reading three prices is which of the three is theirs. Three
 * sentences answer it, and the section ends.
 *
 * Columns are divided by a hairline rather than boxed into cards. These are
 * three readings of one question, not three offers, and three more bordered
 * boxes immediately under three bordered cards would say the opposite.
 */
export function PlanFitSection() {
  const fits = getPlanFits();

  return (
    /*
      The rule above it is the page's section divider, one hairline of ink at
      ten percent. Owned by the section *below* each join and never by both, so
      two neighbours cannot stack a pair of them into a line twice as dark as
      every other. The hero and the cards share a band and therefore no rule.
    */
    <SectionShell
      tone="muted"
      size="compact"
      seam="top"
      className="border-t border-ink/10"
    >
      <h2 className="text-center text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[1.6rem]">
        Which plan is right for you?
      </h2>

      <ul className="mt-7 grid gap-8 sm:grid-cols-3 sm:gap-0">
        {fits.map((fit, index) => {
          const Icon = fitIcon[fit.planId];

          return (
            <li
              key={fit.planId}
              className="relative flex flex-col items-center px-6 text-center"
            >
              {/*
                The rule between two columns, faded at both ends.

                A full-height border here would draw three hard verticals into
                a band that is meant to read as one sentence in three parts —
                and being full height, each would end abruptly in open space
                above and below the text. Fading it out at the top and bottom
                leaves the separation exactly where the columns need it, beside
                the words, and nowhere else.
              */}
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute inset-y-2 left-0 hidden w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent sm:block"
                />
              ) : null}

              {/*
                The mark, ringed and lifted a hairline off the field. The same
                ring the feature ticks use, at tile size — enough weight for
                the three marks to read as the section's spine rather than as
                three small drawings floating above three paragraphs.
              */}
              <span
                aria-hidden
                className="grid size-12 place-items-center rounded-full border border-ink/10 bg-card text-brand shadow-[0_1px_2px_rgba(11,27,54,0.05)]"
              >
                <Icon className="size-[22px]" strokeWidth={1.6} />
              </span>

              <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">
                {fit.title}
              </h3>
              <p className="mt-2 max-w-[15rem] text-[13px] leading-relaxed text-pretty text-muted-foreground">
                {fit.description}
              </p>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
