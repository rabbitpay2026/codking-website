import type { ControlSlug, LegalSlug } from "@/types";

import type { Route } from "next";

/**
 * Single source of truth for every internal path.
 *
 * Mirrors the sitemap in Website Architecture §3 exactly — no route exists here
 * that is absent from the architecture, and no architecture route is missing.
 * Components must reference `routes.pricing` rather than the literal
 * `"/pricing"`, so a URL change is a one-line edit. `satisfies` keeps the
 * literal types intact while asserting each value is a real, routable page.
 */
export const routes = {
  home: "/",

  /** Controls overview, grouped by order stage (§3, §6.1). */
  features: "/features",

  /** Savings + COD Fee + Partial Payment on one page (§8). */
  codCalculator: "/cod-calculator",

  pricing: "/pricing",
  customers: "/customers",
  integrations: "/integrations",

  /** Resources hub. Its four children are the maintained surfaces (§7). */
  resources: "/resources",
  guides: "/resources/guides",
  blog: "/resources/blog",
  docs: "/resources/docs",
  help: "/resources/help",

  about: "/about",
  contact: "/contact",

  /**
   * The four legal documents (§3), each at its own top-level path.
   *
   * Top-level rather than nested under `/legal`, because these are the URLs a
   * merchant is sent to from an app listing, an invoice or a support reply, and
   * those are the paths every other Shopify app publishes them at.
   */
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  refundPolicy: "/refund-policy",
  cookies: "/cookies",
} as const satisfies Record<string, Route>;

export type RouteKey = keyof typeof routes;
export type StaticRoute = (typeof routes)[RouteKey];

/**
 * Each legal slug's own static route.
 *
 * A lookup rather than a template string, because these four are real static
 * segments rather than one dynamic one — which means the mapping needs no
 * `Route` assertion at all, and adding a fifth document without adding its page
 * will not compile.
 */
const LEGAL_ROUTES: Record<LegalSlug, Route> = {
  "privacy-policy": routes.privacyPolicy,
  "terms-and-conditions": routes.termsAndConditions,
  "refund-policy": routes.refundPolicy,
  cookies: routes.cookies,
};

/**
 * Builders for the dynamic segments.
 *
 * Kept beside the static registry so every internal URL in the app — fixed or
 * generated — is produced in exactly one file. Each builder is the only place
 * that knows the shape of its dynamic path.
 *
 * The assertions are deliberate. Next's `Route` type only resolves its dynamic
 * branch when the concrete path is known at the call site; with the default
 * type argument that branch collapses to `never`, so no dynamic path can be
 * assigned to a plain `Route` field such as `NavItem.href`. Rather than widen
 * that field and lose link checking everywhere, the assertion is confined to
 * these few lines, and the safety that actually matters — that the slug refers
 * to something real — is enforced by the parameter types: a control page that
 * does not exist will not compile.
 */
export const routeFor = {
  /** A single control page, e.g. `/features/otp-verification` (§6.3). */
  control: (slug: ControlSlug): Route => `${routes.features}/${slug}` as Route,
  guide: (slug: string): Route => `${routes.guides}/${slug}` as Route,
  blogPost: (slug: string): Route => `${routes.blog}/${slug}` as Route,
  /** Documentation supports nested paths, e.g. `getting-started/install`. */
  doc: (path: string): Route => `${routes.docs}/${path}` as Route,
  helpArticle: (slug: string): Route => `${routes.help}/${slug}` as Route,
  /** Privacy · Terms · Refund · Cookies (§3). */
  legal: (slug: LegalSlug): Route => LEGAL_ROUTES[slug],
} as const;
