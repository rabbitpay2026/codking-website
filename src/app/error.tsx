"use client";

import { Section } from "@/components/shared/Section";
import { bodyClass, headingClass, transitionClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

/**
 * Route-level error boundary. Must be a Client Component so `reset` can
 * re-render the segment without a full page reload.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>Something went wrong</h1>
      <p className={cn(bodyClass.base, "mt-3 text-muted-foreground")}>
        An unexpected error occurred. Please try again.
      </p>
      {error.digest ? (
        <p className={cn(bodyClass.xs, "mt-2 font-mono text-muted-foreground")}>
          Reference: {error.digest}
        </p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className={cn(
          "mt-6 rounded-md border border-input px-4 py-2 text-sm hover:bg-accent",
          transitionClass.colors,
        )}
      >
        Try again
      </button>
    </Section>
  );
}
