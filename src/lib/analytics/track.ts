import { gaMeasurementId } from "@/lib/analytics/config";

import type { AnalyticsEventName, AnalyticsEventParams } from "@/types";

/**
 * The two calls the rest of the site makes.
 *
 * Everything here is defensive in the same direction: if analytics is not
 * configured, or the tag has not loaded, or this is running on the server, the
 * call returns and the caller never knows. Nothing throws. A marketing site
 * that breaks because a measurement ID is absent is a worse outcome than one
 * that measures nothing, and the absent case is every local checkout.
 *
 * Neither function reads a form value, an input or a URL the merchant typed.
 * `AnalyticsEventParams` has no key that could hold one — see
 * `types/analytics.ts` — so this module cannot become the place PII leaks from
 * without that union being widened first.
 */
function gtagOrNull() {
  if (!gaMeasurementId) return null;
  if (typeof window === "undefined") return null;

  return window.gtag ?? null;
}

/**
 * Drops the keys whose value is `undefined`.
 *
 * GA4 records an explicit `undefined` as the string "undefined" rather than
 * ignoring it, so an optional parameter left unset would otherwise show up in
 * reports as a real value.
 */
function withoutEmpty(params: AnalyticsEventParams): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );
}

/** Sends one event. A no-op when analytics is not configured or not loaded. */
export function trackEvent(
  name: AnalyticsEventName,
  params: AnalyticsEventParams = {},
): void {
  const gtag = gtagOrNull();
  if (!gtag) return;

  gtag("event", name, withoutEmpty(params));
}

/**
 * Sends one page view.
 *
 * Called by hand for every route, including the first, because the tag is
 * configured with `send_page_view: false` — see
 * `components/analytics/GoogleAnalytics.tsx` for why that is the only way to
 * count a client-side navigation exactly once.
 *
 * `page_location` is the address bar rather than the path, so a report can
 * distinguish the same route on two hosts; `page_title` is the document title
 * Next.js has already applied for the new route by the time this runs.
 */
export function trackPageView(path: string): void {
  const gtag = gtagOrNull();
  if (!gtag) return;

  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
