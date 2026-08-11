/**
 * The COD fee being applied, shared by the checkout panel and the status cards
 * beside it.
 *
 * Held here rather than inside either component because both have to be on the
 * same beat: a card cannot say "COD fee applied" while the order summary is
 * still showing the prepaid total, and two components running two copies of one
 * timeline start together and drift apart over a few loops.
 *
 * Nothing here is JSX or copy the page owns — it is the mock the scene plays,
 * which is why it sits beside the scene rather than in `src/data`. The scene is
 * reusable across surfaces; a component in `components/product` reaching into
 * one page's data file is the coupling that folder exists to prevent.
 */

/**
 * The order at the checkout, as one object so the summary can never disagree
 * with itself.
 *
 * The totals are derived rather than typed, which is how a mock ends up
 * claiming a ₹2,499 subtotal, a ₹49 fee and a ₹2,499 total that does not add
 * up. A visitor can check the arithmetic in the second the beat holds, and a
 * demonstration that fails that check is worse than no demonstration.
 *
 * ── The fee is an example, not a default ──────────────────────────────────
 * ₹49 is a number a merchant picked in this mock, and the panel labels it
 * "Configured by merchant" so nothing on screen can be read as a rate COD King
 * sets, charges or recommends. The product's own example on its COD Fees page
 * is a different number for the same reason.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const ORDER = {
  item: "Meridian cotton shirt",
  variant: "Ecru · M",
  quantity: 1,
  subtotal: 2499,
  shipping: 0,
  codFee: 49,
} as const;

/** What the buyer pays online — no cash on delivery, so no COD fee. */
export const PREPAID_TOTAL = ORDER.subtotal + ORDER.shipping;

/** What the buyer pays on delivery, once the merchant's fee is applied. */
export const COD_TOTAL = PREPAID_TOTAL + ORDER.codFee;

export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Four beats, and each one is a stage of the same decision.
 *
 * Beat 0 is what renders on the server and on a browser that never runs the
 * script, so it has to be a legible frame in its own right: a real checkout
 * with both ways to pay on it, online payment selected, and a total that is
 * correct without a fee because no fee applies yet.
 *
 * Choosing cash on delivery and the fee landing are two beats rather than one.
 * Collapsing them would show a checkout that simply arrives with a surcharge on
 * it, which is a screenshot of the outcome rather than a demonstration of the
 * mechanism — and the mechanism is the entire transparency claim.
 *
 * The fee and the total move on the *same* beat, though, and deliberately: a
 * frame in which the summary lists a fee the total has not absorbed is a frame
 * where the arithmetic is wrong, however briefly.
 *
 * The resolved beat holds longest because it is the only one the whole sequence
 * exists to reach, and it is where the timeline parks under reduced motion —
 * the fee applied, the total updated, and online payment still on the checkout
 * without one.
 */
export const BEATS = [
  { id: "prepaid", ms: 2300 },
  { id: "chose-cod", ms: 1400 },
  { id: "fee", ms: 1700 },
  { id: "choice", ms: 3200 },
] as const;

export const DURATIONS = BEATS.map((beat) => beat.ms);

/** Named indices, so no component compares against a bare number. */
export const PREPAID_STEP = 0;
export const CHOSE_COD_STEP = 1;
export const FEE_STEP = 2;
export const CHOICE_STEP = 3;
