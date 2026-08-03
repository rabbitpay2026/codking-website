/**
 * Motion tokens.
 *
 * CSS transitions and Framer Motion need different units, so both are exposed
 * from one source: `durationMs` drives Tailwind/CSS, `durationSec` drives
 * Framer Motion, and they are derived from the same numbers.
 */
export const durationMs = {
  fast: 150,
  base: 250,
  slow: 400,
} as const;

export type Duration = keyof typeof durationMs;

export const durationSec = {
  fast: durationMs.fast / 1000,
  base: durationMs.base / 1000,
  slow: durationMs.slow / 1000,
} as const;

/** Cubic-bezier control points, in the tuple form Framer Motion expects. */
export const easing = {
  emphasized: [0.2, 0, 0, 1],
  standard: [0.4, 0, 0.2, 1],
} as const;

export type Easing = keyof typeof easing;

/** Ready-made class combinations for simple CSS-only transitions. */
export const transitionClass = {
  colors: "transition-colors duration-200 ease-out",
  transform: "transition-transform duration-200 ease-out",
  all: "transition-all duration-200 ease-out",
} as const;
