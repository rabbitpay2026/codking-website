import { routeFor } from "@/constants/routes";
import { footerColumns } from "@/data/footer";
import {
  megaMenuFooterLinks,
  mobileActions,
  primaryNav,
  resourcesNav,
  utilityActions,
} from "@/data/navigation";
import { getControlsByStage, getOrderStages } from "@/lib/content/controls";

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

export function getResourcesNav(): readonly NavItem[] {
  return resourcesNav;
}

export function getUtilityActions(): readonly UtilityAction[] {
  return utilityActions;
}

export function getMobileActions(): readonly UtilityAction[] {
  return mobileActions;
}

/**
 * The Features mega-menu: four columns by order stage (§4.1).
 *
 * Built from the controls repository, so a new control appears in the menu
 * without anyone editing navigation data — which is exactly the §11 promise
 * that one source feeds the mega-menu, the homepage, the feature pages and the
 * footer.
 */
export function getFeaturesMegaMenu(): FeaturesMegaMenu {
  return {
    columns: getOrderStages().map((stage) => ({
      stage,
      items: getControlsByStage(stage.id).map(toNavItem),
    })),
    footerLinks: megaMenuFooterLinks,
  };
}

/**
 * The complete footer index (§4.5).
 *
 * The Features column is generated from the same controls source as the
 * mega-menu and prepended to the hand-authored columns, so the footer is a
 * genuine full index rather than a list that drifts.
 */
export function getFooterColumns(): readonly NavGroup[] {
  const featuresColumn: NavGroup = {
    title: "Features",
    items: getOrderStages().flatMap((stage) =>
      getControlsByStage(stage.id).map(toNavItem),
    ),
  };

  return [featuresColumn, ...footerColumns];
}
