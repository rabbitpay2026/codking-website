import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

interface AuroraProps extends WithClassName {
  /** Dials the whole field down where it sits behind dense content. */
  readonly intensity?: "soft" | "default" | "strong";
}

const intensityOpacity = {
  soft: "opacity-40",
  default: "opacity-70",
  strong: "opacity-100",
} as const;

/**
 * Slow-drifting colour field.
 *
 * Three heavily blurred orbs on long, offset loops. Built from the brand
 * tokens rather than fixed colours, so it re-tints with everything else, and
 * from CSS transforms only — no canvas, no JavaScript, no work on the main
 * thread once the page has painted.
 *
 * Decorative and hidden from assistive technology. The global reduced-motion
 * rule stops the drift, leaving a static gradient rather than nothing, so the
 * surface still looks designed when motion is switched off.
 */
export function Aurora({ className, intensity = "default" }: AuroraProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensityOpacity[intensity],
        className,
      )}
    >
      <div className="absolute -top-[30%] -left-[12%] size-[42rem] animate-aurora rounded-full bg-brand/30 blur-[130px]" />
      <div className="absolute -top-[18%] -right-[8%] size-[34rem] animate-aurora rounded-full bg-brand-accent/28 blur-[120px] [animation-delay:-9s]" />
      <div className="absolute -bottom-[35%] left-[22%] size-[38rem] animate-aurora rounded-full bg-brand-check/12 blur-[140px] [animation-delay:-18s]" />
    </div>
  );
}
