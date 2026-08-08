"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { routeFor } from "@/constants/routes";
import { formatCount, formatCurrency, formatPercent } from "@/utils";

import type { CalculatorResult, ResolvedCalculatorPathway } from "@/types";

import type { ReactNode } from "react";

interface SolutionPathwaysProps {
  readonly result: CalculatorResult;
  readonly pathways: readonly ResolvedCalculatorPathway[];
}

/** A Now → Estimated pair, or a single standalone figure. */
interface Metric {
  readonly label: string;
  readonly now: string;
  readonly estimated?: string;
  readonly emphasis?: boolean;
}

function MetricRow({ metric }: { readonly metric: Metric }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <p className="text-[12px] leading-snug text-ink/50">{metric.label}</p>
      <p className="flex shrink-0 items-baseline gap-1.5 tabular-nums">
        <span className="text-[13px] font-medium text-ink">{metric.now}</span>
        {metric.estimated ? (
          <>
            <ArrowRight aria-hidden className="size-3 text-ink/25" />
            <span
              className={
                metric.emphasis
                  ? "text-[13px] font-semibold text-brand"
                  : "text-[13px] font-medium text-brand"
              }
            >
              {metric.estimated}
            </span>
          </>
        ) : null}
      </p>
    </div>
  );
}

function Column({
  eyebrow,
  children,
}: {
  readonly eyebrow: string;
  readonly children: ReactNode;
}) {
  return (
    <div className="px-5 py-4 sm:px-6">
      <p className="text-[10.5px] font-semibold tracking-[0.1em] text-ink/30 uppercase">
        {eyebrow}
      </p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

/**
 * Read the figures for one pathway out of the result.
 *
 * Kept as a lookup rather than folded into the data layer, because what a
 * pathway *shows* is a property of the model, not of the copy — the RTO route
 * argues in orders, the prepaid route in share and value, and the exposure
 * route deliberately does not argue in money at all.
 *
 * Every Now → Estimated pair reads `current` against `improved`, the same two
 * scenarios the comparison table uses, so a figure cannot appear twice on this
 * page with two different values.
 */
function metricsFor(
  id: ResolvedCalculatorPathway["id"],
  result: CalculatorResult,
): {
  readonly leak: { label: string; value: string; caption: string } | null;
  readonly metrics: readonly Metric[];
} {
  const { current, improved } = result;

  if (id === "rto") {
    return {
      leak: {
        label: "Your estimated RTO loss",
        value: formatCurrency(current.leakage.rto),
        caption: "per month",
      },
      metrics: [
        {
          label: "RTO orders",
          now: formatCount(current.rtoOrders),
          estimated: formatCount(improved.rtoOrders),
        },
        {
          label: "Potential reduction",
          now: `${formatCount(current.rtoOrders - improved.rtoOrders)} orders`,
          emphasis: true,
        },
        {
          label: "RTO cost",
          now: formatCurrency(current.leakage.rto),
          estimated: formatCurrency(improved.leakage.rto),
        },
      ],
    };
  }

  if (id === "prepaid") {
    return {
      leak: {
        label: "Your COD orders at risk",
        value: formatCount(current.codOrders),
        caption: "COD orders per month",
      },
      metrics: [
        {
          label: "Prepaid share",
          now: formatPercent(current.prepaidSharePct),
          estimated: formatPercent(improved.prepaidSharePct),
        },
        {
          label: "Additional prepaid orders",
          now: formatCount(improved.prepaidOrders - current.prepaidOrders),
          emphasis: true,
        },
        {
          /*
            The one figure on this page taken from a lever rather than from the
            combined estimate. It has to be: nothing else isolates what moving
            orders to prepaid is worth on its own. The label carries that
            caveat, because the number is larger than this pathway's share of
            the total — the levers overlap and do not decompose it.
          */
          label: "Profit impact, this change alone",
          now: formatCurrency(result.levers.prepaid.profitImpact),
        },
      ],
    };
  }

  return {
    leak: {
      label: "Your current COD exposure",
      value: formatCount(current.codOrders),
      caption: "COD orders per month",
    },
    metrics: [
      {
        label: "Share of all orders",
        now: formatPercent(100 - current.prepaidSharePct),
      },
      {
        label: "Cancelled before dispatch",
        now: `${formatCount(current.cancelledOrders)} orders`,
      },
    ],
  };
}

/**
 * The connection between a leak and a control (steps four and five).
 *
 * This is the section the page was missing. A merchant who reads "potential
 * savings ₹25,976" and cannot say where it would come from has been shown a
 * number, not an argument — so each row runs left to right as the leak, the
 * control that acts on it, and what the merchant's own figures do under the
 * assumptions they chose.
 *
 * Three columns on desktop and a stack on mobile, divided by hairlines rather
 * than split into separate cards. The three parts are one sentence; boxing each
 * of them would say they are three things that happen to be adjacent.
 *
 * The exposure pathway ends without a rupee figure on purpose. The engine
 * models what COD costs, not what a rule would have prevented, and giving the
 * third row an invented number to match the shape of the first two is exactly
 * the claim this page must not make.
 */
export function SolutionPathways({ result, pathways }: SolutionPathwaysProps) {
  return (
    <section aria-labelledby="help-heading" className="mt-10">
      <h2
        id="help-heading"
        className="text-[1.35rem] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-[1.5rem]"
      >
        How COD King can help
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink/50">
        Each leak above has a control that acts on it. The figures are your own,
        under the improvement assumptions you selected.
      </p>

      <ol className="mt-4 space-y-3">
        {pathways.map((pathway, index) => {
          const { leak, metrics } = metricsFor(pathway.id, result);

          return (
            <li
              key={pathway.id}
              className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
            >
              <div className="flex items-baseline gap-2.5 border-b border-[#F1F4F8] bg-sky-50 px-5 py-3 sm:px-6">
                <span className="text-[12px] font-semibold text-brand tabular-nums">
                  {index + 1}
                </span>
                <h3 className="text-[14px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                  {pathway.title}
                </h3>
              </div>

              <div className="grid divide-y divide-[#F1F4F8] md:grid-cols-3 md:divide-x md:divide-y-0">
                <Column eyebrow="The leak">
                  {leak ? (
                    <>
                      <p className="text-[11.5px] text-ink/45">{leak.label}</p>
                      <p className="mt-1 text-[1.15rem] leading-none font-semibold tracking-[-0.02em] text-[#B42318] tabular-nums">
                        {leak.value}
                      </p>
                      <p className="mt-1.5 text-[11px] leading-none text-ink/35">
                        {leak.caption}
                      </p>
                    </>
                  ) : null}
                  <p className="mt-2.5 text-[12px] leading-snug text-ink/45">
                    {pathway.problem}
                  </p>
                </Column>

                <Column eyebrow="COD King control">
                  <p className="text-[13.5px] leading-none font-semibold text-ink">
                    {pathway.controlName}
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-ink/50">
                    {pathway.explanation}
                  </p>
                  <Link
                    href={routeFor.control(pathway.controlSlug)}
                    className="group mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-brand transition-colors hover:text-brand-deep"
                  >
                    See {pathway.controlName}
                    <ArrowRight
                      aria-hidden
                      className="size-3 transition-transform duration-200 ease-[var(--ease-emphasized)] group-hover:translate-x-0.5"
                    />
                  </Link>
                </Column>

                <Column eyebrow="Estimated impact">
                  <div className="divide-y divide-[#F5F7FA]">
                    {metrics.map((metric) => (
                      <MetricRow key={metric.label} metric={metric} />
                    ))}
                  </div>

                  {pathway.id === "exposure" ? (
                    <p className="mt-2.5 text-[11.5px] leading-snug text-ink/40">
                      This calculator does not estimate a rupee value for COD
                      rules. They reduce how much risky COD you take on, which
                      changes the inputs above rather than the outputs.
                    </p>
                  ) : null}
                </Column>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
