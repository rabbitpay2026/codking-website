import {
  otpCapabilities,
  otpCheckoutStages,
  otpCheckpoints,
  otpDemoPoints,
  otpFlowSteps,
  otpOutcomes,
  otpPageCopy,
} from "@/data/otpVerification";

import type {
  CheckoutStage,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "@/types";

export function getOtpPageCopy(): typeof otpPageCopy {
  return otpPageCopy;
}

export function getOtpCheckpoints(): readonly FeatureCheckpoint[] {
  return otpCheckpoints;
}

export function getOtpFlowSteps(): readonly FeatureFlowStep[] {
  return otpFlowSteps;
}

export function getOtpCheckoutStages(): readonly CheckoutStage[] {
  return otpCheckoutStages;
}

export function getOtpCapabilities(): readonly FeatureCapability[] {
  return otpCapabilities;
}

export function getOtpDemoPoints(): readonly FeatureCheckpoint[] {
  return otpDemoPoints;
}

/**
 * The outcomes band (§6.3).
 *
 * Async rather than a plain return, and deliberately so: the figures it serves
 * are currently literals from the marketing blueprint (see the note in
 * `src/data/otpVerification.ts`), and the fix is to source them the way every
 * other number on the site is sourced — from the proof repository, behind a
 * promise. Keeping the signature async now means that swap is an edit inside
 * this function rather than a change every caller has to follow.
 */
export async function getOtpOutcomes(): Promise<readonly FeatureOutcome[]> {
  return otpOutcomes;
}
