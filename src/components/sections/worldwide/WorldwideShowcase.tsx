"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import { Globe2 } from "lucide-react";

import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import {
  Globe,
  type GlobeArc,
  type GlobeMarker,
} from "@/components/ui/cobe-globe";
import { countries, type Country } from "@/components/sections/worldwide/data";
import { CountryFlag } from "@/components/sections/worldwide/flags";

/**
 * The globe's markers, derived from the country list rather than typed again.
 *
 * This is the mapping the section is built on: one record per country, holding
 * the name, the coordinates and — through `CountryFlag` — the artwork the rows
 * on the right already use. The globe therefore cannot mark a country the list
 * does not name, cannot miss one it does, and cannot show different artwork for
 * the same place. Adding a market to `data.ts` puts it on the sphere and in the
 * list in one edit.
 *
 * The label is the row's own furniture at a smaller size: the project's flag
 * component, then the country's name. No emoji, and no second set of artwork.
 */
const GLOBE_MARKERS: readonly GlobeMarker[] = countries.map((country) => ({
  id: country.id,
  lat: country.lat,
  lng: country.lng,
  label: (
    <>
      <CountryFlag country={country.id} className="h-3.5 w-5" />
      <span className="text-[11.5px] leading-none font-semibold text-ink/80">
        {country.name}
      </span>
    </>
  ),
}));

/**
 * The arcs, and why there are four of them.
 *
 * Every one runs from India, which is where the product's cash-on-delivery
 * volume actually is, out to one market in each of the other regions this
 * section claims — the Gulf, South-East Asia, Europe and North America. That
 * is the sentence in the heading, drawn.
 *
 * Four rather than the forty-five that ten markers could support. Every pair
 * joined is another line across the sphere, and a globe with every pair joined
 * is a ball of wool: these are here to say "these regions are connected", and
 * four say it where forty-five say nothing.
 */
const GLOBE_ARCS: readonly GlobeArc[] = [
  { from: "india", to: "united-arab-emirates" },
  { from: "india", to: "philippines" },
  { from: "india", to: "spain" },
  { from: "india", to: "united-states" },
];

interface WorldwideShowcaseProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  /**
   * How many countries the product is live in, from the proof repository.
   *
   * Passed in rather than read here because this is a client component and
   * that repository is server-side — and passed in at all rather than typed
   * into the highlight, because §11.1 allows the figure exactly one home. The
   * band above this section prints the same number; neither can drift now.
   *
   * Nullable, because the repository models an unverified count as `null`. The
   * highlight then drops out rather than printing a placeholder, which is the
   * same rule the platform band above applies to the same figure (§5.1 #3) —
   * this section must not be the one place on the page that claims a number
   * nobody has confirmed.
   */
  readonly countriesServed: number | null;
}

function CountryRow({
  country,
  active,
  wide,
  onActivate,
}: {
  readonly country: Country;
  readonly active: boolean;
  /** Runs the full width of the grid — see `WorldwideShowcase` for when. */
  readonly wide: boolean;
  readonly onActivate: () => void;
}) {
  return (
    <li className={cn(wide && "sm:col-span-2")}>
      <button
        type="button"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className={cn(
          "group flex h-full w-full items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          active
            ? "border-brand/20 bg-brand-soft/80 shadow-[0_8px_24px_-16px_rgba(37,99,235,0.35)]"
            : "border-border/80 bg-white/80 hover:border-brand/15 hover:bg-sky-50/80 hover:shadow-[0_8px_24px_-18px_rgba(37,99,235,0.16)]",
        )}
      >
        <span
          className={cn(
            "shrink-0 transition-transform duration-300",
            active ? "scale-110" : "group-hover:scale-105",
          )}
        >
          <CountryFlag country={country.id} className="h-4 w-5" />
        </span>

        {/*
          The name in full, wrapping rather than truncating.

          It used to be a single `truncate`d line, and at this measure that is
          not a safety net — it is the normal case: "United Arab Emirates" read
          as "United Ar…" on every viewport the section is drawn at, which
          turns a list of markets into a list of guesses. Wrapping is the right
          failure mode for a proper noun, and the row is `h-full` inside a grid
          with equal rows, so a two-line name makes every row in the set taller
          together instead of breaking the grid.
        */}
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] leading-tight font-semibold text-balance text-foreground">
            {country.name}
          </span>
        </span>

        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.75 text-[9.5px] font-semibold tracking-[0.1em] uppercase transition-colors",
            active
              ? "border-brand/20 bg-white text-brand"
              : "border-border bg-sky-50 text-muted-foreground group-hover:border-brand/10 group-hover:text-brand",
          )}
        >
          Supported
        </span>
      </button>
    </li>
  );
}

function HighlightRow({
  countriesServed,
}: {
  readonly countriesServed: number;
}) {
  return (
    <div className="rounded-[1.35rem] border border-brand/15 bg-gradient-to-r from-white via-sky-50 to-brand-soft/70 p-3.5 shadow-[0_12px_30px_-24px_rgba(37,99,235,0.35)]">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand ring-1 ring-brand/10">
          <Globe2 className="size-4.5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[1.15rem] font-semibold tracking-[-0.03em] text-ink tabular-nums sm:text-[1.25rem]">
              {countriesServed}+
            </span>
            <span className="text-sm font-semibold text-foreground">
              Countries
            </span>
          </div>
          <div className="mt-0.5 text-[12px] font-medium whitespace-nowrap text-muted-foreground">
            Growing Every Day
          </div>
        </div>

        {/*
          `shrink-0`, or the flex row steals the badge's width from the caption
          beside it and "Growing every month" breaks over two lines on a phone
          — the one width where there is least room to spare for a second line.
        */}
        <span className="shrink-0 rounded-full border border-brand/20 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] whitespace-nowrap text-brand uppercase">
          Global scale
        </span>
      </div>
    </div>
  );
}

export function WorldwideShowcase({
  className,
  countriesServed,
  ...props
}: WorldwideShowcaseProps) {
  const [activeCountryId, setActiveCountryId] = useState<Country["id"] | null>(
    null,
  );

  return (
    <div
      {...props}
      className={cn(
        "grid items-stretch gap-4 lg:grid-cols-[0.94fr_1.06fr] lg:gap-5",
        className,
      )}
    >
      <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-brand/15 bg-gradient-to-b from-white via-white to-sky-50 p-6 shadow-[0_18px_44px_-28px_rgba(37,99,235,0.24)] sm:p-7">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.92),transparent_45%,rgba(37,99,235,0.08)_100%)]"
        />
        {/*
          Heading at the top, globe centred in what is left.

          The column used to centre its whole content, which on a card stretched
          to the taller neighbour's height pushed the heading down the panel and
          left an equal band of nothing above it and below the globe. Pinning
          the heading and giving the sphere the remaining space is what turns
          that slack into margin around the visual instead of a gap over the
          words.
        */}
        <div className="relative flex h-full flex-col">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                Operating regions
              </p>
              <h3 className="mt-2 text-[1rem] font-semibold tracking-[-0.02em] text-foreground sm:text-[1.05rem]">
                Every market on this list, where it actually is
              </h3>
            </div>
            <span className="hidden rounded-full border border-brand/15 bg-brand-soft px-3 py-1 text-[11px] font-semibold tracking-[0.14em] whitespace-nowrap text-brand uppercase sm:inline-flex">
              Live footprint
            </span>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center py-2">
            <Globe
              markers={GLOBE_MARKERS}
              arcs={GLOBE_ARCS}
              activeId={activeCountryId}
              label={`A globe marking the countries ${siteConfig.name} operates in, including ${countries.map((country) => country.name).join(", ")}.`}
              className="max-w-[27rem]"
            />
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col rounded-[1.75rem] border border-brand/15 bg-white p-5 shadow-[0_18px_48px_-32px_rgba(37,99,235,0.22)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              Supported countries
            </p>
            <h3 className="mt-2 text-[1rem] font-semibold tracking-[-0.02em] text-foreground sm:text-[1.05rem]">
              Country-level proof, not generic global copy
            </h3>
          </div>
          <span className="rounded-full border border-brand/15 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-brand uppercase sm:text-[11px]">
            Shopify ready
          </span>
        </div>

        <ul
          className="mt-4 grid auto-rows-fr gap-2 sm:grid-cols-2"
          onMouseLeave={() => setActiveCountryId(null)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setActiveCountryId(null);
            }
          }}
        >
          {/*
            An odd number of markets leaves the last one alone in a two-column
            row with a hole beside it, which reads as a market that failed to
            load rather than as the end of a list. The last row is given the
            full width in that case, so the grid closes on a deliberate wide
            row instead.

            Derived from the length rather than hard-coded onto Tunisia,
            because the list grows: the sixteenth market added will make the
            count even and the rule will switch itself off.
          */}
          {countries.map((country, index) => (
            <CountryRow
              key={country.id}
              country={country}
              active={activeCountryId === country.id}
              wide={
                countries.length % 2 === 1 && index === countries.length - 1
              }
              onActivate={() => setActiveCountryId(country.id)}
            />
          ))}
        </ul>

        {/*
          The country highlight closes the column, and nothing follows it.

          A "Performance" card used to sit here carrying countries, merchants,
          orders and uptime. All four are the platform band directly under the
          trust strip — the same four figures, in the same order — so this was
          the second print of a set a visitor had already read, and it was
          printing them from a literal rather than from the repository the band
          reads. Removing it takes out the duplication and the second copy of
          the numbers at the same time.
        */}
        {/*
          `mt-auto` rather than a fixed margin, and it is what fixes the hole
          this column used to end on. The two cards are stretched to a shared
          height by the grid, so whichever is shorter has slack at the bottom —
          and the slack was landing *below* the highlight, which left it
          floating in the middle of nothing. Pushed down instead, it closes the
          column: the grid of markets sits under the heading, the count sits on
          the floor, and the space between them is the give.
        */}
        {countriesServed ? (
          <div className="mt-auto pt-4">
            <HighlightRow countriesServed={countriesServed} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
