import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

import type { WithChildren, WithClassName } from "@/types";

import type { ReactNode } from "react";

/**
 * The surface a section sits on.
 *
 * `dark` flips the token layer for its subtree rather than hardcoding
 * colours, so every child — including shared components that know nothing
 * about the surface they are on — renders its dark values automatically.
 */
type SectionTone = "default" | "muted" | "dark" | "brand";

/**
 * Vertical rhythm. `default` is the page's normal breath; `compact` is for
 * connective bands like the trust strip that should not feel like a stop;
 * `spacious` is reserved for the two moments that carry the most weight.
 */
type SectionSize = "compact" | "default" | "spacious";

const toneClass: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-cloud",
  dark: "dark bg-background text-foreground",
  brand: "bg-brand text-white",
};

const sizeClass: Record<SectionSize, string> = {
  compact: "py-12 md:py-16",
  default: "py-section-sm md:py-section lg:py-section-lg",
  spacious: "py-section md:py-section-lg lg:py-[13rem]",
};

interface SectionShellProps extends WithChildren, WithClassName {
  readonly id?: string;
  readonly tone?: SectionTone;
  readonly size?: SectionSize;
  /**
   * Everything behind the content — gradients, patterns, glows. Rendered
   * inside the section but outside the container, so a backdrop can run full
   * bleed while the content stays on the page grid.
   */
  readonly backdrop?: ReactNode;
  readonly containerClassName?: string;
  /** Labels the section for assistive technology when it has no heading. */
  readonly ariaLabel?: string;
}

/**
 * The single owner of section rhythm, surface and backdrop.
 *
 * Every homepage section renders through this, which is what stops a long
 * page from becoming thirteen slightly different opinions about padding. It
 * also gives each section one place to declare its own visual identity while
 * the spacing scale underneath stays shared — the two things that together
 * make a page read as composed rather than assembled.
 *
 * `isolate` gives each section its own stacking context, so a backdrop can
 * never paint over the section above or below it.
 */
export function SectionShell({
  id,
  tone = "default",
  size = "default",
  backdrop,
  className,
  containerClassName,
  ariaLabel,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative isolate overflow-hidden",
        toneClass[tone],
        id ? "scroll-mt-header" : undefined,
        className,
      )}
    >
      {backdrop}

      <Container
        className={cn("relative z-10", sizeClass[size], containerClassName)}
      >
        {children}
      </Container>
    </section>
  );
}
