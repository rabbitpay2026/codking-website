"use client";

import { usePathname } from "next/navigation";

import { ViewTracker } from "@/components/analytics/ViewTracker";
import { routeFor } from "@/constants/routes";

import type { ControlSlug } from "@/types";

/** One control, reduced to the two things an event needs to name it. */
export interface TrackedFeature {
  readonly slug: ControlSlug;
  readonly name: string;
}

interface FeatureViewTrackerProps {
  readonly features: readonly TrackedFeature[];
}

/**
 * `feature_view` for every feature page, declared once.
 *
 * There are eleven routes under `/features` — ten hand-built control pages and
 * the template that serves whatever has not been built yet — and this is
 * mounted by the segment layout they all render inside, so none of them
 * carries tracking code of its own. A control page added tomorrow is measured
 * without being edited, which is the same property the mega-menu, the footer
 * and the sitemap already get from reading the controls repository.
 *
 * The repository itself is not imported here. It is several hundred lines of
 * copy per control and this needs two fields, so the layout — which runs on
 * the server — reduces it to slugs and names and hands those across. Importing
 * `@/lib/content` into a client component would put the whole thing in the
 * browser bundle to read ten names out of it.
 *
 * The Features index at `/features` matches nothing here and sends nothing: it
 * is a list of controls, not one of them, and its page view already says it was
 * read.
 */
export function FeatureViewTracker({ features }: FeatureViewTrackerProps) {
  const pathname = usePathname();

  const feature = features.find(
    (candidate) => routeFor.control(candidate.slug) === pathname,
  );

  if (!feature) return null;

  return (
    <ViewTracker
      event="feature_view"
      params={{ feature_name: feature.name, feature_slug: feature.slug }}
    />
  );
}
