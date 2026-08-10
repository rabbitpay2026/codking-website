import {
  prepaidAudience,
  prepaidCheckpoints,
  prepaidDemoPoints,
  prepaidFeatures,
  prepaidFlowResult,
  prepaidFlowSteps,
  prepaidOutcomes,
  prepaidPageCopy,
} from "@/data/codToPrepaid";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getPrepaidPageCopy(): typeof prepaidPageCopy {
  return prepaidPageCopy;
}

export function getPrepaidCheckpoints(): readonly FeatureCheckpoint[] {
  return prepaidCheckpoints;
}

export function getPrepaidFlowSteps(): readonly FeatureFlowStep[] {
  return prepaidFlowSteps;
}

export function getPrepaidFlowResult(): string {
  return prepaidFlowResult;
}

export function getPrepaidDemoPoints(): readonly FeatureCheckpoint[] {
  return prepaidDemoPoints;
}

export function getPrepaidFeatures(): readonly FeatureCapability[] {
  return prepaidFeatures;
}

export function getPrepaidAudience(): readonly AudienceSegment[] {
  return prepaidAudience;
}

/**
 * The results band (§6.3).
 *
 * Async for the same reason its sibling is: the day these outcomes are backed
 * by measured figures they will be served from the proof repository behind a
 * promise, and keeping the signature async now means that swap is an edit
 * inside this function rather than a change every caller has to follow.
 */
export async function getPrepaidOutcomes(): Promise<readonly FeatureOutcome[]> {
  return prepaidOutcomes;
}
