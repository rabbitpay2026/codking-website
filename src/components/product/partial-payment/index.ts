/**
 * The partial-payment checkout interaction, as reusable parts.
 *
 * Kept outside `components/features/partial-cod-payment` on purpose: the
 * feature page composes these, but so does anything else that needs to show a
 * deposit being taken — a control page, a comparison, a future landing page.
 * A component living inside one page's folder is a component nobody reuses.
 */
export { PartialPaymentPanel } from "./PartialPaymentPanel";
export { PartialPaymentScene } from "./PartialPaymentScene";
