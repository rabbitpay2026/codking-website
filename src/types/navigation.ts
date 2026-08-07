import type { Route } from "next";

/**
 * A single internal navigation destination.
 *
 * `href` is typed as `Route`, so a link to a page that does not exist is a
 * compile-time error rather than a runtime 404.
 */
export interface NavItem {
  readonly label: string;
  readonly href: Route;
  /** One-line supporting text, used by the mega-menu and dropdowns (§4.1). */
  readonly description?: string;
}

/** A titled cluster of navigation items, as used by the footer columns. */
export interface NavGroup {
  readonly title: string;
  readonly items: readonly NavItem[];
}

/**
 * How a primary navigation item behaves (§4.1).
 *
 * The architecture fixes the primary bar at four items: Features opens a
 * mega-menu, Resources opens a dropdown, and the other two are direct links
 * because they are high-intent and must never be buried inside a menu.
 */
export type PrimaryNavBehaviour = "link" | "mega-menu" | "dropdown";

export interface PrimaryNavItem extends NavItem {
  readonly behaviour: PrimaryNavBehaviour;
}

/**
 * The Features mega-menu: one column per order stage, plus a footer row (§4.1).
 *
 * Assembled from the controls repository, so it can never drift from the
 * feature pages or the footer. Columns are plain `NavGroup`s rather than
 * carrying the whole `OrderStage`: the menu renders only the stage's label,
 * and this object crosses the server-client boundary on every page, so the
 * stage's problem statement would be payload nobody reads.
 */
export interface FeaturesMegaMenu {
  readonly columns: readonly NavGroup[];
  readonly footerLinks: readonly NavItem[];
}

/**
 * Visual weight of a utility action (§4.2).
 *
 * `primary` is Install Free and appears on every page including mobile;
 * `secondary` is Book a Demo; `link` is Log in, which must not compete with
 * the install button for attention.
 */
export type UtilityActionVariant = "primary" | "secondary" | "link";

/**
 * An action that leaves this site — the App Store, the app itself, the demo
 * booker, or WhatsApp. `href` is `null` when the destination is not yet
 * configured, so the UI can render a disabled state instead of a dead link.
 */
export interface UtilityAction {
  readonly label: string;
  readonly href: string | null;
  readonly variant: UtilityActionVariant;
}
