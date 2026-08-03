/**
 * Elevation scale.
 *
 * Deliberately shallow — surfaces are distinguished primarily by borders and
 * background tokens, with shadow reserved for genuinely floating layers.
 */
export const shadowClass = {
  none: "shadow-none",
  /** Resting surfaces: cards, panels, tiles. */
  card: "shadow-card",
  /** Layers above the page: dropdowns, popovers, dialogs. */
  overlay: "shadow-overlay",
} as const;

export type ShadowScale = keyof typeof shadowClass;
