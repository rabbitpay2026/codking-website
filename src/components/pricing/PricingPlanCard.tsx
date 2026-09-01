import { ActionLink } from "@/components/layout/ActionLink";
import { FeatureCheck } from "@/components/pricing/FeatureCheck";
import { cn } from "@/lib/utils";
import { getPlanFeatureValue } from "@/lib/content";
import { formatPlanPrice } from "@/utils/price";

import type { PricingPlan, UtilityAction } from "@/types";

interface PricingPlanCardProps {
  readonly plan: PricingPlan;
  /** The install action, passed down so the card never reads content itself. */
  readonly action?: UtilityAction;
}

/**
 * One plan.
 *
 * Every card is the same card: same padding, same divider position, same
 * feature spacing, same button. Only two things change with the recommended
 * plan — the border warms to brand and the button fills — because a
 * recommendation should be a difference in emphasis, not a difference in
 * design. A card that is also larger, rounder and shadowed reads as a
 * different product rather than as the one we suggest.
 *
 * `flex-1` on the feature list is what puts the buttons on one line: the list
 * absorbs whatever height difference the plans have, so the row below it
 * starts at the same offset in every card even when one plan says more.
 *
 * Value pills are read from the comparison matrix rather than typed here, so
 * the 0.8% on this card and the 0.8% in the table are one declaration.
 */
export function PricingPlanCard({ plan, action }: PricingPlanCardProps) {
  const { amount, periodLabel, previousAmount, savings, secondary } =
    formatPlanPrice(plan.price);

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-card p-6 lg:p-7",
        /*
          Flat at rest, and barely less flat on hover. Two pixels of lift and
          the site's own card shadow is enough to say the card is a surface
          you can act on; anything more and four price cards start bouncing
          under a cursor that is only travelling across them to reach the
          last one. The transition is the shared emphasised curve, so this
          card responds exactly like every other card on the site.
        */
        // `translate` as well as `transform`: Tailwind's translate utilities
        // set the standalone property, which a transition naming only
        // `transform` does not cover — so the lift would snap rather than ease.
        "transition-[translate,transform,box-shadow,border-color] duration-300 ease-[var(--ease-emphasized)]",
        "hover:-translate-y-0.5 hover:shadow-card",
        plan.recommended
          ? "border-brand/45 shadow-[0_1px_2px_rgba(20,16,58,0.04)] hover:border-brand/70"
          : "border-border hover:border-ink/20",
      )}
    >
      {plan.recommended ? (
        // Straddles the top edge rather than taking a row inside the card, so
        // the cards keep identical internal spacing and the badge does not
        // push this plan's price a line below its neighbours'.
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white uppercase">
          Most popular
        </span>
      ) : null}

      <header className="text-center">
        <h3 className="text-[13px] font-semibold tracking-[0.12em] text-ink uppercase">
          {plan.name}
        </h3>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          {plan.tagline}
        </p>

        {/*
          The old price and the saving sit *above* the figure rather than
          beside it. On a four-up row there is no width to put a strike-through
          and a badge next to a 2.5rem number without one of them wrapping
          mid-line, and a discount read after the price it discounts is a
          correction rather than an offer. Reserved as a fixed row so the four
          prices stay on one baseline whether or not a plan is promoted.
        */}
        <p className="mt-5 flex min-h-5 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px]">
          {previousAmount ? (
            <span className="text-muted-foreground tabular-nums line-through">
              {previousAmount}
            </span>
          ) : null}
          {savings ? (
            <span className="rounded-full border border-border bg-sky-100 px-2 py-px font-semibold text-ink/70 tabular-nums">
              {savings}
            </span>
          ) : null}
        </p>

        <p className="mt-1 flex items-baseline justify-center gap-1.5">
          <span className="text-[2.5rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
            {amount}
          </span>
          {periodLabel ? (
            <span className="text-[13px] text-muted-foreground">
              {periodLabel}
            </span>
          ) : null}
        </p>

        {/* Also a reserved row, for the same reason as the discount line. */}
        <p className="mt-1.5 min-h-4 text-[12px] text-muted-foreground tabular-nums">
          {secondary}
        </p>
      </header>

      <div className="mt-6 flex-1 border-t border-border pt-6">
        <h4 className="text-[12px] font-semibold text-ink">
          What&rsquo;s included
        </h4>

        <ul className="mt-3.5 space-y-3">
          {plan.highlights.map((highlight) => {
            const value = highlight.feature
              ? getPlanFeatureValue(highlight.feature, plan.id)
              : false;
            const showsValue = highlight.showValue && typeof value === "string";

            return (
              <li key={highlight.label} className="flex items-start gap-2.5">
                <FeatureCheck className="mt-px" />
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] leading-relaxed text-ink/80">
                  {highlight.label}
                  {showsValue ? (
                    <span className="rounded-full border border-border bg-sky-100 px-2 py-px text-[11px] font-semibold text-ink/70 tabular-nums">
                      {value}
                    </span>
                  ) : null}
                  {showsValue && highlight.valueSuffix
                    ? highlight.valueSuffix
                    : null}
                </span>
              </li>
            );
          })}
        </ul>

        {plan.marketBenefits && plan.marketBenefits.length > 0 ? (
          /*
            Under its own rule, not mixed into the list above. These answer
            "is this built for my market" rather than "what do I get", and a
            merchant scanning for the second question should not have to read
            past the first to finish it.
          */
          <div className="mt-6 border-t border-border pt-5">
            <h4 className="text-[12px] font-semibold text-ink">
              Indian market benefits
            </h4>

            <ul className="mt-3.5 space-y-3">
              {plan.marketBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <FeatureCheck className="mt-px" />
                  <span className="text-[13.5px] leading-relaxed text-ink/80">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {action ? (
        <ActionLink
          action={{
            ...action,
            label: plan.ctaLabel,
            variant: plan.recommended ? "primary" : "secondary",
          }}
          size="md"
          location="pricing-plans"
          block
          className={cn(
            "mt-7 font-semibold",
            plan.recommended && "bg-ink hover:bg-ink/90",
          )}
        />
      ) : null}

      {plan.footnote ? (
        <p className="mt-4 text-center text-[12px] text-muted-foreground">
          {plan.footnote}
        </p>
      ) : null}
    </article>
  );
}
