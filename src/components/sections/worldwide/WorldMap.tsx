import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * Land, as inclusive column ranges per row on a 60 × 26 grid.
 *
 * The grid is equirectangular: column 0 is 180°W and column 59 is 174°E, row 0
 * is 80°N and row 25 is roughly 55°S. Antarctica is outside it on purpose —
 * nothing ships there, and including it costs a quarter of the frame.
 *
 * Ranges rather than a bitmap string because ranges are legible in review: a
 * coastline that has drifted is an obvious pair of numbers, where a wrong
 * character in a sixty-column string is not. Coarse by design — this reads as
 * a world map at a glance, which is all a coverage section needs it to do.
 */
const LAND: readonly (readonly (readonly [number, number])[])[] = [
  [
    [10, 18],
    [21, 27],
    [34, 46],
  ],
  [
    [9, 19],
    [21, 28],
    [32, 56],
  ],
  [
    [6, 20],
    [22, 28],
    [31, 58],
  ],
  [
    [5, 21],
    [23, 27],
    [31, 58],
  ],
  [
    [5, 22],
    [29, 58],
  ],
  [
    [8, 22],
    [29, 58],
  ],
  [
    [9, 22],
    [29, 57],
  ],
  [
    [10, 22],
    [29, 56],
  ],
  [
    [10, 21],
    [29, 55],
  ],
  [
    [11, 21],
    [28, 54],
  ],
  [
    [12, 20],
    [28, 37],
    [41, 53],
  ],
  [
    [13, 21],
    [27, 37],
    [41, 52],
  ],
  [
    [15, 22],
    [26, 37],
    [42, 51],
  ],
  [
    [16, 19],
    [21, 24],
    [26, 37],
    [45, 51],
  ],
  [
    [19, 26],
    [27, 36],
    [47, 52],
  ],
  [
    [19, 27],
    [28, 36],
    [47, 53],
  ],
  [
    [19, 28],
    [29, 36],
    [48, 56],
  ],
  [
    [20, 28],
    [29, 35],
    [49, 57],
  ],
  [
    [20, 28],
    [29, 35],
    [37, 37],
    [50, 57],
  ],
  [
    [21, 28],
    [29, 35],
    [37, 37],
    [49, 58],
  ],
  [
    [21, 27],
    [30, 35],
    [49, 58],
  ],
  [
    [22, 26],
    [30, 34],
    [50, 57],
  ],
  [
    [22, 25],
    [52, 55],
    [59, 59],
  ],
  [
    [22, 24],
    [58, 59],
  ],
  [[23, 24]],
  [[23, 24]],
];

const COLUMNS = 60;
const ROWS = 26;
/** Grid pitch in user units. The viewBox is derived from it, not guessed. */
const PITCH = 10;

const WIDTH = COLUMNS * PITCH;
const HEIGHT = ROWS * PITCH;

/**
 * Every dot as one path.
 *
 * A zero-length segment with a round cap paints a circle, so the whole
 * landmass — some five hundred dots — costs a single element instead of five
 * hundred. On a page that already carries two device mockups, that difference
 * is worth the one line of explanation.
 */
const DOTS = LAND.flatMap((ranges, row) =>
  ranges.flatMap(([from, to]) =>
    Array.from(
      { length: to - from + 1 },
      (_, index) =>
        `M${(from + index) * PITCH + PITCH / 2} ${row * PITCH + PITCH / 2}h0`,
    ),
  ),
).join("");

/**
 * The coverage map.
 *
 * Drawn rather than imaged: it re-tints with the brand, stays sharp at any
 * density and costs no network request.
 *
 * It carries no country markers, and that is a content decision rather than a
 * missing feature. Pins name specific markets, which is a claim — and the
 * content repository publishes a country *count*, not a country list. Until
 * one exists and is verified, the map says "worldwide" and lets the figure
 * beside it say the rest.
 *
 * Decorative, so it announces nothing: the reach figure next to it is real
 * text and is what assistive technology reads.
 */
export function WorldMap({ className }: WithClassName) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <path
        d={DOTS}
        className="stroke-brand/25"
        strokeWidth={PITCH * 0.62}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
