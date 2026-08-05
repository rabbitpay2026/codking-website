import { ArrowRight, PackageX, TrendingDown, Wallet } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routeFor, routes } from "@/constants/routes";
import { getControlBySlug, getPainPoints } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — a copywriter changing a pain point should not have
 * to pick an icon.
 */
const iconFor: Record<string, LucideIcon> = {
  "fake-orders": PackageX,
  rto: TrendingDown,
  prepaid: Wallet,
};

/**
 * The COD loss, made visible (§5.1 #4).
 *
 * This is the emotional centre of the page. The loss is invisible because it
 * is spread across small line items that no single bill totals (§2), so the
 * section names each one and then hands the merchant the tool that turns it
 * into their own number.
 *
 * The primary action is the calculator, not the install: §5.2 forbids asking
 * for the install before the merchant has seen the value.
 */
export function PainPoints() {
  const painPoints = getPainPoints();

  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The COD loss"
          title="COD is costing you more than you think"
          description="The loss is spread across returned freight, fake orders, and cash tied up in parcels that never arrive. No single bill shows the total, so the problem stays invisible."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {painPoints.map((painPoint, index) => {
            const Icon = iconFor[painPoint.id] ?? PackageX;
            const control = getControlBySlug(painPoint.controlSlug);

            return (
              <BlurFade
                key={painPoint.id}
                delay={0.05 * index}
                inView
                className="h-full"
              >
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                  <span className="grid size-10 place-items-center rounded-xl bg-destructive/8 text-destructive">
                    <Icon aria-hidden className="size-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">
                    {painPoint.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {painPoint.body}
                  </p>

                  {control ? (
                    <Link
                      href={routeFor.control(control.slug)}
                      className="mt-5 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      Fixed by {control.name}
                      <ArrowRight aria-hidden className="size-3.5" />
                    </Link>
                  ) : null}
                </article>
              </BlurFade>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-brand/20 bg-brand-soft px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-semibold text-ink">
              What is COD costing your store?
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Answer three questions and see your own annual number. Free, no
              signup.
            </p>
          </div>

          <Button asChild size="lg" className="shrink-0">
            <Link href={routes.codCalculator}>
              Open the COD Calculator
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
