/**
 * Whether Google Analytics is configured, and under which property.
 *
 * The measurement ID is public by design — it ships in the page source of every
 * site that runs the Google tag — so `NEXT_PUBLIC_` is the correct prefix and
 * there is no secret anywhere in this feature. GA4 needs no key to receive a
 * page view; the only credential in the product is an API secret for the
 * server-side Measurement Protocol, which this site does not use.
 *
 * A missing value is not an error. It resolves to `null`, every tracking call
 * becomes a no-op, and no script is loaded at all — which is what a local
 * checkout and a preview deploy should do. The site works identically without
 * it; the only difference is that nothing is reported.
 *
 * Read through the full literal `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`
 * rather than destructured or indexed, because that is the form Next.js
 * replaces at build time — a dynamic lookup inlines nothing and resolves to
 * `undefined` in the browser.
 */
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

/** The GA4 property, or `null` when the site is running without analytics. */
export const gaMeasurementId: string | null = MEASUREMENT_ID
  ? MEASUREMENT_ID
  : null;

/** Convenience for the components that decide whether to render anything. */
export const analyticsEnabled: boolean = gaMeasurementId !== null;

/**
 * What counts as "running this site locally", tested against `location.hostname`.
 *
 * This decides one thing and one thing only: whether the tag is configured with
 * `debug_mode`, which is what puts a browser in GA4's DebugView. Nothing else
 * about tracking changes with it — the same events, with the same parameters,
 * go to the same property either way.
 *
 * It is a *runtime* test on the hostname rather than a build-time check on
 * `NODE_ENV`, because the two answer different questions. A production build is
 * exactly what `next build && next start` produces on a laptop, and that is a
 * session someone debugging wants to see in DebugView; a build-time flag would
 * have already decided "production" and shut it out. The hostname is the honest
 * signal: it is the machine the page is actually open on.
 *
 * The private IPv4 ranges are here for the phone case. This site is mobile-first
 * in the markets it sells into, and the way anyone tests that is to open the dev
 * server from a handset over the LAN — at which point the hostname is
 * `192.168.x.x` and nothing about the session is any less local.
 *
 * A deployed origin matches none of this: not `codking.tech`, not a preview
 * subdomain. Production is never in debug mode, and that is a property of the
 * pattern rather than of a flag someone has to remember to turn off.
 */
export const LOCAL_HOSTNAME_PATTERN =
  /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0|.+\.localhost|.+\.local|10(\.\d{1,3}){3}|192\.168(\.\d{1,3}){2}|172\.(1[6-9]|2\d|3[01])(\.\d{1,3}){2})$/;
