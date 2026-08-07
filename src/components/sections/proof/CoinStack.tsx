import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * One coin, drawn as a cylinder.
 *
 * The wall is a single closed path: down the left edge, along the lower half
 * of the bottom ellipse, up the right edge, then back along the lower half of
 * the top ellipse. That last arc is what makes it read as a solid object
 * rather than a rectangle with a lid — it is the near rim of the coin, the
 * part you would actually see looking slightly down at one.
 *
 * Coins are drawn bottom-first, and each sits exactly one thickness above the
 * one below, so an upper coin's bottom arc lands on the lower coin's top face
 * and hides all of it but the rim. That is how a real stack presents itself:
 * you see edges, not faces.
 */
function Coin({
  cx,
  cy,
  rx,
  ry,
  thickness,
}: {
  readonly cx: number;
  readonly cy: number;
  readonly rx: number;
  readonly ry: number;
  readonly thickness: number;
}) {
  const left = cx - rx;
  const right = cx + rx;
  const base = cy + thickness;

  return (
    <>
      <path
        d={`M${left},${cy} L${left},${base} A${rx},${ry} 0 0 0 ${right},${base} L${right},${cy} A${rx},${ry} 0 0 1 ${left},${cy} Z`}
        fill="url(#coin-wall)"
      />
      {/* The seam against the coin below. Without it the stack is one tall
          cylinder with a gradient down it. */}
      <path
        d={`M${left},${base} A${rx},${ry} 0 0 0 ${right},${base}`}
        fill="none"
        stroke="#8a6626"
        strokeOpacity={0.32}
        strokeWidth={0.75}
      />
    </>
  );
}

/**
 * The pricing column's illustration.
 *
 * A stack of coins, drawn rather than sourced, for the reason the blueprint
 * wants one at all: the column is three lines of text and a button, and it
 * needs one object to look at. What it does not need is a mascot. So the
 * geometry is honest — a real isometric projection, consistent light from the
 * upper left, gold desaturated far enough that it sits beside a neutral card
 * without becoming the loudest thing in the section.
 *
 * Everything is flat paths and two gradients. No filters, no raster, no font,
 * nothing to fetch: it costs a few hundred bytes of markup and is exact at any
 * size, which a PNG of a 3D render is not.
 *
 * Decorative. The heading beside it already says what it is, and "drawing of
 * some coins" is not information anyone needs announced.
 */
export function CoinStack({ className }: WithClassName) {
  return (
    /*
      No intrinsic size in the base class, and the drawing anchors to the
      bottom right of whatever box it is given. The pricing pane inherits its
      height from the two panes beside it and the illustration is what absorbs
      the leftover, so the caller hands it a box rather than a size: `meet`
      fits the coins inside it whichever dimension runs out first, and
      `xMaxYMax` keeps them sitting in the card's bottom corner instead of
      drifting to the middle of the space when the box is the wrong shape.
    */
    <svg
      viewBox="0 0 200 150"
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden
      className={cn("block", className)}
    >
      <defs>
        {/*
          The cylinder. Light from the upper left, a specular band just left of
          centre, and the right edge falling into shade — the gradient is doing
          all of the three-dimensionality here, so its stops are placed where a
          curved metal surface actually turns, not spread evenly.
        */}
        <linearGradient id="coin-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a97e2e" />
          <stop offset="12%" stopColor="#d9bb78" />
          <stop offset="30%" stopColor="#f3e3bb" />
          <stop offset="46%" stopColor="#fcf4de" />
          <stop offset="62%" stopColor="#e9d19a" />
          <stop offset="82%" stopColor="#be9243" />
          <stop offset="100%" stopColor="#96702a" />
        </linearGradient>

        {/* The top face, lit from the same corner as the walls. */}
        <linearGradient id="coin-face" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#fef9ec" />
          <stop offset="45%" stopColor="#f2dfb0" />
          <stop offset="100%" stopColor="#dcbe7c" />
        </linearGradient>

        {/* Contact shadow. A drawn ellipse rather than a blur filter — one
            fewer thing for the compositor to do, and it never over-darkens. */}
        <radialGradient id="coin-shadow">
          <stop offset="0%" stopColor="#0b1b36" stopOpacity={0.16} />
          <stop offset="60%" stopColor="#0b1b36" stopOpacity={0.06} />
          <stop offset="100%" stopColor="#0b1b36" stopOpacity={0} />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="130" rx="82" ry="11" fill="url(#coin-shadow)" />

      {/* The tall stack, four coins, set behind and to the right. */}
      <Coin cx={118} cy={100} rx={40} ry={13} thickness={12.5} />
      <Coin cx={118} cy={87.5} rx={40} ry={13} thickness={12.5} />
      <Coin cx={118} cy={75} rx={40} ry={13} thickness={12.5} />
      <Coin cx={118} cy={62.5} rx={40} ry={13} thickness={12.5} />
      <ellipse cx="118" cy="62.5" rx="40" ry="13" fill="url(#coin-face)" />
      {/* The milled ring. One concentric line is all a coin needs to stop
          looking like a poker chip. */}
      <ellipse
        cx="118"
        cy="62.5"
        rx="31"
        ry="10"
        fill="none"
        stroke="#c39b4f"
        strokeOpacity={0.4}
        strokeWidth={0.9}
      />
      {/* Specular sweep across the near-left of the face. */}
      <path
        d="M85,58 A40,13 0 0 1 122,50.5"
        fill="none"
        stroke="#fffdf6"
        strokeOpacity={0.75}
        strokeWidth={1.6}
        strokeLinecap="round"
      />

      {/* The short stack, two coins, overlapping the tall one at the front so
          the pair reads as depth rather than as two objects on a line. */}
      <Coin cx={54} cy={104} rx={32} ry={10.5} thickness={11} />
      <Coin cx={54} cy={93} rx={32} ry={10.5} thickness={11} />
      <ellipse cx="54" cy="93" rx="32" ry="10.5" fill="url(#coin-face)" />
      <ellipse
        cx="54"
        cy="93"
        rx="24.5"
        ry="8"
        fill="none"
        stroke="#c39b4f"
        strokeOpacity={0.4}
        strokeWidth={0.9}
      />
      <path
        d="M28,89.5 A32,10.5 0 0 1 58,83.5"
        fill="none"
        stroke="#fffdf6"
        strokeOpacity={0.75}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
