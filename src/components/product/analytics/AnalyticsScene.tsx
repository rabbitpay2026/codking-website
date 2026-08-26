import { ReportPanel } from "@/components/product/analytics/ReportPanel";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The hero's product scene.
 *
 * The report, at the full width of its column. The floating annotation chips
 * that used to sit beside it are gone from every feature page: they were the
 * same object on all four, they cost the panel a third of its width, and what
 * they said was already in the hero checklist two columns to the left.
 *
 * This page loses the least by their going and gains the most. The panel is a
 * dashboard — a split, a plot with an axis, four tracked headings — and a
 * dashboard is the one kind of screen where width is not decoration: the plot
 * at two thirds of this column is a sparkline, and a sparkline argues against
 * the sentence the page opens with.
 */
export function AnalyticsScene({ className }: WithClassName) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Key light, so the panel is lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 44% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      <ReportPanel className="mx-auto w-full max-w-[27rem] lg:mx-0 lg:max-w-none" />
    </div>
  );
}
