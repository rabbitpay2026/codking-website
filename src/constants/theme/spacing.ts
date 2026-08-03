/**
 * Vertical rhythm applied to page sections.
 *
 * Backed by the `--spacing-section*` tokens in `src/app/globals.css`, so the
 * scale can be retuned in one place without touching component markup.
 */
export const sectionSpacing = {
  none: "",
  compact: "py-section-sm",
  default: "py-section",
} as const;

export type SectionSpacing = keyof typeof sectionSpacing;

/** Gap presets for stacked and gridded layouts. */
export const stackGap = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
} as const;

export type StackGap = keyof typeof stackGap;
