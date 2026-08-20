import {
  calculatorKnowledge,
  controlKnowledge,
  documentationScope,
  featureCombinations,
  interventionPoints,
  merchantProblems,
  productOverview,
  questionRoutes,
} from "@/data/knowledge";
import {
  getCartAudience,
  getCartCheckpoints,
  getCartDemoPoints,
  getCartFeatures,
  getCartFlowResult,
  getCartFlowSteps,
  getCartPageCopy,
} from "@/lib/content/abandonedCartRecovery";
import {
  getCodFeesAudience,
  getCodFeesCheckpoints,
  getCodFeesDemoPoints,
  getCodFeesFeatures,
  getCodFeesFlowResult,
  getCodFeesFlowSteps,
  getCodFeesPageCopy,
} from "@/lib/content/codFees";
import {
  getCodShowHideAudience,
  getCodShowHideCheckpoints,
  getCodShowHideDemoPoints,
  getCodShowHideFeatures,
  getCodShowHideFlowResult,
  getCodShowHideFlowSteps,
  getCodShowHidePageCopy,
} from "@/lib/content/codShowHide";
import {
  getPrepaidAudience,
  getPrepaidCheckpoints,
  getPrepaidDemoPoints,
  getPrepaidFeatures,
  getPrepaidFlowResult,
  getPrepaidFlowSteps,
  getPrepaidPageCopy,
} from "@/lib/content/codToPrepaid";
import { getControlBySlug, getPublishedControls } from "@/lib/content/controls";
import { getFaqsByTag } from "@/lib/content/faq";
import {
  getOtpCapabilities,
  getOtpCheckpoints,
  getOtpDemoPoints,
  getOtpFlowSteps,
  getOtpPageCopy,
} from "@/lib/content/otpVerification";
import {
  getPartialAudience,
  getPartialCheckpoints,
  getPartialDemoPoints,
  getPartialFeatures,
  getPartialFlowResult,
  getPartialFlowSteps,
  getPartialPageCopy,
} from "@/lib/content/partialCodPayment";
import { getPlanForControl } from "@/lib/content/pricing";
/*
  The outcomes bands are read straight from the data modules rather than
  through an accessor, because no page reads them that way: each feature page
  imports its own band from its own module, and this is the only reader that
  needs all six. Content modules in this folder are the layer that is allowed
  to import from `src/data` — that is the seam this folder exists to be.

  The route renders these without their `value` field. Two of the six bands
  carry percentages the repository flags as unsourced, and a knowledge map is
  quoted verbatim by the systems that read it; the titles and captions are
  qualitative statements the pages already make, and those are what survive.
*/
import { cartOutcomes } from "@/data/abandonedCartRecovery";
import { codFeesOutcomes } from "@/data/codFees";
import { codShowHideOutcomes } from "@/data/codShowHide";
import { prepaidOutcomes } from "@/data/codToPrepaid";
import { otpOutcomes } from "@/data/otpVerification";
import { partialOutcomes } from "@/data/partialCodPayment";

import type {
  AudienceSegment,
  CalculatorKnowledge,
  ControlDossier,
  ControlSlug,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureCombination,
  FeatureFlowStep,
  FeatureOutcome,
  InterventionPoint,
  MerchantProblem,
  QuestionRoute,
} from "@/types";

export function getProductOverview(): readonly string[] {
  return productOverview;
}

export function getInterventionPoints(): readonly InterventionPoint[] {
  return interventionPoints;
}

export function getMerchantProblems(): readonly MerchantProblem[] {
  return merchantProblems;
}

export function getFeatureCombinations(): readonly FeatureCombination[] {
  return featureCombinations;
}

export function getCalculatorKnowledge(): CalculatorKnowledge {
  return calculatorKnowledge;
}

export function getQuestionRoutes(): readonly QuestionRoute[] {
  return questionRoutes;
}

export function getDocumentationScope(): typeof documentationScope {
  return documentationScope;
}

/**
 * What each published control's own page says, in one shape.
 *
 * The six feature pages were built one at a time and their content modules
 * name their exports after themselves — `otpFlowSteps`, `partialFeatures`,
 * `codShowHideAudience`. That is right for the pages, which each read one
 * module, and useless for a reader that has to describe all six in the same
 * terms. This table is the only place those six vocabularies are reconciled.
 *
 * OTP Verification is the one that does not fit the later shape. It was built
 * first, before the "key features + best suited for" pattern settled, so it
 * publishes a capability row rather than a features grid, has no one-line
 * payoff under its flow, names no audience segments, and carries no closing
 * configuration note. Its entry says so by omission rather than by having
 * something invented for it.
 */
const PAGE_CONTENT: Partial<
  Record<
    ControlSlug,
    {
      readonly summary: string;
      readonly checkpoints: readonly FeatureCheckpoint[];
      readonly outcomes: readonly FeatureOutcome[];
      readonly steps: readonly FeatureFlowStep[];
      readonly result: string | null;
      readonly demoPoints: readonly FeatureCheckpoint[];
      readonly capabilities: readonly FeatureCapability[];
      readonly audience: readonly AudienceSegment[];
      readonly configurationNote: string | null;
    }
  >
> = {
  "otp-verification": {
    summary: getOtpPageCopy().description,
    checkpoints: getOtpCheckpoints(),
    outcomes: otpOutcomes,
    steps: getOtpFlowSteps(),
    result: null,
    demoPoints: getOtpDemoPoints(),
    capabilities: getOtpCapabilities(),
    audience: [],
    configurationNote: null,
  },
  "partial-cod-payment": {
    summary: getPartialPageCopy().description,
    checkpoints: getPartialCheckpoints(),
    outcomes: partialOutcomes,
    steps: getPartialFlowSteps(),
    result: getPartialFlowResult(),
    demoPoints: getPartialDemoPoints(),
    capabilities: getPartialFeatures(),
    audience: getPartialAudience(),
    configurationNote: null,
  },
  "cod-to-prepaid": {
    summary: getPrepaidPageCopy().description,
    checkpoints: getPrepaidCheckpoints(),
    outcomes: prepaidOutcomes,
    steps: getPrepaidFlowSteps(),
    result: getPrepaidFlowResult(),
    demoPoints: getPrepaidDemoPoints(),
    capabilities: getPrepaidFeatures(),
    audience: getPrepaidAudience(),
    configurationNote: getPrepaidPageCopy().faqTip,
  },
  "abandoned-cart-recovery": {
    summary: getCartPageCopy().description,
    checkpoints: getCartCheckpoints(),
    outcomes: cartOutcomes,
    steps: getCartFlowSteps(),
    result: getCartFlowResult(),
    demoPoints: getCartDemoPoints(),
    capabilities: getCartFeatures(),
    audience: getCartAudience(),
    configurationNote: getCartPageCopy().faqTip,
  },
  "cod-show-hide": {
    summary: getCodShowHidePageCopy().description,
    checkpoints: getCodShowHideCheckpoints(),
    outcomes: codShowHideOutcomes,
    steps: getCodShowHideFlowSteps(),
    result: getCodShowHideFlowResult(),
    demoPoints: getCodShowHideDemoPoints(),
    capabilities: getCodShowHideFeatures(),
    audience: getCodShowHideAudience(),
    configurationNote: getCodShowHidePageCopy().faqTip,
  },
  "cod-fees": {
    summary: getCodFeesPageCopy().description,
    checkpoints: getCodFeesCheckpoints(),
    outcomes: codFeesOutcomes,
    steps: getCodFeesFlowSteps(),
    result: getCodFeesFlowResult(),
    demoPoints: getCodFeesDemoPoints(),
    capabilities: getCodFeesFeatures(),
    audience: getCodFeesAudience(),
    configurationNote: getCodFeesPageCopy().faqTip,
  },
};

/**
 * Everything `/llms.txt` says about one control, resolved (§13).
 *
 * `undefined` when the control has no record, no published page content or no
 * knowledge entry — the same failure mode every other resolver in this folder
 * chose. A control missing any of the three is dropped from the file rather
 * than described from half its sources.
 *
 * The questions come from the tagged pool by `control:${slug}`, which is the
 * same tag the control's own page reads, so the questions this file attributes
 * to a control are the ones the page actually asks.
 */
export function getControlDossier(
  slug: ControlSlug,
): ControlDossier | undefined {
  const control = getControlBySlug(slug);
  const page = PAGE_CONTENT[slug];
  const knowledge = controlKnowledge[slug];

  if (!control || !page || !knowledge) return undefined;

  return {
    control,
    summary: page.summary,
    checkpoints: page.checkpoints,
    outcomes: page.outcomes,
    steps: page.steps,
    result: page.result,
    demoPoints: page.demoPoints,
    capabilities: page.capabilities,
    audience: page.audience,
    configurationNote: page.configurationNote,
    questions: getFaqsByTag(`control:${slug}`),
    plan: getPlanForControl(slug),
    knowledge,
  };
}

/**
 * A dossier for every published control, in the controls repository's order.
 *
 * Read from `getPublishedControls()` — the same function the sitemap reads —
 * so `/llms.txt` describes exactly the control pages that are canonical and
 * indexable, and gains one in the same commit the sitemap does.
 */
export function getControlDossiers(): readonly ControlDossier[] {
  return getPublishedControls().flatMap((control) => {
    const dossier = getControlDossier(control.slug);
    return dossier ? [dossier] : [];
  });
}
