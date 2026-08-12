"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import { ChevronRight, Globe2 } from "lucide-react";

import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

import { Globe } from "@/components/sections/worldwide/Globe";
import {
  countries,
  type Country,
  worldStats,
} from "@/components/sections/worldwide/data";
import { CountryFlag } from "@/components/sections/worldwide/flags";

type WorldwideShowcaseProps = ComponentPropsWithoutRef<"div">;

function StatCard({
  value,
  label,
  decimalPlaces,
  suffix,
}: (typeof worldStats)[number]) {
  return (
    <div className="rounded-2xl border border-brand/10 bg-gradient-to-b from-white to-sky-50 px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-18px_rgba(37,99,235,0.22)]">
      <div className="text-[1.25rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums sm:text-[1.35rem]">
        <NumberTicker value={value} decimalPlaces={decimalPlaces ?? 0} />
        {suffix}
      </div>
      <div className="mt-1.5 text-[11.5px] font-medium text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function CountryRow({
  country,
  active,
  onActivate,
}: {
  readonly country: Country;
  readonly active: boolean;
  readonly onActivate: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
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
          <CountryFlag country={country.name} className="h-4 w-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-foreground sm:text-[14px]">
            {country.name}
          </span>
        </span>

        <span
          className={cn(
            "rounded-full border px-2.5 py-0.75 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors sm:text-[11px]",
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

function HighlightRow() {
  return (
    <div className="rounded-[1.35rem] border border-brand/15 bg-gradient-to-r from-white via-sky-50 to-brand-soft/70 p-3.5 shadow-[0_12px_30px_-24px_rgba(37,99,235,0.35)]">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand ring-1 ring-brand/10">
          <Globe2 className="size-4.5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[1.15rem] font-semibold tracking-[-0.03em] text-ink sm:text-[1.25rem]">
              100+
            </span>
            <span className="text-sm font-semibold text-foreground">
              Countries
            </span>
          </div>
          <div className="mt-0.5 text-[12px] font-medium text-muted-foreground">
            Growing every month
          </div>
        </div>

        <span className="rounded-full border border-brand/20 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-brand uppercase sm:text-[11px]">
          Global scale
        </span>
      </div>
    </div>
  );
}

export function WorldwideShowcase({
  className,
  ...props
}: WorldwideShowcaseProps) {
  const [activeCountryId, setActiveCountryId] = useState<Country["id"] | null>(
    null,
  );

  return (
    <div
      {...props}
      className={cn(
        "grid items-stretch gap-4 lg:grid-cols-[0.96fr_1.04fr]",
        className,
      )}
    >
      <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-brand/15 bg-gradient-to-b from-white via-white to-sky-50 p-5 shadow-[0_18px_44px_-28px_rgba(37,99,235,0.24)] sm:p-6">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.92),transparent_45%,rgba(37,99,235,0.08)_100%)]"
        />
        <div className="relative flex h-full flex-col justify-center">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                Operating regions
              </p>
              <h3 className="mt-2 text-[1rem] font-semibold tracking-[-0.02em] text-foreground sm:text-[1.05rem]">
                A calm globe that reads as real coverage
              </h3>
            </div>
            <span className="hidden rounded-full border border-brand/15 bg-brand-soft px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase sm:inline-flex">
              Live footprint
            </span>
          </div>

          <Globe
            countries={countries}
            activeCountryId={activeCountryId}
            className="max-w-[18rem]"
          />
        </div>
      </div>

      <div className="h-full rounded-[1.75rem] border border-brand/15 bg-white p-4 shadow-[0_18px_48px_-32px_rgba(37,99,235,0.22)] sm:p-5">
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
          className="mt-4 grid gap-2 sm:grid-cols-2"
          onMouseLeave={() => setActiveCountryId(null)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setActiveCountryId(null);
            }
          }}
        >
          {countries.map((country) => (
            <CountryRow
              key={country.id}
              country={country}
              active={activeCountryId === country.id}
              onActivate={() => setActiveCountryId(country.id)}
            />
          ))}
        </ul>

        <div className="mt-3.5">
          <HighlightRow />
        </div>

        <div className="mt-3.5 rounded-[1.4rem] border border-border bg-gradient-to-b from-sky-50 to-white p-3.5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                Performance
              </p>
              <h4 className="mt-2 text-[0.92rem] font-semibold tracking-[-0.02em] text-foreground sm:text-sm">
                Compact metrics for a premium SaaS feel
              </h4>
            </div>
            <ChevronRight className="size-4 text-brand/50" />
          </div>

          <dl className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {worldStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
