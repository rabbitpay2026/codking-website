/**
 * The OTP verification interaction, as reusable parts.
 *
 * Kept outside `components/features/otp-verification` on purpose: the feature
 * page composes these, but so does anything else that needs to show a
 * verification running — a control page, a comparison, a future landing page.
 * A component living inside one page's folder is a component nobody reuses.
 */
export { CheckoutMock } from "./CheckoutMock";
export { IndiaFlag } from "./IndiaFlag";
export { OtpVerificationPanel } from "./OtpVerificationPanel";
export { OtpVerificationScene } from "./OtpVerificationScene";
