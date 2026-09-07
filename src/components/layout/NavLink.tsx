import Link from "next/link";

import type { NavDestination } from "@/types";

import type { ComponentProps } from "react";

interface NavLinkProps extends Omit<ComponentProps<"a">, "href"> {
  readonly item: NavDestination;
}

/**
 * Renders one navigation destination, internal or external.
 *
 * The header dropdown, the mobile drawer and the footer all draw from the same
 * navigation config, and that config now mixes our own routes with the Docs and
 * Blog subdomains. Without this, each of those three would carry its own copy
 * of the same decision — `<Link>` or `<a>`, and what an off-site link owes the
 * person following it.
 *
 * Off-site destinations open in a new tab, which is a thing a link must say
 * rather than simply do: the sr-only note is announced with the label, so a
 * screen-reader user is told before they activate it and not surprised after.
 * `rel` is set for the usual reasons — the opened page never gets a handle back
 * onto this one.
 *
 * All other props pass through untouched, so Radix's `asChild` can hand this
 * its ref and event handlers exactly as it would a bare anchor.
 */
export function NavLink({ item, children, className, ...props }: NavLinkProps) {
  /*
    A destination that is announced but not yet built (`comingSoon`) is not a
    link, and is not drawn as one: a span carries the label, so there is
    nothing to click, nothing to tab to, and no href for a crawler to follow
    into a page that does not exist. `aria-disabled` states why rather than
    leaving a screen reader to infer it from the styling, and the sr-only note
    carries the same word the sighted label shows.

    The remaining props are deliberately dropped here. Every one of them —
    `onClick`, the handlers Radix hands down — exists to serve a navigation
    that is not going to happen; the drawer, for instance, should stay open
    when a merchant taps a row that goes nowhere.
  */
  if (item.comingSoon) {
    return (
      <span className={className} aria-disabled="true">
        {children}
        <span className="sr-only"> (coming soon)</span>
      </span>
    );
  }

  if (item.external) {
    return (
      <a
        {...props}
        className={className}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link {...props} className={className} href={item.href}>
      {children}
    </Link>
  );
}
