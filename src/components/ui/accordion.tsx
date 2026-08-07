"use client";

import { ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

import type { ComponentProps, ReactNode } from "react";

/**
 * Disclosure primitive, wrapping Radix Accordion.
 *
 * Radix owns the behaviour that is easy to get wrong: correct
 * `aria-expanded` / `aria-controls` wiring, roving focus, and publishing the
 * measured content height so the panel can animate open without JavaScript
 * measuring it on every frame.
 */
export function Accordion({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(className)}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  indicator,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger> & {
  /**
   * Replaces the chevron.
   *
   * Optional so every existing disclosure keeps the chevron it has, and so a
   * caller that wants a different affordance — the homepage FAQ draws a plus
   * that unfolds into a minus — does not need a second accordion. The
   * open-state rotation below is scoped to `svg`, which the chevron is and a
   * custom indicator generally is not, so the two cannot collide.
   */
  readonly indicator?: ReactNode;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 text-left",
          "text-base font-medium text-foreground",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          "rounded-md transition-colors hover:text-brand",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        {indicator ?? (
          <ChevronDown
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-emphasized)]"
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
