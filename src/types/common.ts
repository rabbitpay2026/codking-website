import type { ReactNode } from "react";

/** Components that render arbitrary nested content. */
export interface WithChildren {
  readonly children: ReactNode;
}

/** Components that allow the caller to extend their styling. */
export interface WithClassName {
  readonly className?: string;
}

/** Semantic element override, for components that should not hardcode a tag. */
export interface WithAsElement<T extends string> {
  readonly as?: T;
}
