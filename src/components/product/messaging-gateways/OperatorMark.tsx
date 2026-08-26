import Image from "next/image";

import { cn } from "@/lib/utils";

import type { SmsOperator } from "@/types";

/**
 * The size of the area a mark is drawn in, not the size of the mark.
 *
 * Every operator card reserves the same box and each logo is fitted inside it,
 * which is what lets a 320x41 wordmark and an 84x96 icon sit in one grid
 * without either being cropped or stretched. The cap is on both axes: height
 * alone would let a wide wordmark run into its neighbour, width alone would
 * let a tall icon push the card's name down a line.
 *
 * `logoClass` never sets a width and a height together — only maxima — so an
 * operator's own proportions survive contact with the grid. A mark smaller
 * than its box is drawn at its native size rather than blown up: an upscaled
 * 31px favicon is a blurred logo, and a blurred logo reads as a broken one.
 */
type MarkSize = "sm" | "md";

const boxClass: Record<MarkSize, string> = {
  sm: "h-8 max-w-[4.5rem]",
  md: "h-10 max-w-[7.5rem]",
};

/*
  `max-w-full` rather than a second pixel cap: the width ceiling belongs to the
  box, and an image capped independently of the box it sits in is an image that
  can leave it. A mark wider than its box shrinks to fit and takes its height
  down with it, which is a smaller logo — never a cropped or squashed one.
*/
const logoClass: Record<MarkSize, string> = {
  sm: "max-h-6 max-w-full",
  md: "max-h-8 max-w-full",
};

const monogramClass: Record<MarkSize, string> = {
  sm: "size-7 rounded-lg text-[9px]",
  md: "size-9 rounded-xl text-[11px]",
};

interface OperatorMarkProps {
  readonly operator: SmsOperator;
  readonly size?: MarkSize;
  readonly className?: string;
}

/**
 * One operator's own artwork, in a box every other operator gets too.
 *
 * The monogram is the honest failure state rather than a fallback nobody
 * intended: four of the fifteen operators publish no reachable brand file, and
 * drawing initials says "this mark has not arrived" where a recreated logo
 * would say "this is their mark" untruthfully.
 *
 * `alt` is empty, and deliberately. The operator's name is set as text
 * directly beneath every mark this component draws, so a filled `alt` makes a
 * screen reader announce the same brand twice in a row.
 */
export function OperatorMark({
  operator,
  size = "md",
  className,
}: OperatorMarkProps) {
  return (
    <span
      className={cn(
        "mx-auto grid w-full shrink-0 place-items-center",
        boxClass[size],
        className,
      )}
    >
      {operator.logo ? (
        <Image
          src={operator.logo.src}
          alt=""
          width={operator.logo.width}
          height={operator.logo.height}
          className={cn(
            "h-auto w-auto object-contain select-none",
            logoClass[size],
          )}
        />
      ) : (
        <span
          aria-hidden
          className={cn(
            "grid place-items-center border border-border bg-sky-50 font-bold tracking-[0.04em] text-ink/40",
            monogramClass[size],
          )}
        >
          {operator.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}
