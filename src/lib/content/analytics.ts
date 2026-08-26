import {
  analyticsAudience,
  analyticsCheckpoints,
  analyticsFeatures,
  analyticsFlowResult,
  analyticsFlowSteps,
  analyticsOutcomes,
  analyticsPageCopy,
} from "@/data/analytics";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getAnalyticsPageCopy(): typeof analyticsPageCopy {
  return analyticsPageCopy;
}

export function getAnalyticsCheckpoints(): readonly FeatureCheckpoint[] {
  return analyticsCheckpoints;
}

export function getAnalyticsFlowSteps(): readonly FeatureFlowStep[] {
  return analyticsFlowSteps;
}

export function getAnalyticsFlowResult(): string {
  return analyticsFlowResult;
}

export function getAnalyticsFeatures(): readonly FeatureCapability[] {
  return analyticsFeatures;
}

export function getAnalyticsAudience(): readonly AudienceSegment[] {
  return analyticsAudience;
}

/**
 * The results band (§6.3) for Analytics & Reports.
 *
 * Async for the same reason its siblings are: the day these outcomes are
 * backed by measured figures they will be served from the proof repository
 * behind a promise, and keeping the signature async now means that swap is an
 * edit inside this function rather than a change every caller has to follow.
 */
export async function getAnalyticsOutcomes(): Promise<
  readonly FeatureOutcome[]
> {
  return analyticsOutcomes;
}
