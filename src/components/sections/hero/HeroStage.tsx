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
  /** Position within the stage. Only rendered from `lg` up. */
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
    className: "top-[6%] left-0",
    delay: "0s",
  },
  {
    id: "advance",
    icon: HandCoins,
    label: "Collect advance",
    className: "top-[38%] -left-[1%]",
    delay: "-2.4s",
  },
  {
    id: "cod-fees",
    icon: IndianRupee,
    label: "Charge COD fees",
    className: "top-[70%] left-[1%]",
    delay: "-4.8s",
  },
  {
    id: "prepaid",
    icon: TrendingUp,
    label: "Convert to prepaid",
    className: "top-[16%] right-0",
    delay: "-1.2s",
  },
  {
    id: "rto",
    icon: Undo2,
    label: "Reduce RTO",
    className: "top-[48%] -right-[1%]",
    delay: "-3.6s",
  },
  {
    id: "trust",
    icon: BadgeCheck,
    label: "Build trust",
    className: "top-[78%] right-[1%]",
    delay: "-6s",
  },
];

/**
 * One outcome, floating beside the device.
 *
 * Drawn as a single line — mark and label, nothing else. An earlier pass gave
 * each of these a title and a supporting sentence, and six paragraphs orbiting
 * a phone is not a composition, it is a second article competing with the one
 * a visitor is trying to read. A chip has to be legible in the quarter second
 * the eye spends on it on its way to the product.
 *
 * Sized to be read rather than merely noticed. The review's note on this scene
 * was that the blocks around the device were too small and too faint to
 * register, and every value here answers that: 24% of the stage instead of
 * 21%, an 11.5px label instead of a 10px one, near-solid white instead of 80%
 * glass, and a drop shadow deep enough to lift the chip off the field rather
 * than tint the pixels under it.
 *
 * The one piece of colour is the mark. A chip is a *result* the product
 * produces, so tinting its icon in brand is what separates these from the
 * neutral furniture elsewhere in the hero — and it does the work of making
 * them visible without any of them getting louder in size or weight.
 *
 * They still lose to the device, and are meant to. The phone is three times
 * the width of a chip, is the only thing in the frame in full colour and is
 * the only thing that moves through states; these annotate it.
 *
 * Hidden from assistive technology: every one of these restates a capability
 * the checklist beside it already lists in full, and a screen reader should
 * hear that list once.
 */
function Chip({ icon: Icon, label, className, delay }: FloatingChip) {
  return (
    <div
      aria-hidden
      style={{ animationDelay: delay }}
      className={cn(
        "absolute z-30 w-[24%] animate-float",
        "flex items-center gap-2.5 rounded-[14px] border border-ink/[0.07] bg-white/95 px-3 py-2.5 backdrop-blur-xl",
        "shadow-[0_1px_2px_rgba(11,27,54,0.06),0_14px_30px_-14px_rgba(11,27,54,0.55)]",
        className,
      )}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-brand/[0.08] ring-1 ring-brand/12">
        <Icon className="size-3.5 text-brand" strokeWidth={1.9} />
      </span>
      <span className="text-[11.5px] leading-[1.3] font-semibold text-balance text-ink/85">
        {label}
      </span>
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
          The device keeps its full 48% of the stage. It is the subject, and
          the two columns of annotation have to be found room around it rather
          than taken out of it — so the chips are sized at 24% instead, which
          leaves 2% of the stage as clearance on each side at every width the
          scene is drawn at. That is 11px at `lg`, where the column is
          narrowest, and it widens from there.
        */}
        <div
          className={cn(
            "absolute bottom-[1%] left-1/2 w-[76%] -translate-x-1/2",
            "sm:bottom-[2%] sm:w-[52%]",
            "lg:w-[48%]",
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
