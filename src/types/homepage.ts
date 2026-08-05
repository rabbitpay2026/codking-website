import type { ControlSlug } from "@/types/controls";

import type { Route } from "next";

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

/** A step in the setup sequence (§5.1 #7). */
export interface HowItWorksStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/** A named store using the product, shown as a trust signal (§5.1 #3). */
export interface TrustedBrand {
  readonly name: string;
}

/**
 * One panel of the interactive product preview.
 *
 * Each panel is tied to a control, so the preview cannot drift from the
 * feature set and every panel has somewhere to send an interested merchant.
 */
export interface ProductPreviewPanel {
  readonly controlSlug: ControlSlug;
  readonly label: string;
  readonly headline: string;
  readonly body: string;
  readonly href: Route;
}
