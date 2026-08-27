"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackPageView } from "@/lib/analytics";

/**
 * One `page_view` per route, and exactly one.
 *
 * The Google tag counts a page view when it loads, which on a single-page
 * router is the first route and no other: a merchant who arrives on the
 * homepage and reads Features, COD Order Verification, Pricing and Contact
 * would be recorded as having read the homepage five times over. So the tag is
 * configured with `send_page_view: false` and every view — the first one
 * included — is sent from here, where the router says a navigation happened.
 *
 * The alternative, leaving the automatic view on and adding one per
 * navigation, double-counts the landing page. That is the duplicate this file
 * exists to avoid, and it is the one that is hardest to notice afterwards,
 * because the number it inflates is the one everybody reads first.
 *
 * The ref is the second half of the same guarantee. React runs an effect
 * twice under Strict Mode, and a route that re-renders for any other reason —
 * a parent state change, a fast refresh — runs it again; keying on the URL
 * that was last reported means only a real change reports.
 *
 * `useSearchParams` is read as well as the pathname so that a route whose
 * query decides what is on screen is counted when the query changes. It also
 * makes this component suspend during prerender, which is why the caller wraps
 * it in a `Suspense` boundary — without one, every page in the app would opt
 * out of static rendering to accommodate a tracker.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (lastTracked.current === url) return;
    lastTracked.current = url;

    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}
