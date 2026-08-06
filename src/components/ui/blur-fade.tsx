import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface BlurFadeProps {
  readonly children: ReactNode;
  readonly className?: string;
  /**
   * Retained for call-site compatibility. Scroll-driven animation has no
   * timeline to delay against, so stagger is expressed by giving later items
   * a slightly later entry range instead.
   */
  readonly delay?: number;
  /** Retained for call-site compatibility; the reveal is always scroll-linked. */
  readonly inView?: boolean;
}

/**
 * Scroll-linked entrance.
 *
 * Reimplemented from the registry version, which animated with JavaScript
 * from an inline `opacity: 0`. That default made every wrapped section
 * invisible until a script ran and an observer fired — so a blocked chunk, a
 * print, or any tool that does not scroll produced a page of headings above
 * empty space. It was also a client component, which pulled a runtime into
 * thirteen server-rendered sections for a fade.
 *
 * This version is a server component with no JavaScript at all. The motion
 * lives entirely in the `reveal` utility, inside `@supports
 * (animation-timeline: view())`, so any browser without scroll-driven
 * animations — and anyone who asked for reduced motion — gets the finished,
 * visible state. It can only ever fail towards content being shown.
 */
export function BlurFade({ children, className, delay = 0 }: BlurFadeProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={
        delay
          ? // Later items start their range fractionally further into the
            // viewport, which reads as a stagger without a timer.
            { animationRange: `entry ${Math.min(delay * 40, 14)}% cover 26%` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
