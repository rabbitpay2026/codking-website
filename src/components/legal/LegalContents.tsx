"use client";

import { ChevronDown, List } from "lucide-react";
import { useRef } from "react";

import { useSectionSpy } from "@/hooks/use-section-spy";
import { cn } from "@/lib/utils";

import type { MouseEvent } from "react";

export interface LegalContentsItem {
  readonly id: string;
  readonly label: string;
}

interface LegalContentsProps {
  readonly items: readonly LegalContentsItem[];
  /**
   * `rail` is the desktop column; `compact` is the disclosure that replaces it
   * below `lg`. Both are rendered by the page — one is hidden at any width —
   * because a contents list is a different object on a phone, not the same
   * object narrower.
   */
  readonly variant: "rail" | "compact";
  readonly className?: string;
}

/**
 * The document's contents, with the section being read marked.
 *
 * The active state is the point of it. A twelve-section policy scrolled halfway
 * through is a page with no landmarks; the rail answers "where am I" without the
 * reader having to look for a heading. It is drawn as quietly as that job allows
 * — brand blue, a slightly heavier weight, and a two-pixel edge — because a
 * contents list that announces itself competes with the document it indexes.
 *
 * Clicking is intercepted rather than left to the browser so that the item
 * highlights on the click instead of a scroll-duration later, and so the smooth
 * scroll can be dropped for anyone who asked for reduced motion. The landing
 * position is not computed here: each section carries its own `scroll-margin-top`
 * and `scrollIntoView` honours it, so the header offset lives in one place
 * instead of being duplicated in JavaScript.
 *
 * Focus moves to the section as well as the scroll. Without it a keyboard user
 * activating a contents link is scrolled to the section but left tabbing from
 * the rail, which is the accessibility failure this pattern usually ships with.
 */
export function LegalContents({
  items,
  variant,
  className,
}: LegalContentsProps) {
  const { activeId, pin } = useSectionSpy(items.map((item) => item.id));
  const disclosure = useRef<HTMLDetailsElement>(null);

  const onSelect = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);

    // No element means the document changed under us; let the browser try.
    if (!target) return;

    event.preventDefault();
    pin(id);
    disclosure.current?.removeAttribute("open");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });

    /*
      The hash is replaced rather than pushed: a reader working down a contents
      list should not have to press Back once per section to leave the page.
    */
    window.history.replaceState(null, "", `#${id}`);

    target.focus({ preventScroll: true });
  };

  const list = (
    <ul
      className={cn(
        variant === "rail"
          ? "mt-3 space-y-0.5 border-l border-ink/[0.09]"
          : "mt-1 grid gap-0.5 sm:grid-cols-2",
      )}
    >
      {items.map((item) => {
        const active = item.id === activeId;

        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => onSelect(event, item.id)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "block rounded-r-md text-[13.5px] leading-snug transition-[color,background-color,border-color] duration-200 ease-[var(--ease-emphasized)]",
                "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none",
                variant === "rail"
                  ? "-ml-px border-l-2 py-[7px] pl-3.5"
                  : "rounded-md px-3 py-2.5",
                active
                  ? "font-semibold text-brand"
                  : "font-medium text-ink/60 hover:text-ink",
                variant === "rail" &&
                  (active
                    ? "border-brand bg-brand/[0.055]"
                    : "border-transparent hover:border-ink/20"),
                variant === "compact" &&
                  (active ? "bg-brand/[0.06]" : "hover:bg-ink/[0.035]"),
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "compact") {
    return (
      <details
        ref={disclosure}
        className={cn(
          "group rounded-xl border border-ink/[0.09] bg-white/70 px-3.5 py-3 backdrop-blur-sm",
          className,
        )}
      >
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md text-[11.5px] font-semibold tracking-[0.08em] text-ink/60 uppercase focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
          <List aria-hidden className="size-3.5 shrink-0 text-ink/40" />
          On this page
          <ChevronDown
            aria-hidden
            className="ml-auto size-4 shrink-0 text-ink/40 transition-transform duration-200 ease-[var(--ease-emphasized)] group-open:rotate-180"
          />
        </summary>

        <nav aria-label="On this page" className="mt-2">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "sticky top-[calc(var(--spacing-header)+1.75rem)] max-h-[calc(100svh-var(--spacing-header)-3.5rem)] overflow-y-auto overscroll-contain",
        className,
      )}
    >
      <p className="text-[11px] font-semibold tracking-[0.09em] text-ink/50 uppercase">
        On this page
      </p>
      {list}
    </nav>
  );
}
