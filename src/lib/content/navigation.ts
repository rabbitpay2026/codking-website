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
import { getControlsByStage, getOrderStages } from "@/lib/content/controls";
import { getResourceSections } from "@/lib/content/resources";

import type {
  Control,
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
 * Shared by the mega-menu columns (§4.1), the mobile drawer's accordion
 * (§4.4) and the footer's Features column (§4.5). All three render the same
 * grouping because all three read this.
 */
export function getControlNavGroups(): readonly NavGroup[] {
  return getOrderStages().map((stage) => ({
    title: stage.label,
    items: getControlsByStage(stage.id).map(toNavItem),
  }));
}

/**
 * Four columns by order stage, plus the closing row (§4.1).
 *
 * Shares `getControlNavGroups()` with the mobile drawer and the footer, so the
 * control set is built once and — because this is what the header hands
 * across the server-client boundary — sent once.
 */
export function getFeaturesMegaMenu(): FeaturesMegaMenu {
  return {
    columns: getControlNavGroups(),
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
