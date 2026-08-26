import {
  gatewayAudience,
  gatewayCheckpoints,
  gatewayFeatures,
  gatewayFlowResult,
  gatewayFlowSteps,
  gatewayOutcomes,
  gatewayPageCopy,
} from "@/data/messagingGateways";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getGatewayPageCopy(): typeof gatewayPageCopy {
  return gatewayPageCopy;
}

export function getGatewayCheckpoints(): readonly FeatureCheckpoint[] {
  return gatewayCheckpoints;
}

export function getGatewayFlowSteps(): readonly FeatureFlowStep[] {
  return gatewayFlowSteps;
}

export function getGatewayFlowResult(): string {
  return gatewayFlowResult;
}

export function getGatewayFeatures(): readonly FeatureCapability[] {
  return gatewayFeatures;
}

export function getGatewayAudience(): readonly AudienceSegment[] {
  return gatewayAudience;
}

/**
 * The results band (§6.3) for Local SMS Gateway Integration.
 *
 * Async for the same reason its siblings are: the day these outcomes are
 * backed by measured figures they will be served from the proof repository
 * behind a promise, and keeping the signature async now means that swap is an
 * edit inside this function rather than a change every caller has to follow.
 */
export async function getGatewayOutcomes(): Promise<readonly FeatureOutcome[]> {
  return gatewayOutcomes;
}
