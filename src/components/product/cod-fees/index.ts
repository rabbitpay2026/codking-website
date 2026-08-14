/**
 * The COD fee landing on a checkout, as reusable parts.
 *
 * Kept outside `components/features/cod-fees` on purpose: the feature page
 * composes these, but so does anything else that needs to show a fee being
 * added to a cash-on-delivery order — the COD Fee calculator, a comparison, a
 * future landing page. A component living inside one page's folder is a
 * component nobody reuses.
 */
export { CodFeeCheckout } from "./CodFeeCheckout";
export { CodFeesScene } from "./CodFeesScene";
