/**
 * The OTP Verification page, section by section.
 *
 * Each export is one band of the page and reads its own content from the
 * repository, so the route file states what the page is made of and holds no
 * copy of its own. The five remaining feature pages are built the same way:
 * a folder of sections here, the shared interaction in `components/product`,
 * and the words in `src/data`.
 */
export { OtpVerificationBenefits } from "./OtpVerificationBenefits";
export { OtpVerificationCapabilities } from "./OtpVerificationCapabilities";
export { OtpVerificationCheckout } from "./OtpVerificationCheckout";
export { OtpVerificationCta } from "./OtpVerificationCta";
export { OtpVerificationDemo } from "./OtpVerificationDemo";
export { OtpVerificationFlow } from "./OtpVerificationFlow";
export { OtpVerificationHero } from "./OtpVerificationHero";
export { OtpVerificationTestimonials } from "./OtpVerificationTestimonials";
