import type { ControlSlug } from "@/types/controls";

/** The three plans named in the architecture (§5.1 #9, §9.3). */
export const PLAN_IDS = ["standard", "professional", "enterprise"] as const;

export type PlanId = (typeof PLAN_IDS)[number];

/**
 * A plan's commercial terms.
 *
 * Modelled as a discriminated union rather than a formatted string, so the UI
 * can render "Free", an amount, or "Custom" without parsing copy — and so a
 * currency or period change never means editing markup.
 */
export type PlanPrice =
  | { readonly kind: "free" }
  | {
      readonly kind: "fixed";
      readonly amount: number;
      readonly currency: string;
      readonly period: "month" | "year";
    }
  | { readonly kind: "custom" };

/**
 * Every row of the comparison table, as a closed union.
 *
 * A plan highlight points at one of these ids to borrow its value, so a
 * percentage printed on a card and the same percentage printed in the table
 * are one declaration read twice rather than two numbers kept in step by hand.
 */
export const PRICING_FEATURE_IDS = [
  "otp-verification",
  "abandoned-cart-recovery",
  "partial-payment",
  "cod-fees",
  "cod-rules",
  "order-notifications",
  "notification-discount",
  "unlimited-orders",
  "setup-assistance",
  "local-sms-gateway",
  "account-manager",
  "support",
] as const;

export type PricingFeatureId = (typeof PRICING_FEATURE_IDS)[number];

/**
 * What one plan gets for one feature.
 *
 * `true` renders as a tick, `false` as a dash, and a string as itself — which
 * is how "1%", "1-to-1" and "24/7 Priority" share a column with the ticks
 * without a second field to say which kind of cell this is.
 */
export type PlanFeatureValue = boolean | string;

export interface PricingFeature {
  readonly id: PricingFeatureId;
  /** Row label in the comparison table, e.g. "Partial Payment". */
  readonly label: string;
  readonly values: Readonly<Record<PlanId, PlanFeatureValue>>;
}

/**
 * One line in a plan card's feature list.
 *
 * The label is the card's own wording — "24/7 Priority Support" reads better
 * on a card than the table's "Support" — but any *value* it shows is read from
 * the comparison matrix through `feature`, never retyped. A highlight with no
 * `feature` is copy the table has no row for, such as "Everything in
 * Standard".
 */
export interface PlanHighlight {
  readonly label: string;
  readonly feature?: PricingFeatureId;
  /**
   * Shows this plan's matrix value as a pill beside the label.
   *
   * Opt-in, because only the two percentage rows earn one: printing every
   * string value would put "1-to-1" in a pill next to a label that already
   * says it.
   */
  readonly showValue?: boolean;
}

export interface PricingPlan {
  readonly id: PlanId;
  readonly name: string;
  /** One line under the name, e.g. "For growing businesses". */
  readonly tagline: string;
  /**
   * `null` until commercial terms are signed off. Kept explicit rather than
   * defaulted, so an unpriced plan cannot silently render as free.
   */
  readonly price: PlanPrice | null;
  /**
   * Which controls this plan unlocks. The plan-to-control relationship is
   * declared once, here, and read in reverse by the control pages (§6.3
   * "which plan it needs") so the two can never disagree.
   */
  readonly controlSlugs: readonly ControlSlug[];
  /**
   * What the plan adds, in the merchant's terms.
   *
   * Held on the plan rather than in a keyed map beside it, so a plan cannot
   * be added without its selling points and the two cannot fall out of step.
   */
  readonly highlights: readonly PlanHighlight[];
  /** Leads the pricing preview and carries the emphasis treatment (§5.1 #9). */
  readonly recommended: boolean;
}

/**
 * The "which plan is right for you?" band.
 *
 * Keyed to a plan rather than free-standing copy, so the three columns can
 * never describe a plan that no longer exists.
 */
export interface PlanFit {
  readonly planId: PlanId;
  /** Stage label, e.g. "Growing". */
  readonly title: string;
  readonly description: string;
}

/** One card in the "what you get" band, named for the control it describes. */
export interface PricingBenefit {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export type MessageChannel = "sms" | "whatsapp";

/**
 * Per-message cost for one gateway and channel (§3.1, §5.1 #9).
 *
 * `gatewaySlug` is a plain string rather than a closed union because the
 * supported gateway list is owned by the Integrations content set, which is
 * populated in a later phase.
 */
export interface MessageRate {
  readonly gatewaySlug: string;
  readonly channel: MessageChannel;
  readonly amount: number;
  readonly currency: string;
}
