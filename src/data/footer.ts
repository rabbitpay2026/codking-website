import { routeFor, routes } from "@/constants/routes";

import type { NavGroup, NavItem } from "@/types";

/**
 * Authored footer columns (§4.5).
 *
 * Two of the five are absent here because they are derived rather than written:
 * Features is the same six the Features page and the mega-menu lead with, and
 * Resources is the header's own Resources dropdown. Both are assembled in
 * `src/lib/content/navigation.ts`, so the footer can never list a different set
 * from the header, and the Docs and Blog subdomains are declared in exactly one
 * place.
 *
 * Every href below resolves to a route that exists and has a page behind it.
 * Where §4.5 names a link the site has no finished page for — Careers, a Help
 * Center of our own — it is omitted rather than invented, and a link to a route
 * that exists only as a placeholder is treated the same way: a footer whose job
 * is to be the site's index cannot be the place a merchant finds an empty page.
 */

/** The product itself, as a merchant would ask for it: everything, price, proof. */
export const footerProductColumn: NavGroup = {
  title: "Product",
  items: [
    { label: "All Features", href: routes.features },
    { label: "Pricing", href: routes.pricing },
    { label: "COD Calculator", href: routes.codCalculator },
  ],
};

/**
 * The same pages the Features column lists, entered by outcome instead of by
 * name.
 *
 * Not a second set of pages — a second door into the existing ones. A merchant
 * arrives with a problem ("my RTO is 40%"), not with a control name, and the
 * footer is where that phrasing is cheapest to offer. Each label is matched to
 * the control that actually does the job, so the link never over-promises, and
 * every one of them lands on a finished feature page.
 *
 * Four, not six. This is the outcomes a merchant arrives naming, not a
 * rewording of the whole feature set — and four keeps the column within a row
 * of Product beside it rather than trailing two rows below it.
 */
export const footerSolutionsColumn: NavGroup = {
  title: "Solutions",
  items: [
    {
      label: "Stop fake COD orders",
      href: routeFor.control("otp-verification"),
    },
    {
      label: "Reduce RTO losses",
      href: routeFor.control("partial-cod-payment"),
    },
    {
      label: "Increase prepaid orders",
      href: routeFor.control("cod-to-prepaid"),
    },
    {
      label: "Recover abandoned carts",
      href: routeFor.control("abandoned-cart-recovery"),
    },
  ],
};

export const footerCompanyColumn: NavGroup = {
  title: "Company",
  items: [
    { label: "About Us", href: routes.about },
    { label: "Contact Us", href: routes.contact },
  ],
};

/**
 * The bottom bar's legal row (§4.5).
 *
 * These sit beside the copyright rather than in a column of their own. They are
 * the links a visitor goes looking for deliberately and never browses, so
 * giving them a heading among the product columns would spend the footer's most
 * scanned row on its least read pages.
 *
 * Full names rather than the one-word forms. "Terms" beside "Privacy" reads as
 * a label; a merchant checking what they are agreeing to before installing is
 * looking for the document, and the document is called Terms & Conditions.
 */
export const footerLegalLinks: readonly NavItem[] = [
  { label: "Privacy Policy", href: routeFor.legal("privacy-policy") },
  { label: "Terms & Conditions", href: routeFor.legal("terms-and-conditions") },
  { label: "Refund Policy", href: routeFor.legal("refund-policy") },
  { label: "Cookies", href: routeFor.legal("cookies") },
];
