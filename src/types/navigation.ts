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
  /** Present so the two kinds of destination discriminate on one field. */
  readonly external?: false;
}

/**
 * A navigation destination on another property — the documentation and blog
 * subdomains today.
 *
 * Kept as its own shape rather than widening `NavItem.href` to `string`: that
 * would drop Next's route checking for every internal link on the site to
 * accommodate two external ones. The `external` flag is what tells a renderer
 * to emit an `<a target="_blank">` instead of a client-navigated `<Link>`.
 */
export interface ExternalNavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly external: true;
}

/** Either kind of destination. Anything that renders links accepts this. */
export type NavDestination = NavItem | ExternalNavItem;

/** A titled cluster of navigation items, as used by the footer columns. */
export interface NavGroup {
  readonly title: string;
  readonly items: readonly NavDestination[];
}

/**
 * Which glyph a resource item draws.
 *
 * A name rather than the component itself: navigation is read on the server and
 * handed to a client component, and a React component is not serialisable
 * across that boundary. The art is mapped in `resourceNavIcons.ts`, the same
 * way control marks are mapped in `featureIcons.ts`.
 */
export type ResourceNavIcon = "docs" | "blog" | "faq";

/**
 * One row of the Resources dropdown (§4.1).
 *
 * `NavDestination` rather than `ExternalNavItem`, because the menu is no longer
 * only off-site: the FAQ is a page of this site, and it belongs in the group a
 * merchant opens when they want an answer rather than a feature. Widening the
 * union here — instead of giving the FAQ its own item type — is what keeps the
 * header dropdown, the mobile drawer and the footer's Resources column reading
 * one list. `external` still discriminates, so a renderer knows which of the two
 * it is holding and `NavLink` keeps deciding between `<Link>` and `<a>`.
 */
export type ResourceNavItem = NavDestination & {
  readonly icon: ResourceNavIcon;
};

/**
 * Which platform glyph a social link draws.
 *
 * A name rather than the component, for the reason `ResourceNavIcon` gives:
 * navigation is read on the server, and a React component is not serialisable
 * across that boundary. The art is mapped in `socialMarks.tsx`.
 */
export type SocialIcon = "youtube" | "facebook" | "instagram" | "whatsapp";

/**
 * One profile the business publishes.
 *
 * `detail` is the readable form of the destination where one exists — the
 * WhatsApp number, in practice. A contact card showing `+91 91307 51989` is
 * worth more than one showing the word "WhatsApp" twice.
 */
export interface SocialLink {
  readonly id: SocialIcon;
  readonly label: string;
  readonly href: string;
  readonly detail?: string;
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
 * the controls are *modelled* (§6.1), but a menu is read in one glance and four
 * headed columns of ten make a merchant classify their problem before they can
 * find it. The six are the same six the Features page shows and the footer
 * lists, in the same order, assembled from the same selection — so no two
 * surfaces on the site can disagree about what the product ships.
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
