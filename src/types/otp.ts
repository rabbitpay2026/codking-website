/**
 * The OTP Verification feature page (§6.3).
 *
 * The control record in `src/types/controls.ts` stays the single source for
 * what OTP Verification *is* — its name, its outcome line and its published
 * benefits. These shapes are the page's own composition: the order of the
 * argument it makes, and the copy that only exists because this page exists.
 *
 * Nothing here carries an icon. Icons are presentation, so they are mapped
 * from these ids inside the components that render them — changing a line of
 * copy should never mean picking art.
 *
 * The five remaining feature pages are built from the same shapes, which is
 * why the names are `Feature*` rather than `Otp*` wherever the shape is not
 * specific to verification.
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

/** One entry in the compact capability row. */
export interface FeatureCapability {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}
