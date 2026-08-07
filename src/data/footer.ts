import { routeFor, routes } from "@/constants/routes";

import type { NavGroup } from "@/types";

/**
 * Authored footer columns (§4.5).
 *
 * Two of the six columns are absent here because they are derived rather than
 * written: Features is generated from the controls repository, and Resources
 * from the resource sections. Both are assembled in
 * `src/lib/content/navigation.ts`, so the footer can never list a different
 * set from the mega-menu or the Resources dropdown.
 *
 * Notes on the architecture:
 * - §4.5 lists "Careers" under Company, but §3 defines no `/careers` route.
 *   It is omitted rather than invented.
 * - Cookies is added to Trust. §4.5 does not list it, but the footer's stated
 *   job is to be the full index of the site, and `/legal/cookies` is a real
 *   §3 route that is otherwise unreachable.
 */
export const footerToolsColumn: NavGroup = {
  title: "Tools",
  items: [{ label: "COD Calculator", href: routes.codCalculator }],
};

export const footerCompanyColumn: NavGroup = {
  title: "Company",
  items: [
    { label: "About", href: routes.about },
    { label: "Contact", href: routes.contact },
  ],
};

export const footerTrustColumn: NavGroup = {
  title: "Trust",
  items: [
    { label: "Customers", href: routes.customers },
    { label: "Integrations", href: routes.integrations },
    { label: "Privacy", href: routeFor.legal("privacy") },
    { label: "Terms", href: routeFor.legal("terms") },
    { label: "Refund", href: routeFor.legal("refund") },
    { label: "Cookies", href: routeFor.legal("cookies") },
  ],
};
