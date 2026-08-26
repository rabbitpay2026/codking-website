import {
  addressAudience,
  addressCheckpoints,
  addressFeatures,
  addressFlowResult,
  addressFlowSteps,
  addressOutcomes,
  addressPageCopy,
} from "@/data/addressValidation";

import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getAddressPageCopy(): typeof addressPageCopy {
  return addressPageCopy;
}

export function getAddressCheckpoints(): readonly FeatureCheckpoint[] {
  return addressCheckpoints;
}

export function getAddressFlowSteps(): readonly FeatureFlowStep[] {
  return addressFlowSteps;
}

export function getAddressFlowResult(): string {
  return addressFlowResult;
}

export function getAddressFeatures(): readonly FeatureCapability[] {
  return addressFeatures;
}

export function getAddressAudience(): readonly AudienceSegment[] {
  return addressAudience;
}

/**
 * The results band (§6.3) for Prefilled Address.
 *
 * Async for the same reason its siblings are: the day these outcomes are
 * backed by measured figures they will be served from the proof repository
 * behind a promise, and keeping the signature async now means that swap is an
 * edit inside this function rather than a change every caller has to follow.
 */
export async function getAddressOutcomes(): Promise<readonly FeatureOutcome[]> {
  return addressOutcomes;
}
