import {
  ArrowRight,
  BadgeCheck,
  BadgeIndianRupee,
  BadgePercent,
  ChartNoAxesCombined,
  MapPinHouse,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { WhatsAppMark } from "@/components/brand/SocialMarks";
import { PageEnvironment } from "@/components/sections/PageEnvironment";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routeFor } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import {
  getControlBoardCopy,
  getControlBoardTitle,
  getHomepageFeatures,
} from "@/lib/content";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { ComponentType } from "react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 *
 * `ComponentType<WithClassName>` rather than `LucideIcon`, because one of the
 * ten is not a lucide glyph. The messaging card is labelled for the channel a
 * buyer actually receives the message in, and the mark a merchant recognises
 * for that channel is WhatsApp's own — so it draws `WhatsAppMark`, the single
 * published path this repository already uses in the footer, the contact page
 * and the homepage's closing visual. There is exactly one WhatsApp logo in
 * this codebase and this is it; a redrawn one would be a different logo.
 *
 * Lucide's components satisfy the narrower type because every prop they take
 * is optional, which is the same arrangement `socialMarks.tsx` relies on to
 * hold four platform glyphs in one map.
 */
const iconFor: Record<string, ComponentType<WithClassName>> = {
  "otp-verification": ShieldCheck,
  "order-verification": BadgeCheck,
  "partial-cod-payment": Wallet,
  "cod-fees": BadgeIndianRupee,
  "cod-show-hide": SlidersHorizontal,
  "cod-to-prepaid": BadgePercent,
  "address-validation": MapPinHouse,
  "messaging-gateways": WhatsAppMark,
  analytics: ChartNoAxesCombined,
  "abandoned-cart-recovery": ShoppingCart,
};

/**
 * How large each glyph is drawn inside its tile.
 *
 * One size for the set, and one exception. A lucide icon is a two-pixel stroke
 * sitting inside a generously padded 24-unit box; WhatsApp's mark is a filled
 * path that very nearly reaches the edges of the same box. Matched pixel for
 * pixel the filled one reads a size larger than its nine neighbours, which is
 * the kind of difference nobody can name and everybody sees. Two pixels off
 * puts the two optically level.
 */
const GLYPH_SIZE = "size-[21px]";

const glyphSizeFor: Record<string, string> = {
  "messaging-gateways": "size-[19px]",
};

/**
 * The colour each control's mark is drawn in.
 *
 * This is the one place on the site that carries a palette beyond the brand's
 * own two, and it is here because two reviews asked for it: the board was
 * called "dull" while every mark was a 7% tint of blue, and the correction the
 * reviewer supplied is a board of ten saturated, individually coloured tiles.
 *
 * What is drawn is a deliberate step short of that reference. Colour lives
 * entirely inside a 44px tile and a 28px arrow. The card under them is the same
 * white `surface-card` every other card on the site uses, and it keeps that
 * component's own hover — the brand hairline and the one-pixel lift — rather
 * than warming to its accent: ten cards each responding to the pointer in a
 * different colour is ten hover states, and the site has one. Ten tinted
 * surfaces would be a second palette; ten coloured objects on one surface is a
 * set of marks.
 *
 * The hues are also a stop deeper than the reference's. `-500` to `-600` under
 * white glyphs holds AA contrast at this size and reads as ink with colour in
 * it, where `-400` reads as a sticker.
 *
 * Written as finished class strings rather than composed from a hue name,
 * because Tailwind generates what it can see in the source: `from-${hue}-500`
 * is a class that was never compiled. Each entry is one card's whole treatment,
 * which also makes the set legible as a palette rather than as a rule.
 *
 * A slug with no entry falls back to the brand, so a control added to the
 * repository without art degrades to a blue tile rather than to a colourless
 * one.
 */
interface CardAccent {
  /** The filled tile behind the glyph. */
  readonly tile: string;
  /** The tile's own coloured shadow, so it sits above the card. */
  readonly glow: string;
  /** The arrow in the corner, at rest and under the pointer. */
  readonly arrow: string;
}

const accents: Record<string, CardAccent> = {
  "otp-verification": {
    tile: "bg-gradient-to-br from-blue-500 to-blue-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-blue-500)]",
    arrow: "text-blue-600 bg-blue-500/[0.08] group-hover:bg-blue-500/15",
  },
  "order-verification": {
    tile: "bg-gradient-to-br from-violet-500 to-violet-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-violet-500)]",
    arrow: "text-violet-600 bg-violet-500/[0.08] group-hover:bg-violet-500/15",
  },
  "partial-cod-payment": {
    tile: "bg-gradient-to-br from-sky-500 to-sky-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-sky-500)]",
    arrow: "text-sky-600 bg-sky-500/[0.08] group-hover:bg-sky-500/15",
  },
  "cod-fees": {
    tile: "bg-gradient-to-br from-rose-500 to-rose-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-rose-500)]",
    arrow: "text-rose-600 bg-rose-500/[0.08] group-hover:bg-rose-500/15",
  },
  "cod-show-hide": {
    tile: "bg-gradient-to-br from-teal-500 to-teal-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-teal-500)]",
    arrow: "text-teal-600 bg-teal-500/[0.08] group-hover:bg-teal-500/15",
  },
  "cod-to-prepaid": {
    tile: "bg-gradient-to-br from-amber-500 to-orange-500",
    glow: "shadow-[0_8px_20px_-8px_var(--color-amber-500)]",
    arrow: "text-amber-600 bg-amber-500/[0.1] group-hover:bg-amber-500/18",
  },
  "address-validation": {
    tile: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-indigo-500)]",
    arrow: "text-indigo-600 bg-indigo-500/[0.08] group-hover:bg-indigo-500/15",
  },
  /*
    The one hue on the board that is not a free choice, and the only one taken
    from outside the Tailwind ramp. This tile carries WhatsApp's own mark, so
    it carries WhatsApp's own greens: `#25D366` is the brand green and
    `#128C7E` the darker one it pairs with, which together are the app icon
    every buyer in these markets already has on their phone. A logo set on an
    approximated green is the one thing worse than not using the logo.

    Held as literals rather than as theme tokens for the same reason the
    closing visual's WhatsApp colours are: a token is a decision this site is
    free to change, and these are someone else's brand.
  */
  "messaging-gateways": {
    tile: "bg-[linear-gradient(to_bottom_right,#25D366,#128C7E)]",
    glow: "shadow-[0_8px_20px_-8px_#25D366]",
    arrow: "text-[#128C7E] bg-[#25D366]/12 group-hover:bg-[#25D366]/22",
  },
  analytics: {
    tile: "bg-gradient-to-br from-purple-500 to-purple-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-purple-500)]",
    arrow: "text-purple-600 bg-purple-500/[0.08] group-hover:bg-purple-500/15",
  },
  "abandoned-cart-recovery": {
    tile: "bg-gradient-to-br from-pink-500 to-pink-600",
    glow: "shadow-[0_8px_20px_-8px_var(--color-pink-500)]",
    arrow: "text-pink-600 bg-pink-500/[0.08] group-hover:bg-pink-500/15",
  },
};

const fallbackAccent: CardAccent = {
  tile: "bg-gradient-to-br from-brand to-brand-deep",
  glow: "shadow-[0_8px_20px_-8px_var(--brand)]",
  arrow: "text-brand bg-brand/[0.08] group-hover:bg-brand/15",
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
 * The section directly after this one states what cash on delivery costs a
 * store that has none of these. This is the system, and it is deliberately a
 * board rather than an argument: a merchant arrives knowing their symptom, not
 * our feature names, so peers they can scan in one pass lets them find
 * themselves in it. Ranked rows would impose an order the merchant does not
 * share.
 *
 * It used to sit below the problem and now sits above it, at the reviewer's
 * instruction. The pair are still adjacent and still one argument in two
 * halves, so the only thing the move changed is which of the two trims its
 * padding to close the seam — the trim is on the bottom edge here now, and on
 * the problem section's top edge.
 *
 * Four across, read left to right — which means the sequence has to survive
 * being cut after any fourth card. It does: it runs in the order a bad COD
 * order meets the controls, so any prefix of it is still everything that
 * happens up to that point.
 *
 * Every card is a link to the control's own page, so this is also the page's
 * main branch point into the product — the card is the whole target, not a
 * "learn more" tucked in the corner of it. The arrow in the corner is an
 * affordance rather than a second target: it is inside the same anchor and has
 * no separate hit area, which is why it responds to the card's `group` and not
 * to a hover of its own.
 *
 * ── On the colour ─────────────────────────────────────────────────────────
 * Two passes were rejected before this one. Ten identical white cards was the
 * first review's "too plain" and it was; alternating blue and violet *fills*
 * was the correction overshooting, and the word for that was "artificial". The
 * reviewer then supplied a reference — ten cards, ten saturated icon tiles —
 * and asked for it "but not that much brighter".
 *
 * So the colour is all in the marks. Each card takes a filled 44px tile in its
 * own hue with a white glyph and a soft coloured shadow, and the card under it
 * stays the same white `surface-card` every other card on the site uses, at the
 * same radius, shadow and lift. The hue reaches the card only as a hairline
 * that warms under the pointer and as the small arrow in its corner.
 *
 * That is the difference between a board with colour in it and a board made of
 * colour: at a glance the ten marks are the brightest thing on the page, and at
 * the distance a card is actually read there is one white surface with one
 * coloured object on it.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The set is read from the content repository and resolved by slug (§11), so
 * this grid, the hero's checklist and the feature pages are one list seen three
 * times and cannot disagree — the grid and the checklist are literally the same
 * declaration, `homepageFeatures`.
 */
export function FeatureShowcase() {
  const board = getHomepageFeatures();
  const title = getControlBoardTitle();
  const copy = getControlBoardCopy();

  /*
    The heading, split on its own tail. `titleAccent` is data, so a reworded
    heading cannot leave the colour on the wrong words: a tail that no longer
    occurs simply fails to match and the heading renders in one colour.
  */
  const accentAt = title.lastIndexOf(copy.titleAccent);
  const titleLead = accentAt >= 0 ? title.slice(0, accentAt) : title;
  const titleAccent = accentAt >= 0 ? title.slice(accentAt) : null;

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
      Matched to the trimmed padding above the problem section, so the two meet
      at roughly half the usual seam. They are one argument in two halves —
      here is what stops it, here is what it costs without it — and the page
      should not make a visitor cross a corridor between them.

      Every breakpoint the section scale defines has to be answered, not just
      the first two. Tailwind orders utilities by breakpoint, so an unanswered
      `lg:py-section-lg` would land after `md:pb-8` in the stylesheet and
      quietly put the full padding back on the widest screens.
    */
    <SectionShell
      backdrop={<PageEnvironment />}
      containerClassName="pb-7 md:pb-8 lg:pb-9"
    >
      <SectionHeading
        eyebrowAs="pill"
        eyebrow={
          <>
            <Zap aria-hidden className="size-3.5" />
            {copy.eyebrow}
          </>
        }
        title={
          <>
            {titleLead}
            {titleAccent ? (
              /*
                The accent is the brand's own two colours, left to right, rather
                than a third hue picked for the heading. `text-transparent` over
                a clipped background is the only way to run a gradient through
                type, and the fallback if `background-clip` is unsupported is
                the token colour underneath — which is why `text-brand` is set
                as well as the gradient.
              */
              <span className="bg-gradient-to-r from-brand-violet to-brand bg-clip-text text-brand text-transparent">
                {titleAccent}
              </span>
            ) : null}
          </>
        }
        description={siteConfig.description}
      />

      <ul className="mt-lede grid gap-4 sm:grid-cols-2 lg:grid-cols-8">
        {board.map((card, index) => {
          const Icon = iconFor[card.slug] ?? ShieldCheck;
          const accent = accents[card.slug] ?? fallbackAccent;

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
                    "group relative flex h-full surface-card flex-col rounded-[1.15rem]",
                    /* `pb-12` is the arrow's row. It is reserved on the card
                       rather than as padding on the paragraph, because a
                       right-inset paragraph shortens every line to make room
                       for something that only occupies the last one — which
                       breaks the first line early on a quarter-width card. */
                    "px-5 pt-5 pb-12",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
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
                    tile whatever the name does, and the description runs the
                    full width of the card underneath it.
                  */}
                  <div className="flex items-center gap-3.5">
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-[13px] text-white",
                        "transition-transform duration-300 ease-emphasized group-hover:-translate-y-0.5",
                        accent.tile,
                        accent.glow,
                      )}
                    >
                      <Icon className={glyphSizeFor[card.slug] ?? GLYPH_SIZE} />
                    </span>

                    <h3 className="min-w-0 text-[15px] leading-snug font-semibold tracking-[-0.014em] text-ink">
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

                  {/*
                    The affordance, pinned to the card's own corner rather than
                    placed at the end of the text. `mt-auto` on a flex child
                    would push it below the shortest description and leave the
                    arrows on a row at four different heights; absolute puts
                    every one of the ten on the same line as the card's bottom
                    edge, whatever the copy above it does — and the card's
                    `pb-12` is what guarantees the copy never reaches it.
                  */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute right-4 bottom-4 grid size-7 place-items-center rounded-full",
                      "transition-[background-color,transform] duration-300 ease-emphasized",
                      "group-hover:translate-x-0.5",
                      accent.arrow,
                    )}
                  >
                    <ArrowRight className="size-3.5" strokeWidth={2.5} />
                  </span>
                </Link>
              </BlurFade>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
