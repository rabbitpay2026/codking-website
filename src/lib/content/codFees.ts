import {
  codFeesAudience,
  codFeesCheckpoints,
  codFeesDemoPoints,
  codFeesFeatures,
  codFeesFlowResult,
  codFeesFlowSteps,
  codFeesOutcomes,
  codFeesPageCopy,
} from "@/data/codFees";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getCodFeesPageCopy(): typeof codFeesPageCopy {
  return codFeesPageCopy;
}

export function getCodFeesCheckpoints(): readonly FeatureCheckpoint[] {
  return codFeesCheckpoints;
}

export function getCodFeesFlowSteps(): readonly FeatureFlowStep[] {
  return codFeesFlowSteps;
}

export function getCodFeesFlowResult(): string {
  return codFeesFlowResult;
}

export function getCodFeesDemoPoints(): readonly FeatureCheckpoint[] {
  return codFeesDemoPoints;
}

export function getCodFeesFeatures(): readonly FeatureCapability[] {
  return codFeesFeatures;
}

export function getCodFeesAudience(): readonly AudienceSegment[] {
  return codFeesAudience;
}

/**
 * The results band (§6.3).
 *
 * Async for the same reason its siblings are: the day these outcomes are
 * backed by measured figures they will be served from the proof repository
 * behind a promise, and keeping the signature async now means that swap is an
 * edit inside this function rather than a change every caller has to follow.
 */
export async function getCodFeesOutcomes(): Promise<readonly FeatureOutcome[]> {
  return codFeesOutcomes;
}
