import { Globe, PackageCheck, ShieldCheck, Store } from "lucide-react";

import { MetricsEnvironment } from "@/components/sections/metrics/MetricsEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import { getPlatformStats } from "@/lib/content";

import type { PlatformStat } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a figure should never mean picking art.
 */
const iconFor: Record<PlatformStat["icon"], LucideIcon> = {
  globe: Globe,
  store: Store,
  orders: PackageCheck,
  uptime: ShieldCheck,
};

/**
 * The rule that closes the band.
 *
 * Only the lower one. The trust strip above ends on a rule of its own at
 * exactly this section's top edge, so drawing a second there would stack two
 * hairlines into one heavier line — the section is already ruled above, by its
 * neighbour, and the two share that edge rather than each owning one.
 *
 * Same 7% ink as the strip above and as the dividers inside, so every rule on
 * this part of the page is one decision seen several times.
 */
function BandRule() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px bg-ink/[0.07]"
    />
  );
}

/**
 * Platform scale (§5.1 #3).
 *
 * The question this answers is "how big is the thing I would be trusting", and
 * it is deliberately the only question it answers. What the product did for a
 * particular store is a different claim with a different burden of proof, and
 * it has its own section further down.
 *
 * One band, not four cards. An earlier pass set these as separate tiles with
 * their own radius, border, shadow and hover, and that was the wrong object:
 * a card says "this is a thing in its own right", and four of them in a row
 * say the page has four things to offer here. It has one — a single statement
 * of scale, read across — so the figures share a surface and are separated by
 * the lightest mark that will do the job. Hairlines carry the division at a
 * fraction of the visual cost, and nothing in the row floats, lifts or lights
 * up. The band is the object; the columns are its parts.
 *
 * Everything is set flush left, so the first figure lines up under the
 * `10,000+` in the strip above. Two sections sharing a left edge is most of
 * what makes them read as consecutive rather than merely adjacent.
 *
 * The icons are ink at low opacity with nothing behind them. A tinted plate
 * under each one would put four small coloured objects in a row that is
 * supposed to be a single quiet line of facts.
 *
 * The tickers count once, on entering view. The final value is also in the
 * markup, so every figure is correct without JavaScript, for a crawler, and
 * for anyone who has asked for reduced motion.
 *
 * Every figure is the content repository (§11.1), so none of them can drift
 * from the hero, the trust strip, or the footer. A country count that is not
 * yet verified drops out of the band, and the row becomes three columns rather
 * than four with a hole in it.
 */
export async function Metrics() {
  const stats = await getPlatformStats();

  return (
    <SectionShell
      size="flush"
      ariaLabel="COD King at a glance"
      backdrop={
        <>
          <MetricsEnvironment />
          <BandRule />
        </>
      }
      containerClassName="py-9 md:py-11 lg:py-12"
    >
      <dl
        className={cn(
          "grid sm:grid-cols-2",
          stats.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {stats.map((stat, index) => {
          const Icon = iconFor[stat.icon];

          return (
            <div
              key={stat.id}
              className={cn(
                "flex flex-col",
                // The divider turns with the axis and is drawn only between
                // cells, so no edge of the band carries one. Stacked, it is a
                // horizontal rule; two or four across, a vertical one.
                index > 0 && "mt-6 border-t border-ink/[0.07] pt-6",
                index === 1 && "sm:mt-0 sm:border-t-0 sm:pt-0",
                index % 2 === 1 && "sm:border-l sm:border-ink/[0.07] sm:pl-7",
                index > 0 &&
                  "lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7 xl:pl-9",
              )}
            >
              {/*
                A `dl` group may hold nothing but `dt` and `dd`, and the `dt`
                has to come first — so the column is ordered in CSS instead,
                which lets the figure read first without the markup lying about
                which of the three is the term.
              */}
              <dt className="order-2 mt-3 text-[13px] leading-none font-semibold tracking-[-0.005em] text-ink/75">
                {stat.label}
              </dt>

              <dd className="order-1 flex items-center gap-2.5">
                <Icon
                  aria-hidden
                  className="size-[17px] shrink-0 text-ink/30"
                  strokeWidth={1.75}
                />
                <span className="text-[1.9rem] leading-none font-semibold tracking-[-0.045em] text-ink tabular-nums lg:text-[2.15rem]">
                  <NumberTicker
                    value={stat.value}
                    decimalPlaces={stat.decimalPlaces ?? 0}
                  />
                  {stat.suffix ? <span>{stat.suffix}</span> : null}
                </span>
              </dd>

              <dd className="order-3 mt-2 text-[12.5px] leading-none text-ink/40">
                {stat.caption}
              </dd>
            </div>
          );
        })}
      </dl>
    </SectionShell>
  );
}
