import type { ControlSlug } from "@/types/controls";

/**
 * The COD Calculator — one page, three tools (§8).
 *
 * Inputs and outputs below are transcribed from the §8.1–8.3 tables. The
 * assumption model that turns inputs into outputs (expected RTO reduction,
 * prepaid shift, fake-order reduction) is a business decision that is not yet
 * signed off, so it is deliberately not modelled here.
 */
export const CALCULATOR_IDS = [
  "savings",
  "cod-fee",
  "partial-payment",
] as const;

export type CalculatorId = (typeof CALCULATOR_IDS)[number];

export interface CalculatorDefinition {
  readonly id: CalculatorId;
  readonly title: string;
  /** What the tool is for, in the merchant's terms (§8.1–8.3 "Purpose"). */
  readonly purpose: string;
  /**
   * The controls that act on this result (§8.4).
   *
   * This is the single declaration of the calculator-to-control relationship;
   * a control page finds its calculator by searching this, so the link is
   * defined once and traversable in both directions.
   */
  readonly targetControlSlugs: readonly ControlSlug[];
}

/** §8.1 Savings Calculator. */
export interface SavingsInput {
  readonly monthlyOrders: number;
  readonly codSharePct: number;
  readonly averageOrderValue: number;
  readonly currentRtoPct: number;
  readonly averageShippingCost: number;
}

export interface SavingsResult {
  readonly monthlyLoss: number;
  readonly annualLoss: number;
  readonly estimatedMonthlySavings: number;
  readonly estimatedAnnualSavings: number;
}

/** §8.2 COD Fee Calculator. */
export interface CodFeeInput {
  readonly averageOrderValue: number;
  readonly currentCodSharePct: number;
  readonly targetPrepaidSharePct: number;
  readonly costPerRto: number;
}

export interface CodFeeResult {
  readonly suggestedFee: number;
  readonly expectedPrepaidSharePct: number;
  readonly expectedLossReduction: number;
}

/** §8.3 Partial Payment Calculator. */
export interface PartialPaymentInput {
  readonly averageOrderValue: number;
  readonly currentRtoPct: number;
  readonly costPerRto: number;
}

export interface PartialPaymentResult {
  readonly suggestedDepositPct: number;
  readonly expectedRtoPct: number;
  readonly netProfitImpact: number;
}
