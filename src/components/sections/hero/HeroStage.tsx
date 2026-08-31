import {
  BadgeCheck,
  HandCoins,
  IndianRupee,
  ShieldOff,
  TrendingUp,
  Undo2,
} from "lucide-react";

import { VerifyScreen } from "@/components/sections/hero/VerifyScreen";
import { Iphone } from "@/components/ui/iphone";
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
    className: "top-[70%]",
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
 * fills the clearance between the card and the device at every width the scene
 * is drawn at and can never reach across the glass — the head stops two pixels
 * short of the frame. It is also a child of the chip, so it floats with it: a
 * connector that stayed still while the box it points from drifted would
 * detach on every cycle.
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
        "pointer-events-none absolute top-1/2 h-[7px] w-[11.5%] -translate-y-1/2",
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
 * over, was that the blocks around the device were too small to register, and
 * every value here answers it: 26% of the stage instead of 24%, a 32-pixel
 * mark instead of a 28-pixel one, a 13px label instead of an 11.5px one,
 * taller padding, near-solid white instead of 80% glass, and a drop shadow
 * deep enough to lift the chip off the field rather than tint the pixels
 * under it.
 *
 * The growth stays moderate because it is bounded, and the bound is worth
 * stating: two chips plus two connector gaps have to fit whatever the device
 * leaves either side of it. 26% of chip and 3% of clearance is that budget
 * spent — a wider box would be bought out of the arrows, and an arrow that
 * cannot be seen was the other half of the same review.
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
        "absolute z-30 w-[26%] animate-float",
        side === "right" ? "-right-[2%]" : "-left-[2%]",
        "flex items-center gap-2 rounded-[15px] border border-ink/[0.07] bg-white/95 px-3 py-3.5 backdrop-blur-xl min-[1152px]:gap-2.5",
        "shadow-[0_1px_2px_rgba(11,27,54,0.06),0_14px_30px_-14px_rgba(11,27,54,0.55)]",
        className,
      )}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-[10px] bg-brand/[0.08] ring-1 ring-brand/12 min-[1152px]:size-8">
        <Icon
          className="size-3.5 text-brand min-[1152px]:size-4"
          strokeWidth={1.9}
        />
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
 * One device, centred, showing one screen, with the outcomes floating around
 * it. Two earlier passes got this wrong in opposite directions — one stood a
 * second phone behind the first, the other parked the verification on a card
 * outside the glass — and both made the same mistake: they spent the frame on
 * furniture and pushed the product's own screen out of the place the whole
 * composition points at. The device now shows the verification, which is the
 * one surface COD King actually renders, and everything else in the scene is
 * an annotation on it.
 *
 * Depth is bought with light rather than with rotation. A rotated layer is
 * rasterised flat and resampled, which softens every glyph on the screen —
 * and the screen is the entire argument. Layered contact shadows, the key
 * light behind the device and the drop shadows on the chips do the same job
 * and cost nothing in sharpness.
 *
 * The stage box is sized from the device it has to hold at each breakpoint,
 * and everything inside is positioned as a percentage of it, so the
 * composition survives every column width instead of being tuned for one. The
 * chips are the first thing to go as the column narrows: below `lg` there is
 * no room for two columns of annotation beside a phone, and a chip crushed
 * against the frame argues against the craft it is meant to demonstrate.
 *
 * Nothing here fades in — see `Hero` for why the first screen must never
 * depend on JavaScript to be visible. The only motion is the chips' slow
 * float and the verification sequence, both removed under reduced motion.
 */
export function HeroStage() {
  return (
    <div className="relative w-full">
      <div className="relative aspect-[1/1.58] w-full sm:aspect-[1/1.1] lg:aspect-[1/1.02]">
        {/*
          The device, and the shadows it casts.

          The shadows are children of the device's own box rather than of the
          stage, so they are expressed relative to the thing casting them and
          stay correct at every width and position. Pinned to the stage they
          were right at exactly one breakpoint and sat well to the left of the
          phone at the others — a device casting a shadow next to itself is
          the clearest tell that a scene was assembled rather than lit.
        */}
        {/*
          The device takes 46% of the stage, the two columns of annotation 26%
          each — two percent of which hangs past the edge of the stage — and
          what is left is the three percent of clearance on each side that the
          connectors run in. Those numbers are one decision and have to be read
          together, because they have to sum to a hundred: the device, the two
          boxes and the two arrows are competing for one row of width, and
          nothing here can grow without something beside it being named as what
          paid for it.

          The device gave up four points of that width when the boxes grew and
          the connectors first appeared, and has now taken two of them back —
          48% to 44% to 46% — at the review's note that it had come out too
          small. What paid for the two points is the outward hang on the boxes,
          which went from one percent to two: the columns move further into the
          margin instead of further into the middle, so the device gains its
          width from outside the composition rather than out of the clearance
          the arrows need. The gap is three percent before and after.

          It is still unambiguously the subject, and more so than before: it is
          the only object in the frame that runs the full height of the stage,
          and it is comfortably wider than a box and a half beside it.

          Nothing below `lg` changes. The chips are not drawn there, so there
          is no clearance to find and no reason to make the device smaller on
          the viewport where it is the only thing in the scene.
        */}
        <div
          className={cn(
            "absolute bottom-[1%] left-1/2 w-[76%] -translate-x-1/2",
            "sm:bottom-[2%] sm:w-[52%]",
            "lg:w-[46%]",
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

          <Iphone screenWidth={320}>
            <VerifyScreen />
          </Iphone>
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
