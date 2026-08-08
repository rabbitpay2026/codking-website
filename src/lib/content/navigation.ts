import { routeFor } from "@/constants/routes";
import {
  footerCompanyColumn,
  footerToolsColumn,
  footerTrustColumn,
} from "@/data/footer";
import {
  megaMenuFooterLinks,
  mobileActions,
  primaryNav,
  utilityActions,
} from "@/data/navigation";
import {
  getControlsByStage,
  getFeatureIndex,
  getOrderStages,
} from "@/lib/content/controls";
import { getResourceSections } from "@/lib/content/resources";

import type {
  Control,
  FeatureNavItem,
  FeaturesMegaMenu,
  NavGroup,
  NavItem,
  PrimaryNavItem,
  UtilityAction,
} from "@/types";

function toNavItem(control: Control): NavItem {
  return {
    label: control.name,
    href: routeFor.control(control.slug),
    description: control.outcome,
  };
}

export function getPrimaryNav(): readonly PrimaryNavItem[] {
  return primaryNav;
}

/**
 * The Resources dropdown and the footer's Resources column (§4.1, §4.5).
 *
 * Derived from the resource sections rather than listed separately, so the
 * four surfaces §7 allows are declared once. Each item carries the section's
 * own purpose line, which is what lets the dropdown say what Docs is for
 * instead of just naming it.
 */
export function getResourcesNav(): readonly NavItem[] {
  return getResourceSections().map((section) => ({
    label: section.title,
    href: section.href,
    description: section.purpose,
  }));
}

export function getUtilityActions(): readonly UtilityAction[] {
  return utilityActions;
}

export function getMobileActions(): readonly UtilityAction[] {
  return mobileActions;
}

/**
 * The controls grouped by order stage — one group per stage, in stage order.
 *
 * The footer's Features column (§4.5), which is the site's full index and the
 * one surface where the stage model is worth teaching. The header menus list
 * the six the site leads with instead; see `getFeatureNavItems()`.
 */
export function getControlNavGroups(): readonly NavGroup[] {
  return getOrderStages().map((stage) => ({
    title: stage.label,
    items: getControlsByStage(stage.id).map(toNavItem),
  }));
}

/**
 * The six features the header offers, in the order the Features page ranks
 * them (§4.1).
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
 * The footer's link columns other than Features (§4.5).
 *
 * Features is returned separately by `getControlNavGroups()` because it is
 * the only column with sub-groups, and the footer lays it out differently.
 */
export function getFooterColumns(): readonly NavGroup[] {
  return [
    footerToolsColumn,
    { title: "Resources", items: getResourcesNav() },
    footerCompanyColumn,
    footerTrustColumn,
  ];
}
