import {
  homepageControlSlugs,
  howItWorksSteps,
  outcomeMetrics,
  painPoints,
  setupMinutes,
  trustedBrands,
} from "@/data/homepage";
import { getControlBySlug } from "@/lib/content/controls";
import { getProofMetrics } from "@/lib/content/proof";

import type {
  Control,
  HowItWorksStep,
  OutcomeMetric,
  PainPoint,
  PlatformStat,
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
 * The scale band under the trust strip.
 *
 * Assembled here rather than stored, because the reach figures already live in
 * the proof repository and §11.1 forbids a second copy. Deliberately holds
 * nothing the trust strip directly above it already states — the rating and
 * the review count are that strip's job, and a figure a visitor has just read
 * does not become more true the second time.
 *
 * A country count that is not yet verified drops out of the band rather than
 * rendering a placeholder (§5.1 #3).
 */
export async function getPlatformStats(): Promise<readonly PlatformStat[]> {
  const proof = await getProofMetrics();

  return [
    ...(proof.countriesServed
      ? ([
          {
            id: "countries",
            value: proof.countriesServed,
            suffix: "+",
            label: "Countries served",
            icon: "globe",
          },
        ] as const)
      : []),
    {
      id: "merchants",
      value: proof.merchantCount,
      suffix: "+",
      label: "Shopify merchants",
      icon: "store",
    },
    {
      id: "setup",
      value: setupMinutes,
      suffix: " min",
      label: "Setup, no code",
      icon: "timer",
    },
  ];
}

/**
 * The eight controls the homepage puts on the board, resolved to their records.
 *
 * The hero checklist and the feature grid both read this, so the two lists are
 * one list seen twice and a control renamed in `data/controls` is renamed in
 * both. A slug naming a control that does not exist is dropped once, here,
 * rather than rendering a dead card.
 */
export function getHomepageControls(): readonly Control[] {
  return homepageControlSlugs.flatMap((slug) => {
    const control = getControlBySlug(slug);
    return control ? [control] : [];
  });
}
