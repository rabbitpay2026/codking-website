import type { ControlSlug } from "@/types/controls";

/**
 * The four plans the COD King dashboard sells (§5.1 #9, §9.3).
 *
 * Ordered cheapest first, which is the order every surface prints them in —
 * the cards, the comparison columns, the plan-fit band and llms.txt all read
 * this list rather than each declaring an order of their own.
 */
export const PLAN_IDS = [
  "free",
  "pro",
  "enterprise",
  "enterprise-plus",
] as const;

export type PlanId = (typeof PLAN_IDS)[number];

/**
 * A price in one currency, as a number rather than a formatted string.
 *
 * Kept unformatted so the display currency and locale stay a rendering
 * decision, and so a "was" price can be compared against a "now" price rather
 * than parsed back out of copy.
 */
export interface PlanAmount {
  readonly amount: number;
  readonly currency: string;
}

/**
 * A plan's commercial terms.
 *
 * Modelled as a discriminated union rather than a formatted string, so the UI
 * can render "Free", an amount, or "Custom" without parsing copy — and so a
 * currency or period change never means editing markup.
 *
 * `period: "forever"` is what the free plan bills on: ₹0 charged for as long
 * as the store keeps the app is still an amount, so it stays a `fixed` price
 * with a period that says so rather than becoming a kind of its own that
 * loses the figure the dashboard prints.
 */
export type PlanPrice =
  | { readonly kind: "free" }
  | {
      readonly kind: "fixed";
      readonly amount: number;
      readonly currency: string;
      readonly period: "month" | "year" | "forever";
      /**
       * The list price this plan is discounted from. Optional, because a plan
       * with no promotion has nothing to strike through.
       */
      readonly previousAmount?: number;
      /** The saving, in the dashboard's own words, e.g. "Save ₹400/month". */
      readonly savingsLabel?: string;
      /** The same price in a second currency, shown under the primary one. */
      readonly secondary?: PlanAmount;
    }
  | { readonly kind: "custom" };

/**
 * Every row of the comparison table, as a closed union.
 *
 * A plan highlight points at one of these ids to borrow its value, so a rate
 * printed on a card and the same rate printed in the table are one
 * declaration read twice rather than two numbers kept in step by hand.
 */
export const PRICING_FEATURE_IDS = [
  "otp-verification",
  "sms-rate",
  "whatsapp-rate",
  "notification-discount",
  "partial-payment",
  "order-notifications",
  "abandoned-cart-recovery",
  "cod-fees",
  "cod-rules",
  "whatsapp-own-brand",
  "whatsapp-widget",
  "onepass",
  "sender-id",
  "analytics",
  "data-export",
  "checkout-otp",
  "remove-branding",
  "local-sms-gateway",
  "account-manager",
  "unlimited-orders",
  "support",
] as const;

export type PricingFeatureId = (typeof PRICING_FEATURE_IDS)[number];

/**
 * What one plan gets for one feature.
 *
 * `true` renders as a tick, `false` as a dash, and a string as itself — which
 * is how "₹0.85", "1.5%" and "Priority technical" share a column with the
 * ticks without a second field to say which kind of cell this is.
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
 * The label is the card's own wording — "Enterprise SMS rates" reads better on
 * a card than the table's "SMS rate" — but any *value* it shows is read from
 * the comparison matrix through `feature`, never retyped. A highlight with no
 * `feature` is copy the table has no row for, such as "All Free plan features
 * included".
 */
export interface PlanHighlight {
  readonly label: string;
  readonly feature?: PricingFeatureId;
  /**
   * Shows this plan's matrix value as a pill beside the label.
   *
   * Opt-in, because only the rate and percentage rows earn one: printing every
   * string value would put "Priority technical" in a pill next to a label that
   * already says it.
   */
  readonly showValue?: boolean;
  /**
   * The unit the pill is quoted in, printed straight after it — "per message",
   * or "transaction fee per order".
   *
   * Held apart from the value so the number stays the single declaration the
   * table shares, while the card still reads as the sentence the dashboard
   * writes rather than as a label and a bare figure.
   */
  readonly valueSuffix?: string;
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
  /**
   * What the plan adds for an Indian store specifically.
   *
   * A separate list rather than more highlights, because the dashboard prints
   * them under their own sub-heading — they answer "is this built for my
   * market", which is a different question from "what do I get".
   */
  readonly marketBenefits?: readonly string[];
  /** The line closing the card, e.g. "No setup fees". */
  readonly footnote?: string;
  /** The card's button, in the dashboard's own words. */
  readonly ctaLabel: string;
  /** Leads the pricing preview and carries the emphasis treatment (§5.1 #9). */
  readonly recommended: boolean;
}

/**
 * The "which plan is right for you?" band.
 *
 * Keyed to a plan rather than free-standing copy, so the columns can never
 * describe a plan that no longer exists.
 */
export interface PlanFit {
  readonly planId: PlanId;
  /** Stage label, e.g. "Growing". */
  readonly title: string;
  readonly description: string;
}

/** One country the plans above are priced for. */
export interface PricingRegion {
  /** ISO 3166-1 alpha-2, and the select's option value. */
  readonly code: string;
  readonly label: string;
}

/**
 * The market band above the cards.
 *
 * Every plan on this page is quoted in rupees against Indian messaging rates,
 * so the page states the market once, at the top, rather than repeating "in
 * India" on four cards.
 */
export interface PricingMarket {
  readonly title: string;
  readonly description: string;
  /** The short claims under the description, e.g. "DLT Compliant". */
  readonly badges: readonly string[];
  readonly selectorLabel: string;
  readonly regions: readonly PricingRegion[];
  /** The region code the selector opens on. */
  readonly defaultRegion: string;
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
