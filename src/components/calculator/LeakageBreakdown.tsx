"use client";

import { formatCurrency } from "@/utils";

import type { CalculatorScenario } from "@/types";

interface LeakageBreakdownProps {
  readonly current: CalculatorScenario;
}

/**
 * One category, its amount, and a bar proportional to it.
 *
 * The bar is scaled against the largest category rather than against the
 * total, so the biggest leak always fills the track. Scaling against the total
 * would leave every bar short on a store with three evenly-sized leaks, and the
 * comparison a merchant needs to make here is between the categories, not
 * between each category and a sum they can already read.
 */
function LeakRow({
  label,
  note,
  amount,
  ratio,
  fill,
}: {
  readonly label: string;
  readonly note: string;
  readonly amount: number;
  readonly ratio: number;
  readonly fill: string;
}) {
  return (
    <div className="py-3.5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <p className="shrink-0 text-[14px] font-semibold text-ink tabular-nums">
          {formatCurrency(amount)}
        </p>
      </div>

      {/*
        `aria-hidden` because the bar restates the figure directly above it. A
        screen reader that announced both would read the same leak twice, once
        as money and once as a meaningless percentage.
      */}
      <div
        aria-hidden
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F4F8]"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-[var(--ease-emphasized)] ${fill}`}
          style={{ width: `${Math.max(ratio * 100, 0)}%` }}
        />
      </div>

      <p className="mt-1.5 text-[11.5px] leading-snug text-ink/40">{note}</p>
    </div>
  );
}

/**
 * Where the money is going (step three of the page's story).
 *
 * The headline above answers "how much". This answers "on what", which is the
 * question that has to be settled before any control can be proposed — a
 * merchant who has not seen their loss broken down has no way to judge whether
 * the solution offered next addresses the part that actually hurts.
 *
 * Two of the three categories are the headline loss, split by cause. The third
 * is the COD collection fee, which is a cost rather than waste, and the
 * footnote says so plainly instead of letting a merchant assume all three are
 * recoverable.
 *
 * Every value is read from the scenario the engine already produced, so
 * changing any input moves these bars in the same pass that moves the headline.
 */
export function LeakageBreakdown({ current }: LeakageBreakdownProps) {
  const { leakage } = current;
  const largest = Math.max(leakage.rto, leakage.cancellation, leakage.codFee);
  const ratio = (value: number) => (largest > 0 ? value / largest : 0);

  return (
    <section aria-labelledby="leak-heading">
      <h2
        id="leak-heading"
        className="text-[1.35rem] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]"
      >
        Where your COD money is leaking
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink/50">
        Your current numbers show where COD is costing your store the most.
      </p>

      <div className="mt-4 divide-y divide-[#F1F4F8] rounded-2xl border border-[#E5E7EB] bg-white px-5 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:px-6">
        <LeakRow
          label="RTO loss"
          note="Freight both ways, packaging, and the ad spend that won the order."
          amount={leakage.rto}
          ratio={ratio(leakage.rto)}
          fill="bg-[#B42318]/80"
        />
        <LeakRow
          label="Cancelled COD orders"
          note="Ad spend on orders killed before they ever shipped."
          amount={leakage.cancellation}
          ratio={ratio(leakage.cancellation)}
          fill="bg-[#B42318]/40"
        />
        <LeakRow
          label="Other COD costs"
          note="The courier's fee for collecting cash on orders that did deliver."
          amount={leakage.codFee}
          ratio={ratio(leakage.codFee)}
          fill="bg-ink/20"
        />
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-ink/40">
        The first two are the {formatCurrency(current.codLoss.total)} of wasted
        spend above. The collection fee is what COD costs even when the order
        works, so it is shown separately rather than counted as a loss.
      </p>
    </section>
  );
}
