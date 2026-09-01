import {
  BadgeCheck,
  HandCoins,
  IndianRupee,
  ShieldOff,
  TrendingUp,
  Undo2,
} from "lucide-react";

import { CheckoutPreview } from "@/components/sections/hero/checkout/CheckoutPreview";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface FloatingChip {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly label: string;
  /**
   * Which column the chip stands in.
   *
   * It decides two things that have to agree: which edge of the stage the box
   * is pinned to, and which way its connector runs. Holding it as data rather
   * than as two matching strings is what stops a chip on the right ever
   * growing an arrow pointing away from the device.
   */
  readonly side: "left" | "right";
  /** Vertical position within the stage. Only rendered from `lg` up. */
  readonly className: string;
  /** Negative, so the six chips are already spread across the float cycle. */
  readonly delay: string;
}

/**
 * The outcomes ringing the product.
 *
 * Six, positioned in two columns so they frame the device rather than crowd
 * it, and deliberately worded as *results* — what the merchant gets — while
 * the checklist beside them is worded as *capabilities*. The same six words
 * twice would be a wall; a capability on the left and its consequence on the
 * right is an argument.
 *
 * The two columns are staggered rather than aligned in rows. Six chips at
 * three matched heights read as a table someone forgot to draw the lines on;
 * offsetting the right column by half a step makes the same six read as
 * scattered around the device, which is the composition the blueprint has.
 *
 * Positions are percentages of the stage box, so the whole composition scales
 * with the column instead of being pinned to pixels.
 */
const CHIPS: readonly FloatingChip[] = [
  {
    id: "fake-orders",
    icon: ShieldOff,
    label: "Block fake orders",
    side: "left",
    className: "top-[9%]",
    delay: "0s",
  },
  {
    id: "advance",
    icon: HandCoins,
    label: "Collect advance",
    side: "left",
    className: "top-[39%]",
    delay: "-2.4s",
  },
  {
    id: "cod-fees",
    icon: IndianRupee,
    label: "Charge COD fees",
    side: "left",
    /*
      62%, not the 70% this sat at, and the eight points are the whole reason
      the left column could be given any breathing room at all.

      At 70% this chip's band lands on the CTA row, and the second button
      reaches the full width of the text column — so measured against real ink
      there were seven pixels between the card and the button, and every pixel
      the chip moved outward came straight out of them. Nothing else on this
      side was close: the two chips above it had over a hundred pixels of
      clearance and were being held at eight by this one, because six boxes in
      two columns have to move as a set or they stop reading as a set.

      Eight points up is out of the button's band and into the checklist's,
      where the longest line stops 113 pixels short of the stage. It is the
      smallest move that clears the obstacle — 64% still grazes it once the
      float cycle is counted — and it is still the lowest of the three, which
      is the only thing about its position that carries meaning.
    */
    className: "top-[62%]",
    delay: "-4.8s",
  },
  {
    id: "prepaid",
    icon: TrendingUp,
    label: "Convert to prepaid",
    side: "right",
    className: "top-[17%]",
    delay: "-1.2s",
  },
  {
    id: "rto",
    icon: Undo2,
    label: "Reduce RTO",
    side: "right",
    className: "top-[48%]",
    delay: "-3.6s",
  },
  {
    id: "trust",
    icon: BadgeCheck,
    label: "Build trust",
    side: "right",
    className: "top-[78%]",
    delay: "-6s",
  },
];

/**
 * The connector that ties a chip to the device.
 *
 * Every box beside the phone is an annotation on it, and until this existed
 * nothing said so: six cards floating in the margin of a product shot read as
 * decoration, and a visitor had no reason to believe the words on them
 * described the screen in the middle rather than the page in general.
 *
 * It runs from the box *to* the device, not the other way round. The claim
 * being made is "this outcome comes out of this product", so the line starts
 * on the thing being claimed and lands on the thing that produces it — which
 * is also the direction the eye is already travelling, from the margin to the
 * subject.
 *
 * Two elements, no SVG: a 1.5px shaft and a solid six-pixel triangle built
 * from the border trick. Both of those are deliberate and both replace a
 * first pass that could not be seen. That pass drew a one-pixel rule fading
 * from 15% brand and closed it with a chevron made of two hairline borders on
 * a rotated square — at the size this gap allows, a hairline rotated
 * forty-five degrees is antialiased into almost nothing, and the review's
 * verdict was simply that the arrows were not visible. A filled triangle has
 * no hairline to lose: it is the same six pixels long, reads at a glance, and
 * is still small enough to be a mark rather than a graphic.
 *
 * An SVG stretched to a percentage width would distort its own arrowhead at
 * every viewport, and an arrowhead that changes shape as the window resizes is
 * the exact tell this was drawn to avoid. Borders cannot distort, and a
 * triangle drawn this way stays crisp at any density because nothing is
 * rotated or resampled.
 *
 * The box is sized as a fraction of the chip rather than in pixels, so it
 * fills the clearance between the card and the checkout at every width the
 * scene is drawn at and can never reach across the surface — the head stops
 * two pixels short of it. It is also a child of the chip, so it floats with
 * it: a connector that stayed still while the box it points from drifted would
 * detach on every cycle.
 *
 * The fraction shrank when the checkout grew, and it had to: the clearance the
 * arrow runs in is now eight pixels rather than eleven, and a connector that
 * kept its old length would have driven its head onto the card face. Eight
 * percent of the chip below 1152 and seven above it is that eight pixels,
 * expressed in the only unit that survives every column width.
 *
 * The head carries full brand and the shaft carries it at 45%, which is what
 * makes this read as pointing rather than as a divider — the eye is given one
 * solid thing to land on and a quiet line to get there along.
 */
function ChipConnector({ side }: { readonly side: FloatingChip["side"] }) {
  const toLeft = side === "right";

  return (
    <span
      aria-hidden
      className={cn(
        /*
          The shaft lengthens with the gap rather than staying a fixed
          fraction, because it has one job and it is proportional: to reach.
          A connector tuned for an eight-pixel gap leaves a thirty-pixel one
          with an arrowhead floating in the middle of nothing, which is worse
          than the crowding it was widened to fix.

          The bands match the ones the chips are positioned in, for the obvious
          reason that a shaft and the space it crosses have to be described by
          the same breakpoints or they disagree at the edges.
        */
        "pointer-events-none absolute top-1/2 h-[7px] -translate-y-1/2",
        "max-[1200px]:w-[9%] min-[1200px]:max-[1440px]:w-[20%] min-[1440px]:w-[32%]",
        toLeft ? "right-full" : "left-full",
      )}
    >
      {/* The shaft, stopping at the base of the head. */}
      <span
        className={cn(
          "absolute top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-brand/45",
          toLeft ? "right-0 left-[8px]" : "right-[8px] left-0",
        )}
      />
      {/*
        The head. `size-0` with two transparent borders and one coloured one is
        the oldest triangle in CSS and still the sharpest: no path, no
        rasterised rotation, and it lands two pixels clear of the device.
      */}
      <span
        className={cn(
          "absolute top-1/2 size-0 -translate-y-1/2 border-y-[3.5px] border-y-transparent",
          toLeft
            ? "left-[2px] border-r-[6px] border-r-brand"
            : "right-[2px] border-l-[6px] border-l-brand",
        )}
      />
    </span>
  );
}

/**
 * One outcome, floating beside the device.
 *
 * Drawn as a single line — mark and label, nothing else. An earlier pass gave
 * each of these a title and a supporting sentence, and six paragraphs orbiting
 * a phone is not a composition, it is a second article competing with the one
 * a visitor is trying to read. A chip has to be legible in the quarter second
 * the eye spends on it on its way to the product.
 *
 * Sized to be read rather than merely noticed. The note on this scene, twice
 * over, was that the blocks around the subject were too small to register, and
 * every value here answers it: a 13px label above 1152 rather than an 11.5px
 * one, taller padding, near-solid white instead of 80% glass, and a drop
 * shadow deep enough to lift the chip off the field rather than tint the
 * pixels under it.
 *
 * What it gave back, when the checkout was enlarged, was width — 26% of the
 * stage down to 21.5% above 1152 — and the giving back is why the mark and the
 * gutters shrank with it. A chip cannot lose a fifth of its box and keep the
 * same 32-pixel tile and 12-pixel gutters without the *label* paying for all
 * of it, and the label is the only part carrying information. Four pixels off
 * the tile and two off each gutter are invisible; a third line of wrap in
 * "Convert to prepaid" would not have been.
 *
 * The bound is worth stating: two chips plus two connector gaps have to fit
 * whatever the checkout leaves either side of it, and those five numbers have
 * to sum to a hundred. See the geometry note in `HeroStage` for the sum.
 *
 * The growth is taken outward rather than inward. Each column hangs two
 * percent past the edge of the stage — these sat outside it in the original
 * composition too — so the boxes keep their width while the device takes back
 * the middle, and none of it comes out of the clearance the connectors run in.
 *
 * The horizontal padding went the other way — 14px back to 12px — and that is
 * the same decision, not a contradiction. Every pixel spent on a gutter is a
 * pixel the label does not have. Height is where the breathing room went,
 * because that is where it shows.
 *
 * The mark and the label step up at 1152px rather than at `lg`, and that
 * number is the page container's own maximum rather than a guess. Below it the
 * container still grows with the viewport, and the text column beside this one
 * is floored at the width its headline needs — so between 1024 and 1151 the
 * stage is squeezed to about three quarters of the width it settles at, and a
 * chip is 107px rather than 140px. At that size a 13px "prepaid" is wider than
 * the measure left over beside the mark, and a flex item cannot shrink below
 * its longest word: the label pushed straight through the card's right gutter.
 *
 * So the chip is drawn at its full size everywhere the stage is, and at the
 * smaller of the two sizes in the one band where the stage is short of room.
 * The alternative was to let the word break mid-syllable or to take the width
 * out of the headline, and both are worse than a chip that is a point and a
 * half smaller on a 1100px window.
 *
 * The growth is deliberately moderate and it is paid for out of the margin
 * rather than out of the device: the chips went from 24% of the stage to 25%
 * and the phone from 48% to 44%, which buys three percent of clearance on each
 * side for the connectors to run in without either column of boxes ever
 * reaching the glass. A phone at 44% is still close to twice the width of a
 * chip and the only full-height object in the frame, so the hierarchy the
 * scene is built on does not move.
 *
 * The one piece of colour is the mark. A chip is a *result* the product
 * produces, so tinting its icon in brand is what separates these from the
 * neutral furniture elsewhere in the hero — and it does the work of making
 * them visible without any of them getting louder in size or weight.
 *
 * They still lose to the device, and are meant to. The phone is the only thing
 * in the frame in full colour and the only thing that moves through states;
 * these annotate it, and the connector says so.
 *
 * Hidden from assistive technology: every one of these restates a capability
 * the checklist beside it already lists in full, and a screen reader should
 * hear that list once.
 */
function Chip({ icon: Icon, label, side, className, delay }: FloatingChip) {
  return (
    <div
      aria-hidden
      style={{ animationDelay: delay }}
      className={cn(
        "absolute z-30 w-[26%] animate-float min-[1152px]:w-[24%]",
        /*
          How far the column stands off the stage, and the one number this
          change is about.

          Three bands, and they are disjoint on purpose — see the note beside
          the checkout's own widths for what happens when two Tailwind width
          variants both match and the cascade, rather than this file, picks the
          winner.

          The ceiling is different on each side and neither is negotiable. On
          the left it is the text column's own ink, which sits inside a
          container that has stopped growing, so that ceiling is the same at
          every desktop width. On the right it is the edge of the window, and
          that one moves: at 1152 the container has just hit its maximum and
          the page margin is nothing, by 1200 there are twenty-four pixels a
          side and by 1440 a hundred and forty-four. The right is therefore
          what makes this responsive at all, and the left is what stops the
          widest band going further still.

          1200 rather than a rounder breakpoint because that is where the
          arithmetic turns: below it, a gap in the range being asked for puts a
          chip within a few pixels of the window edge, and a few pixels is not
          a margin, it is a coin toss about a horizontal scrollbar.

          The bounds are written as `max-[1200px]` against `min-[1200px]` and
          not as `max-[1199px]`, because Tailwind's `max-` is exclusive: the
          off-by-one pair left a one-pixel hole at exactly 1199 and again at
          1439 where no rule matched at all, the hang fell to zero and six
          chips landed on top of the checkout. A window is exactly 1199 pixels
          wide more often than that sounds.

          The gap this buys, card edge to card edge: about 10px below 1200 —
          where the window simply has nothing to give — about 27px to 1440, and
          about 43px above it.
        */
        side === "right"
          ? "max-[1200px]:-right-[5%] min-[1200px]:max-[1440px]:-right-[8%] min-[1440px]:-right-[11%]"
          : "max-[1200px]:-left-[5%] min-[1200px]:max-[1440px]:-left-[8%] min-[1440px]:-left-[11%]",
        "flex items-center gap-1.5 rounded-[15px] border border-ink/[0.07] bg-white/95 px-2.5 py-3.5 backdrop-blur-xl",
        "shadow-[0_1px_2px_rgba(11,27,54,0.06),0_14px_30px_-14px_rgba(11,27,54,0.55)]",
        className,
      )}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-[10px] bg-brand/[0.08] ring-1 ring-brand/12">
        <Icon className="size-3.5 text-brand" strokeWidth={1.9} />
      </span>
      <span className="min-w-0 text-[11.5px] leading-[1.3] font-semibold text-balance text-ink/85 min-[1152px]:text-[13px]">
        {label}
      </span>

      <ChipConnector side={side} />
    </div>
  );
}

/**
 * The hero's product scene.
 *
 * One surface, centred, with the outcomes floating around it. Three earlier
 * passes got this wrong in different directions — one stood a second phone
 * behind the first, one parked the verification on a card outside the glass,
 * and the one this replaces wrapped a real product screen in a drawing of an
 * iPhone. All three made the same mistake: they spent the frame on furniture
 * and pushed the product's own screen out of the place the whole composition
 * points at.
 *
 * The frame is gone and the checkout is the whole object. Chamfered titanium,
 * a dynamic island and a bezel were arguing on behalf of a screen that can
 * argue for itself, and a merchant evaluating a COD app does not need to be
 * told what a phone looks like — they need to see what their buyers see, at
 * the size they will see it, doing what it does. What is left is `CheckoutPreview`,
 * which is not a picture of the product but the product's own flow, running.
 *
 * Depth is bought with light rather than with rotation. A rotated layer is
 * rasterised flat and resampled, which softens every glyph on the screen —
 * and the screen is the entire argument. Layered contact shadows, the key
 * light behind the surface and the drop shadows on the chips do the same job
 * and cost nothing in sharpness.
 *
 * The stage box is sized from what it has to hold at each breakpoint, and
 * everything inside is positioned as a percentage of it, so the composition
 * survives every column width instead of being tuned for one. The chips are
 * the first thing to go as the column narrows: below `lg` there is no room for
 * two columns of annotation beside a checkout, and a chip crushed against it
 * argues against the craft it is meant to demonstrate.
 *
 * Nothing here fades in — see `Hero` for why the first screen must never
 * depend on JavaScript to be visible. The only motion is the chips' slow float
 * and the checkout's own sequence, both removed under reduced motion.
 */
export function HeroStage() {
  return (
    <div className="relative w-full">
      <div className="relative aspect-[1/1.58] w-full sm:aspect-[1/1.1] lg:aspect-[1/1.02]">
        {/*
          The checkout, and the shadows it casts.

          The shadows are children of the surface's own box rather than of the
          stage, so they are expressed relative to the thing casting them and
          stay correct at every width and position. Pinned to the stage they
          were right at exactly one breakpoint and sat well to the left of the
          subject at the others — an object casting a shadow next to itself is
          the clearest tell that a scene was assembled rather than lit.
        */}
        {/*
          The geometry, which is one decision and has to be read as one.

          Five things compete for a single row of width and they have to sum to
          a hundred: the checkout, two columns of annotation, and the two
          arrows' clearance. Nothing here can grow without something beside it
          being named as what paid for it.

              checkout + 2 x (chip - hang) + 2 x clearance = 100

          Above 1152, where the container is at its full 72rem and the design
          is really tuned:  58 + 2 x (24 - 4.5) + 2 x 1.5 = 100.
          Between 1024 and 1151, where the stage is a quarter narrower and a
          chip cannot afford to give up the same width: 53 + 2 x (26 - 4.5) + 2 x 2.

          The checkout went from 48% to 58% — a fifth larger on the surface a
          visitor is meant to watch — and it was paid for from two places, both
          of which had a ceiling that was measured rather than guessed.

          Most of it came from the outward hang, 2% to 4.5%. The ceiling there
          is not the left column, which has room: it is the *right* edge of the
          window at exactly 1152, where the container has stopped growing and
          the right-hand chips have twenty-one pixels of margin left. 4.5% of
          the stage is most of them, and the margin that survives is checked
          rather than assumed — a wider hang would put a chip past the viewport
          and open a horizontal scrollbar on the one width where this layout
          has none to spare.

          The rest came from the chips' own width, and only the rest, because
          that is the expensive place to take it from: a chip is mostly label.
          Two passes at this proved it — 21.5% turned every two-line label into
          a three-line one, and 23% still cost "Convert to prepaid" its second
          line. 24%, with two pixels off the gap and two off each gutter, is
          the narrowest box all six labels survive. See `Chip`.

          Centred rather than sitting on the floor of the stage, which the
          device did. A phone at 1:2 filled the stage from top to bottom and
          had to be stood on something; a checkout at 1:1.62 does not reach
          either edge, and centring it is what puts the six chips around it
          instead of above it.

          It grows below `lg`, where the chips are not drawn: with no
          clearance to find, the only thing competing for the width is the
          gutter, and a checkout a visitor is expected to *use* on a phone
          should be as close to full width as the gutter allows.
        */}
        {/*
          Four widths, four *disjoint* ranges, and the disjointness is
          load-bearing rather than pedantic.

          Tailwind ranks a named breakpoint variant above an arbitrary
          `min-[...]` one whatever the two values are, so `sm:w-[66%]` beats
          `min-[1152px]:w-[58%]` at 1400 pixels and `lg:` beats it too. Both of
          those were live bugs in this line: the first pass rendered the
          checkout at 51% above 1152 and the second at 66%, and neither is a
          width anything here asked for. Closing each range with a `max-`
          bound leaves exactly one rule matching at any viewport, which takes
          the question away from the cascade altogether.
        */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 w-[94%] -translate-x-1/2 -translate-y-1/2",
            "sm:max-[1023px]:w-[66%]",
            "lg:max-[1151px]:w-[53%]",
            "min-[1152px]:w-[58%]",
          )}
        >
          <div
            aria-hidden
            className="absolute inset-x-[-9%] bottom-[-1.5%] h-[6%] rounded-[50%] bg-ink/16 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute inset-x-[12%] bottom-[-0.5%] h-[3%] rounded-[50%] bg-ink/22 blur-lg"
          />

          <CheckoutPreview />
        </div>

        {CHIPS.map((chip) => (
          /*
            `lg:flex`, not `lg:block`. The chip's own class list sets `flex`,
            and tailwind-merge resolves display utilities as one group — so a
            `hidden lg:block` passed in here wins the base `flex` outright and
            the mark and label stack instead of sitting on one line.
          */
          <Chip
            key={chip.id}
            {...chip}
            className={cn("hidden lg:flex", chip.className)}
          />
        ))}
      </div>
    </div>
  );
}
