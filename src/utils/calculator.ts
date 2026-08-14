import type {
  CalculatorCodLoss,
  CalculatorCosts,
  CalculatorLeakage,
  CalculatorLever,
  CalculatorFieldDefinition,
  CalculatorFieldId,
  CalculatorInput,
  CalculatorResult,
  CalculatorScenario,
  CalculatorValues,
} from "@/types";

/**
 * The COD profit & loss engine (§8.1).
 *
 * Pure functions over plain numbers, with no React and no formatting: the UI
 * decides how a figure is written, this file decides what it is. That split is
 * the point — the assumptions below are the part of the page most likely to be
 * argued with, and they should be arguable in one file rather than traced
 * through markup.
 *
 * ## The model, stated plainly
 *
 * A month's orders split into COD and prepaid. Some COD orders are cancelled
 * before they ship; of those that do ship, some come back (RTO). What is left
 * is delivered, and only delivered orders produce revenue.
 *
 * Four assumptions are load-bearing, and all four are deliberately the
 * conservative reading:
 *
 * 1. **Prepaid orders deliver.** Prepaid RTO exists but is a fraction of COD
 *    RTO, and folding it in would understate the gap the page is about.
 * 2. **RTO stock is resellable.** Goods come back and go on the shelf, so an
 *    RTO loses the shipping both ways and the packaging, not the product cost.
 *    Merchants with damaged or perishable returns lose more than this shows.
 * 3. **Cancelled orders cost only the acquisition spend.** They never ship, so
 *    there is no shipping to lose — but the ad spend that won them is gone.
 * 4. **Marketing is paid per order placed**, delivered or not. That is what
 *    makes an RTO cost more than its freight.
 *
 * ## Loss is a view, not an extra cost
 *
 * `codLoss` re-describes money already counted in `costs.rto` and
 * `costs.marketing`. It is never added to the total, so the headline figure and
 * the net profit can be read together without one inflating the other.
 */

const MONTHS_PER_YEAR = 12;

/** Percentages are entered as 0–100 and converted in exactly one place. */
function share(percent: number): number {
  return clamp(percent, 0, 100) / 100;
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Read one month under one set of behaviour rates.
 *
 * Taking the three rates as arguments rather than off the input is what lets
 * the improved scenario reuse this untouched: the "with COD King" column is
 * the same arithmetic on different rates, not a second model that could drift
 * from the first.
 */
function buildScenario(
  input: CalculatorInput,
  rates: {
    readonly codShare: number;
    readonly rto: number;
    readonly cancellation: number;
  },
): CalculatorScenario {
  const monthlyOrders = Math.max(input.monthlyOrders, 0);
  const aov = Math.max(input.averageOrderValue, 0);

  const codOrders = monthlyOrders * rates.codShare;
  const prepaidOrders = monthlyOrders - codOrders;

  const cancelledOrders = codOrders * rates.cancellation;
  const shippedCodOrders = codOrders - cancelledOrders;
  const rtoOrders = shippedCodOrders * rates.rto;
  const deliveredCodOrders = shippedCodOrders - rtoOrders;
  const deliveredOrders = deliveredCodOrders + prepaidOrders;

  const revenue = deliveredOrders * aov;

  const perShipmentCost =
    Math.max(input.forwardShippingCost, 0) + Math.max(input.packagingCost, 0);
  const perRtoCost = perShipmentCost + Math.max(input.reverseShippingCost, 0);
  const marketingPerOrder = Math.max(input.marketingCostPerOrder, 0);

  const costs: CalculatorCosts = {
    cogs: deliveredOrders * Math.max(input.cogsPerOrder, 0),
    fulfilment: deliveredOrders * perShipmentCost,
    codFee: deliveredCodOrders * aov * share(input.codFeePct),
    gatewayFee: prepaidOrders * aov * share(input.prepaidFeePct),
    rto: rtoOrders * perRtoCost,
    marketing: monthlyOrders * marketingPerOrder,
  };

  const totalCost =
    costs.cogs +
    costs.fulfilment +
    costs.codFee +
    costs.gatewayFee +
    costs.rto +
    costs.marketing;

  const rtoShipping = costs.rto;
  const rtoAcquisition = rtoOrders * marketingPerOrder;
  const cancellation = cancelledOrders * marketingPerOrder;

  const codLoss: CalculatorCodLoss = {
    rtoShipping,
    rtoAcquisition,
    cancellation,
    total: rtoShipping + rtoAcquisition + cancellation,
  };

  /*
    A regrouping of figures already computed above, not a second calculation —
    which is what keeps the leakage bars and the headline reconcilable. The
    first two categories are exactly `codLoss.total`; the collection fee is
    added alongside them because it is money COD costs, but it is not waste and
    so is never folded into the loss.
  */
  const leakage: CalculatorLeakage = {
    rto: rtoShipping + rtoAcquisition,
    cancellation,
    codFee: costs.codFee,
    total: codLoss.total + costs.codFee,
  };

  return {
    codOrders,
    prepaidOrders,
    cancelledOrders,
    shippedCodOrders,
    rtoOrders,
    deliveredCodOrders,
    deliveredOrders,
    prepaidSharePct:
      monthlyOrders > 0 ? (prepaidOrders / monthlyOrders) * 100 : 0,
    revenue,
    costs,
    totalCost,
    codLoss,
    leakage,
    netProfit: revenue - totalCost,
  };
}

/**
 * One improvement assumption applied on its own, measured against the current
 * month.
 *
 * This is what lets the page say *why* a saving is being claimed rather than
 * only that it is. It reuses `buildScenario` untouched, so a lever can never
 * report an impact the main model would not also produce.
 */
function buildLever(
  input: CalculatorInput,
  current: CalculatorScenario,
  rates: {
    readonly codShare: number;
    readonly rto: number;
    readonly cancellation: number;
  },
): CalculatorLever {
  const scenario = buildScenario(input, rates);

  return {
    scenario,
    profitImpact: scenario.netProfit - current.netProfit,
    lossReduction: current.codLoss.total - scenario.codLoss.total,
  };
}

/**
 * The current month, and the same month under the improvement assumptions.
 *
 * The improved rates are *relative* reductions, which is the only reading that
 * behaves sensibly across stores: a 30% reduction takes a 38% RTO rate to 26.6%
 * and a 12% rate to 8.4%, where a flat 30-point cut would take one to 8% and
 * send the other below zero.
 *
 * The prepaid shift moves a slice of COD volume to prepaid, so the improved
 * column picks up two effects a savings-only figure misses: gateway fees
 * replacing collection fees, and prepaid orders no longer being exposed to RTO
 * at all. That is why `additionalMonthlyProfit` and `monthlySavings` are
 * reported as two numbers rather than one — they are answers to two different
 * questions, and forcing them into one would hide which is which.
 */
export function computeCalculator(input: CalculatorInput): CalculatorResult {
  const codShare = share(input.codSharePct);
  const rto = share(input.rtoPct);
  const cancellation = share(input.cancellationPct);

  const current = buildScenario(input, { codShare, rto, cancellation });

  const improved = buildScenario(input, {
    codShare: codShare * (1 - share(input.prepaidShiftPct)),
    rto: rto * (1 - share(input.rtoReductionPct)),
    cancellation: cancellation * (1 - share(input.cancellationReductionPct)),
  });

  const monthlySavings = current.codLoss.total - improved.codLoss.total;
  const additionalMonthlyProfit = improved.netProfit - current.netProfit;

  return {
    monthlyOrders: Math.max(input.monthlyOrders, 0),
    current,
    improved,
    monthlySavings,
    annualSavings: monthlySavings * MONTHS_PER_YEAR,
    additionalMonthlyProfit,
    additionalAnnualProfit: additionalMonthlyProfit * MONTHS_PER_YEAR,
    annualCodLoss: current.codLoss.total * MONTHS_PER_YEAR,
    levers: {
      rto: buildLever(input, current, {
        codShare,
        rto: rto * (1 - share(input.rtoReductionPct)),
        cancellation,
      }),
      cancellation: buildLever(input, current, {
        codShare,
        rto,
        cancellation:
          cancellation * (1 - share(input.cancellationReductionPct)),
      }),
      prepaid: buildLever(input, current, {
        codShare: codShare * (1 - share(input.prepaidShiftPct)),
        rto,
        cancellation,
      }),
    },
  };
}

/**
 * Turn the form's raw strings into an input the engine can trust.
 *
 * The form holds strings so a field can be genuinely empty while it is being
 * retyped — a numeric state would force an empty box to read `0` and fight the
 * merchant's backspace. An empty or unparseable field falls back to its
 * default rather than to zero, so a half-typed form still produces an answer
 * that means something instead of collapsing to a loss of nothing.
 *
 * The field definitions are passed in rather than imported, which keeps this
 * module free of any dependency on the content layer.
 */
export function parseCalculatorValues(
  values: CalculatorValues,
  fields: readonly CalculatorFieldDefinition[],
  fallback: CalculatorInput,
): CalculatorInput {
  const input = { ...fallback } as Record<CalculatorFieldId, number>;

  for (const field of fields) {
    const raw = values[field.id]?.trim();
    if (!raw) continue;

    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) continue;

    input[field.id] = clamp(parsed, field.min, field.max);
  }

  return input;
}

/** The engine's defaults rendered back as form state. */
export function toCalculatorValues(input: CalculatorInput): CalculatorValues {
  const values = {} as Record<CalculatorFieldId, string>;

  for (const key of Object.keys(input) as CalculatorFieldId[]) {
    values[key] = String(input[key]);
  }

  return values;
}
