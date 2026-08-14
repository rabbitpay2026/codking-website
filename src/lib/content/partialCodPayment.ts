import {
  partialAudience,
  partialCheckpoints,
  partialDemoPoints,
  partialFeatures,
  partialFlowResult,
  partialFlowSteps,
  partialOutcomes,
  partialPageCopy,
} from "@/data/partialCodPayment";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getPartialPageCopy(): typeof partialPageCopy {
  return partialPageCopy;
}

export function getPartialCheckpoints(): readonly FeatureCheckpoint[] {
  return partialCheckpoints;
}

export function getPartialFlowSteps(): readonly FeatureFlowStep[] {
  return partialFlowSteps;
}

export function getPartialFlowResult(): string {
  return partialFlowResult;
}

export function getPartialDemoPoints(): readonly FeatureCheckpoint[] {
  return partialDemoPoints;
}

export function getPartialFeatures(): readonly FeatureCapability[] {
  return partialFeatures;
}

export function getPartialAudience(): readonly AudienceSegment[] {
  return partialAudience;
}

/**
 * The results band (§6.3).
 *
 * Async rather than a plain return, and deliberately so: the figures it serves
 * are currently literals from the marketing blueprint (see the note in
 * `src/data/partialCodPayment.ts`), and the fix is to source them the way
 * every other number on the site is sourced — from the proof repository,
 * behind a promise. Keeping the signature async now means that swap is an edit
 * inside this function rather than a change every caller has to follow.
 */
export async function getPartialOutcomes(): Promise<readonly FeatureOutcome[]> {
  return partialOutcomes;
}
