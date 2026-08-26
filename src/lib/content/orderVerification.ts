import {
  orderVerificationAudience,
  orderVerificationCheckpoints,
  orderVerificationFeatures,
  orderVerificationFlowResult,
  orderVerificationFlowSteps,
  orderVerificationOutcomes,
  orderVerificationPageCopy,
} from "@/data/orderVerification";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getOrderVerificationPageCopy(): typeof orderVerificationPageCopy {
  return orderVerificationPageCopy;
}

export function getOrderVerificationCheckpoints(): readonly FeatureCheckpoint[] {
  return orderVerificationCheckpoints;
}

export function getOrderVerificationFlowSteps(): readonly FeatureFlowStep[] {
  return orderVerificationFlowSteps;
}

export function getOrderVerificationFlowResult(): string {
  return orderVerificationFlowResult;
}

export function getOrderVerificationFeatures(): readonly FeatureCapability[] {
  return orderVerificationFeatures;
}

export function getOrderVerificationAudience(): readonly AudienceSegment[] {
  return orderVerificationAudience;
}

/**
 * The results band (§6.3) for Order Verification.
 *
 * Async for the same reason its siblings are: the day these outcomes are
 * backed by measured figures they will be served from the proof repository
 * behind a promise, and keeping the signature async now means that swap is an
 * edit inside this function rather than a change every caller has to follow.
 */
export async function getOrderVerificationOutcomes(): Promise<
  readonly FeatureOutcome[]
> {
  return orderVerificationOutcomes;
}
