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
 * So the rows are the report's own headings and the bars are texture: two
 * lengths, alternating, chosen to look like a chart and to be readable as
 * nothing. Whatever a visitor infers from them, they cannot infer a percentage,
 * because there is no axis, no scale and no label to read one against — and the
 * line at the foot of the panel says whose numbers go here.
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
  0.42, 0.61, 0.5, 0.72, 0.55, 0.66, 0.48, 0.63, 0.57, 0.7,
];

/**
 * The reports screen, as the merchant sees it in the dashboard.
 *
 * Four headings, a plot, and the line that says where the figures come from.
 * The panel's job is to answer "what will I be able to see" — which is a
 * question about the shape of the screen, not about anybody's results.
 */
export function ReportPanel({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/[0.07] bg-white p-4",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-[11px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]">
          <ChartNoAxesCombined className="size-4 text-white" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[13px] leading-none font-semibold tracking-[-0.01em] text-ink">
            COD reports
          </span>
          <span className="mt-1.5 block text-[11px] leading-none text-ink/45">
            Every control, in one place
          </span>
        </span>

        <span className="shrink-0 rounded-full bg-ink/[0.05] px-2 py-0.5 text-[9px] leading-[1.7] font-bold tracking-[0.04em] text-ink/50 uppercase">
          Last 30 days
        </span>
      </div>

      <div aria-hidden className="mt-3.5 h-px bg-ink/[0.07]" />

      <ul className="mt-3 space-y-2.5">
        {ROWS.map((row, index) => (
          <li key={row.id}>
            <p className="text-[10.5px] leading-none font-medium text-ink/55">
              {row.label}
            </p>
            {/*
              A track and a fill, with no number at either end. The two lengths
              alternate down the list so the rows are not identical and no row
              is the longest.
            */}
            <span
              aria-hidden
              className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]"
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

      {/* The plot. Texture, not data — see `COLUMNS`. */}
      <span
        aria-hidden
        className="mt-3.5 flex h-12 items-end gap-1 rounded-lg bg-ink/[0.02] px-2 py-1.5"
      >
        {COLUMNS.map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-[2px] bg-brand/25"
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        ))}
      </span>

      <p className="mt-3 text-[10px] leading-none text-ink/40">
        Your figures, from your own orders.
      </p>
    </div>
  );
}
