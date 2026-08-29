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
 * What is drawn is a deliberate step short of that reference, and then a
 * second step short again. The tiles were filled — a `-500`-to-`-600` gradient
 * under a white glyph, each with a coloured shadow beneath it — and ten filled
 * chips of ten different hues is a paint chart: the eye counts colours instead
 * of reading capabilities, and the loudest thing on a white board ends up
 * being its decoration.
 *
 * They are now tinted rather than filled. Each tile is its own accent at
 * twelve percent over the card, ringed at twenty, with the glyph itself
 * carrying the colour at `-600`. That inverts the weight: the coloured thing
 * is the mark a merchant is trying to recognise rather than the square behind
 * it, and the board reads as white with ten accents on it instead of as ten
 * colours on white. The coloured drop shadows are gone entirely — a tint that
 * needs a glow to be seen is a tint that is doing too little work, and ten
 * glows is a board that hums.
 *
 * Twelve rather than the nine it was first drawn at. At nine the tiles read as
 * a smudge behind the glyph rather than as a container for it, and with the
 * card beneath them equally quiet the whole board came out dull — the note on
 * that pass was that it had gone from too loud to too plain. Three points is
 * the difference between a tint you have to look for and one you can see, and
 * it is spent here rather than on the card because this is where the section's
 * colour is supposed to live.
 *
 * ── On the palette ────────────────────────────────────────────────────────
 * One hue per card, and every one of them drawn from the cool half of the
 * wheel: blue, sky, cyan and teal through indigo, violet and purple to
 * fuchsia and pink. That is the range the brand already lives in — `--brand`
 * is a blue and `--brand-violet` a violet, and the run from one to the other
 * is exactly this spectrum — so the ten read as a family rather than as ten
 * choices. The amber and the rose that used to sit in the set are gone for
 * that reason: they were the two that made the board look like a chart.
 *
 * The values are a formula rather than ten separate decisions — `/[0.09]`
 * tile, `/15` ring, `-600` glyph, and the same accent at `/[0.07]` behind the
 * corner arrow — which is what keeps the treatment identical across ten hues
 * whose Tailwind ramps do not have identical lightness. Tinting with the
 * accent itself rather than with each hue's `-50` shade is the same decision:
 * `blue-50` and `teal-50` are not equally light, and a set built from them
 * would drift.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Written as finished class strings rather than composed from a hue name,
 * because Tailwind generates what it can see in the source: `bg-${hue}-500/10`
 * is a class that was never compiled. Each entry is one card's whole
 * treatment, which also makes the set legible as a palette rather than as a
 * rule.
 *
 * A slug with no entry falls back to the brand, so a control added to the
 * repository without art degrades to a blue tile rather than to a colourless
 * one.
 */
interface CardAccent {
  /** The tinted tile, its ring, and the colour the glyph inherits. */
  readonly tile: string;
  /** The arrow in the corner, at rest and under the pointer. */
  readonly arrow: string;
}

const accents: Record<string, CardAccent> = {
  "otp-verification": {
    tile: "bg-blue-500/[0.12] ring-blue-500/20 text-blue-600",
    arrow: "text-blue-600 bg-blue-500/[0.07] group-hover:bg-blue-500/14",
  },
  "order-verification": {
    tile: "bg-indigo-500/[0.12] ring-indigo-500/20 text-indigo-600",
    arrow: "text-indigo-600 bg-indigo-500/[0.07] group-hover:bg-indigo-500/14",
  },
  "partial-cod-payment": {
    tile: "bg-sky-500/[0.12] ring-sky-500/20 text-sky-600",
    arrow: "text-sky-600 bg-sky-500/[0.07] group-hover:bg-sky-500/14",
  },
  "cod-fees": {
    tile: "bg-violet-500/[0.12] ring-violet-500/20 text-violet-600",
    arrow: "text-violet-600 bg-violet-500/[0.07] group-hover:bg-violet-500/14",
  },
  "cod-show-hide": {
    tile: "bg-teal-500/[0.12] ring-teal-500/20 text-teal-600",
    arrow: "text-teal-600 bg-teal-500/[0.07] group-hover:bg-teal-500/14",
  },
  "cod-to-prepaid": {
    tile: "bg-cyan-500/[0.12] ring-cyan-500/20 text-cyan-600",
    arrow: "text-cyan-600 bg-cyan-500/[0.07] group-hover:bg-cyan-500/14",
  },
  "address-validation": {
    tile: "bg-purple-500/[0.12] ring-purple-500/20 text-purple-600",
    arrow: "text-purple-600 bg-purple-500/[0.07] group-hover:bg-purple-500/14",
  },
  /*
    The one hue on the board that is not a free choice, and the only one taken
    from outside the Tailwind ramp. This tile carries WhatsApp's own mark, so
    it carries WhatsApp's own green: `#25D366`. A logo set on an approximated
    green is the one thing worse than not using the logo.

    Held as a literal rather than as a theme token for the same reason the
    closing visual's WhatsApp colours are: a token is a decision this site is
    free to change, and this is someone else's brand.

    The mark draws its own filled green disc with a white glyph inside it, so
    unlike its nine neighbours it does not inherit the tile's text colour — it
    was always going to be green, and on a tint it now reads as the app icon a
    buyer has on their phone rather than as green on green.
  */
  "messaging-gateways": {
    tile: "bg-[#25D366]/13 ring-[#25D366]/25 text-[#128C7E]",
    arrow: "text-[#128C7E] bg-[#25D366]/10 group-hover:bg-[#25D366]/18",
  },
  analytics: {
    tile: "bg-fuchsia-500/[0.12] ring-fuchsia-500/20 text-fuchsia-600",
    arrow:
      "text-fuchsia-600 bg-fuchsia-500/[0.07] group-hover:bg-fuchsia-500/14",
  },
  "abandoned-cart-recovery": {
    tile: "bg-pink-500/[0.12] ring-pink-500/20 text-pink-600",
    arrow: "text-pink-600 bg-pink-500/[0.07] group-hover:bg-pink-500/14",
  },
};

const fallbackAccent: CardAccent = {
  tile: "bg-brand/[0.12] ring-brand/20 text-brand",
  arrow: "text-brand bg-brand/[0.07] group-hover:bg-brand/14",
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
/**
 * The section's lede, with the product's name in the brand accent.
 *
 * Written as a split rather than as markup around a literal so the sentence
 * itself stays in `siteConfig`, where four other surfaces read it from.
 */
function renderDescription(description: string) {
  const at = description.indexOf(siteConfig.name);
  if (at < 0) return description;

  return (
    <>
      {description.slice(0, at)}
      <span className="font-semibold text-brand">{siteConfig.name}</span>
      {description.slice(at + siteConfig.name.length)}
    </>
  );
}

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
        /*
          The product's own one-line definition, with its name picked out.

          Split on `siteConfig.name` rather than retyped with a span around it,
          so the sentence stays the single definition the metadata, the
          Organization schema and `llms.txt` all read — there is no second copy
          of it here to drift. A rewording that drops the name simply renders
          the line flat.

          Flat `text-brand` rather than the heading's gradient. A gradient run
          through two words of 18px muted text is muddy where the same gradient
          through a 48px heading is not, and the site already has a flat
          inline accent for exactly this — it is what the hero sets "Fake COD
          Orders." in.
        */
        description={renderDescription(siteConfig.description)}
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
                    "group relative isolate flex h-full surface-card flex-col rounded-[1.15rem]",
                    /*
                      A cool wash across the card, and it is deliberately at
                      the very edge of visible: white at the top-left corner,
                      arriving at about three percent of a blue-lavender at the
                      bottom-right. That is enough to give the surface a
                      direction — a lit corner and a shaded one — which is what
                      separates a card that reads as an object from one that
                      reads as a hole cut in the page. It is not enough to be
                      called a colour, which is the point: the board is white
                      first and the icons are what carry the hue.

                      Painted on `::before` rather than as a background
                      utility, because `surface-card` already sets `bg-card`
                      and which of two same-specificity rules wins is a
                      question about stylesheet order rather than about intent.
                      `isolate` plus `-z-10` puts the wash above the card's own
                      background and below everything in it, so it can never
                      come out over the text.
                    */
                    "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]",
                    "before:bg-[linear-gradient(155deg,rgba(255,255,255,0)_0%,rgba(99,102,241,0.02)_54%,rgba(79,110,247,0.05)_100%)]",
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
                        /*
                          `ring-1` rather than a border, so the outline is
                          drawn outside the box and the tile stays exactly 44px
                          — a border would take its width out of the tint and
                          the ten tiles would no longer match the arrows.

                          No `text-white` any more: the glyph takes its colour
                          from the accent, which is the whole of the change
                          from filled tiles to tinted ones.
                        */
                        "grid size-11 shrink-0 place-items-center rounded-[13px] ring-1 ring-inset",
                        "transition-transform duration-300 ease-emphasized group-hover:-translate-y-0.5",
                        accent.tile,
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
