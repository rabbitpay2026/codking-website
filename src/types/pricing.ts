import type { ControlSlug } from "@/types/controls";

/** The three plans named in the architecture (§5.1 #9, §9.3). */
export const PLAN_IDS = ["free", "pro", "enterprise"] as const;

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

export interface PricingPlan {
  readonly id: PlanId;
  readonly name: string;
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
  readonly highlights: readonly string[];
  /** The per-message rate this plan pays, pre-formatted with its currency. */
  readonly messageRate: string;
  /** Leads the pricing preview and carries the emphasis treatment (§5.1 #9). */
  readonly recommended: boolean;
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
