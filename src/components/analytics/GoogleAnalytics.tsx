import Script from "next/script";
import { Suspense } from "react";

import { ClickTracker } from "@/components/analytics/ClickTracker";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { gaMeasurementId, LOCAL_HOSTNAME_PATTERN } from "@/lib/analytics";

/**
 * The Google tag, and the only place on this site that loads one.
 *
 * Rendered once by the root layout, so every route is measured and no page
 * carries analytics code of its own. With `NEXT_PUBLIC_GA_MEASUREMENT_ID`
 * unset this returns `null` — no script, no listeners, no requests to Google —
 * which is what a local checkout and a preview deploy get.
 *
 * Two pieces, in this order, for two different reasons.
 *
 * The first is Google's own snippet, inline. It creates `dataLayer`, defines
 * `gtag` and queues the configuration, and it costs one round of parsing and
 * no network at all — nothing here blocks rendering, because there is nothing
 * to fetch. It runs during HTML parsing rather than after hydration
 * deliberately: `gtag` has to exist before the first `page_view` is sent, and
 * the tracker below runs on mount. A queued command is not a lost one — the
 * library drains `dataLayer` when it arrives.
 *
 * The second is the library itself, on `afterInteractive`, so the request goes
 * out once the page is usable rather than competing with it.
 *
 * `debug_mode` is the one thing that differs between a laptop and production,
 * and it is decided in the browser rather than at build time — see `config`
 * below. It changes what GA4 *shows* you (the session appears
 * in DebugView, in real time) and nothing about what is sent: the same events
 * carry the same parameters to the same property either way.
 *
 * `send_page_view: false` is the important line in the configuration. Left on,
 * the tag counts a view when it loads and never again, so every client-side
 * navigation on this site would go unrecorded; turned off, `PageViewTracker`
 * sends every view including the first, and there is exactly one path an event
 * can arrive by. Configuring it here and counting there is what keeps the
 * landing page from being counted twice.
 */
export function GoogleAnalytics() {
  if (!gaMeasurementId) return null;

  /**
   * The configuration object, as source.
   *
   * Emitted rather than evaluated here, because in a production build the
   * answer depends on the browser the page ends up in and not on the server
   * that rendered it. These pages are prerendered once and served to everyone,
   * so a decision taken at build time would be baked into the same HTML that
   * production and a laptop both receive — the test has to survive into the
   * browser to be worth anything.
   *
   * A development build needs no test: `next dev` is the local case by
   * definition, so the object is emitted flat and the pattern never ships.
   *
   * The production branch is a conditional rather than a `debug_mode: false`,
   * so what a deployed page passes is byte-for-byte what it passed before this
   * existed — `{ send_page_view: false }`, with no debug parameter at all.
   */
  const config =
    process.env.NODE_ENV === "production"
      ? `${LOCAL_HOSTNAME_PATTERN}.test(location.hostname)` +
        " ? { send_page_view: false, debug_mode: true }" +
        " : { send_page_view: false }"
      : "{ send_page_view: false, debug_mode: true }";

  const bootstrap = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){window.dataLayer.push(arguments);}",
    "window.gtag = gtag;",
    "gtag('js', new Date());",
    `gtag('config', ${JSON.stringify(gaMeasurementId)}, ${config});`,
  ].join("");

  return (
    <>
      <script
        id="ga-bootstrap"
        dangerouslySetInnerHTML={{ __html: bootstrap }}
      />

      <Script
        id="ga-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`}
        strategy="afterInteractive"
      />

      {/*
        `PageViewTracker` reads the query string, which makes it suspend while
        a route is being prerendered. Boundaried here rather than left to the
        page: without this, every statically rendered page in the app would be
        pulled out of static rendering by a component that measures it.
      */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>

      <ClickTracker />
    </>
  );
}
