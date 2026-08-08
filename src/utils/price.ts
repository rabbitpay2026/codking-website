import type { PlanPrice } from "@/types";

export interface FormattedPrice {
  /** The amount as displayed, e.g. "$7.99", "Free", "—". */
  readonly amount: string;
  /** The billing period, e.g. "/month". `null` when there is nothing to bill. */
  readonly period: string | null;
}

/**
 * Formats a plan price for display.
 *
 * Held here rather than in the data, so the amount stays a number that can be
 * compared and re-formatted per locale instead of a string that has to be
 * parsed back apart — and so the plan cards, the comparison table header and
 * the homepage teaser all print it identically.
 *
 * Fraction digits follow the amount: $39 rather than $39.00, but $7.99 in
 * full. A price list where one figure carries cents and its neighbour carries
 * two zeroes reads as three different prices rather than one scale.
 */
export function formatPlanPrice(price: PlanPrice | null): FormattedPrice {
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
        period: `/${price.period}`,
      };
  }
}
