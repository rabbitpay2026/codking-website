import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * What a failed cash order actually looks like.
 *
 * One drawing, not a stack of icons: an opened parcel with the money already
 * out of it, the delivery that broke on the way, the verification that was
 * never there, and the return leg that costs as much as the trip out. Those are
 * the four costs the cards beside it name, in the order the cards name them —
 * so the scene is a second reading of the same argument rather than decoration
 * placed next to it.
 *
 * Drawn rather than illustrated. Flat strokes at one weight, two accents and no
 * character work: a cartoon here would make the loss feel hypothetical, and the
 * whole section depends on it feeling like something that happened last week.
 *
 * A single inline SVG, so it is one DOM subtree with no network request, scales
 * losslessly, and re-tints from the same tokens as everything around it. The
 * only motion is two long, offset floats — slow enough that a visitor notices
 * them only if they stop and look, and removed entirely under reduced motion by
 * the global rule.
 *
 * `aria-hidden`: every claim it makes is already stated in the cards beside it,
 * so announcing it would repeat the section to a screen reader.
 */
export function LossScene({ className }: WithClassName) {
  return (
    <div className={cn("relative mx-auto w-full", className)}>
      {/* The light the scene sits in — the same cool body used page-wide. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(58% 54% at 52% 46%, color-mix(in oklab, var(--brand) 9%, transparent), transparent 72%)",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 400 330"
        className="relative w-full"
        fill="none"
      >
        {/* The floor the parcel sits on, so it is placed rather than floating. */}
        <ellipse cx="200" cy="286" rx="94" ry="13" fill="rgba(11,27,54,0.07)" />

        <g className="animate-float [animation-duration:8s]">
          {/* Open flaps, folded outward. */}
          <path
            d="M118 154 84 128l82-24 34 26Z"
            fill="#fff"
            stroke="rgba(11,27,54,0.22)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M282 154 316 128l-82-24-34 26Z"
            fill="#fff"
            stroke="rgba(11,27,54,0.22)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* The opening, and the two faces of the parcel. */}
          <path
            d="M118 154 200 128l82 26-82 26Z"
            fill="#f2f5fa"
            stroke="rgba(11,27,54,0.28)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M118 154v76l82 30v-80Z"
            fill="#fbfcfe"
            stroke="rgba(11,27,54,0.28)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M282 154v76l-82 30v-80Z"
            fill="#f5f7fb"
            stroke="rgba(11,27,54,0.28)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Tape seam, so the box reads as sealed and then opened. */}
          <path
            d="M200 180v80"
            stroke="rgba(11,27,54,0.14)"
            strokeWidth="2"
            strokeDasharray="5 6"
          />
        </g>

        {/*
          The money, already out and going the other way. Offset from the
          parcel's float so the two never move in lockstep, which is what would
          make the whole scene read as one sliding image.
        */}
        <g className="animate-float [animation-duration:6.5s]">
          <g
            transform="rotate(-18 300 96)"
            stroke="var(--brand)"
            strokeWidth="2"
            opacity="0.55"
          >
            <rect
              x="272"
              y="76"
              width="56"
              height="34"
              rx="5"
              fill="#fff"
              opacity="0.95"
            />
            <circle cx="300" cy="93" r="7.5" />
            <path d="M282 84h6M312 102h6" strokeLinecap="round" />
          </g>
          <g
            transform="rotate(12 336 154)"
            stroke="var(--brand)"
            strokeWidth="2"
            opacity="0.4"
          >
            <rect x="314" y="138" width="44" height="27" rx="4" fill="#fff" />
            <circle cx="336" cy="151.5" r="6" />
          </g>
          <g
            transform="rotate(-8 250 56)"
            stroke="var(--brand)"
            strokeWidth="2"
            opacity="0.28"
          >
            <rect x="232" y="44" width="36" height="23" rx="4" fill="#fff" />
          </g>
        </g>

        {/*
          The delivery that broke. A dashed run out of the parcel, a gap where
          it failed, and an arrowhead that never lands on anything.
        */}
        <path
          d="M262 214c26-6 44-18 54-34"
          stroke="rgba(11,27,54,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 7"
        />
        <path
          d="M340 168c4-8 6-14 6-20"
          stroke="var(--brand-violet)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 7"
          opacity="0.4"
        />
        <path
          d="m324 176 8 6-9 6"
          stroke="var(--brand-violet)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* The verification that was never on. Shield, struck through. */}
        <g transform="translate(48 176)">
          <path
            d="M30 4 56 14v22c0 16-11 27-26 33C15 63 4 52 4 36V14Z"
            fill="#fff"
            stroke="var(--brand-violet)"
            strokeWidth="2"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <path
            d="M8 62 52 8"
            stroke="var(--brand-violet)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>

        {/* The return leg — the trip you pay for twice. */}
        <g transform="translate(238 250)">
          <path
            d="M4 26C4 10 20 2 42 2s38 8 38 22"
            stroke="var(--brand-violet)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="m-3 16 7 11 11-6"
            stroke="var(--brand-violet)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
        </g>
      </svg>
    </div>
  );
}
