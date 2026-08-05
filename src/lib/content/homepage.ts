import {
  howItWorksSteps,
  outcomeMetrics,
  painPoints,
  productPreviewPanels,
  trustedBrands,
} from "@/data/homepage";
import { getControlBySlug } from "@/lib/content/controls";

import type {
  Control,
  HowItWorksStep,
  OutcomeMetric,
  PainPoint,
  ProductPreviewPanel,
  TrustedBrand,
} from "@/types";

export function getPainPoints(): readonly PainPoint[] {
  return painPoints;
}

export function getOutcomeMetrics(): readonly OutcomeMetric[] {
  return outcomeMetrics;
}

export function getTrustedBrands(): readonly TrustedBrand[] {
  return trustedBrands;
}

export function getHowItWorksSteps(): readonly HowItWorksStep[] {
  return howItWorksSteps;
}

/**
 * The preview panels, each already resolved to its control.
 *
 * Resolving here rather than in the component keeps the section free of
 * lookups and means a panel naming a control that does not exist is dropped
 * once, in one place, instead of rendering a dead link.
 */
export function getProductPreviewPanels(): readonly (ProductPreviewPanel & {
  readonly control: Control;
})[] {
  return productPreviewPanels.flatMap((panel) => {
    const control = getControlBySlug(panel.controlSlug);
    return control ? [{ ...panel, control }] : [];
  });
}
