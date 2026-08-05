import { routes, routeFor } from "@/constants/routes";
import { resourcesNav } from "@/data/navigation";

import type { NavGroup } from "@/types";

/**
 * Footer columns other than Features (§4.5).
 *
 * The footer is the full index of the site and its most under-used SEO
 * surface, so every page in the §3 sitemap must be reachable from here. The
 * Features column is assembled from the controls repository rather than listed
 * by hand — see `src/lib/content/navigation.ts` — so it can never fall out of
 * step with the mega-menu or the feature pages.
 *
 * Note: §4.5 lists "Careers" in the Company column, but §3 defines no
 * `/careers` route. It is omitted rather than invented; adding the page is a
 * content decision for the business.
 */
export const footerColumns: readonly NavGroup[] = [
  {
    title: "Tools",
    items: [{ label: "COD Calculator", href: routes.codCalculator }],
  },
  {
    title: "Resources",
    items: resourcesNav,
  },
  {
    title: "Company",
    items: [
      { label: "About", href: routes.about },
      { label: "Contact", href: routes.contact },
    ],
  },
  {
    title: "Trust",
    items: [
      { label: "Customers", href: routes.customers },
      { label: "Integrations", href: routes.integrations },
      { label: "Privacy", href: routeFor.legal("privacy") },
      { label: "Terms", href: routeFor.legal("terms") },
      { label: "Refund", href: routeFor.legal("refund") },
    ],
  },
];
