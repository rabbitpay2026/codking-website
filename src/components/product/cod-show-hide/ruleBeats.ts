/**
 * The rule evaluation, shared by the rule card and the checkout under it.
 *
 * Held here rather than inside either component because both have to be on the
 * same beat: the card cannot say "rule matched" while the checkout is still
 * offering cash on delivery, and two components running two copies of one
 * timeline start together and drift apart over a few loops.
 *
 * Nothing here is JSX or copy the page owns — it is the mock the scene plays,
 * which is why it sits beside the scene rather than in `src/data`. The scene
 * is reusable across surfaces; a component in `components/product` reaching
 * into one page's data file is the coupling that folder exists to prevent.
 */

/**
 * The rule the merchant wrote, as one object so the card and the checkout
 * cannot quote different conditions.
 *
 * An order-value rule rather than a pin-code one, and deliberately: the
 * threshold and the order total are both on screen, so a visitor can *check
 * the arithmetic themselves* in the second the beat holds. A pin code matching
 * a list they cannot see would ask them to take the match on trust, which is
 * the one thing a demonstration must never do.
 */
export const RULE = {
  field: "Order value",
  comparator: "is over",
  threshold: 5000,
  action: "Hide COD",
} as const;

/**
 * The order being evaluated.
 *
 * Its total clears the threshold, so the rule fires. Anything else and the
 * scene would be a rule engine demonstrating that nothing happened.
 */
export const ORDER = {
  item: "Kalindi silk saree",
  variant: "Indigo · Bengaluru 560001",
  total: 6400,
} as const;

export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Four beats, and each one is a stage of the decision.
 *
 * Checking and matching are two beats rather than one, because the product
 * describes this control as an engine that *decides*: collapsing them would
 * show a checkout that simply arrives without cash on delivery, which is a
 * screenshot rather than a mechanism.
 *
 * Beat 0 is what renders on the server and on a browser that never runs the
 * script, so it has to be a legible frame in its own right: a real checkout
 * with both ways to pay on it and the merchant's rule sitting above, unfired.
 *
 * The resolved beat holds longest because it is the only one the whole
 * sequence exists to reach, and it is where the timeline parks under reduced
 * motion — the rule matched, cash on delivery gone, online payment selected.
 */
export const BEATS = [
  { id: "offered", ms: 2200 },
  { id: "checking", ms: 1300 },
  { id: "matched", ms: 1500 },
  { id: "hidden", ms: 3200 },
] as const;

export const DURATIONS = BEATS.map((beat) => beat.ms);

/** Named indices, so no component compares against a bare number. */
export const OFFERED_STEP = 0;
export const CHECKING_STEP = 1;
export const MATCHED_STEP = 2;
export const HIDDEN_STEP = 3;
