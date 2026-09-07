"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import type { PricingRegion } from "@/types";

interface PricingRegionSelectProps {
  readonly label: string;
  readonly regions: readonly PricingRegion[];
  readonly defaultRegion: string;
}

/**
 * The country the prices beside it are quoted for.
 *
 * A native `select` rather than a listbox built out of divs: it is one field
 * with one job, and the platform control already gives it a keyboard, a
 * screen-reader announcement and a picker that behaves the way the merchant's
 * phone expects. The chevron is drawn over it because the appearance is
 * stripped to let the field carry the site's own border and type.
 *
 * The plans are priced for India and quoted in rupees, so today the list is
 * one entry. It is still a real control rather than a label styled to look
 * like one — the day a second market is priced, it is a row in
 * `pricingMarket.regions` and nothing here changes.
 */
export function PricingRegionSelect({
  label,
  regions,
  defaultRegion,
}: PricingRegionSelectProps) {
  const id = useId();
  const [region, setRegion] = useState(defaultRegion);

  return (
    <div className="w-full sm:w-[15rem]">
      <label
        htmlFor={id}
        className="block text-[12px] font-medium text-muted-foreground"
      >
        {label}
      </label>

      <div className="relative mt-1.5">
        <select
          id={id}
          value={region}
          onChange={(event) => setRegion(event.target.value)}
          className="w-full appearance-none rounded-xl border border-border bg-background py-2 pr-9 pl-3 text-[13.5px] text-ink outline-none focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/25"
        >
          {regions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
