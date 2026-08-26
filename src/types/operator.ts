/**
 * The local SMS/WhatsApp operators COD King's operator picker offers (§6.3).
 *
 * This is a different object from `Integration`, and the difference is the
 * whole reason it has a type of its own. An integration answers "does the
 * product work with X?" — a compatibility claim. An operator is a *selectable
 * setting*: it is one row of the dropdown in the COD King dashboard, it
 * carries the coverage the dashboard publishes beside it, and the merchant
 * settles with it directly. Merging the two would let a marketing integration
 * leak into a control that bills the merchant.
 *
 * The records are read straight from the product's own operator picker, so
 * nothing here may be added, renamed or re-scoped without the dashboard doing
 * it first.
 */
import type { BrandLogo } from "@/types/homepage";

export interface SmsOperator {
  readonly slug: string;
  /** Exactly the name the operator picker publishes. */
  readonly name: string;
  /**
   * A second name the operator trades under, where the picker publishes one —
   * "ProWebSms (Smshare)". Kept separate from `name` so the card can set it at
   * a lighter weight instead of running two brands together in one string.
   */
  readonly alias?: string;
  /**
   * The coverage the picker publishes in brackets after the name: "Global",
   * "WhatsApp Global", or a single named market.
   *
   * It is a label rather than a country code on purpose. The dashboard states
   * coverage in exactly these words and the site is not entitled to widen it —
   * an operator listed for Oman is listed for Oman, not for the Gulf.
   */
  readonly coverage: string;
  /** `true` where the picker's coverage is worldwide rather than one market. */
  readonly worldwide: boolean;
  /**
   * The operator's own supplied mark.
   *
   * Optional, and the card degrades to a monogram without it — the same rule
   * the integrations board follows, for the same reason: a wrong logo is worse
   * than no logo, and a monogram is at least honest about being a placeholder
   * until the operator's file arrives.
   */
  readonly logo?: BrandLogo;
}

/** One market, with the operators the picker lists for it. */
export interface SmsOperatorGroup {
  readonly coverage: string;
  readonly operators: readonly SmsOperator[];
}
