import {
  BadgeCheck,
  BadgeIndianRupee,
  BadgePercent,
  ChartNoAxesCombined,
  MapPinHouse,
  MessageSquareText,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { PageEnvironment } from "@/components/sections/PageEnvironment";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routeFor } from "@/constants/routes";
import { getControlBoardTitle, getHomepageFeatures } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  "otp-verification": ShieldCheck,
  "order-verification": BadgeCheck,
  "partial-cod-payment": Wallet,
  "cod-fees": BadgeIndianRupee,
  "cod-show-hide": SlidersHorizontal,
  "cod-to-prepaid": BadgePercent,
  "address-validation": MapPinHouse,
  "messaging-gateways": MessageSquareText,
  analytics: ChartNoAxesCombined,
  "abandoned-cart-recovery": ShoppingCart,
};

/**
 * Desktop is an eight-track grid that every card spans two of, which is the
 * same four-across board it has always been.
 *
 * The arithmetic is exact rather than approximate. Four columns give a card
 * `(W - 3g) / 4`; eight columns spanned two at a time give it
 * `2 * (W - 7g) / 8 + g`, and those are the same number for any width and any
 * gap. So the card width, the column gap and the row gap are all untouched —
 * the finer grid buys nothing except somewhere for a short final row to start
 * other than the left edge.
 *
 * That is the whole reason it exists. Ten cards over four columns leave two on
 * the last row, and against a left edge they read as a board that ran out
 * rather than as a board that ended. Two cards cannot be centred across four
 * equal columns — the pair would have to begin halfway through the first one —
 * but across eight half-columns they can: they start at track three and finish
 * at track six, with two empty tracks either side.
 *
 * `LAST_ROW_START` is a lookup rather than a computed class because Tailwind
 * generates what it can see in the source; an interpolated `lg:col-start-${n}`
 * produces a class name that was never compiled. The offset for a final row of
 * `r` cards is `5 - r` tracks, which is what these three entries are, and a
 * full final row has no entry because it needs no offset.
 */
const LAST_ROW_START: Record<number, string> = {
  1: "lg:col-start-4",
  2: "lg:col-start-3",
  3: "lg:col-start-2",
};

/** Cards across the desktop board. The grid is twice this, spanned two at a time. */
const DESKTOP_COLUMNS = 4;

/**
 * The capability board (§5.1 #6).
 *
 * The section directly before this one states the problem and refuses to
 * answer it. This is the answer, and it is deliberately a board rather than an
 * argument: a merchant arrives knowing their symptom, not our feature names, so
 * peers they can scan in one pass lets them find themselves in it. Ranked rows
 * would impose an order the merchant does not share.
 *
 * Four across, read left to right — which means the sequence has to survive
 * being cut after any fourth card. It does: it runs in the order a bad COD
 * order meets the controls, so any prefix of it is still everything that
 * happens up to that point.
 *
 * Every card is a link to the control's own page, so this is also the page's
 * main branch point into the product — the card is the whole target, not a
 * "learn more" tucked in the corner of it.
 *
 * The board is a light, near-white set, and the variation across it is
 * deliberately the smallest thing that still reads as one. Ten identical white
 * cards on a white page was the review's "too plain" and it was; alternating
 * blue and violet *fills* was the correction overshooting, and the review's
 * word for that was "artificial". Both notes point the same way: the rhythm
 * belongs in the accent, not in the surface.
 *
 * So the surfaces alternate between `surface-card` and `surface-card-tint`,
 * which are white and four percent of blue — a step you notice across a row of
 * four and cannot name on any one card — and the colour lives entirely in a
 * 36px icon container, tinted at six or seven percent. Radius, shadow,
 * padding, type and the lift on hover are one decision applied to all ten, so
 * the board is a set of equals with a pulse rather than two kinds of card.
 *
 * The set is read from the content repository and resolved by slug (§11), so
 * this grid, the hero's checklist and the feature pages are one list seen three
 * times and cannot disagree — the grid and the checklist are literally the same
 * declaration, `homepageFeatures`.
 */
export function FeatureShowcase() {
  const board = getHomepageFeatures();
  const title = getControlBoardTitle();

  /*
    Which card opens the final row, and how far in it should start. Derived
    from the length of the list rather than written down, so adding or removing
    a control re-centres the board on its own instead of leaving a hand-tuned
    offset pointing at the wrong card.
  */
  const remainder = board.length % DESKTOP_COLUMNS;
  const lastRowStart = remainder === 0 ? -1 : board.length - remainder;
  const lastRowOffset = LAST_ROW_START[remainder];

  return (
    /*
      Matched to the trimmed padding under the problem section, so the two meet
      at roughly half the usual seam. They are one argument in two halves —
      here is what it costs, here is what stops it — and the page should not
      make a visitor cross a corridor between them.
    */
    <SectionShell
      backdrop={<PageEnvironment />}
      containerClassName="pt-7 md:pt-8 lg:pt-9"
    >
      <SectionHeading title={title} />

      <ul className="mt-lede grid gap-4 sm:grid-cols-2 lg:grid-cols-8">
        {board.map((card, index) => {
          const Icon = iconFor[card.slug] ?? ShieldCheck;

          /*
            Which beat of the two-surface set this card takes.

            Parity of the card's own index rather than of its position in the
            grid, and that is the whole reason it survives: the board is four
            across on desktop, two on a tablet and one on a phone, and the
            final row is offset by a fraction of a column that depends on how
            many controls the repository holds. A rule written against the
            visual column would have to be re-derived at every breakpoint and
            would come out half a column wrong the moment a control is added.
            Alternating on the index reads as alternating at every one of them.
          */
          const tinted = index % 2 === 0;

          return (
            <li
              key={card.slug}
              className={cn(
                "h-full lg:col-span-2",
                index === lastRowStart && lastRowOffset,
              )}
            >
              {/*
                A short stagger across the board, and the only motion in the
                section. Ten cards arriving at once reads as a page repaint;
                arriving in sequence reads as a set being laid out.
              */}
              <BlurFade delay={0.04 * index} className="h-full">
                <Link
                  href={routeFor.control(card.slug)}
                  className={cn(
                    "group flex h-full flex-col rounded-[1.15rem] p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                    tinted ? "surface-card-tint" : "surface-card",
                  )}
                >
                  {/*
                    Mark and name on one row, outcome underneath.

                    Two arrangements were wrong before this one. Inline — mark
                    left, the whole text block right — indents the description
                    past the icon and costs it forty pixels of measure, which
                    on a quarter-width card is a whole extra line of wrap.
                    Fully stacked — mark, then name, then outcome, each on its
                    own row — reads well and makes the card a third taller than
                    it needs to be for the same words, which is what left the
                    board looking airier and less substantial than it had been.

                    This takes the measure of the stacked version and the
                    height of the inline one: the header row is as tall as the
                    chip whatever the name does, and the description runs the
                    full width of the card underneath it.
                  */}
                  <div className="flex items-center gap-3">
                    {/*
                      The mark, in a container of its own — the elegant part of
                      the card and the only place brand colour appears on it.

                      The tint is a whisper: seven percent of blue or six of
                      violet behind the glyph, with a hairline ring a few
                      points darker. Enough to read as a considered object at
                      the size a chip is looked at, nowhere near enough to
                      compete with the name beside it.

                      The two beats take the two brand colours in the roles the
                      token file gives them, so the rhythm across the board is
                      carried here rather than by the surfaces. That is the
                      whole reason the fills could drop to almost nothing: an
                      alternation only needs one signal to be legible, and a
                      36px chip is a far quieter place to put it than a card.
                    */}
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-[10px] ring-1 transition-colors duration-300 ease-emphasized",
                        tinted
                          ? "bg-brand/[0.07] text-brand ring-brand/[0.13] group-hover:bg-brand/[0.12]"
                          : "bg-brand-violet/[0.06] text-brand-violet ring-brand-violet/[0.12] group-hover:bg-brand-violet/[0.11]",
                      )}
                    >
                      <Icon className="size-[17px]" strokeWidth={1.75} />
                    </span>

                    <h3 className="min-w-0 text-[14.5px] leading-snug font-semibold tracking-[-0.014em] text-ink">
                      {card.label}
                    </h3>
                  </div>

                  {/*
                    A step darker than it was. At 50% ink the outcome was quiet
                    to the point of looking disabled next to a solid black
                    name; 58% keeps the name unambiguously first while leaving
                    the line something to be read rather than skipped.
                  */}
                  <p className="mt-3 text-[12.5px] leading-relaxed text-pretty text-ink/[0.58]">
                    {card.blurb}
                  </p>
                </Link>
              </BlurFade>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
