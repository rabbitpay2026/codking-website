import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

import type { WithChildren, WithClassName } from "@/types";

import type { ReactNode } from "react";

/**
 * The surface a section sits on.
 *
 * `muted` is a gradient rather than a fill: it starts and ends at the page
 * background, so a muted section blends into its neighbours instead of
 * stepping against them. That is what removes the hard tonal edge without
 * needing a rule to cover it.
 *
 * `dark` flips the token layer for its subtree rather than hardcoding
 * colours, so every child — including shared components that know nothing
 * about the surface they are on — renders its dark values automatically.
 */
type SectionTone = "default" | "muted" | "dark" | "brand";

/**
 * Vertical rhythm.
 *
 * These are per-side values, so the gap a reader actually perceives between
 * two sections is roughly double. They are tuned against that combined seam
 * rather than against the number in isolation — generous, but never so wide
 * that a section reads as marooned from the one before it.
 */
type SectionSize = "flush" | "compact" | "default" | "spacious";

/**
 * How the section meets the page.
 *
 * `bleed` runs edge to edge. `slab` insets the surface and rounds it, so the
 * page background continues around it — which is how a dark band can sit in a
 * light page without cutting it in half.
 */
type SectionVariant = "bleed" | "slab";

const toneClass: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-gradient-to-b from-background via-cloud to-background",
  dark: "dark bg-background text-foreground",
  brand: "text-white",
};

const sizeClass: Record<SectionSize, string> = {
  /** For a section that is meant to arrive directly under the one above it. */
  flush: "py-0",
  compact: "py-8 md:py-10",
  default: "py-section-sm md:py-section lg:py-section-lg",
  spacious: "py-section md:py-section-lg lg:py-[5.5rem]",
};

interface SectionShellProps extends WithChildren, WithClassName {
  readonly id?: string;
  readonly tone?: SectionTone;
  readonly size?: SectionSize;
  readonly variant?: SectionVariant;
  /**
   * Everything behind the content — gradients, patterns, glows. Rendered
   * inside the surface but outside the container, so a backdrop can run full
   * bleed while the content stays on the page grid.
   */
  readonly backdrop?: ReactNode;
  readonly containerClassName?: string;
  /**
   * Fades the page background in over the section's own surface at the top,
   * the bottom, or both.
   *
   * This is the join. Two sections with different surfaces meeting at a hard
   * horizontal edge tell the eye to stop, and a page that tells the eye to
   * stop twelve times is twelve pages. A seam dissolves the edge instead, so
   * one surface arrives out of the other and the story keeps running.
   *
   * Rendered above the backdrop and below the content, so a heading can sit
   * over a seam without being washed out.
   */
  readonly seam?: "top" | "bottom" | "both";
  /**
   * Lets content escape the section box, for elements that deliberately
   * straddle a seam. Off by default, because most backdrops rely on being
   * clipped.
   */
  readonly allowOverflow?: boolean;
  /** Labels the section for assistive technology when it has no heading. */
  readonly ariaLabel?: string;
}

/**
 * The single owner of section rhythm, surface and backdrop.
 *
 * Every homepage section renders through this, which is what stops a long
 * page becoming thirteen slightly different opinions about padding. It also
 * gives each section one place to declare its own identity while the scale
 * underneath stays shared.
 *
 * Sections are joined by tone and overlap rather than separated by rules.
 * There is not a single horizontal border between sections on this page: a
 * line drawn across the full width tells the eye to stop, which is the exact
 * opposite of what a page telling one continuous story wants.
 *
 * `isolate` gives each section its own stacking context, so a backdrop can
 * never paint over the section above or below it.
 */
export function SectionShell({
  id,
  tone = "default",
  size = "default",
  variant = "bleed",
  backdrop,
  className,
  containerClassName,
  allowOverflow = false,
  seam,
  ariaLabel,
  children,
}: SectionShellProps) {
  const surface = (
    <>
      {backdrop}

      {seam === "top" || seam === "both" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-background to-transparent lg:h-32"
        />
      ) : null}
      {seam === "bottom" || seam === "both" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-background to-transparent lg:h-32"
        />
      ) : null}

      <Container
        className={cn("relative z-10", sizeClass[size], containerClassName)}
      >
        {children}
      </Container>
    </>
  );

  if (variant === "slab") {
    return (
      <section
        id={id}
        aria-label={ariaLabel}
        className={cn("bg-background", id && "scroll-mt-header")}
      >
        <div className="mx-auto w-full max-w-[100rem] px-3 sm:px-5 lg:px-8">
          <div
            className={cn(
              "relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.5rem]",
              toneClass[tone],
              className,
            )}
          >
            {surface}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative isolate",
        allowOverflow ? undefined : "overflow-hidden",
        toneClass[tone],
        id && "scroll-mt-header",
        className,
      )}
    >
      {surface}
    </section>
  );
}
