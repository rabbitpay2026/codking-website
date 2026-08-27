import { FeatureViewTracker } from "@/components/analytics/FeatureViewTracker";
import { analyticsEnabled } from "@/lib/analytics";
import { getControls } from "@/lib/content";

/**
 * The Features segment, which exists only to measure what is inside it.
 *
 * Every control page renders here — the ten hand-built ones and the template
 * that still serves anything without a page of its own — so `feature_view` is
 * declared once for all of them instead of eleven times, and a control added
 * later is measured by the same route that publishes it.
 *
 * The controls repository is read here, on the server, and reduced to the two
 * fields the event names the control by. That is the pattern the site layout
 * already uses for navigation: the reading stays server-side, and the browser
 * receives plain data rather than the repository.
 *
 * It adds no markup. A layout that wrapped the pages in an element would
 * change how eleven finished pages lay out to gain a measurement.
 */
export default function FeaturesLayout({ children }: LayoutProps<"/features">) {
  return (
    <>
      {children}

      {analyticsEnabled ? (
        <FeatureViewTracker
          features={getControls().map(({ slug, name }) => ({ slug, name }))}
        />
      ) : null}
    </>
  );
}
