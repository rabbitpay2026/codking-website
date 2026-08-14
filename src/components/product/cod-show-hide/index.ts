/**
 * The COD rule reaching a checkout, as reusable parts.
 *
 * Kept outside `components/features/cod-show-hide` on purpose: the feature
 * page composes these, but so does anything else that needs to show cash on
 * delivery being withdrawn by a rule — a comparison, a calculator, a future
 * landing page. A component living inside one page's folder is a component
 * nobody reuses.
 */
export { CodRuleCheckout } from "./CodRuleCheckout";
export { CodShowHideScene } from "./CodShowHideScene";
