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
    { label: "Integrations", href: routes.integrations },
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

/**
 * Who we are, and how to reach us.
 *
 * The FAQ is deliberately absent. It reaches the footer through the Resources
 * column, which is assembled from the header's own Resources dropdown in
 * `lib/content/navigation.ts` — listing it here as well would put the same
 * destination in the footer twice under two different headings.
 */
export const footerCompanyColumn: NavGroup = {
  title: "Company",
  items: [
    { label: "About Us", href: routes.about },
    { label: "Contact Us", href: routes.contact },
  ],
};

/**
 * The legal links, in the bottom bar beside the copyright (§4.5).
 *
 * A row rather than a headed column, and the column that used to be here is
 * gone. Five link columns for a four-page site section is a heading spent on
 * two links, and it left the bottom bar holding nothing but a copyright line —
 * a footer with an empty last row above the one place every reader's eye lands.
 *
 * What that column was protecting against was the *old* row: `text-xs`, muted,
 * squeezed under a copyright. That is a drawing problem, not a placement one.
 * Drawn at the size and weight of a real link, with a hover of their own, these
 * are as findable in the bottom bar as they were in a column of their own —
 * and the bottom bar is where a merchant, a Shopify reviewer and every other
 * site on the web already look for them.
 *
 * Two, not four. Refund and Cookies stay published and stay linked from the
 * bottom of every legal document, but the footer's job here is the two
 * documents a merchant actually goes looking for; the other two arriving
 * alongside them dilutes both.
 *
 * Full names rather than the one-word forms. "Terms" beside "Privacy" reads as
 * a label; a merchant checking what they are agreeing to before installing is
 * looking for the document, and the document is called Terms & Conditions.
 */
export const footerLegalLinks: readonly NavItem[] = [
  { label: "Privacy Policy", href: routeFor.legal("privacy-policy") },
  { label: "Terms & Conditions", href: routeFor.legal("terms-and-conditions") },
];
