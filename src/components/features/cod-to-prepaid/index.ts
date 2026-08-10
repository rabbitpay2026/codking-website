/**
 * The COD to Prepaid page, section by section.
 *
 * Each export is one band of the page: it reads its own content from the
 * repository, picks the marks for it, and hands both to the shared section in
 * `components/features/sections`. So the route file states what the page is
 * made of, this folder states what each band says, and none of it restates how
 * a feature page looks — the architecture the OTP Verification and Partial COD
 * Payment pages established and the remaining feature pages follow.
 */
export { CodToPrepaidAudience } from "./CodToPrepaidAudience";
export { CodToPrepaidBenefits } from "./CodToPrepaidBenefits";
export { CodToPrepaidCta } from "./CodToPrepaidCta";
export { CodToPrepaidDemo } from "./CodToPrepaidDemo";
export { CodToPrepaidFaq } from "./CodToPrepaidFaq";
export { CodToPrepaidFeatures } from "./CodToPrepaidFeatures";
export { CodToPrepaidFlow } from "./CodToPrepaidFlow";
export { CodToPrepaidHero } from "./CodToPrepaidHero";
