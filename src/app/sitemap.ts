import { routeFor, routes } from "@/constants/routes";
import { getPublishedControls } from "@/lib/content";
import { absoluteUrl } from "@/utils/url";

import type { MetadataRoute, Route } from "next";

interface SitemapEntry {
  readonly path: Route;
  /**
   * Relative importance within this site — never an absolute ranking signal.
   * The scale here is: the homepage, then the pages a merchant is trying to
   * reach (Features, Pricing), then the pages they land on from one of those.
   */
  readonly priority: number;
}

/**
 * Every canonical, indexable URL on this site — and only those.
 *
 * The list is built from the route registry and the controls repository rather
 * than typed out, so a URL cannot appear here in a shape no page answers to.
 * What it deliberately leaves out is the more interesting half:
 *
 * - Customers, Integrations, the Resources hub and its four children are still
 *   `PagePlaceholder` and carry `noIndex`. A sitemap is a list of pages worth
 *   indexing, so submitting a page whose own metadata says not to index it is
 *   a contradiction Search Console reports back as an error.
 * - The four legal documents are `status: "draft"` and `noIndex` with them.
 *   They join this list when the documents are approved, and nothing here has
 *   to change for that — `legalPageMetadata` already drops `noIndex` on that
 *   status, so the only edit is adding the routes below.
 * - The four controls still served by `features/[control]` are excluded by
 *   `getPublishedControls()` for the same reason.
 * - `/features/prepaid-nudge` and `/features/cod-rules` resolve, but as
 *   permanent redirects (see `next.config.ts`). A sitemap lists destinations,
 *   not the addresses that point at them.
 * - `not-found` and `error` are boundaries, not routes.
 *
 * There is no `lastModified`. The honest value would be the date the page's
 * content last changed, and this site has no per-page content timestamps to
 * read it from; the available substitute is the build time, which would tell
 * Google that every page on the site changed every time anything deployed.
 * A signal that is wrong on every entry is worth less than no signal, and
 * `lastmod` is optional in the protocol precisely so it can be omitted.
 */
const ENTRIES: readonly SitemapEntry[] = [
  { path: routes.home, priority: 1 },

  { path: routes.features, priority: 0.9 },
  { path: routes.pricing, priority: 0.9 },

  /** The lead magnet (§8), and a page merchants arrive on from search. */
  { path: routes.codCalculator, priority: 0.8 },

  /**
   * The FAQ page (§2).
   *
   * Above About and Contact rather than beside them: it carries FAQPage
   * structured data and answers the terms merchants actually search — what a
   * COD fee is, whether an app needs a developer, how partial payment is
   * collected — which is more than a company page will ever target. Below the
   * calculator, because it answers questions rather than being the reason a
   * merchant arrives.
   */
  { path: routes.faq, priority: 0.7 },

  { path: routes.about, priority: 0.5 },
  { path: routes.contact, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  /*
    The six finished feature pages, read from the controls repository so the
    sitemap gains a URL in the same commit the page does. They sit after the
    hub pages and above the company pages: each one is a full page targeting
    its own term (§13), which is more than About or Contact will ever be.
  */
  const controlEntries: readonly SitemapEntry[] = getPublishedControls().map(
    (control) => ({ path: routeFor.control(control.slug), priority: 0.8 }),
  );

  return [...ENTRIES, ...controlEntries].map(({ path, priority }) => ({
    url: absoluteUrl(path),
    priority,
  }));
}
