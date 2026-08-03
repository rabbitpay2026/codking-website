/**
 * Corner radius scale.
 *
 * Every step derives from the single `--radius` token in
 * `src/app/globals.css`, so the whole UI rounds up or down together.
 */
export const radiusClass = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

export type RadiusScale = keyof typeof radiusClass;

/** Raw values, for consumers that cannot take a class name. */
export const radiusValue = {
  none: "0px",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  full: "9999px",
} as const;
