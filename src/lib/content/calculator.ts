import { calculatorDefinitions } from "@/data/calculator";

import type { CalculatorDefinition, CalculatorId, ControlSlug } from "@/types";

export function getCalculatorDefinitions(): readonly CalculatorDefinition[] {
  return calculatorDefinitions;
}

export function getCalculatorById(
  id: CalculatorId,
): CalculatorDefinition | undefined {
  return calculatorDefinitions.find((definition) => definition.id === id);
}

/**
 * The calculator that sizes the problem this control fixes (§6.3).
 *
 * Resolved by searching the calculator definitions rather than storing the
 * link on the control as well, so the relationship is declared exactly once
 * and stays traversable in both directions.
 */
export function getCalculatorForControl(
  slug: ControlSlug,
): CalculatorDefinition | undefined {
  return calculatorDefinitions.find((definition) =>
    definition.targetControlSlugs.includes(slug),
  );
}
