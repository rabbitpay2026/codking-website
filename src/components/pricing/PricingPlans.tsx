import { PricingPlanCard } from "@/components/pricing/PricingPlanCard";
import { SectionShell } from "@/components/sections/SectionShell";
import { getPricingPlans, getUtilityActions } from "@/lib/content";

/**
 * The three plans, on one row.
 *
 * `items-stretch` with `h-full` on each card is the whole trick: the row is as
 * tall as the tallest plan and every card fills it, so the dividers, the
 * feature lists and the three buttons land on the same lines. Cards sized by
 * their own content would give three different heights and a ragged bottom
 * edge, which is the difference between a price list and a price table.
 *
 * The install action is read once here and handed down, so the cards stay pure
 * presentation and there is one place to change where "Get Started" points.
 */
export function PricingPlans() {
  const plans = getPricingPlans();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <SectionShell size="compact" ariaLabel="Plans and prices">
      {/* Top padding leaves room for the badge straddling the middle card. */}
      <div className="grid items-stretch gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingPlanCard key={plan.id} plan={plan} action={installAction} />
        ))}
      </div>
    </SectionShell>
  );
}
