"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { externalLinks } from "@/constants/external";
import { routeFor } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { formatCount, formatCurrency, formatPercent } from "@/utils";

import type { CalculatorResult, Control } from "@/types";

interface ResultsPanelProps {
  readonly result: CalculatorResult;
  /** The controls that act on this result (§8.4). */
  readonly targets: readonly Control[];
}

/**
 * A headline figure.
 *
 * `tone` is the only place colour is allowed to carry meaning on this panel,
 * and it is spent on three lines out of a dozen. The loss is the one figure
 * that should feel like a problem; the profit is the one that should feel like
 * the product. Everything between them is ink, so the two that matter are still
 * legible as the two that matter.
 */
function Headline({
  label,
  value,
  caption,
  tone,
}: {
  readonly label: string;
  readonly value: string;
  readonly caption: string;
  readonly tone: "loss" | "neutral" | "gain";
}) {
  return (
    /*
      `min-w-0` so a long figure can never widen the grid track it sits in. A
      store doing 100,000 orders a month produces a ten-character rupee amount,
      and without this the cell grows to fit it and pushes the panel — and with
      it the page — into a horizontal scroll on a phone.
    */
    <div className="min-w-0">
      <p className="text-[12.5px] leading-none font-medium text-ink/50">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 text-[1.75rem] leading-none font-semibold tracking-[-0.04em] tabular-nums sm:text-[2.05rem]",
          tone === "loss" && "text-[#B42318]",
          tone === "neutral" && "text-ink",
          tone === "gain" && "text-brand",
        )}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[11.5px] leading-none text-ink/40">{caption}</p>
    </div>
  );
}

/**
 * One row of the before/after table.
 *
 * Three columns at every breakpoint. Stacking these on mobile would put the
 * two numbers a merchant is comparing on separate lines, which is the one
 * thing the row exists to prevent — so the labels are short enough to survive
 * a 360px viewport instead.
 */
function ComparisonRow({
  label,
  now,
  improved,
}: {
  readonly label: string;
  readonly now: string;
  readonly improved: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-3 py-2.5">
      <dt className="text-[12.5px] leading-snug text-ink/55">{label}</dt>
      <dd className="text-right text-[12.5px] font-medium text-ink tabular-nums">
        {now}
      </dd>
      <dd className="w-[5.5rem] text-right text-[12.5px] font-medium text-brand tabular-nums sm:w-[6.5rem]">
        {improved}
      </dd>
    </div>
  );
}

/**
 * The answer.
 *
 * Three figures first, everything else second. A merchant arriving on this page
 * has one question — is COD costing me enough to be worth doing something about
 * — and the panel answers it in the first two seconds, before it starts showing
 * its work.
 *
 * The supporting table is the working. It is a before/after because a single
 * column of current-state metrics tells a merchant what they already suspect,
 * and the gap between the columns is the actual argument.
 *
 * Every estimated figure is labelled as one, here and in the footnote. The
 * improvement assumptions are inputs on this page rather than claims, so the
 * right-hand column is what *these assumptions* imply, and it says so.
 *
 * The panel closes on the controls that act on the result (§8.4) rather than
 * on a generic install button alone — the answer to "your RTO is costing you
 * ₹64,820 a month" is a specific control, not a homepage.
 */
export function ResultsPanel({ result, targets }: ResultsPanelProps) {
  const { current, improved } = result;

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="space-y-5 p-5 sm:p-6">
        <Headline
          label="COD is costing you"
          value={formatCurrency(current.codLoss.total)}
          caption={`${formatCurrency(result.annualCodLoss)} a year`}
          tone="loss"
        />

        {/*
          Two up from `sm`, stacked below it. Side by side on a 360px phone
          leaves each figure about 135px, which a six-digit rupee amount does
          not fit into — and these two are precisely the numbers that grow
          with the size of the store reading them.
        */}
        <div className="grid gap-4 border-t border-[#ECEFF3] pt-5 sm:grid-cols-2">
          <Headline
            label="Potential savings"
            value={formatCurrency(result.monthlySavings)}
            caption={`${formatCurrency(result.annualSavings)} a year`}
            tone="neutral"
          />
          {/*
            The tone follows the sign rather than the intent. A store whose
            delivered orders already lose money — order value under unit cost —
            gets a *negative* delta here, because delivering more of them costs
            more. That is the correct answer to the numbers entered, and
            painting it brand blue because the column is labelled "estimated"
            would be the calculator telling a merchant a loss is good news.
          */}
          <Headline
            label="Additional profit"
            value={formatCurrency(result.additionalMonthlyProfit)}
            caption={`${formatCurrency(result.additionalAnnualProfit)} a year`}
            tone={result.additionalMonthlyProfit < 0 ? "loss" : "gain"}
          />
        </div>
      </div>

      <div className="border-t border-[#ECEFF3] px-5 pt-4 pb-5 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-3 pb-1">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-ink/35 uppercase">
            Per month
          </p>
          <p className="text-right text-[11px] font-semibold tracking-[0.08em] text-ink/35 uppercase">
            Now
          </p>
          <p className="w-[5.5rem] text-right text-[11px] font-semibold tracking-[0.08em] text-brand/60 uppercase sm:w-[6.5rem]">
            Estimated
          </p>
        </div>

        <dl className="divide-y divide-[#F1F4F8] border-t border-[#F1F4F8]">
          <ComparisonRow
            label="RTO orders"
            now={formatCount(current.rtoOrders)}
            improved={formatCount(improved.rtoOrders)}
          />
          <ComparisonRow
            label="RTO cost"
            now={formatCurrency(current.codLoss.rtoShipping)}
            improved={formatCurrency(improved.codLoss.rtoShipping)}
          />
          <ComparisonRow
            label="Cancelled orders"
            now={formatCount(current.cancelledOrders)}
            improved={formatCount(improved.cancelledOrders)}
          />
          <ComparisonRow
            label="Prepaid share"
            now={formatPercent(current.prepaidSharePct)}
            improved={formatPercent(improved.prepaidSharePct)}
          />
          <ComparisonRow
            label="Delivered orders"
            now={formatCount(current.deliveredOrders)}
            improved={formatCount(improved.deliveredOrders)}
          />
          <ComparisonRow
            label="Revenue"
            now={formatCurrency(current.revenue)}
            improved={formatCurrency(improved.revenue)}
          />
          <ComparisonRow
            label="Net profit"
            now={formatCurrency(current.netProfit)}
            improved={formatCurrency(improved.netProfit)}
          />
        </dl>

        <p className="mt-4 text-[11.5px] leading-relaxed text-ink/40">
          Estimates only, based on the numbers and improvement assumptions you
          entered. Prepaid orders are assumed to deliver, and returned stock is
          assumed to be resellable — so a real month is unlikely to be better
          than this.
        </p>
      </div>

      <div className="border-t border-[#ECEFF3] px-5 py-5 sm:px-6">
        {externalLinks.install ? (
          <Button asChild block size="md">
            <a
              href={externalLinks.install}
              target="_blank"
              rel="noreferrer noopener"
            >
              Install free on Shopify
            </a>
          </Button>
        ) : null}

        {targets.length > 0 ? (
          <div className="mt-4">
            <p className="text-[11.5px] font-medium text-ink/45">
              The controls that act on this
            </p>
            <ul className="mt-2 space-y-1.5">
              {targets.map((control) => (
                <li key={control.slug}>
                  <Link
                    href={routeFor.control(control.slug)}
                    className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink transition-colors hover:text-brand"
                  >
                    {control.name}
                    <ArrowRight
                      aria-hidden
                      className="size-3 text-ink/30 transition-transform duration-200 ease-[var(--ease-emphasized)] group-hover:translate-x-0.5 group-hover:text-brand"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
