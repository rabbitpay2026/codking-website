/**
 * The Order Verification page's product scene.
 *
 * The scene is what the route imports; the panel is what the scene composes.
 * Both are exported because the panel is the reusable piece — a later surface
 * that wants the screen without the annotation chips beside it takes the panel
 * directly rather than unpicking the scene.
 */
export { OrderQueuePanel } from "./OrderQueuePanel";
export { OrderVerificationScene } from "./OrderVerificationScene";
