import {
  decodeFlightPush,
  emptyFlightPush,
  encodeFlightPush,
  FLIGHT_PUSH,
  rewriteFlightStream,
} from "@/lib/documentation/flight";

/**
 * The documentation proxy — the rules that let another site's pages be served
 * from this origin under `/documentation`.
 *
 * The documentation is a Mintlify deployment published at `docs.codking.tech`,
 * and it stays exactly as it is: nothing here changes that deployment, its
 * domains or its configuration. What this module does is translate between the
 * two address spaces, so a merchant reads the same pages at
 * `codking.tech/documentation` and never sees the subdomain.
 *
 * ── Why a translation is needed at all ────────────────────────────────────
 * The documentation is served at the *root* of its own host, so every link it
 * writes is root-relative: `/support/faq`, `/setting-cod-fees-in-shopify`. A
 * plain proxy hands those to the browser unchanged, and the first click leaves
 * `/documentation` for `codking.tech/support/faq` — a page this site does not
 * have. That is not a bug in the proxy; it is the documentation correctly
 * describing its own origin. So its links are rewritten on the way out, and
 * the prefix is stripped back off on the way in.
 */

/**
 * Where the documentation actually lives.
 *
 * `next.config.ts` reads the same variable for the two shared-root rewrites,
 * and the two must agree. It is duplicated there rather than imported because
 * `next.config.ts` is evaluated before the module aliases exist.
 */
export const DOCS_UPSTREAM = (
  process.env.DOCS_UPSTREAM_URL ?? "https://docs.codking.tech"
).replace(/\/+$/, "");

/** The address the documentation answers on here. */
export const DOCS_PATH = "/documentation";

/**
 * The namespaces that must keep answering at the site root, unprefixed.
 *
 * This is the one part of the arrangement that is not free, and it is worth
 * being precise about why. `/mintlify-assets` is the documentation's asset
 * prefix and `/_mintlify` is where its search and assistant endpoints live —
 * and both are compiled into its JavaScript bundles as absolute, root-relative
 * strings. A lazily-loaded chunk asks the browser for
 * `/mintlify-assets/_next/static/chunks/…` at whatever origin is showing, and
 * a search request goes to `/_mintlify/api-public/search/…` the same way.
 *
 * Rewriting those out of the markup would not help: the requests are issued by
 * the bundle at runtime, not written into the HTML. And rewriting compiled
 * JavaScript to move them is exactly the kind of transform that works until the
 * next upstream build. So instead they are proxied where they already ask to
 * be — see the rewrites in `next.config.ts` — and left alone here.
 *
 * `/_next` is listed for safety rather than necessity, and `/.well-known`
 * because certificate and agent-discovery paths belong to the host.
 */
const SHARED_ROOT_NAMESPACES = [
  "/mintlify-assets",
  "/_mintlify",
  "/_next",
  "/.well-known",
];

/**
 * Whether a root-relative path is one of the namespaces that stays at root.
 *
 * Matched as a whole segment rather than as a string prefix, so the asset
 * prefix `/mintlify-assets` is caught alongside the files under it — the bare
 * form is what the documentation publishes as its `assetPrefix`, and prefixing
 * that would point every asset request at a path nothing answers.
 */
function staysAtRoot(path: string): boolean {
  return SHARED_ROOT_NAMESPACES.some(
    (namespace) => path === namespace || path.startsWith(`${namespace}/`),
  );
}

/**
 * A root-relative path as the documentation writes it, as this site serves it.
 *
 * Idempotent: a path that already carries the prefix is returned untouched, so
 * a body somehow rewritten twice is not corrupted.
 */
function toSitePath(path: string): string {
  if (path === DOCS_PATH || path.startsWith(`${DOCS_PATH}/`)) return path;
  if (staysAtRoot(path)) return path;
  /*
    The documentation's own root — its logo, and the first sidebar entry — is
    `/documentation` rather than `/documentation/`, so the address a merchant
    lands on from inside the docs is the same one the site header sends them
    to, and neither has to be normalised away by a redirect.
  */
  if (path === "/") return DOCS_PATH;
  return `${DOCS_PATH}${path}`;
}

/**
 * The attributes and payload keys whose values are addresses.
 *
 * ── Why an allowlist of names, and not simply "every quoted path" ─────────
 * The obvious transform — prefix every `"/…"` in the body — is wrong, and
 * silently so. A documentation page carries an inline bootstrap script whose
 * source contains string literals like `if (p == null) return "/"`, and
 * rewriting those rewrites executable JavaScript rather than a link. Auditing
 * the live pages turned up exactly that, and nothing else: every real
 * destination in six megabytes of markup and payload is the value of one of
 * these names. So the match is anchored to the name.
 *
 * `href` and `src` and `action` are the ordinary ones. The other two are what
 * keep the sidebar's *current page* highlighted: the documentation marks each
 * navigation row with an `id` holding that row's path and records the visited
 * page in `data-current-path`, then compares the two. Since the browser's
 * location now carries the `/documentation` prefix, both sides of that
 * comparison have to carry it as well — rewriting the links but not these
 * would leave every row looking unvisited.
 */
const ADDRESS_NAMES = "href|src|action|id|data-current-path|url|pathname";

/**
 * A root-relative path, as an HTML attribute value.
 *
 * The character class is what keeps the match inside a single attribute: no
 * quote, no angle bracket and no whitespace, so it can never run past the end
 * of the value or the tag. `(?!\/)` rejects `//example.com`, which is somebody
 * else's origin rather than a path on this one.
 */
const ATTRIBUTE_PATH = new RegExp(
  `\\b(${ADDRESS_NAMES})="(\\/(?!\\/)[^"<>\\s]*)"`,
  "g",
);

/**
 * A root-relative path, as a value in the React payload.
 *
 * The payload arrives twice over in a single response — once inside a script
 * tag, where every quote is JSON-escaped as `\"`, and once as the raw
 * `text/x-component` body a client-side navigation fetches, where it is a
 * plain `"`. The first group captures whichever form opened the key, and every
 * backreference after it demands the same one, so one pass reads both and
 * neither can match across the other.
 */
const PAYLOAD_PATH = new RegExp(
  `(\\\\?")(${ADDRESS_NAMES})\\1\\s*:\\s*\\1(\\/(?!\\/)[^"\\\\<>\\s]*)\\1`,
  "g",
);

/**
 * A root-relative path, as written in a page's own source.
 *
 * The third and least obvious form. A documentation page is authored in MDX and
 * ships compiled, so a link a writer put in the page body — a `<Card href="…">`,
 * an ordinary Markdown link — arrives as JavaScript, and the compiler quotes it
 * with backticks: ``href:`/quickstart` ``. Neither of the patterns above sees
 * that, and without this one the sidebar and the chrome would be translated
 * while the links inside the prose quietly kept pointing at the site root.
 */
const SOURCE_PATH = new RegExp(
  "\\b(" + ADDRESS_NAMES + "):\\s*`(\\/(?!\\/)[^`\\\\<>\\s]*)`",
  "g",
);

/**
 * The route parameter the documentation uses to answer "which page is this?".
 *
 * Not a link, and the reason it has to be rewritten anyway is the subtlest
 * thing in this file.
 *
 * The documentation does not read the address bar to work out where it is. It
 * reads its own routing parameters — `useParams().slug`, which arrives in the
 * payload as the tuple below — and then finds the current page by comparing
 * that value against the `href` of every entry in its navigation. Prefixing
 * the navigation without prefixing this leaves the two sides of that
 * comparison in different address spaces, so nothing matches and the page is
 * treated as one that is not in the navigation at all: the Previous and Next
 * links at the foot of every article disappear, and because the server had
 * already rendered them, React reports the disagreement and re-renders without
 * them.
 *
 * Prefixing it here keeps both sides in the same space. The tuple is Next's
 * own encoding of an optional catch-all segment — name, value, kind — and the
 * value is the page's path with no leading slash, empty on the front page.
 */
const ROUTE_SLUG = /\["slug","([^"]*)","oc"\]/g;

/**
 * The documentation's own front page, as its navigation names it.
 *
 * The one address in the payload that is not written as a path. The navigation
 * entry for the front page carries `"href":""`, and the documentation's client
 * expands that empty string to `/` while it runs. Left alone it is the single
 * most visible thing that can go wrong here: the logo, the tab and the first
 * sidebar row all point at it, so every "back to the start" control in the
 * documentation would drop a merchant onto the marketing site instead.
 *
 * Worth being sure this is safe rather than assuming it. Across the published
 * pages there is exactly one empty `href` in each, always the same navigation
 * entry, and never one in the markup — an empty `href` here means the front
 * page, not "this is not a link".
 *
 * It also has to agree with the markup. React re-renders from this payload
 * after the page arrives, so if the markup said `/documentation` and the
 * payload said `/`, React would notice the disagreement, warn about it, and
 * replace the correct links with the wrong ones.
 */
const PAYLOAD_ROOT = new RegExp('(\\\\?")href\\1\\s*:\\s*\\1\\1', "g");

/**
 * Rewrite one run of text from the documentation's address space to this site's.
 *
 * Two substitutions, in order:
 *
 * 1. Absolute self-references. The documentation states its own canonical URL,
 *    its `og:url` and its structured data as absolute links to its own host;
 *    those become absolute links to this one, which is what makes
 *    `https://codking.tech/documentation` the canonical address of the page
 *    rather than a second copy of it. A whole origin is an unambiguous string,
 *    so this one is a plain replacement.
 *
 * 2. Named addresses, prefixed — every link in the markup, and every link in
 *    the React payload the client router navigates by. Rewriting the payload
 *    as well as the markup is the half that matters most: a click inside the
 *    documentation is a client-side navigation, and it reads its destination
 *    from there rather than from the anchor the browser is showing.
 *
 * This is the transform, not the traversal. Applying it to a whole React
 * payload would corrupt it — see `flight.ts` — so the exported wrappers below
 * decide what to hand it.
 */
function rewriteAddresses(body: string, siteOrigin: string): string {
  return body
    .split(DOCS_UPSTREAM)
    .join(`${siteOrigin}${DOCS_PATH}`)
    .replace(ATTRIBUTE_PATH, (match, name: string, path: string) => {
      const rewritten = toSitePath(path);
      return rewritten === path ? match : `${name}="${rewritten}"`;
    })
    .replace(
      PAYLOAD_PATH,
      (match, quote: string, name: string, path: string) => {
        const rewritten = toSitePath(path);
        return rewritten === path
          ? match
          : `${quote}${name}${quote}:${quote}${rewritten}${quote}`;
      },
    )
    .replace(SOURCE_PATH, (match, name: string, path: string) => {
      const rewritten = toSitePath(path);
      return rewritten === path ? match : `${name}:\`${rewritten}\``;
    })
    .replace(
      PAYLOAD_ROOT,
      (_match, quote: string) =>
        `${quote}href${quote}:${quote}${DOCS_PATH}${quote}`,
    )
    .replace(ROUTE_SLUG, (match, slug: string) => {
      const prefix = DOCS_PATH.slice(1);
      if (slug === prefix || slug.startsWith(`${prefix}/`)) return match;
      return `["slug","${slug ? `${prefix}/${slug}` : prefix}","oc"]`;
    });
}

/**
 * A server-rendered documentation page, addressed to this site.
 *
 * Two passes over two disjoint halves of the document. The React payload is
 * lifted out and rewritten row-aware, so a length-prefixed row keeps a length
 * that matches its content; the markup around it is rewritten as plain text,
 * which it is. Neither pass can see the other's half, so nothing is translated
 * twice.
 */
export function rewriteDocumentationHtml(
  html: string,
  siteOrigin: string,
): string {
  /*
    The payload is lifted out under a placeholder before the markup is touched,
    rather than rewritten in place afterwards. The other order would mean
    running the plain-text transform across the payload as well, which is
    exactly the corruption `flight.ts` exists to prevent.

    The placeholder is a token no served document contains, so the markup pass
    has nothing to match on and hands it straight back.
  */
  const placeholder = "__COD_KING_DOCS_FLIGHT_SLOT__";
  const stream: string[] = [];

  const markup = html.replace(FLIGHT_PUSH, (call) => {
    stream.push(decodeFlightPush(call));
    return placeholder;
  });

  if (stream.length === 0) return rewriteAddresses(html, siteOrigin);

  const rewritten = rewriteFlightStream(stream.join(""), (row) =>
    rewriteAddresses(row, siteOrigin),
  );

  let slot = 0;
  return rewriteAddresses(markup, siteOrigin).replaceAll(placeholder, () =>
    slot++ === 0 ? encodeFlightPush(rewritten) : emptyFlightPush(),
  );
}

/**
 * A React payload fetched on its own, addressed to this site.
 *
 * What a client-side navigation inside the documentation asks for: the same
 * stream, without a document wrapped around it.
 */
export function rewriteDocumentationFlight(
  body: string,
  siteOrigin: string,
): string {
  return rewriteFlightStream(body, (row) => rewriteAddresses(row, siteOrigin));
}

/**
 * Any other proxied text — Markdown sources, `llms.txt`, the sitemap.
 *
 * Plain text with addresses in it and no structure to respect.
 */
export function rewriteDocumentationText(
  body: string,
  siteOrigin: string,
): string {
  return rewriteAddresses(body, siteOrigin);
}

/**
 * One whole address the upstream wrote, as an address on this site.
 *
 * For the `Location` of a redirect, which is a header rather than a body and
 * so carries no quotes for the body rewriter to anchor on. Both forms a
 * redirect can take are handled: an absolute URL on the upstream host, and a
 * root-relative path. Anything else — a redirect to a genuinely different
 * site — is passed through as it was written.
 */
export function toSiteAddress(address: string, siteOrigin: string): string {
  if (address.startsWith(DOCS_UPSTREAM)) {
    return `${siteOrigin}${DOCS_PATH}${address.slice(DOCS_UPSTREAM.length)}`;
  }

  return address.startsWith("/") ? toSitePath(address) : address;
}

/**
 * The upstream URL for one incoming request under `/documentation`.
 *
 * The slug segments are re-encoded rather than pasted, and the result is
 * checked to be on the upstream origin before it is returned, so no request
 * this handler receives can be turned into a fetch of somewhere else.
 */
export function upstreamUrlFor(
  slug: readonly string[] | undefined,
  search: string,
): URL | null {
  const segments = slug ?? [];
  if (segments.some((segment) => segment === "." || segment === "..")) {
    return null;
  }

  const path = segments.map(encodeURIComponent).join("/");
  const url = new URL(`/${path}${search}`, `${DOCS_UPSTREAM}/`);

  return url.origin === new URL(DOCS_UPSTREAM).origin ? url : null;
}
