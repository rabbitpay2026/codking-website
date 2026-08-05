/**
 * The Controls domain — the centre of the site.
 *
 * Website Architecture §6: the product's features are grouped by *when they act
 * in the order*, not by category. This one grouping decides the mega-menu, the
 * homepage system section, the feature pages and the footer (§6, §11), so it is
 * modelled once here and derived everywhere else.
 */

/** The four order stages, in the sequence a merchant experiences them (§6.1). */
export const ORDER_STAGE_IDS = [
  "before-the-order",
  "at-the-order",
  "after-the-order",
  "across-the-store",
] as const;

export type OrderStageId = (typeof ORDER_STAGE_IDS)[number];

export interface OrderStage {
  readonly id: OrderStageId;
  /** Display name, e.g. "Before the order". */
  readonly label: string;
  /** The problem this stage addresses — the §6.1 "problem here" column. */
  readonly problem: string;
}

/**
 * Every control slug, matching the URLs in the §3 sitemap exactly.
 *
 * Declared as a const tuple so `ControlSlug` is a closed union: a typo in a
 * link, a related-control reference or a plan mapping is a compile error.
 */
export const CONTROL_SLUGS = [
  "cod-rules",
  "cod-fees",
  "prepaid-nudge",
  "otp-verification",
  "partial-cod-payment",
  "address-validation",
  "abandoned-cart-recovery",
  "order-verification",
  "messaging-gateways",
  "analytics",
] as const;

export type ControlSlug = (typeof CONTROL_SLUGS)[number];

export interface Control {
  readonly slug: ControlSlug;
  /** Display name, e.g. "OTP Verification". */
  readonly name: string;
  readonly stage: OrderStageId;
  /**
   * The single outcome this control delivers, in one line.
   * Rendered in the mega-menu (§4.1) and on control cards (§12).
   */
  readonly outcome: string;
  /** Highlighted in the homepage "Key controls in focus" section (§5.1 #6). */
  readonly featured: boolean;
  /**
   * What the merchant actually gets, as published on the product site.
   *
   * Optional because only the controls the product markets today have
   * documented benefits; the remainder carry their outcome line alone until
   * copy exists. Reused by the homepage feature showcase and, later, by the
   * control page template (§6.3).
   */
  readonly benefits?: readonly string[];
}
