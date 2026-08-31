/**
 * Number formatting for merchant-facing figures.
 *
 * The formatters are module-level constants rather than built per call:
 * `Intl.NumberFormat` construction is the expensive part, and the calculator
 * re-renders on every keystroke.
 *
 * All three are locale-fixed to `en-IN`. That is deliberate — the figures are
 * rupees on the Indian lakh/crore grouping, and letting them follow the
 * visitor's locale would mean the server and the browser could format the same
 * number two different ways and trip a hydration mismatch.
 */

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const countFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

const ratingFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** Whole rupees. Fractions of a rupee are noise at these magnitudes. */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

/**
 * A count of orders.
 *
 * The model works in fractional orders — 24.6% of 644 shipments is not a whole
 * number — and rounding inside the engine would compound the error across every
 * downstream line. So the rounding happens here, at the last possible moment,
 * and only for the reader.
 */
export function formatCount(value: number): string {
  return countFormatter.format(Number.isFinite(value) ? Math.round(value) : 0);
}

/**
 * An App Store rating, always to one decimal place.
 *
 * A store rating is written with its tenth everywhere on the internet — 4.9,
 * 5.0 — and a bare "5" beside "962+ verified reviews" reads as a rounded
 * number somebody typed rather than as a score. The repository holds the
 * rating as a number, so this is the only place the trailing zero exists.
 */
export function formatRating(value: number): string {
  return ratingFormatter.format(Number.isFinite(value) ? value : 0);
}

/** One decimal place, because a rate of "24%" and "24.4%" are different bets. */
export function formatPercent(value: number): string {
  return `${decimalFormatter.format(Number.isFinite(value) ? value : 0)}%`;
}
