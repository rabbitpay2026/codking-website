import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { getOutcomeMetrics } from "@/lib/content";

/**
 * Which direction each figure moves.
 *
 * Presentation rather than content — the arrow is how a reader knows that
 * fewer fake orders and a larger return are both good news without parsing
 * the label first.
 */
const FALLING = new Set(["fake-orders", "sms-cost"]);

/**
 * What the product changes for a store.
 *
 * Placed after the coverage section and before the merchant quotes, so a
 * number arrives with a named store immediately behind it. §10.1 requires
 * every claim to point at a source, which is why each figure carries the
 * condition it holds under rather than a bare percentage — an unqualified
 * number on a marketing page is the kind of claim merchants have learned to
 * discount.
 *
 * The tickers count once, on entering view. The final value is also in the
 * markup, so the figures are right without JavaScript and for anyone who has
 * asked for reduced motion.
 */
export function Results() {
  const metrics = getOutcomeMetrics();

  return (
    <SectionShell
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 50% 0%, color-mix(in oklab, var(--brand) 10%, transparent), transparent 70%)",
          }}
        />
      }
    >
      <SectionHeading
        eyebrow="What merchants report"
        title="The figures the product publishes"
        description="Ceilings, not averages — because a number you cannot reproduce costs more trust than it buys."
      />

      <dl className="mt-lede grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => {
          const falling = FALLING.has(metric.id);
          const Arrow = falling ? ArrowDownRight : ArrowUpRight;

          return (
            <BlurFade
              key={metric.id}
              delay={0.06 * index}
              inView
              className="h-full"
            >
              {/*
                `dt` precedes `dd` in the markup because that is the order a
                description list requires; the figure is pulled above its own
                label with `order`, which changes the painting and not the
                document.
              */}
              <div className="flex h-full surface-card flex-col p-6">
                <span
                  aria-hidden
                  className="order-1 grid size-9 place-items-center rounded-lg bg-brand-soft text-brand ring-1 ring-brand/10"
                >
                  <Arrow className="size-4.5" />
                </span>

                <dt className="order-3 mt-3 text-sm font-semibold text-foreground">
                  {metric.label}
                </dt>

                <dd className="order-2 mt-5 flex items-baseline text-[2.4rem] leading-none font-semibold tracking-[-0.03em] text-brand tabular-nums">
                  {metric.prefix ? <span>{metric.prefix}</span> : null}
                  <NumberTicker
                    value={metric.value}
                    decimalPlaces={metric.decimalPlaces ?? 0}
                    className="text-brand"
                  />
                  {metric.suffix ? <span>{metric.suffix}</span> : null}
                </dd>

                <p className="order-4 mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {metric.caption}
                </p>
              </div>
            </BlurFade>
          );
        })}
      </dl>
    </SectionShell>
  );
}
