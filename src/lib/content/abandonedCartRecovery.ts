import {
  cartAudience,
  cartCheckpoints,
  cartDemoPoints,
  cartFeatures,
  cartFlowResult,
  cartFlowSteps,
  cartOutcomes,
  cartPageCopy,
} from "@/data/abandonedCartRecovery";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getCartPageCopy(): typeof cartPageCopy {
  return cartPageCopy;
}

export function getCartCheckpoints(): readonly FeatureCheckpoint[] {
  return cartCheckpoints;
}

export function getCartFlowSteps(): readonly FeatureFlowStep[] {
  return cartFlowSteps;
}

export function getCartFlowResult(): string {
  return cartFlowResult;
}

export function getCartDemoPoints(): readonly FeatureCheckpoint[] {
  return cartDemoPoints;
}

export function getCartFeatures(): readonly FeatureCapability[] {
  return cartFeatures;
}

export function getCartAudience(): readonly AudienceSegment[] {
  return cartAudience;
}

/**
 * The results band (§6.3).
 *
 * Async for the same reason its siblings are: the day these outcomes are
 * backed by measured figures they will be served from the proof repository
 * behind a promise, and keeping the signature async now means that swap is an
 * edit inside this function rather than a change every caller has to follow.
 */
export async function getCartOutcomes(): Promise<readonly FeatureOutcome[]> {
  return cartOutcomes;
}
