/**
 * The abandoned-cart recovery interaction, as reusable parts.
 *
 * Kept outside `components/features/abandoned-cart-recovery` on purpose: the
 * feature page composes these, but so does anything else that needs to show a
 * checkout being recovered — a comparison, a calculator, a future landing
 * page. A component living inside one page's folder is a component nobody
 * reuses.
 *
 * `AbandonedCartScene` owns the timeline and the composition; the screen is
 * presentational and takes the beat, so the device and the cards around it can
 * never be describing different moments. The beats themselves are in
 * `recoveryBeats`, which is the only place the mock cart is written down.
 */
export { AbandonedCartScene } from "./AbandonedCartScene";
export { AbandonedCartScreen } from "./AbandonedCartScreen";
