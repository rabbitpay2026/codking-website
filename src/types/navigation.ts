import type { ControlSlug } from "@/types/controls";

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
 * One feature in the Features menu.
 *
 * Carries its slug as well as its URL so the menu can draw the same mark the
 * Features page draws for it. Deriving the mark from the href would mean
 * parsing a path back into an identifier the record already has.
 */
export interface FeatureNavItem extends NavItem {
  readonly slug: ControlSlug;
}

/**
 * The Features menu: the six features this site leads with, plus a footer row
 * (§4.1).
 *
 * A flat set rather than a column per order stage. The stage grouping is how
 * the controls are *modelled* (§6.1) and it still organises the footer, but a
 * menu is read in one glance and four headed columns of ten make a merchant
 * classify their problem before they can find it. The six are the same six the
 * Features page shows, in the same order, assembled from the same selection —
 * so the menu and the page it opens onto cannot disagree.
 */
export interface FeaturesMegaMenu {
  readonly items: readonly FeatureNavItem[];
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
