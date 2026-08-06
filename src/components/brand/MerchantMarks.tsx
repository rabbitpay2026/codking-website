import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The merchant logo wall.
 *
 * IMPORTANT — these are original lockups built for this page, not the
 * merchants' registered trademarks. Every one should be swapped for the
 * store's own supplied artwork before this page ships; a logo wall is a claim
 * about other people's brands, and the version that goes live has to be the
 * version they handed over.
 *
 * Until then this is the honest middle: a real mark and a real wordmark, set
 * the way a logo wall actually sets them — one monochrome tint, one optical
 * height, one rhythm — rather than a row of plain names, which reads as a
 * placeholder no matter how carefully it is typeset.
 *
 * Each lockup is a glyph plus real text rather than an outlined wordmark, so
 * the row stays sharp at any density, re-tints with the section it sits in,
 * and remains selectable and translatable. The glyphs are `aria-hidden`; the
 * name beside them is the accessible content.
 */

interface MerchantMarkProps extends WithClassName {
  readonly name: string;
}

/** The shell every lockup shares, so the wall has one optical height. */
function Lockup({
  glyph,
  children,
  className,
}: {
  readonly glyph: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap",
        className,
      )}
    >
      <span aria-hidden className="shrink-0">
        {glyph}
      </span>
      {children}
    </span>
  );
}

/**
 * Wordmark only — which is also how the real brand is set. Inventing a glyph
 * for a company that has never had one is the fastest way to make a logo wall
 * look fabricated.
 */
function CasioMark({ className }: WithClassName) {
  return (
    <span
      className={cn(
        "text-[1.12em] leading-none font-extrabold tracking-[0.01em] whitespace-nowrap italic",
        className,
      )}
    >
      CASIO
    </span>
  );
}

function HimalayaMark({ className }: WithClassName) {
  return (
    <Lockup
      className={className}
      glyph={
        <svg viewBox="0 0 32 32" className="size-[1.45em]">
          {/* Two leaves meeting at a stem — the shape their mark is built on. */}
          <path
            d="M16 29c-.6-8.4 2.4-14.6 9.6-18.6.9 9.3-2.4 15.7-9.6 18.6Z"
            className="fill-current"
          />
          <path
            d="M16 29c.5-7.2-2.1-12.5-8.2-16 -.8 8 2 13.5 8.2 16Z"
            className="fill-current opacity-55"
          />
          <path
            d="M16 30V19"
            className="stroke-current"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      }
    >
      <span className="flex flex-col leading-none">
        <span className="text-[1em] font-semibold tracking-[0.07em]">
          HIMALAYA
        </span>
        <span className="mt-[0.3em] text-[0.4em] font-semibold tracking-[0.24em] opacity-65">
          SINCE 1930
        </span>
      </span>
    </Lockup>
  );
}

function SlobbermanMark({ className }: WithClassName) {
  return (
    <Lockup
      className={className}
      glyph={
        <svg viewBox="0 0 32 32" className="size-[1.5em]">
          <ellipse
            cx="16"
            cy="21.5"
            rx="6.6"
            ry="5.6"
            className="fill-current"
          />
          <ellipse
            cx="7.6"
            cy="12.6"
            rx="3"
            ry="4.1"
            className="fill-current"
            transform="rotate(-20 7.6 12.6)"
          />
          <ellipse
            cx="24.4"
            cy="12.6"
            rx="3"
            ry="4.1"
            className="fill-current"
            transform="rotate(20 24.4 12.6)"
          />
          <ellipse
            cx="13"
            cy="7.4"
            rx="2.9"
            ry="3.8"
            className="fill-current"
            transform="rotate(-8 13 7.4)"
          />
          <ellipse
            cx="19"
            cy="7.4"
            rx="2.9"
            ry="3.8"
            className="fill-current"
            transform="rotate(8 19 7.4)"
          />
        </svg>
      }
    >
      <span className="text-[1.02em] leading-none font-bold tracking-[-0.01em]">
        Slobberman
      </span>
    </Lockup>
  );
}

/** Wordmark and descriptor, stacked — the standard cookware-brand lockup. */
function VinodMark({ className }: WithClassName) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="text-[1.1em] font-bold tracking-[0.08em] whitespace-nowrap">
        VINOD
      </span>
      <span className="mt-[0.3em] text-[0.4em] font-semibold tracking-[0.3em] whitespace-nowrap opacity-65">
        COOKWARE
      </span>
    </span>
  );
}

const marks: Record<string, (props: WithClassName) => React.ReactElement> = {
  casio: CasioMark,
  himalaya: HimalayaMark,
  slobberman: SlobbermanMark,
  vinod: VinodMark,
};

/**
 * One merchant, as a logo.
 *
 * Falls back to the store's name set as a wordmark when no lockup exists, so
 * adding a merchant to the content file is never blocked on artwork and the
 * wall degrades to the treatment it had before rather than to a gap.
 */
export function MerchantMark({
  id,
  name,
  className,
}: MerchantMarkProps & {
  readonly id: string;
}) {
  const Mark = marks[id];

  if (!Mark) {
    return (
      <span
        className={cn(
          "text-[1em] leading-none font-semibold tracking-tight whitespace-nowrap",
          className,
        )}
      >
        {name}
      </span>
    );
  }

  return <Mark className={className} />;
}
