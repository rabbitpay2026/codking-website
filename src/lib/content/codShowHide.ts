import {
  codShowHideAudience,
  codShowHideCheckpoints,
  codShowHideDemoPoints,
  codShowHideFeatures,
  codShowHideFlowResult,
  codShowHideFlowSteps,
  codShowHideOutcomes,
  codShowHidePageCopy,
} from "@/data/codShowHide";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getCodShowHidePageCopy(): typeof codShowHidePageCopy {
  return codShowHidePageCopy;
}

export function getCodShowHideCheckpoints(): readonly FeatureCheckpoint[] {
  return codShowHideCheckpoints;
}

export function getCodShowHideFlowSteps(): readonly FeatureFlowStep[] {
  return codShowHideFlowSteps;
}

export function getCodShowHideFlowResult(): string {
  return codShowHideFlowResult;
}

export function getCodShowHideDemoPoints(): readonly FeatureCheckpoint[] {
  return codShowHideDemoPoints;
}

export function getCodShowHideFeatures(): readonly FeatureCapability[] {
  return codShowHideFeatures;
}

export function getCodShowHideAudience(): readonly AudienceSegment[] {
  return codShowHideAudience;
}

/**
 * The results band (§6.3).
 *
 * Async for the same reason its siblings are: the day these outcomes are
 * backed by measured figures they will be served from the proof repository
 * behind a promise, and keeping the signature async now means that swap is an
 * edit inside this function rather than a change every caller has to follow.
 */
export async function getCodShowHideOutcomes(): Promise<
  readonly FeatureOutcome[]
> {
  return codShowHideOutcomes;
}
