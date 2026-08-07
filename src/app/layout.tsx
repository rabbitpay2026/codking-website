import "./globals.css";

import { Geist_Mono, Poppins } from "next/font/google";

import { siteConfig } from "@/constants/site";

import type { Metadata, Viewport } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout: the only place that owns the document shell.
 *
 * Its responsibility stops at the document — language, fonts, and the flex
 * column that lets a shell pin its footer to the bottom of short pages. The
 * marketing chrome belongs to the `(site)` layout, so a route that should not
 * carry it can opt out by living outside that group.
 *
 * `data-scroll-behavior="smooth"` is required because `globals.css` sets
 * `scroll-behavior: smooth` on `<html>`: from Next.js 16, the router no longer
 * neutralises that during navigation unless this attribute is present, which
 * would otherwise make every route change animate its scroll to the top.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.lang}
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
