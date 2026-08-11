import type { CalculatorDefinition } from "@/types";

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
