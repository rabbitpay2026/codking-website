import { Check } from "lucide-react";

import { SectionShell } from "@/components/sections/SectionShell";
import { cn } from "@/lib/utils";
import { getPricingFeatures, getPricingPlans } from "@/lib/content";
import { formatPlanPrice } from "@/utils/price";

import type { PlanFeatureValue } from "@/types";

/**
 * One cell.
 *
 * A tick, a dash, or the value itself. The dash is an em dash rather than a
 * blank because an empty cell in a long table is indistinguishable from a
 * mistake, and it is announced to assistive technology as "not included"
 * rather than read out as punctuation.
 */
function FeatureCell({ value }: { readonly value: PlanFeatureValue }) {
  if (value === true) {
    return (
      <>
        <Check
          aria-hidden
          className="mx-auto size-4 text-brand"
          strokeWidth={2.25}
        />
        <span className="sr-only">Included</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <span aria-hidden className="text-ink/25">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }

  return <span className="font-medium text-ink tabular-nums">{value}</span>;
}

/**
 * The full matrix (§3.1).
 *
 * The cards answer "what does this cost"; this answers "what exactly do I
 * lose by staying on the cheaper one", which is a different question and needs
 * every row side by side to be answerable at all.
 *
 * Rows and values come from the same declaration the cards read, so the table
 * cannot quote a percentage the cards do not.
 *
 * On a narrow screen the table scrolls sideways inside its own box rather than
 * reflowing. Twelve rows across four columns cannot be made to fit 360px
 * without either shrinking the type past reading size or splitting one table
 * into three — and a merchant comparing plans needs the columns adjacent, which
 * is the one thing both of those destroy.
 */
export function PricingComparison() {
  const plans = getPricingPlans();
  const features = getPricingFeatures();

  return (
    <SectionShell
      id="compare"
      size="compact"
      className="border-t border-ink/10"
    >
      <h2 className="text-center text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[1.6rem]">
        Compare all features
      </h2>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            Feature comparison across the Standard, Professional and Enterprise
            plans
          </caption>

          <thead>
            <tr className="bg-sky-100">
              <th
                scope="col"
                className="w-[28%] px-5 py-3.5 text-[11px] font-semibold tracking-[0.1em] text-ink/70 uppercase"
              >
                Features
              </th>
              {plans.map((plan) => {
                const { amount, period } = formatPlanPrice(plan.price);

                return (
                  <th
                    key={plan.id}
                    scope="col"
                    className="border-l border-border px-5 py-3.5 text-center"
                  >
                    <span className="block text-[11px] font-semibold tracking-[0.1em] text-ink uppercase">
                      {plan.name}
                    </span>
                    <span className="mt-1 block text-[11.5px] font-normal text-muted-foreground tabular-nums">
                      {amount}
                      {period ? ` ${period}` : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.id}
                className={cn(
                  "border-t border-border",
                  // Zebra striping, at the lightest tint the palette has. Four
                  // columns and twelve rows is exactly where the eye starts
                  // losing its line.
                  index % 2 === 1 && "bg-sky-50",
                )}
              >
                <th
                  scope="row"
                  className="px-5 py-3 text-[13.5px] font-normal text-ink/80"
                >
                  {feature.label}
                </th>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className="border-l border-border px-5 py-3 text-center text-[13.5px] text-ink/80"
                  >
                    <FeatureCell value={feature.values[plan.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
