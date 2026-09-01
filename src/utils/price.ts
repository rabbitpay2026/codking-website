import type { PlanAmount, PlanPrice } from "@/types";

export interface FormattedPrice {
  /** The amount as displayed, e.g. "₹899", "₹0", "Free", "—". */
  readonly amount: string;
  /**
   * The billing period in its compact form, e.g. "/month". `null` when there
   * is nothing recurring to bill, which is what keeps "₹0" out of a table
   * header reading "₹0 /forever".
   */
  readonly period: string | null;
  /**
   * The same period written out, e.g. "per month" or "Forever" — the plan
   * cards' wording, kept beside the compact form so the table header and the
   * card can each print the one that fits without either re-deriving it.
   */
  readonly periodLabel: string | null;
  /** The struck-through list price, e.g. "₹1,299". `null` when undiscounted. */
  readonly previousAmount: string | null;
  /** The saving, e.g. "Save ₹400/month". `null` when undiscounted. */
  readonly savings: string | null;
  /** The second-currency equivalent, e.g. "$9.99 USD". */
  readonly secondary: string | null;
}

/**
 * Formats one amount in its own currency.
 *
 * Fraction digits follow the amount: ₹899 rather than ₹899.00, but $9.99 in
 * full. A price list where one figure carries cents and its neighbour carries
 * two zeroes reads as two different scales rather than one.
 */
function formatAmount({ amount, currency }: PlanAmount): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

const periodLabels = {
  month: { compact: "/month", spelled: "per month" },
  year: { compact: "/year", spelled: "per year" },
  /*
    No compact form. "/forever" is not a billing period a merchant reads as a
    reassurance — it reads as a typo — so the free plan prints "Forever" on the
    card and nothing at all in the comparison header.
  */
  forever: { compact: null, spelled: "Forever" },
} as const;

const empty = {
  previousAmount: null,
  savings: null,
  secondary: null,
} as const;

/**
 * Formats a plan price for display.
 *
 * Held here rather than in the data, so the amount stays a number that can be
 * compared and re-formatted per locale instead of a string that has to be
 * parsed back apart — and so the plan cards, the comparison table header and
 * the homepage teaser all print it identically.
 */
export function formatPlanPrice(price: PlanPrice | null): FormattedPrice {
  if (!price) {
    return { amount: "—", period: null, periodLabel: null, ...empty };
  }

  switch (price.kind) {
    case "free":
      return { amount: "Free", period: null, periodLabel: null, ...empty };
    case "custom":
      return { amount: "Custom", period: null, periodLabel: null, ...empty };
    case "fixed": {
      const { compact, spelled } = periodLabels[price.period];

      return {
        amount: formatAmount(price),
        period: compact,
        periodLabel: spelled,
        previousAmount:
          price.previousAmount === undefined
            ? null
            : formatAmount({
                amount: price.previousAmount,
                currency: price.currency,
              }),
        savings: price.savingsLabel ?? null,
        secondary: price.secondary
          ? `${formatAmount(price.secondary)} ${price.secondary.currency}`
          : null,
      };
    }
  }
}
