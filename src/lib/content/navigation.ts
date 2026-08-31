import { routeFor } from "@/constants/routes";
import {
  footerCompanyColumn,
  footerLegalLinks,
  footerProductColumn,
  footerSolutionsColumn,
} from "@/data/footer";
import {
  demoStoreAction,
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
 * The live demo storefront action (§4.2).
 *
 * Read through the repository like every other piece of content, so the hero's
 * secondary button and the storefront button in the closing band cannot drift
 * apart — same label, same destination, one edit.
 */
export function getDemoStoreAction(): UtilityAction {
  return demoStoreAction;
}

/**
 * The features the header and the footer offer, in the order the Features page
 * ranks them (§4.1).
 *
 * Read from the same selection the Features page renders, so the menu is a
 * table of contents for the page it opens onto rather than a second, longer
 * list a merchant has to reconcile with it. The label is the page's own
 * headline for the feature and the description is the control's outcome line —
 * neither is authored here.
 *
 * That selection listed six of the ten controls and now lists all ten, at the
 * reviewer's instruction. Nothing in this file changed to make that happen,
 * which is the point of deriving it: the menu, the drawer and the footer each
 * gained four entries from one data edit.
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
 * The Features menu: every feature the index ranks, plus the closing row
 * (§4.1).
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
 * The footer's Features column (§4.5) — the features the product ships.
 *
 * The same selection the header's mega-menu opens and the Features page ranks,
 * read from one place. It once listed all ten controls grouped by order stage,
 * was cut to six because four of those had no finished page, and is back to ten
 * now that they do — and not one of those three states was a change to this
 * function. The links are in the Features page's own order, under the Features
 * page's own names.
 */
export function getFooterFeatureLinks(): readonly NavItem[] {
  return getFeatureNavItems();
}

/**
 * The footer's tracks other than Features (§4.5).
 *
 * A track is a column of the grid, and a column can hold more than one heading
 * — hence the nesting, which every track happens to use singly today. Returning
 * groups flat would make the footer decide which headings share a column, and
 * that decision belongs here rather than in the markup that draws them.
 *
 * Features is returned separately by `getFooterFeatureLinks()` because the
 * footer gives it two column widths rather than one — these labels at the width
 * of a Company column would wrap to three lines each.
 *
 * Resources is assembled rather than authored: it is the header's Resources
 * dropdown, unchanged. Authoring it would mean the Docs and Blog URLs existing
 * in a second place, and a footer that can drift from the header is a footer
 * that eventually does.
 */
export function getFooterColumns(): readonly (readonly NavGroup[])[] {
  return [
    [footerProductColumn],
    [footerSolutionsColumn],
    [footerCompanyColumn],
    /*
      Resources last, and that is a layout decision rather than a ranking. It is
      the shortest group on the row at two links, and a short column between two
      long ones punches a hole in the middle of the footer; at the end it reads
      as the row tapering off. The order it is scanned in barely changes — Docs
      and Blog are looked up by name, not browsed to.
    */
    [{ title: "Resources", items: getResourcesNav() }],
  ];
}

/**
 * Privacy and Terms, for the footer's bottom bar (§4.5).
 *
 * Not a column and not part of `getFooterColumns()`: these two sit beside the
 * copyright rather than under a heading of their own. Read through the
 * repository like every other destination so the two documents are declared
 * once, next to the routes that resolve them.
 */
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
