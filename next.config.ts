import type { NextConfig } from "next";

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
};

export default nextConfig;
