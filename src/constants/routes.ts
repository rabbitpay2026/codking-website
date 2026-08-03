import type { Route } from "next";

/**
 * Single source of truth for every internal path.
 *
 * Components must reference `routes.pricing` rather than the literal
 * `"/pricing"`, so a URL change is a one-line edit. `satisfies` keeps the
 * literal types intact while asserting each value is a real route.
 */
export const routes = {
  home: "/",
  features: "/features",
  pricing: "/pricing",
  integrations: "/integrations",
  about: "/about",
  contact: "/contact",
} as const satisfies Record<string, Route>;

export type RouteKey = keyof typeof routes;
export type AppRoute = (typeof routes)[RouteKey];
