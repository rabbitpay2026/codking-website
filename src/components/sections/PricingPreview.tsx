import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { ActionLink } from "@/components/layout/ActionLink";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { getPricingPlans, getUtilityActions } from "@/lib/content";

import type { PlanPrice } from "@/types";

/**
 * Formats a plan price for display.
 *
 * Held here rather than in the data so the amount stays a number that can be
 * compared and re-formatted per locale, instead of a string that has to be
 * parsed back apart.
 */
function formatPrice(price: PlanPrice | null): {
  amount: string;
  period: string | null;
} {
  if (!price) return { amount: "—", period: null };

  switch (price.kind) {
    case "free":
      return { amount: "Free", period: null };
    case "custom":
      return { amount: "Custom", period: null };
    case "fixed":
      return {
        amount: new Intl.NumberFormat("en", {
          style: "currency",
          currency: price.currency,
          minimumFractionDigits: price.amount % 1 === 0 ? 0 : 2,
        }).format(price.amount),
        period: `per ${price.period}`,
      };
  }
}

/**
 * Pricing preview (§5.1 #9).
 *
 * Cost appears before the merchant is asked to install, so it is never a
 * surprise later. The per-message note is shown on every plan because for a
 * COD store the message bill is the real running cost, and a plan price
 * quoted without it would be misleading.
 */
export function PricingPreview() {
  const plans = getPricingPlans();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Pay when it is earning."
          description="Every plan includes a 7-day free trial and no credit card. Messages are billed at your plan's per-message rate."
        />

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const { amount, period } = formatPrice(plan.price);

            return (
              <BlurFade key={plan.id} delay={0.05 * index} inView>
                <article
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-7",
                    plan.recommended
                      ? "border-brand/40 shadow-overlay lg:-mt-3 lg:pb-9"
                      : "border-border shadow-card",
                  )}
                >
                  {plan.recommended ? (
                    <BorderBeam
                      size={140}
                      duration={8}
                      colorFrom="var(--brand)"
                      colorTo="var(--brand-check)"
                    />
                  ) : null}

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold">{plan.name}</h3>
                    {plan.recommended ? (
                      <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                        Most popular
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight tabular-nums">
                      {amount}
                    </span>
                    {period ? (
                      <span className="text-sm text-muted-foreground">
                        {period}
                      </span>
                    ) : null}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.messageRate}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6">
                    {plan.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5">
                        <Check
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-brand-check"
                        />
                        <span className="text-sm leading-relaxed text-foreground/85">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {installAction ? (
                    <ActionLink
                      action={{
                        ...installAction,
                        label: "Start free",
                        variant: plan.recommended ? "primary" : "secondary",
                      }}
                      size="md"
                      block
                      className="mt-7"
                    />
                  ) : null}
                </article>
              </BlurFade>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="quiet" size="md">
            <Link href={routes.pricing}>
              Compare plans in full
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
