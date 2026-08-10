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
   */
  async redirects() {
    return [
      {
        source: "/features/prepaid-nudge",
        destination: "/features/cod-to-prepaid",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
