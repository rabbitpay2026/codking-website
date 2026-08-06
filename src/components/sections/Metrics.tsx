import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { getOutcomeMetrics } from "@/lib/content";

/**
 * Published results (§5.1 #3).
 *
 * Each figure carries the condition it holds under, because §10.1 requires
 * every claim to point at a source and an unqualified percentage on a
 * marketing page is the kind of claim merchants have learned to discount.
 *
 * Laid out on ruled columns beside a single lead-in rather than in cards.
 * These are facts about the product; boxing each one would make three small
 * claims where the page wants one confident statement, and the lead-in gives
 * the band a subject so it does not read as three numbers that wandered in
 * from somewhere else.
 *
 * The tickers count once, on entering view. The final value is also in the
 * markup, so the numbers are right without JavaScript and for anyone who has
 * asked for reduced motion.
 */
export function Metrics() {
  const metrics = getOutcomeMetrics();

  return (
    <SectionShell
      tone="muted"
      size="compact"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(65% 60% at 50% 0%, color-mix(in oklab, var(--brand) 9%, transparent), transparent 72%)",
          }}
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            <span aria-hidden className="h-px w-6 bg-brand/40" />
            What merchants report
          </p>
          <p className="mt-4 text-xl leading-snug font-semibold tracking-[-0.02em] text-balance sm:text-2xl">
            Ceilings, not averages — because a number you cannot reproduce costs
            more trust than it buys.
          </p>
        </div>

        <dl className="grid gap-x-8 gap-y-9 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <BlurFade
              key={metric.id}
              delay={0.06 * index}
              inView
              className="relative flex flex-col pl-5"
            >
              <span
                aria-hidden
                className="absolute top-1 bottom-1 left-0 w-px bg-gradient-to-b from-brand/50 via-border to-transparent"
              />

              <dd className="flex items-baseline text-[2.5rem] leading-none font-semibold tracking-[-0.03em] text-brand tabular-nums lg:text-[2.9rem]">
                {metric.prefix ? <span>{metric.prefix}</span> : null}
                <NumberTicker
                  value={metric.value}
                  decimalPlaces={metric.decimalPlaces ?? 0}
                  className="text-brand"
                />
                {metric.suffix ? <span>{metric.suffix}</span> : null}
              </dd>

              <dt className="mt-3 text-sm font-semibold text-foreground">
                {metric.label}
              </dt>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                {metric.caption}
              </p>
            </BlurFade>
          ))}
        </dl>
      </div>
    </SectionShell>
  );
}
