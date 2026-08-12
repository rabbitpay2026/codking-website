import { routeFor } from "@/constants/routes";
import {
  footerCompanyColumn,
  footerLegalLinks,
  footerProductColumn,
  footerSolutionsColumn,
} from "@/data/footer";
import {
  megaMenuFooterLinks,
  mobileActions,
  primaryNav,
  resourcesNav,
  utilityActions,
} from "@/data/navigation";
import { socialLinks } from "@/data/social";
import { getFeatureIndex } from "@/lib/content/controls";

import type {
  FeatureNavItem,
  FeaturesMegaMenu,
  NavGroup,
  NavItem,
  PrimaryNavItem,
  ResourceNavItem,
  SocialLink,
  UtilityAction,
} from "@/types";

export function getPrimaryNav(): readonly PrimaryNavItem[] {
  return primaryNav;
}

/**
 * The Resources dropdown — Docs and Blog (§4.1).
 *
 * The same two items open the footer's Resources column, so the header and the
 * footer cannot send a merchant to different places, and both read their URLs
 * from `constants/external.ts`.
 */
export function getResourcesNav(): readonly ResourceNavItem[] {
  return resourcesNav;
}

export function getUtilityActions(): readonly UtilityAction[] {
  return utilityActions;
}

export function getMobileActions(): readonly UtilityAction[] {
  return mobileActions;
}

/**
 * The six features the header and the footer offer, in the order the Features
 * page ranks them (§4.1).
 *
 * Read from the same selection the Features page renders, so the menu is a
 * table of contents for the page it opens onto rather than a second, longer
 * list a merchant has to reconcile with it. The label is the page's own
 * headline for the feature and the description is the control's outcome line —
 * neither is authored here.
 */
export function getFeatureNavItems(): readonly FeatureNavItem[] {
  return getFeatureIndex().map(({ control, title }) => ({
    slug: control.slug,
    label: title,
    href: routeFor.control(control.slug),
    description: control.outcome,
  }));
}

/**
 * The Features menu: the six, plus the closing row (§4.1).
 *
 * Built once here and handed to both the desktop menu and the mobile drawer,
 * so the two cannot list different features and the set crosses the
 * server-client boundary a single time.
 */
export function getFeaturesMegaMenu(): FeaturesMegaMenu {
  return {
    items: getFeatureNavItems(),
    footerLinks: megaMenuFooterLinks,
  };
}

/**
 * The footer's Features column (§4.5) — the six features the product ships.
 *
 * The same selection the header's mega-menu opens and the Features page ranks,
 * read from one place. That is the whole point of deriving it: the footer used
 * to list all ten controls grouped by order stage, which meant it advertised
 * four pages the site does not have finished, and taught a model the header no
 * longer teaches. Six links, in the Features page's own order, under the
 * Features page's own names.
 */
export function getFooterFeatureLinks(): readonly NavItem[] {
  return getFeatureNavItems();
}

/**
 * The footer's link columns other than Features (§4.5).
 *
 * Features is returned separately by `getFooterFeatureLinks()` because the
 * footer gives it two column widths rather than one — six labels at the width
 * of a Company column is six links wrapping to three lines each.
 *
 * Resources is assembled rather than authored: it is the header's Resources
 * dropdown, unchanged. Authoring it would mean the Docs and Blog URLs existing
 * in a second place, and a footer that can drift from the header is a footer
 * that eventually does.
 */
export function getFooterColumns(): readonly NavGroup[] {
  return [
    footerProductColumn,
    footerSolutionsColumn,
    { title: "Resources", items: getResourcesNav() },
    footerCompanyColumn,
  ];
}

/** Privacy · Terms · Refund · Cookies, for the footer's bottom bar (§4.5). */
export function getFooterLegalLinks(): readonly NavItem[] {
  return footerLegalLinks;
}

/**
 * The social profiles, with unconfigured ones dropped.
 *
 * A destination read from the environment can resolve to `null`, and a social
 * icon that goes nowhere is worse than one icon fewer — it is the one control
 * in a footer that gives no feedback when it fails, because nothing about a
 * dead `<a>` looks different from a live one.
 */
export function getSocialLinks(): readonly SocialLink[] {
  return socialLinks.filter((link) => Boolean(link.href));
}
