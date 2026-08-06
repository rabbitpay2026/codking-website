import { Globe, Store, Timer } from "lucide-react";

import { SectionShell } from "@/components/sections/SectionShell";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import { getPlatformStats } from "@/lib/content";

import type { PlatformStat } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a figure should not mean picking art.
 */
const iconFor: Record<PlatformStat["icon"], LucideIcon> = {
  globe: Globe,
  store: Store,
  timer: Timer,
};

/**
 * Reach, as one ruled band under the trust strip.
 *
 * Three figures on a single surface rather than three cards. These are one
 * fact seen from three angles — how far this has got — and boxing each would
 * make three small claims where the page wants one; the rules carry the
 * separation at a fraction of the visual cost.
 *
 * It deliberately restates nothing. The rating and the review count belong to
 * the trust strip directly above, and a figure a visitor has just read does
 * not become more true the second time — so this band carries only what that
 * strip cannot.
 *
 * The tickers count once, on entering view. The final value is also in the
 * markup, so the numbers are right without JavaScript and for anyone who has
 * asked for reduced motion. Every figure comes from the content repository, so
 * none of them can drift from the hero or the footer (§11.1).
 */
export async function Metrics() {
  const stats = await getPlatformStats();

  return (
    <SectionShell size="compact" ariaLabel="COD King at a glance">
      <dl className="grid overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-b from-white to-sky-100 shadow-card sm:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = iconFor[stat.icon];

          return (
            <div
              key={stat.id}
              className={cn(
                "flex items-center gap-3.5 px-5 py-6 sm:px-7",
                // The rule turns with the axis: horizontal while the cells are
                // stacked, vertical once they sit side by side. Drawn only
                // between cells, so neither edge of the band carries one.
                index > 0 && "border-t border-border sm:border-t-0 sm:border-l",
              )}
            >
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand ring-1 ring-brand/10"
              >
                <Icon className="size-5" />
              </span>

              {/*
                `dt` before `dd` in the markup because that is the order the
                spec requires inside a `dl`; the column is reversed visually so
                the figure still reads first.
              */}
              <div className="flex min-w-0 flex-col-reverse">
                <dt className="mt-1.5 truncate text-[13px] font-medium text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="text-[1.6rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums sm:text-[1.9rem]">
                  <NumberTicker
                    value={stat.value}
                    decimalPlaces={stat.decimalPlaces ?? 0}
                  />
                  {stat.suffix ? <span>{stat.suffix}</span> : null}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>
    </SectionShell>
  );
}
