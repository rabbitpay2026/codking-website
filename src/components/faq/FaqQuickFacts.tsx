import { Sparkles } from "lucide-react";

import { panelHoverClass } from "@/constants/theme";
import { getFaqPageFacts } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The four answers a merchant wants before reading any of the others.
 *
 * It sits in the hero's second track, which is the composition both other
 * company pages use — About puts a product scene there, Contact puts the
 * channels. Without something in it the FAQ hero would be a headline and a
 * paragraph capped at two thirds of a 1440px page, with the remaining third
 * empty; that reads as unfinished rather than as restrained.
 *
 * What it holds is deliberately a summary rather than a call to action. There
 * are already two ways to reach a person on this page — the line under the last
 * category and the band that closes it — and a third at the top would be the
 * page asking to be left before it has answered anything.
 *
 * The same panel treatment as the legal pages' document facts: the site's
 * translucent card, the label-over-value rows, and `panelHoverClass` rather
 * than `cardHoverClass` because a card that lifts three pixels beside an `h1`
 * is the first thing in the frame that moves.
 *
 * Every value is read from the repository, and each is a fact one of the
 * answers below already states.
 */
export function FaqQuickFacts() {
  const facts = getFaqPageFacts();

  if (facts.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/[0.08] bg-white/70 p-5 backdrop-blur-md lg:ml-auto lg:max-w-[21rem]",
        "shadow-[0_1px_2px_rgba(11,27,54,0.04),0_10px_28px_-20px_rgba(11,27,54,0.35)]",
        panelHoverClass,
      )}
    >
      <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-ink/45 uppercase">
        <Sparkles
          aria-hidden
          className="size-3.5 shrink-0 text-ink/30"
          strokeWidth={1.8}
        />
        The short answers
      </p>

      <dl className="mt-4 divide-y divide-ink/[0.07]">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-[12.5px] leading-snug text-ink/55">
              {fact.label}
            </dt>
            <dd className="text-right text-[13.5px] leading-snug font-medium text-balance text-ink/90">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
