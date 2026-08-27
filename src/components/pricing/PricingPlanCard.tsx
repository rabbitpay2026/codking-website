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
 * `flex-1` on the feature list is what puts the three buttons on one line: the
 * list absorbs whatever height difference the plans have, so the row below it
 * starts at the same offset in all three cards even when one plan says more.
 *
 * Value pills are read from the comparison matrix rather than typed here, so
 * the 0.8% on this card and the 0.8% in the table are one declaration.
 */
export function PricingPlanCard({ plan, action }: PricingPlanCardProps) {
  const { amount, period } = formatPlanPrice(plan.price);

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-card p-6 lg:p-7",
        /*
          Flat at rest, and barely less flat on hover. Two pixels of lift and
          the site's own card shadow is enough to say the card is a surface
          you can act on; anything more and three price cards start bouncing
          under a cursor that is only travelling across them to reach the
          third one. The transition is the shared emphasised curve, so this
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
        // the three cards keep identical internal spacing and the badge does
        // not push this plan's price a line below its neighbours'.
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

        <p className="mt-5 flex items-baseline justify-center gap-1">
          <span className="text-[2.5rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
            {amount}
          </span>
          {period ? (
            <span className="text-[13px] text-muted-foreground">{period}</span>
          ) : null}
        </p>
      </header>

      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
        {plan.highlights.map((highlight) => {
          const value = highlight.feature
            ? getPlanFeatureValue(highlight.feature, plan.id)
            : false;

          return (
            <li key={highlight.label} className="flex items-start gap-2.5">
              <FeatureCheck className="mt-px" />
              <span className="flex flex-wrap items-center gap-2 text-[13.5px] leading-relaxed text-ink/80">
                {highlight.label}
                {highlight.showValue && typeof value === "string" ? (
                  <span className="rounded-full border border-border bg-sky-100 px-2 py-px text-[11px] font-semibold text-ink/70 tabular-nums">
                    {value}
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>

      {action ? (
        <ActionLink
          action={{
            ...action,
            label: "Get Started",
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
    </article>
  );
}
