/**
 * The Partial COD Payment page, section by section.
 *
 * Each export is one band of the page and reads its own content from the
 * repository, so the route file states what the page is made of and holds no
 * copy of its own — the architecture the OTP Verification page established and
 * the four remaining feature pages will follow.
 */
export { PartialPaymentAudience } from "./PartialPaymentAudience";
export { PartialPaymentBenefits } from "./PartialPaymentBenefits";
export { PartialPaymentCta } from "./PartialPaymentCta";
export { PartialPaymentDemo } from "./PartialPaymentDemo";
export { PartialPaymentFaq } from "./PartialPaymentFaq";
export { PartialPaymentFeatures } from "./PartialPaymentFeatures";
export { PartialPaymentFlow } from "./PartialPaymentFlow";
export { PartialPaymentHero } from "./PartialPaymentHero";
