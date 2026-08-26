import { ChartNoAxesCombined } from "lucide-react";

import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * What the report holds, and nothing about what it says.
 *
 * This is the one panel on the site that must not carry a number. Every figure
 * this control shows belongs to the merchant reading the page, and an example
 * of one printed on the page that sells the report stops being an illustration
 * the moment somebody quotes it back — "the analytics page says RTO drops to
 * eleven percent" is a claim the product has never made (§10.1).
 *
 * So the panel is built from everything a report has *except* its figures: the
 * headings, the shape of the plot, the split between two series, the axis. A
 * visitor can read the whole layout of the screen off it and cannot read a
 * single result, which is exactly the trade this page needs — "what will I be
 * able to see" is a question about the screen, not about anybody's numbers.
 */
const ROWS: readonly { readonly id: string; readonly label: string }[] = [
  { id: "verified", label: "Verified vs unverified" },
  { id: "prepaid", label: "Prepaid share" },
  { id: "recovered", label: "Carts recovered" },
  { id: "rto", label: "RTO trend" },
];

/**
 * The heights of the trend columns, as fractions of the plot.
 *
 * A shape rather than a series. They are hand-set so the run reads as a chart
 * with some movement in it and resolves to nothing in particular — no trend
 * line, no direction to read off, and no final column that is conspicuously the
 * tallest or the shortest.
 */
const COLUMNS: readonly number[] = [
  0.42, 0.61, 0.5, 0.72, 0.55, 0.66, 0.48, 0.63, 0.57, 0.7, 0.52, 0.64,
];

/** The ranges the report can be read over. One is selected; none is a claim. */
const RANGES: readonly string[] = ["7d", "30d", "90d"];
const ACTIVE_RANGE = "30d";

/**
 * The reports screen, as the merchant sees it in the dashboard.
 *
 * Four headings, a split, a plot and the line that says where the figures come
 * from. It is deliberately the densest product scene on the site: this is the
 * one control whose entire promise is *density* — everything in one place —
 * and a sparse panel would be arguing the opposite of the page it opens.
 */
export function ReportPanel({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-ink/[0.07] bg-white",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 px-4 py-4 sm:px-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]">
          <ChartNoAxesCombined className="size-[18px] text-white" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[14px] leading-none font-semibold tracking-[-0.01em] text-ink">
            COD reports
          </span>
          <span className="mt-1.5 block text-[11.5px] leading-none text-ink/45">
            Every control, in one place
          </span>
        </span>

        {/* A range picker, because a report has one. No range is a claim. */}
        <span
          aria-hidden
          className="hidden shrink-0 items-center gap-0.5 rounded-lg bg-ink/[0.04] p-0.5 sm:inline-flex"
        >
          {RANGES.map((range) => (
            <span
              key={range}
              className={cn(
                "rounded-md px-2 py-1 text-[10px] leading-none font-bold tracking-[0.02em]",
                range === ACTIVE_RANGE
                  ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,27,54,0.08)]"
                  : "text-ink/40",
              )}
            >
              {range}
            </span>
          ))}
        </span>
      </div>

      <div aria-hidden className="h-px bg-ink/[0.07]" />

      <div className="px-4 py-4 sm:px-5">
        {/*
          The split. Two series in one bar, labelled by name and not by size —
          the widths are fixed at a ratio that is visibly neither half nor
          nine-tenths, so the bar reads as "two shares, tracked" rather than as
          a figure anybody could quote.
        */}
        <p className="text-[10px] leading-none font-bold tracking-[0.1em] text-ink/35 uppercase">
          Cash on delivery vs prepaid
        </p>

        <span
          aria-hidden
          className="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-ink/[0.06]"
        >
          <span className="h-full w-[62%] bg-brand/70" />
          <span className="h-full w-[38%] bg-brand-violet/45" />
        </span>

        <span className="mt-2.5 flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] leading-none text-ink/50">
            <span aria-hidden className="size-2 rounded-full bg-brand/70" />
            Cash on delivery
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] leading-none text-ink/50">
            <span
              aria-hidden
              className="size-2 rounded-full bg-brand-violet/45"
            />
            Prepaid
          </span>
        </span>

        {/* The plot. Texture, not data — see `COLUMNS`. */}
        <div className="mt-4 rounded-xl bg-ink/[0.02] px-3 pt-3 pb-2">
          <span
            aria-hidden
            className="relative flex h-20 items-end gap-1 border-b border-ink/[0.09]"
          >
            {/* Gridlines, so the plot reads as a chart rather than as bars. */}
            {[0.33, 0.66].map((line) => (
              <span
                key={line}
                className="absolute inset-x-0 h-px bg-ink/[0.05]"
                style={{ bottom: `${line * 100}%` }}
              />
            ))}

            {COLUMNS.map((height, index) => (
              <span
                key={index}
                className="relative flex-1 rounded-t-[2px] bg-brand/25"
                style={{ height: `${Math.round(height * 100)}%` }}
              />
            ))}
          </span>

          <span
            aria-hidden
            className="mt-1.5 flex justify-between text-[10px] leading-none font-medium text-ink/35"
          >
            <span>Week 1</span>
            <span>Week 4</span>
          </span>
        </div>

        {/* The report's own headings, as a list of what is tracked. */}
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {ROWS.map((row, index) => (
            <li
              key={row.id}
              className="rounded-lg border border-ink/[0.07] px-2.5 py-2"
            >
              <p className="truncate text-[11px] leading-none font-medium text-ink/55">
                {row.label}
              </p>
              <span
                aria-hidden
                className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]"
              >
                <span
                  className={cn(
                    "block h-full rounded-full",
                    index % 2 === 0 ? "bg-brand/70" : "bg-brand-violet/55",
                  )}
                  style={{ width: index % 2 === 0 ? "68%" : "52%" }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-ink/[0.07] bg-ink/[0.015] px-4 py-2.5 text-[11px] leading-none text-ink/45 sm:px-5">
        Your figures, from your own orders.
      </p>
    </div>
  );
}
