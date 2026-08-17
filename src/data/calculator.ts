import type {
  CalculatorDefinition,
  CalculatorFieldDefinition,
  CalculatorInput,
  CalculatorPathway,
  CalculatorPreset,
} from "@/types";

/**
 * The three tools that make up the single COD Calculator page (§8).
 *
 * There are no separate calculator pages — these are tabs or stacked sections
 * on one route, because the calculator is the site's main lead magnet and
 * splitting it would split its search intent (§8, §13).
 *
 * `targetControlSlugs` encodes §8.4: every result links to the control that
 * acts on it.
 */
export const calculatorDefinitions: readonly CalculatorDefinition[] = [
  {
    id: "savings",
    title: "Savings Calculator",
    purpose:
      "Show how much COD is costing the merchant now, and how much COD King can save.",
    targetControlSlugs: ["otp-verification", "cod-show-hide"],
  },
  {
    id: "cod-fee",
    title: "COD Fee Calculator",
    purpose: "Help the merchant decide what COD fee to charge.",
    targetControlSlugs: ["cod-fees"],
  },
  {
    id: "partial-payment",
    title: "Partial Payment Calculator",
    purpose:
      "Find the advance percentage that reduces RTO without hurting conversion too much.",
    targetControlSlugs: ["partial-cod-payment"],
  },
];

/**
 * Every input the Savings Calculator takes, in the order it is asked for.
 *
 * The form is generated from this list, so the sequence here is the sequence
 * on screen and a field cannot exist in one place but not the other. The first
 * five are the only ones a merchant must think about; the rest carry defaults
 * that are typical for Indian D2C and are there to be corrected, not invented.
 *
 * `hint` is written for a merchant, not for an accountant — every line says
 * which number to fetch, not what the term means.
 */
export const calculatorFields: readonly CalculatorFieldDefinition[] = [
  {
    id: "monthlyOrders",
    group: "business",
    label: "Monthly orders",
    hint: "Total orders placed in a typical month.",
    unit: "count",
    min: 0,
    max: 1_000_000,
    step: 10,
  },
  {
    id: "averageOrderValue",
    group: "business",
    label: "Average order value",
    hint: "What a typical order is worth before costs.",
    unit: "currency",
    min: 0,
    max: 1_000_000,
    step: 50,
  },
  {
    id: "codSharePct",
    group: "business",
    label: "COD orders",
    hint: "Share of orders paid on delivery.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    id: "rtoPct",
    group: "business",
    label: "RTO rate",
    hint: "Share of shipped COD orders that come back undelivered.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    id: "cancellationPct",
    group: "business",
    label: "Cancellation rate",
    hint: "Share of COD orders cancelled before they ship.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 1,
  },

  {
    id: "cogsPerOrder",
    group: "costs",
    label: "Product cost",
    hint: "What one order costs you to buy or make.",
    unit: "currency",
    min: 0,
    max: 1_000_000,
    step: 10,
  },
  {
    id: "forwardShippingCost",
    group: "costs",
    label: "Forward shipping",
    hint: "Courier charge to send one order out.",
    unit: "currency",
    min: 0,
    max: 100_000,
    step: 5,
  },
  {
    id: "reverseShippingCost",
    group: "costs",
    label: "Return shipping",
    hint: "Courier charge to bring an RTO order back.",
    unit: "currency",
    min: 0,
    max: 100_000,
    step: 5,
  },
  {
    id: "packagingCost",
    group: "costs",
    label: "Packaging",
    hint: "Materials and handling per shipped order.",
    unit: "currency",
    min: 0,
    max: 100_000,
    step: 5,
  },
  {
    id: "codFeePct",
    group: "costs",
    label: "COD collection fee",
    hint: "Courier's fee for collecting and remitting cash.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 0.1,
  },
  {
    id: "prepaidFeePct",
    group: "costs",
    label: "Payment gateway fee",
    hint: "Transaction charge on prepaid orders.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 0.1,
  },
  {
    id: "marketingCostPerOrder",
    group: "costs",
    label: "Marketing cost per order",
    hint: "Ad spend to win one order — spent whether it delivers or not.",
    unit: "currency",
    min: 0,
    max: 1_000_000,
    step: 10,
  },

  {
    id: "rtoReductionPct",
    group: "assumptions",
    label: "RTO reduction",
    hint: "How much of your RTO rate better COD control removes.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    id: "cancellationReductionPct",
    group: "assumptions",
    label: "Cancellation reduction",
    hint: "How much of your cancellation rate order confirmation removes.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    id: "prepaidShiftPct",
    group: "assumptions",
    label: "Shift to prepaid",
    hint: "Share of COD orders that pay upfront instead.",
    unit: "percent",
    min: 0,
    max: 100,
    step: 1,
  },
];

/**
 * The values the page loads with.
 *
 * They have to be a real, coherent store rather than zeros: the page must
 * render a usable result before anyone types anything, including for a crawler
 * with no JavaScript (§13.1), and a column of zeros answers nothing.
 *
 * The improvement assumptions are set to a cautious middle rather than to the
 * best case. They are an input on this page, not a claim — the merchant can
 * see all three, and every result that depends on them is labelled an estimate.
 */
export const calculatorDefaults: CalculatorInput = {
  monthlyOrders: 1000,
  averageOrderValue: 1200,
  codSharePct: 70,
  rtoPct: 25,
  cancellationPct: 8,

  cogsPerOrder: 480,
  forwardShippingCost: 70,
  reverseShippingCost: 70,
  packagingCost: 20,
  codFeePct: 1.5,
  prepaidFeePct: 2,
  marketingCostPerOrder: 180,

  rtoReductionPct: 30,
  cancellationReductionPct: 40,
  prepaidShiftPct: 15,
};

/**
 * Three COD risk profiles, as starting points.
 *
 * A merchant who does not know their RTO rate off-hand can pick the profile
 * that sounds like their store and correct it after seeing the shape of the
 * answer. Each preset touches only the three behaviour fields, so picking one
 * never discards the order count and order value already entered.
 */
export const calculatorPresets: readonly CalculatorPreset[] = [
  {
    id: "low-rto",
    label: "Low RTO",
    description: "Mostly prepaid, tight delivery footprint.",
    values: { codSharePct: 45, rtoPct: 12, cancellationPct: 4 },
  },
  {
    id: "average-rto",
    label: "Average RTO",
    description: "A typical Indian COD-led store.",
    values: { codSharePct: 70, rtoPct: 25, cancellationPct: 8 },
  },
  {
    id: "high-rto",
    label: "High RTO",
    description: "COD-heavy, wide pin-code spread.",
    values: { codSharePct: 85, rtoPct: 38, cancellationPct: 14 },
  },
];

/**
 * The three routes from a calculated leak to the control that acts on it.
 *
 * Ordered to match the leakage breakdown above them, so the section reads as an
 * answer to the section before it rather than as a feature list that happens to
 * follow one. Each `controlSlug` is checked by the compiler against the real
 * control set, so a pathway cannot point at a page that does not exist.
 *
 * The copy says what a control *does*, never what it will deliver. Every number
 * shown beside these lines is read from the merchant's own inputs through the
 * engine — there is no claim here that the calculator cannot substantiate.
 */
export const calculatorPathways: readonly CalculatorPathway[] = [
  {
    id: "rto",
    title: "Reduce fake and unverified COD orders",
    problem:
      "Orders ship, come back undelivered, and take the ad spend with them.",
    explanation:
      "Verify COD customers before dispatch, so unconfirmed and fake orders are caught while a parcel is still cheap to stop.",
    controlSlug: "otp-verification",
  },
  {
    id: "prepaid",
    title: "Convert more COD customers to prepaid",
    problem: "Every COD order carries RTO risk that a prepaid order does not.",
    explanation:
      "Encourage buyers to pay upfront with configurable prepaid incentives at checkout.",
    controlSlug: "cod-to-prepaid",
  },
  {
    id: "exposure",
    title: "Stop risky COD orders before they become losses",
    problem: "COD is offered on orders where it costs more than it earns.",
    explanation:
      "Control where COD is available using rules on cart value, PIN code, products and customer conditions.",
    controlSlug: "cod-show-hide",
  },
];
