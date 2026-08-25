import { externalLinks } from "@/constants/external";
import { routeFor, routes } from "@/constants/routes";

import type { ExternalNavItem, NavGroup, NavItem } from "@/types";

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
 *
 * ── On "add all links" ────────────────────────────────────────────────────
 * The review asks the footer to carry every link. It now does, in the only
 * sense that helps a merchant: every finished page on the site is reachable
 * from here — all six feature pages twice over, by name and by outcome; the
 * whole product track including the reviews page; both company pages; the FAQ
 * and the two documentation properties; and all four legal documents. What is
 * still deliberately absent is the set that would make the footer an index of
 * empty pages — the Resources hub and its unfinished children, and the four
 * controls served by the generic template — all of which are `PagePlaceholder`
 * and `noIndex` today. Each joins a column in the same commit that gives it a
 * page.
 *
 * Customers was on that absent list until it had one. It is a real page now,
 * carrying the App Store review feed, and it dropped `noIndex` and entered the
 * sitemap in the same commit — so it enters the footer here on exactly the
 * rule the paragraph above states, rather than as an exception to it.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** The product itself, as a merchant would ask for it: everything, price, proof. */
export const footerProductColumn: NavGroup = {
  title: "Product",
  items: [
    { label: "All Features", href: routes.features },
    { label: "Pricing", href: routes.pricing },
    /*
      The proof this column's heading has always promised and never carried.
      It sits third because that is the order the column is described in —
      everything, price, proof — and because a merchant who has just read what
      the product does and what it costs is asking, next, who else uses it.

      Labelled for what the page holds rather than for its path: the route is
      `/customers`, but what is behind it is the reviews merchants left, and
      that is also the page's own title.
    */
    { label: "Customer Reviews", href: routes.customers },
    { label: "COD Calculator", href: routes.codCalculator },
    { label: "Integrations", href: routes.integrations },
    /*
      The install, in the one column that is a list of everything the product
      is. It is the same destination as the header's primary action and reads
      its URL from the same place, so a footer link can never point at a
      different listing from the button above it.
    */
    {
      label: "Install on Shopify",
      href: externalLinks.install,
      external: true,
    } satisfies ExternalNavItem,
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
 * Six, one per finished feature page. The review asks the footer to carry
 * every link, and the two that used to be missing here — the COD fee and the
 * rules that decide who is offered cash on delivery at all — are outcomes a
 * merchant arrives naming as readily as the other four.
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
    {
      label: "Charge for cash on delivery",
      href: routeFor.control("cod-fees"),
    },
    {
      label: "Control who gets COD",
      href: routeFor.control("cod-show-hide"),
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
    /*
      The support thread, as a destination rather than as an icon. It is
      already one tap from the row of social profiles and from the mobile
      action bar, but neither of those reads as a *link to support* in a column
      a merchant is scanning for one.
    */
    ...(externalLinks.whatsapp
      ? ([
          {
            label: "WhatsApp Support",
            href: externalLinks.whatsapp,
            external: true,
          },
        ] as const satisfies readonly ExternalNavItem[])
      : []),
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
 * All four, since the review asks the footer to carry every link. Privacy and
 * Terms are still first, in that order, because they are the two a merchant
 * checks before installing; Refund and Cookies follow. They fit on one line at
 * every width the bottom bar has, and the row wraps rather than truncates
 * where they do not.
 *
 * Full names rather than the one-word forms. "Terms" beside "Privacy" reads as
 * a label; a merchant checking what they are agreeing to before installing is
 * looking for the document, and the document is called Terms & Conditions.
 */
export const footerLegalLinks: readonly NavItem[] = [
  { label: "Privacy Policy", href: routeFor.legal("privacy-policy") },
  { label: "Terms & Conditions", href: routeFor.legal("terms-and-conditions") },
  { label: "Refund Policy", href: routeFor.legal("refund-policy") },
  { label: "Cookie Policy", href: routeFor.legal("cookies") },
];
