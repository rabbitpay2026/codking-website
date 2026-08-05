import { Container } from "@/components/shared/Container";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { getOutcomeMetrics } from "@/lib/content";

/**
 * Published results (§5.1 #3).
 *
 * Each figure carries its own caption stating the condition it holds under,
 * because §10.1 requires every claim to point at a source and an unqualified
 * percentage on a marketing page is the kind of claim merchants have learned
 * to discount.
 *
 * The tickers count only once, when scrolled into view. The final value is
 * also present in the markup, so the numbers are correct without JavaScript
 * and for anyone who has asked for reduced motion.
 */
export function Metrics() {
  const metrics = getOutcomeMetrics();

  return (
    <section className="border-b border-border bg-cloud py-16 lg:py-20">
      <Container>
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            // `dl` may contain a single `div` grouping each term and its
            // description, so BlurFade's own wrapper is that div — nesting a
            // second one inside it would be invalid.
            <BlurFade
              key={metric.id}
              delay={0.05 * index}
              inView
              className="flex flex-col gap-1.5"
            >
              <dd className="flex items-baseline text-4xl font-semibold tracking-tight text-brand tabular-nums lg:text-5xl">
                {metric.prefix ? <span>{metric.prefix}</span> : null}
                <NumberTicker
                  value={metric.value}
                  decimalPlaces={metric.decimalPlaces ?? 0}
                  className="text-brand"
                />
                {metric.suffix ? <span>{metric.suffix}</span> : null}
              </dd>
              <dt className="text-sm font-semibold text-foreground">
                {metric.label}
              </dt>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {metric.caption}
              </p>
            </BlurFade>
          ))}
        </dl>
      </Container>
    </section>
  );
}
