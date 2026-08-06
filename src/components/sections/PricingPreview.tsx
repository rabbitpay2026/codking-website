import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { ActionLink } from "@/components/layout/ActionLink";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
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
 * Held here rather than in the data, so the amount stays a number that can be
 * compared and re-formatted per locale instead of a string that has to be
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
 * surprise later. The per-message note is on every plan because for a COD
 * store the message bill is the real running cost, and a plan price quoted
 * without it would be misleading.
 *
 * The recommended plan is raised, beamed and given a solid surface; the other
 * two stay quiet. One emphasised card in three is a recommendation — three
 * emphasised cards are noise.
 */
export function PricingPreview() {
  const plans = getPricingPlans();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <SectionShell
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(55% 45% at 50% 0%, color-mix(in oklab, var(--brand) 12%, transparent), transparent 65%)",
          }}
        />
      }
    >
      <SectionHeading
        eyebrow="Pricing"
        title="Free to start, cheap to keep"
        description="Seven days free on every plan, no card. Messages bill at your plan rate — and drop again once you bring your own gateway."
      />

      {/*
        Stretched rather than start-aligned, so the three cards share a
        baseline at the bottom and only the recommended one breaks the line —
        at the top, where the lift is the point. Ragged card bottoms are the
        difference between a price list and a price *table*.
      */}
      <div className="mt-lede grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const { amount, period } = formatPrice(plan.price);

          return (
            // The lift belongs on the grid item, not on the card inside it.
            // Applied to the card, the negative margin moves the box up while
            // `h-full` keeps its height — so the recommended plan ends 20px
            // short at the bottom and the row reads as misaligned rather than
            // as raised.
            <BlurFade
              key={plan.id}
              delay={0.07 * index}
              inView
              className={cn("h-full", plan.recommended && "lg:-mt-5")}
            >
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl p-8",
                  plan.recommended
                    ? "border-2 border-brand/35 bg-card shadow-overlay"
                    : "surface-card",
                )}
              >
                {plan.recommended ? (
                  <>
                    <BorderBeam
                      size={160}
                      duration={9}
                      colorFrom="var(--brand)"
                      colorTo="var(--brand-check)"
                    />
                    <span
                      aria-hidden
                      className="absolute -top-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
                    />
                  </>
                ) : null}

                <div className="relative flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  {plan.recommended ? (
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
                      Most popular
                    </span>
                  ) : null}
                </div>

                <p className="relative mt-6 flex items-baseline gap-1.5">
                  <span className="text-[2.75rem] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                    {amount}
                  </span>
                  {period ? (
                    <span className="text-sm text-muted-foreground">
                      {period}
                    </span>
                  ) : null}
                </p>

                <p className="relative mt-2.5 text-sm text-muted-foreground">
                  {plan.messageRate}
                </p>

                <ul className="relative mt-7 flex-1 space-y-3 border-t border-border pt-7">
                  {plan.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-check/20">
                        <Check aria-hidden className="size-2.5 text-ink/70" />
                      </span>
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
                    className="relative mt-8"
                  />
                ) : null}
              </article>
            </BlurFade>
          );
        })}
      </div>

      <div className="mt-7 text-center">
        <Button asChild variant="quiet" size="md">
          <Link href={routes.pricing}>
            Compare plans in full
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
