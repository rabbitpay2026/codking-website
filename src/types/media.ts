import type { ControlSlug } from "@/types/controls";

/**
 * The surfaces that embed a demo recording.
 *
 * `"home"` is the homepage's closing band; every other member is a control,
 * whose feature page (§6.3) shows that control's own demo. Tied to the closed
 * `ControlSlug` union deliberately — a registry entry for a control that does
 * not exist is a compile error rather than a video nobody ever sees.
 */
export type DemoVideoSurface = "home" | ControlSlug;

/**
 * Which recording plays where, as YouTube ids.
 *
 * Partial by contract. A surface with no entry falls back to the site's
 * general demo, which is the right behaviour for a page whose own recording
 * has not been made yet: the player still works, and it shows the product.
 */
export type DemoVideoRegistry = Partial<Record<DemoVideoSurface, string>>;
