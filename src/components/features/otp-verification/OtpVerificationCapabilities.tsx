import {
  Clock,
  MessageSquareMore,
  PhoneCall,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { getOtpCapabilities } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it — changing a line of copy should never mean picking
 * art.
 *
 * Each one is the literal object the capability is about: a handset for the
 * call that triggers verification, a message bubble for the text that carries
 * the code, a shield for what it blocks, a phone for where it renders, a clock
 * for how long it takes. A row of five abstract marks would need its own
 * legend, which is the opposite of what a specification strip is for.
 */
const iconFor: Record<string, LucideIcon> = {
  "auto-detect": PhoneCall,
  branding: MessageSquareMore,
  fraud: ShieldCheck,
  devices: Smartphone,
  realtime: Clock,
};

/**
 * The specification, at the end of the argument.
 *
 * Everything above this point is trying to convince someone; this is for the
 * merchant who is already convinced and wants to know whether the thing does
 * the five specific things they need. That is a different reading mode, and it
 * wants a different shape — a row to scan, not five cards to consider.
 *
 * So nothing here is boxed and nothing lifts: five columns separated by
 * hairlines, on the page's own surface, closed by a single rule. Five cards
 * would give this the same weight as the outcomes band four sections up, and
 * the last thing a page should do before its call to action is repeat itself
 * louder. The marks are bare strokes for the same reason — a tile behind each
 * one would be five more boxes in a section whose entire point is that there
 * are none.
 *
 * The mark sits beside the text rather than above it, which is what keeps the
 * row short: stacked, five icons add their own height to a band meant to be
 * read in one pass.
 *
 * ── On the alignment ──────────────────────────────────────────────────────
 * The five titles are not the same length, so two of them take a second line
 * at most widths and three do not. Five independent columns would then start
 * their descriptions at three different heights, and a row whose baselines
 * disagree reads as five things that happen to be near each other rather than
 * as one specification.
 *
 * `subgrid` fixes that at the structure rather than by tuning: the row owns
 * two tracks — one for titles, one for descriptions — and every column adopts
 * them instead of sizing its own. The title track is as tall as the tallest
 * title, so every description begins on exactly the same line no matter how
 * any one of them wraps. A browser without subgrid ignores the rule and gets
 * the ragged version, which is what this looked like before and is still
 * perfectly readable.
 */
export function OtpVerificationCapabilities() {
  const capabilities = getOtpCapabilities();

  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <SectionHeading as="h2" title="Advanced capabilities" />

      {/*
        Deliberately tighter than the `mt-lede` every other section opens with.
        That measure is set for a heading arriving over a composition; this is a
        heading arriving over one line of small text, and the page's standard
        gap leaves a corridor between them.
      */}
      <ul className="mt-9 grid gap-y-7 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:grid-rows-[auto_auto] lg:gap-x-0 lg:gap-y-0">
        {capabilities.map((capability, index) => {
          const Icon = iconFor[capability.id] ?? ShieldCheck;

          return (
            <li
              key={capability.id}
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3",
                "lg:row-span-2 lg:grid-rows-subgrid lg:gap-y-0 lg:px-4",
                index === 0 ? "lg:pl-0" : "lg:border-l lg:border-ink/[0.08]",
                index === capabilities.length - 1 && "lg:pr-0",
              )}
            >
              {/*
                `mt-px` and `self-start`, not a centred row. The mark is
                optically aligned to the cap height of the first line of the
                title — centring it in a track sized by a two-line title would
                drop it half a line below every one-line neighbour.
              */}
              <Icon
                aria-hidden
                className="col-start-1 row-start-1 mt-px size-[22px] shrink-0 self-start text-ink/55"
                strokeWidth={1.4}
              />

              <h3 className="col-start-2 row-start-1 text-[13px] leading-tight font-semibold tracking-[-0.01em] text-ink">
                {capability.title}
              </h3>

              <p className="col-start-2 row-start-2 mt-1.5 text-[12px] leading-relaxed text-pretty text-ink/50">
                {capability.body}
              </p>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
