import { Container } from "@/components/shared/Container";
import {
  sectionSpacing,
  type ContainerWidth,
  type SectionSpacing,
} from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { WithChildren, WithClassName } from "@/types";

interface SectionProps extends WithChildren, WithClassName {
  readonly spacing?: SectionSpacing;
  readonly width?: ContainerWidth;
}

/**
 * A contained page section with vertical rhythm applied.
 *
 * Composes `<Container>` rather than reimplementing it, so width rules stay in
 * exactly one place.
 */
export function Section({
  spacing = "default",
  width = "page",
  className,
  children,
}: SectionProps) {
  return (
    <Container
      as="section"
      width={width}
      className={cn(sectionSpacing[spacing], className)}
    >
      {children}
    </Container>
  );
}
