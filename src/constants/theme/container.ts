/**
 * Page shell widths and gutters.
 *
 * Consumed by `<Container>` (`src/components/common/Container.tsx`), which is
 * the only component that should apply these directly.
 */
export const containerWidth = {
  /** Full marketing page width. */
  page: "max-w-page",
  /** Narrow measure for long-form reading — blog, legal, docs. */
  prose: "max-w-prose",
  /** Edge-to-edge; the gutter still applies. */
  fluid: "max-w-none",
} as const;

export type ContainerWidth = keyof typeof containerWidth;

/** Responsive horizontal gutter shared by every container. */
export const containerGutter = "px-4 sm:px-6 lg:px-8";
