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

/**
 * The problem section's own copy (§5.1 #4).
 *
 * Held in the repository rather than typed into the component because it is
 * the argument the whole section makes, not chrome around it — and because the
 * closing line is a claim about what a failed delivery costs, which is exactly
 * the kind of sentence marketing has to be able to change without a developer.
 */
export interface PainPointsCopy {
  readonly title: string;
  readonly description: string;
  /** The single line under the section, stated as a cost. */
  readonly callout: string;
}

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
  /**
   * The figure as rendered, which is not always the figure as stored: ten
   * million orders is carried here as `10` with an `M+` suffix. Compaction
   * happens where the number is prepared for display, never in the repository.
   */
  readonly value: number;
  readonly suffix?: string;
  readonly label: string;
  /**
   * One sentence saying what the figure actually counts.
   *
   * A number and a two-word label can be read as almost anything, and a scale
   * band without this becomes four impressive quantities of nothing in
   * particular. This is the line that makes each one a claim.
   */
  readonly caption: string;
  readonly decimalPlaces?: number;
  /** Selects the icon in the section — art, not content. */
  readonly icon: "store" | "orders" | "globe" | "uptime";
}

/** A step in the setup sequence (§5.1 #7). */
export interface HowItWorksStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/**
 * A store's supplied logo artwork.
 *
 * `width` and `height` are the *rendered* box on the logo wall, not the file's
 * intrinsic pixels. Two things are being carried at once: the exact aspect
 * ratio, so the row reserves the right space and never shifts as the images
 * arrive; and the optical size, which is not the same for every mark. A single
 * uppercase wordmark set to the same height as a stacked lockup looks a third
 * larger than it is, so each box is balanced by eye against the others rather
 * than by a shared height — which is the difference between a logo wall and a
 * row of images.
 */
export interface BrandLogo {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

/**
 * A named store using the product, shown as a trust signal (§5.1 #3).
 *
 * `id` is kept separate from both the name and the artwork so a store can be
 * renamed, or have its logo replaced, without the other two changing.
 *
 * `logo` is optional on purpose: a store whose artwork has not arrived yet
 * renders as a set wordmark rather than as a gap, so adding a merchant is
 * never blocked on a file.
 */
export interface TrustedBrand {
  readonly id: string;
  readonly name: string;
  readonly logo?: BrandLogo;
}
