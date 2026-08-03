import type { Route } from "next";

/**
 * A single navigation destination.
 *
 * `href` is typed as `Route`, so a link to a page that does not exist is a
 * compile-time error rather than a runtime 404.
 */
export interface NavItem {
  readonly label: string;
  readonly href: Route;
  readonly description?: string;
}

/** A titled cluster of navigation items, as used by the footer columns. */
export interface NavGroup {
  readonly title: string;
  readonly items: readonly NavItem[];
}
