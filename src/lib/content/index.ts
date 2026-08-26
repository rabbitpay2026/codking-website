/**
 * The content repository — the only way pages and components read content.
 *
 * Website Architecture §11 requires shared content to be managed as data so
 * that one source feeds every surface, and so marketing can change prices,
 * rates, testimonials and questions without a developer. This module is the
 * seam that makes both possible: components depend on these functions, never
 * on `src/data`, so moving a content set into a CMS is an edit inside this
 * folder alone.
 *
 * The functions are thin today because the data is local. That is the point —
 * the indirection exists to be swapped, not to add behaviour.
 */
export * from "./abandonedCartRecovery";
export * from "./addressValidation";
export * from "./analytics";
export * from "./announcement";
export * from "./announcement";
export * from "./calculator";
export * from "./codFees";
export * from "./codShowHide";
export * from "./codToPrepaid";
export * from "./company";
export * from "./controls";
export * from "./demoVideos";
export * from "./customers";
export * from "./faq";
export * from "./homepage";
export * from "./integrations";
export * from "./knowledge";
export * from "./legal";
export * from "./messagingGateways";
export * from "./navigation";
export * from "./orderVerification";
export * from "./otpVerification";
export * from "./partialCodPayment";
export * from "./pricing";
export * from "./proof";
export * from "./resources";
export * from "./smsOperators";
