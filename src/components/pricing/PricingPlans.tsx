import { PricingPlanCard } from "@/components/pricing/PricingPlanCard";
import { SectionShell } from "@/components/sections/SectionShell";
import { getPricingPlans, getUtilityActions } from "@/lib/content";

/**
 * The four plans, on one row.
 *
 * `items-stretch` with `h-full` on each card is the whole trick: the row is as
 * tall as the tallest plan and every card fills it, so the dividers, the
 * feature lists and the four buttons land on the same lines. Cards sized by
 * their own content would give four different heights and a ragged bottom
 * edge, which is the difference between a price list and a price table.
 *
 * Four across only at `xl`. At `lg` a fourth column would put a twelve-line
 * feature list into roughly 15rem and wrap half of it, so the row folds to
 * two-by-two there and the lines stay whole rather than the type shrinking.
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
      <div className="grid items-stretch gap-5 pt-3 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PricingPlanCard key={plan.id} plan={plan} action={installAction} />
        ))}
      </div>
    </SectionShell>
  );
}
