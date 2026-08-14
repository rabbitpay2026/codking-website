import type { ControlSlug } from "@/types/controls";

/**
 * The COD Calculator — one page, three tools (§8).
 *
 * Inputs and outputs below are transcribed from the §8.1–8.3 tables.
 *
 * The assumption model that turns inputs into outputs — expected RTO
 * reduction, prepaid shift — is a business decision rather than a measured
 * result, so it is not baked into the engine. It is carried as three ordinary
 * inputs the merchant can see and change (`rtoReductionPct`,
 * `cancellationReductionPct`, `prepaidShiftPct`), which is the only honest way
 * to show a "with COD King" number before there is a signed-off one.
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

/* ---------------------------------------------------------------------------
   §8.1 Savings Calculator — the COD profit & loss model.

   The whole model is one flat record of numbers rather than a nested object
   tree, because the form is generated from the field definitions below: adding
   an input is a single entry in `calculatorFields`, not a new branch in the
   state shape, the parser, the engine and the markup. `CalculatorFieldId` is a
   closed union, so a field that is defined but never modelled — or modelled but
   never offered — is a compile error.
--------------------------------------------------------------------------- */

/**
 * The three groups an input can belong to, in the order they are disclosed.
 *
 * `business` is the only group shown on arrival. The other two are real inputs
 * with defensible defaults, not optional extras, but a merchant who is asked
 * for twelve numbers before seeing one answer leaves.
 */
export const CALCULATOR_FIELD_GROUPS = [
  "business",
  "costs",
  "assumptions",
] as const;

export type CalculatorFieldGroup = (typeof CALCULATOR_FIELD_GROUPS)[number];

export const CALCULATOR_FIELD_IDS = [
  // business
  "monthlyOrders",
  "averageOrderValue",
  "codSharePct",
  "rtoPct",
  "cancellationPct",
  // costs
  "cogsPerOrder",
  "forwardShippingCost",
  "reverseShippingCost",
  "packagingCost",
  "codFeePct",
  "prepaidFeePct",
  "marketingCostPerOrder",
  // assumptions
  "rtoReductionPct",
  "cancellationReductionPct",
  "prepaidShiftPct",
] as const;

export type CalculatorFieldId = (typeof CALCULATOR_FIELD_IDS)[number];

/** How a value is written and read — decides the affix and the formatter. */
export type CalculatorFieldUnit = "count" | "currency" | "percent";

export interface CalculatorFieldDefinition {
  readonly id: CalculatorFieldId;
  readonly group: CalculatorFieldGroup;
  readonly label: string;
  /** One line under the field, explaining what the number means. */
  readonly hint: string;
  readonly unit: CalculatorFieldUnit;
  readonly min: number;
  readonly max: number;
  readonly step: number;
}

/**
 * Every input the engine reads, as plain numbers.
 *
 * Percentages are held as `0`–`100` because that is how a merchant types them;
 * the engine converts to shares in exactly one place.
 */
export type CalculatorInput = {
  readonly [K in CalculatorFieldId]: number;
};

/** The form's own state — raw strings, so a field can legitimately be empty. */
export type CalculatorValues = {
  readonly [K in CalculatorFieldId]: string;
};

export const CALCULATOR_PRESET_IDS = [
  "low-rto",
  "average-rto",
  "high-rto",
] as const;

export type CalculatorPresetId = (typeof CALCULATOR_PRESET_IDS)[number];

/**
 * A starting risk profile.
 *
 * A preset carries only the fields that describe COD behaviour, never volume
 * or order value: those are the merchant's own facts, and overwriting them
 * would throw away the two numbers they are most certain about.
 */
export interface CalculatorPreset {
  readonly id: CalculatorPresetId;
  readonly label: string;
  readonly description: string;
  readonly values: Partial<Record<CalculatorFieldId, number>>;
}

/** Monthly cost lines. Every one of them is money that actually leaves. */
export interface CalculatorCosts {
  /** Product cost on orders that were delivered and kept. */
  readonly cogs: number;
  /** Forward shipping and packaging on delivered orders. */
  readonly fulfilment: number;
  /** The courier's fee for collecting and remitting cash. */
  readonly codFee: number;
  /** Gateway charges on prepaid orders. */
  readonly gatewayFee: number;
  /** Shipping both ways plus packaging, on orders that came back. */
  readonly rto: number;
  /** Acquisition spend across every order placed, delivered or not. */
  readonly marketing: number;
}

/**
 * The part of the spend that bought nothing.
 *
 * These lines are a *view* of the costs above, not additions to them — the
 * shipping is already in `costs.rto` and the acquisition spend is already in
 * `costs.marketing`. Kept separate so the headline figure can name the money a
 * merchant would recover, without it being double-counted in the profit.
 */
export interface CalculatorCodLoss {
  readonly rtoShipping: number;
  readonly rtoAcquisition: number;
  readonly cancellation: number;
  readonly total: number;
}

/**
 * The same money again, grouped the way a merchant would name it.
 *
 * `CalculatorCodLoss` splits by mechanism because that is how the engine
 * computes it. This splits by cause, because that is how it gets fixed: an RTO
 * costs freight *and* the ad spend that won the order, and telling a merchant
 * those are two problems would be splitting one leak into two half-answers.
 *
 * `codFee` is the odd one out and deliberately so. It is not waste — it is the
 * courier's charge for collecting cash on an order that worked — so it sits
 * outside `CalculatorCodLoss` and outside the headline figure. It is here
 * because "what is COD costing me" is not honestly answered without it.
 */
export interface CalculatorLeakage {
  /** Freight both ways, packaging, and the acquisition spend behind it. */
  readonly rto: number;
  /** Acquisition spend on COD orders killed before dispatch. */
  readonly cancellation: number;
  /** The collection fee, charged on COD orders that did deliver. */
  readonly codFee: number;
  readonly total: number;
}

/**
 * What one improvement assumption is worth on its own.
 *
 * Each lever is the current month recomputed with that single rate changed and
 * the other two left alone, which is the only way to answer "why this number".
 *
 * These do **not** decompose the combined result. Moving COD orders to prepaid
 * also removes them from RTO exposure, so the levers overlap and their impacts
 * sum to more than the total — every figure derived from them is therefore
 * presented as "if only this changed", never as a share of the whole.
 */
export interface CalculatorLever {
  readonly scenario: CalculatorScenario;
  /** Change in net profit against the current month. */
  readonly profitImpact: number;
  /** Reduction in wasted COD spend against the current month. */
  readonly lossReduction: number;
}

/** One month of trading, under one set of assumptions. */
export interface CalculatorScenario {
  readonly codOrders: number;
  readonly prepaidOrders: number;
  readonly cancelledOrders: number;
  readonly shippedCodOrders: number;
  readonly rtoOrders: number;
  readonly deliveredCodOrders: number;
  readonly deliveredOrders: number;
  readonly prepaidSharePct: number;
  readonly revenue: number;
  readonly costs: CalculatorCosts;
  readonly totalCost: number;
  readonly codLoss: CalculatorCodLoss;
  readonly leakage: CalculatorLeakage;
  readonly netProfit: number;
}

/**
 * Both scenarios and the difference between them.
 *
 * `improved` is the same month recomputed with the improvement assumptions
 * applied — an estimate the merchant can see and change, never a promise.
 */
export interface CalculatorResult {
  readonly monthlyOrders: number;
  readonly current: CalculatorScenario;
  readonly improved: CalculatorScenario;
  /** Reduction in wasted COD spend. */
  readonly monthlySavings: number;
  readonly annualSavings: number;
  /** Change in net profit, which also picks up the shift to prepaid. */
  readonly additionalMonthlyProfit: number;
  readonly additionalAnnualProfit: number;
  readonly annualCodLoss: number;
  /** Each improvement assumption's effect in isolation. */
  readonly levers: {
    readonly rto: CalculatorLever;
    readonly cancellation: CalculatorLever;
    readonly prepaid: CalculatorLever;
  };
}

/**
 * One leak, the control that acts on it, and how the two are connected.
 *
 * The page's whole argument is that a merchant should never have to guess why
 * a saving is being claimed. This is the link that makes that answerable: the
 * copy lives here as content (§11), and the figures beside it are read from
 * the engine, so a pathway can never quietly drift into a claim the model does
 * not support.
 *
 * `exposure` deliberately has no rupee figure attached to it. The engine models
 * what COD costs, not what a rule would have prevented, and inventing a number
 * for the third pathway to match the other two would be exactly the fabrication
 * the rest of this file is arranged to avoid.
 */
export const CALCULATOR_PATHWAY_IDS = ["rto", "prepaid", "exposure"] as const;

export type CalculatorPathwayId = (typeof CALCULATOR_PATHWAY_IDS)[number];

export interface CalculatorPathway {
  readonly id: CalculatorPathwayId;
  /** The action, in the merchant's terms — "Reduce fake and unverified…". */
  readonly title: string;
  /** What is going wrong, in one line. */
  readonly problem: string;
  /** What the control does about it. */
  readonly explanation: string;
  readonly controlSlug: ControlSlug;
}

/** A pathway with its control resolved, ready to render. */
export interface ResolvedCalculatorPathway extends CalculatorPathway {
  readonly controlName: string;
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
