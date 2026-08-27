"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/analytics";

import type { AnalyticsEventName, AnalyticsEventParams } from "@/types";

interface ViewTrackerProps {
  readonly event: AnalyticsEventName;
  readonly params?: AnalyticsEventParams;
}

/**
 * Sends one event when a page is opened, and once per page.
 *
 * The `*_view` events are not page views — GA4 already has one of those for
 * every route (see `PageViewTracker`). They exist so a report can be built on
 * the thing rather than on the URL: "which control did merchants read about"
 * is a question about `feature_name`, and answering it from paths means
 * teaching every report the shape of this site's URLs.
 *
 * Keyed on the pathname rather than on mount, because a client-side navigation
 * between two feature pages re-renders this component without remounting it,
 * and because Strict Mode runs an effect twice in development. Both would
 * otherwise send the event again for a page already counted.
 *
 * Every caller passes an object literal, so the effect is re-entered on each
 * render — the guard, not the dependency list, is what makes that harmless,
 * and it is the guard that has to be right anyway for the navigation case.
 */
export function ViewTracker({ event, params }: ViewTrackerProps) {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    trackEvent(event, params);
  }, [event, params, pathname]);

  return null;
}
