import type { NextConfig } from "next";

/**
 * Where the documentation is actually served from.
 *
 * The documentation is a Mintlify deployment, not a folder in this repository,
 * and it stays that way: the writers publish to it, and re-implementing its
 * chrome — sidebar, search, versioning, code blocks — inside this app would
 * fork the content on the day it was copied. What changes is its *address*.
 * The rewrites below put it behind `codking.tech/documentation`, so the docs
 * are served by this origin rather than linked away to a subdomain, and the
 * URL a merchant sees never leaves the main domain.
 *
 * A rewrite, deliberately, and never a redirect: a redirect would hand the
 * browser `docs.codking.tech` and the address bar would follow it, which is
 * the one outcome this is meant to prevent. The request is proxied instead,
 * so the response arrives under `/documentation` and stays there.
 *
 * The value is an origin *plus whatever base path the docs deployment serves
 * at* — not an origin alone. Mintlify can be told to serve a deployment under
 * a subdirectory, and if that is ever switched on for this one, the upstream
 * address gains the same prefix; keeping the whole base URL in a single value
 * makes that a one-line environment change here rather than a code edit.
 *
 * Read from the environment for the same reason every other external
 * destination is: the host is owned by the business, not by the codebase, and
 * a staging deployment points at a different one. The trailing slash is
 * trimmed so the path templates below can own the separator and a value
 * pasted with one cannot produce `//`.
 */
const DOCS_UPSTREAM = (
  process.env.DOCS_UPSTREAM_URL ?? "https://docs.codking.tech"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    remotePatterns: [],
  },

  /**
   * The COD to Prepaid control was addressed as `prepaid-nudge` while it was
   * still served by the generic template. Its dedicated page (§6.3) is
   * published at the URL the product itself uses — `/features/cod-to-prepaid`
   * — and the slug in the controls repository moved with it, so every internal
   * link follows automatically.
   *
   * The old path is kept alive permanently rather than left to 404: it was
   * reachable, crawlable and linkable, and a renamed page that drops its
   * previous address throws away whatever reached the old one.
   *
   * `cod-rules` moved for exactly the same reason. The product markets this
   * control as "COD Show/Hide" and publishes it at a URL of that name, and the
   * Features index has always titled it so; the slug now agrees with both, and
   * every internal link follows from the controls repository automatically.
   */
  async redirects() {
    return [
      /**
       * The homepage lives at `/landing` (`app/(site)/landing/page.tsx`), and
       * the site root forwards to it.
       *
       * Done here rather than at the host, because a redirect declared in the
       * application travels with the application: it is the same rule in
       * `next dev`, in a preview deployment and in production, and it cannot
       * be lost by a hosting change. Redirects are evaluated before the
       * filesystem, so no page needs to exist at `/` for this to answer — and
       * the root layout still applies to `/landing`, which is why the page
       * renders exactly as it did at the root.
       *
       * `permanent: true` — a 308, which preserves the request method and
       * tells crawlers the homepage's address has moved for good, so the
       * ranking signals that accumulated on `/` follow it to `/landing`. The
       * page's own canonical tag points at `/landing` for the same reason.
       */
      {
        source: "/",
        destination: "/landing",
        permanent: true,
      },
      {
        source: "/features/prepaid-nudge",
        destination: "/features/cod-to-prepaid",
        permanent: true,
      },
      {
        source: "/features/cod-rules",
        destination: "/features/cod-show-hide",
        permanent: true,
      },
    ];
  },

  /**
   * The two documentation namespaces that answer at the site root (§7).
   *
   * The documentation pages themselves are not here. They are served by
   * `app/documentation/[[...slug]]/route.ts`, which proxies them *and*
   * translates their addresses — a rewrite cannot, because it returns the
   * upstream body verbatim and that body is full of root-relative links.
   *
   * These two are the exception, and the reason is worth stating rather than
   * discovering. `/mintlify-assets/` is the documentation's asset prefix and
   * `/_mintlify/` holds its search and assistant endpoints, and both are
   * compiled into its JavaScript as absolute, root-relative strings. The
   * requests are issued by the bundle at runtime rather than written into the
   * markup, so no amount of rewriting the HTML moves them — they arrive at the
   * root of whatever origin is showing the page, and they are forwarded from
   * there. Without them the documentation renders as unstyled markup and its
   * search returns nothing.
   *
   * Rewriting the compiled bundles to relocate these would work until the next
   * upstream build, which is not a thing to depend on.
   *
   * `beforeFiles` rather than the default `afterFiles`, so they answer before
   * the filesystem is consulted. No page in this app claims either path, and
   * the placement is the one that stays correct if one ever did.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/mintlify-assets/:path*",
          destination: `${DOCS_UPSTREAM}/mintlify-assets/:path*`,
        },
        {
          source: "/_mintlify/:path*",
          destination: `${DOCS_UPSTREAM}/_mintlify/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
