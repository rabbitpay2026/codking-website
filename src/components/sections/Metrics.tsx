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
 * The tickers count once, on entering view. The final value is also in the
 * markup, so the numbers are right without JavaScript and for anyone who has
 * asked for reduced motion.
 *
 * Laid out on ruled columns rather than in cards: these are facts about the
 * product, and boxing each one would make four small claims where the page
 * wants one confident statement.
 */
export function Metrics() {
  const metrics = getOutcomeMetrics();

  return (
    <SectionShell
      tone="muted"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(65% 55% at 50% 0%, color-mix(in oklab, var(--brand) 10%, transparent), transparent 70%)",
          }}
        />
      }
    >
      <dl className="grid gap-x-10 gap-y-14 sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <BlurFade
            key={metric.id}
            delay={0.06 * index}
            inView
            className="group relative flex flex-col lg:pl-8"
          >
            <span
              aria-hidden
              className="absolute top-1 bottom-1 left-0 hidden w-px bg-gradient-to-b from-brand/45 via-border to-transparent lg:block"
            />

            <dd className="flex items-baseline text-[2.75rem] leading-none font-semibold tracking-[-0.03em] text-brand tabular-nums lg:text-[3.25rem]">
              {metric.prefix ? <span>{metric.prefix}</span> : null}
              <NumberTicker
                value={metric.value}
                decimalPlaces={metric.decimalPlaces ?? 0}
                className="text-brand"
              />
              {metric.suffix ? <span>{metric.suffix}</span> : null}
            </dd>

            <dt className="mt-4 text-sm font-semibold text-foreground">
              {metric.label}
            </dt>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {metric.caption}
            </p>
          </BlurFade>
        ))}
      </dl>
    </SectionShell>
  );
}
