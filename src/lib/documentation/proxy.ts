import { siteConfig } from "@/constants/site";
import {
  rewriteDocumentationFlight,
  rewriteDocumentationHtml,
  rewriteDocumentationText,
  toSiteAddress,
  upstreamUrlFor,
} from "@/lib/documentation/upstream";

import type { NextRequest } from "next/server";

/**
 * Serve one documentation page from this origin.
 *
 * The request is fetched from the Mintlify deployment and the response is
 * returned as this site's own — so the browser's address bar never changes and
 * no redirect is involved. The upstream deployment is only ever read: nothing
 * here alters it, and `docs.codking.tech` keeps serving exactly as it does
 * today.
 *
 * This is a proxy rather than a rewrite in `next.config.ts` for one reason: a
 * rewrite returns the upstream body verbatim, and a verbatim body is the one
 * thing that cannot work. The documentation is published at the root of its own
 * host, so its links and its React payload are full of root-relative paths;
 * handed to a browser sitting on `/documentation` they point at pages this site
 * does not have, and the first click leaves. The body has to be translated,
 * which means it has to be read. `./upstream.ts` holds the translation.
 *
 * Both route files under `app/documentation` are one line each and call this:
 * `/documentation` itself, and everything nested beneath it.
 */
export async function proxyDocumentation(
  request: NextRequest,
  slug?: readonly string[],
): Promise<Response> {
  const target = upstreamUrlFor(slug, request.nextUrl.search);

  if (!target) return new Response("Not found", { status: 404 });

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: request.method,
      headers: forwardedRequestHeaders(request),
      redirect: "manual",
      cache: "no-store",
    });
  } catch {
    /*
      The documentation is a separate deployment and can be unreachable while
      the rest of this site is perfectly healthy. 502 says exactly that — the
      gateway could not reach what it proxies — rather than 404, which would
      tell a crawler the page is gone.
    */
    return new Response("The documentation is temporarily unavailable.", {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const headers = forwardedResponseHeaders(upstream);
  const rewrite = rewriterFor(upstream.headers.get("content-type") ?? "");

  /*
    Images, fonts and anything else opaque are streamed straight through, never
    buffered. Only a body that can contain an address is read into memory.
  */
  if (!rewrite) {
    return new Response(upstream.body, { status: upstream.status, headers });
  }

  /*
    Read as Latin-1 rather than UTF-8, and written back the same way.

    That is not a claim about the encoding — the documentation is UTF-8 and
    stays UTF-8. It is a way of holding the body as one character per byte, so
    that every offset this proxy computes is a byte offset. The React payload
    declares the length of some of its rows in bytes (see `flight.ts`), and a
    body held as decoded text would put those declarations and the characters
    they count in different units the moment a page contained a single
    non-ASCII character. Every pattern rewritten here is ASCII, so the bytes
    outside the matches are carried through untouched and the document that
    goes out is byte-identical to the one that came in, apart from the
    addresses.
  */
  const body = Buffer.from(await upstream.arrayBuffer()).toString("latin1");

  return new Response(Buffer.from(rewrite(body, siteConfig.url), "latin1"), {
    status: upstream.status,
    headers,
  });
}

/**
 * How a body has to be read before its addresses can be changed — or `null` if
 * it has none.
 *
 * Three shapes, and the distinction matters. An HTML page carries the React
 * payload inside itself and has to be taken apart before either half is
 * touched. A `text/x-component` response *is* that payload — what a
 * client-side navigation through the sidebar asks for — and is walked row by
 * row. Everything else is plain text with addresses in it.
 *
 * The last group is not an afterthought: the documentation publishes its own
 * `llms.txt`, a Markdown source for every page and its own sitemap, and each
 * of those names its pages by URL.
 */
function rewriterFor(
  contentType: string,
): ((body: string, origin: string) => string) | null {
  if (contentType.includes("text/html")) return rewriteDocumentationHtml;
  if (contentType.includes("text/x-component")) {
    return rewriteDocumentationFlight;
  }

  const TEXT = [
    "text/plain",
    "text/markdown",
    "application/json",
    "application/xml",
    "text/xml",
  ];

  return TEXT.some((type) => contentType.includes(type))
    ? rewriteDocumentationText
    : null;
}

/**
 * Request headers that must not be forwarded.
 *
 * `host`, `connection` and the content framing headers belong to this hop and
 * are re-derived by `fetch`. `accept-encoding` is dropped so the response
 * arrives decoded and can be read as text.
 *
 * The two Next.js routing headers are the interesting ones. A client-side
 * navigation inside the documentation sends the router's current state tree,
 * and by then that tree describes *rewritten* paths — `/documentation/…` —
 * which the upstream deployment has never heard of and cannot parse. Dropping
 * them asks it for the complete tree instead of a diff against a state it does
 * not share: a slightly larger response, and always a valid one.
 */
const STRIPPED_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "accept-encoding",
  "next-router-state-tree",
  "next-url",
]);

function forwardedRequestHeaders(request: NextRequest): Headers {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    if (!STRIPPED_REQUEST_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  return headers;
}

/**
 * Response headers worth keeping.
 *
 * Deliberately an allowlist. `content-length` and `content-encoding` describe a
 * body this proxy has just changed the length of. `etag` and `last-modified`
 * describe the upstream's copy, and letting a browser revalidate against them
 * would eventually hand it the untranslated original — the failure would look
 * like the documentation working perfectly until a cache warmed up.
 *
 * What is left is the content type, whatever the upstream says about caching,
 * and the `vary` that keeps a document response and a React payload for the
 * same address from being cached as one another.
 */
const FORWARDED_RESPONSE_HEADERS = ["content-type", "cache-control", "vary"];

function forwardedResponseHeaders(upstream: Response): Headers {
  const headers = new Headers();

  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }

  /*
    A redirect the upstream issues is expressed in its own address space, so
    its destination is translated before it is passed on. Without this, the one
    response whose body this proxy does not touch would be the one that hands a
    merchant back to `docs.codking.tech`.
  */
  const location = upstream.headers.get("location");
  if (location)
    headers.set("location", toSiteAddress(location, siteConfig.url));

  return headers;
}
