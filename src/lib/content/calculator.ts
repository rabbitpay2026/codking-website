import {
  calculatorDefaults,
  calculatorDefinitions,
  calculatorFields,
  calculatorPathways,
  calculatorPresets,
} from "@/data/calculator";
import { getControlBySlug } from "@/lib/content/controls";

import type {
  CalculatorDefinition,
  CalculatorFieldDefinition,
  CalculatorFieldGroup,
  CalculatorId,
  CalculatorInput,
  CalculatorPathway,
  CalculatorPreset,
  ControlSlug,
  ResolvedCalculatorPathway,
} from "@/types";

export function getCalculatorDefinitions(): readonly CalculatorDefinition[] {
  return calculatorDefinitions;
}

export function getCalculatorFields(): readonly CalculatorFieldDefinition[] {
  return calculatorFields;
}

/**
 * The fields belonging to one disclosure group, in declaration order.
 *
 * Filtering here rather than storing three separate lists keeps the on-screen
 * order of the whole form defined exactly once, in `calculatorFields`.
 */
export function getCalculatorFieldsByGroup(
  group: CalculatorFieldGroup,
): readonly CalculatorFieldDefinition[] {
  return calculatorFields.filter((field) => field.group === group);
}

export function getCalculatorDefaults(): CalculatorInput {
  return calculatorDefaults;
}

export function getCalculatorPresets(): readonly CalculatorPreset[] {
  return calculatorPresets;
}

export function getCalculatorPathways(): readonly CalculatorPathway[] {
  return calculatorPathways;
}

/**
 * The pathways with their control names resolved (§8.4).
 *
 * Resolved here rather than in the component, so the interactive tree never
 * needs to know that a pathway's control is looked up by slug — and so a
 * pathway pointing at a control that has been withdrawn drops out of the
 * section instead of rendering a link to nothing.
 */
export function getResolvedCalculatorPathways(): readonly ResolvedCalculatorPathway[] {
  return calculatorPathways.flatMap((pathway) => {
    const control = getControlBySlug(pathway.controlSlug);
    return control ? [{ ...pathway, controlName: control.name }] : [];
  });
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
