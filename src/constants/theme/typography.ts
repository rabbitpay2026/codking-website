/**
 * Typographic scale.
 *
 * Heading levels are decoupled from HTML tags on purpose: a section can render
 * an `<h2>` that is styled as `display` without breaking document outline or
 * accessibility.
 */
export const headingClass = {
  display: "text-display font-semibold",
  displaySm: "text-display-sm font-semibold",
  h1: "text-4xl font-semibold sm:text-5xl",
  h2: "text-3xl font-semibold sm:text-4xl",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
} as const;

export type HeadingVariant = keyof typeof headingClass;

export const bodyClass = {
  lg: "text-lg leading-relaxed",
  base: "text-base leading-relaxed",
  sm: "text-sm leading-normal",
  xs: "text-xs leading-normal",
} as const;

export type BodyVariant = keyof typeof bodyClass;

export const fontWeight = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export type FontWeight = keyof typeof fontWeight;
