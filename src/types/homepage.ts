import type { ControlSlug } from "@/types/controls";

/**
 * Homepage content types.
 *
 * The homepage's job is to turn a vague worry into a clear picture and then
 * get the install (§5), so its content is modelled as data for the same
 * reason as everything else in §11: the same claim must not be retyped on the
 * pages that reuse it, and marketing must be able to change a number without
 * a developer.
 */

/** One of the hidden costs of COD, made visible (§5.1 #4). */
export interface PainPoint {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  /** The control that removes this cost, so the problem always names its fix. */
  readonly controlSlug: ControlSlug;
}

/**
 * A published result figure.
 *
 * `value` and `suffix` are separate so the number can be animated and
 * formatted by locale while the unit stays put.
 */
export interface OutcomeMetric {
  readonly id: string;
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label: string;
  readonly caption: string;
  /** Rendered as a decimal, e.g. a 4.9 rating. */
  readonly decimalPlaces?: number;
}

/**
 * One figure in the platform-scale band directly under the trust strip.
 *
 * Separate from `OutcomeMetric` because the two answer different questions.
 * A platform stat says how big this is; an outcome metric says what it did for
 * a store, and therefore has to carry the condition it holds under.
 */
export interface PlatformStat {
  readonly id: string;
  readonly value: number;
  readonly suffix?: string;
  readonly label: string;
  readonly decimalPlaces?: number;
  /** Selects the icon in the section — art, not content. */
  readonly icon: "globe" | "store" | "timer";
}

/** A step in the setup sequence (§5.1 #7). */
export interface HowItWorksStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/**
 * A named store using the product, shown as a trust signal (§5.1 #3).
 *
 * `id` selects the store's lockup on the logo wall. It is kept separate from
 * the name so artwork can arrive — or be replaced with the merchant's own
 * supplied file — without the display name changing, and so a store with no
 * lockup yet still renders as a set wordmark rather than as a gap.
 */
export interface TrustedBrand {
  readonly id: string;
  readonly name: string;
}
