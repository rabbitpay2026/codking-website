import {
  containerGutter,
  containerWidth,
  type ContainerWidth,
} from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { WithChildren, WithClassName } from "@/types";

type ContainerElement =
  "div" | "section" | "header" | "footer" | "main" | "article" | "nav";

interface ContainerProps extends WithChildren, WithClassName {
  /** Semantic element to render. Defaults to a non-semantic `div`. */
  readonly as?: ContainerElement;
  readonly width?: ContainerWidth;
}

/**
 * The single owner of page width and horizontal gutter.
 *
 * No other component should apply `max-w-*` or page padding directly — routing
 * every shell through here keeps the layout grid consistent site-wide.
 */
export function Container({
  as: Element = "div",
  width = "page",
  className,
  children,
}: ContainerProps) {
  return (
    <Element
      className={cn(
        "mx-auto w-full",
        containerWidth[width],
        containerGutter,
        className,
      )}
    >
      {children}
    </Element>
  );
}
