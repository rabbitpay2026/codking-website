import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface DemoFrameProps {
  /** What the merchant would see in the product's own chrome. */
  readonly label: string;
  /** Right-hand status, e.g. a live count or the surface being shown. */
  readonly status?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
  readonly bodyClassName?: string;
}

/**
 * The application chrome every flagship demonstration sits in.
 *
 * One frame shared by all three, so the section reads as three views of one
 * product rather than three unrelated illustrations. The window controls and
 * the title bar are what make the panel read as *software* — the same content
 * in a plain card reads as an infographic about software, which is a much
 * weaker claim.
 *
 * The frame is deliberately quiet: a soft top light, a hairline, and nothing
 * else. Everything with colour in it belongs to the demonstration inside.
 */
export function DemoFrame({
  label,
  status,
  children,
  className,
  bodyClassName,
}: DemoFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-overlay",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent"
      />

      <div
        aria-hidden
        className="flex items-center gap-2 border-b border-border bg-gradient-to-b from-cloud to-card px-4 py-2.5"
      >
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 text-[11px] font-medium text-muted-foreground">
          {label}
        </span>
        {status ? <span className="ml-auto">{status}</span> : null}
      </div>

      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

/** A live indicator for the frame's status slot. */
export function LiveDot({ label }: { readonly label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-check/18 px-2 py-0.5 text-[10px] font-semibold text-ink/70">
      <span className="relative grid size-1.5 place-items-center">
        <span className="absolute size-1.5 animate-ping rounded-full bg-brand-check/70" />
        <span className="size-1.5 rounded-full bg-brand-check" />
      </span>
      {label}
    </span>
  );
}
