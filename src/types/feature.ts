/**
 * The shapes every feature page (§6.3) is composed from.
 *
 * The control record in `src/types/controls.ts` stays the single source for
 * what a control *is* — its name, its outcome line and its published benefits.
 * These are the page's own composition: the order of the argument it makes,
 * and the copy that only exists because the page exists.
 *
 * Deliberately shared rather than one set per page. OTP Verification and
 * Partial COD Payment already make the same argument in the same order — what
 * it is, how it runs, what it is worth, what else it does, who it is for — and
 * a second set of identical interfaces named after the second page would mean
 * every later page inventing a third.
 *
 * Nothing here carries an icon. Icons are presentation, so they are mapped
 * from these ids inside the components that render them — changing a line of
 * copy should never mean picking art.
 */

/** One item in a feature hero's two-column checklist. */
export interface FeatureCheckpoint {
  readonly id: string;
  readonly label: string;
}

/** One beat of the "how it works" rail — a numbered step in a flow. */
export interface FeatureFlowStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/**
 * One block of the outcomes band.
 *
 * `value` is the display string rather than a number and a suffix, because
 * these are stated as the product states them — as ceilings ("Up to 35%") and
 * ranges ("2–3×"), not as averages a merchant would read as a promise (§10.1).
 * `caption` is where that qualification is written out.
 */
export interface FeatureOutcome {
  readonly id: string;
  readonly title: string;
  readonly value: string;
  readonly body: string;
}

/** One stage of the before / during / after checkout walkthrough. */
export interface CheckoutStage {
  readonly id: "before" | "verify" | "after";
  readonly title: string;
  readonly body: string;
}

/**
 * One entry in a capability row or a key-features grid.
 *
 * The same three fields carry both, and deliberately so: a capability and a
 * key feature are the same claim at two densities, and the difference is how
 * the section draws them, not what they hold.
 */
export interface FeatureCapability {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/**
 * One kind of store a control is a particularly good fit for.
 *
 * `note` is the parenthetical the blueprint sets under the name — the examples
 * that make an abstract category concrete ("T-shirts, mugs"). Optional,
 * because two of these are already concrete and inventing examples for them
 * would be padding.
 */
export interface AudienceSegment {
  readonly id: string;
  readonly title: string;
  readonly note?: string;
}
