import "./globals.css";

import { Geist_Mono, Poppins } from "next/font/google";

import { JsonLd } from "@/components/shared/JsonLd";
import { siteConfig } from "@/constants/site";
import { buildOrganizationSchema } from "@/lib/seo/organization";

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
    /*
      Google's own directives, and only defaults — `createMetadata` replaces
      this whole object with `index: false, follow: false` on a `noIndex` page,
      so nothing here can loosen a page that opted out.

      `max-image-preview: large` is the one that earns its place: without it a
      result gets a thumbnail at best, and this site's feature pages are
      largely product screenshots. The two `-1`s remove Google's own snippet
      and video-preview caps rather than raising them; there is no length being
      asserted here, only the absence of an arbitrary one.
    */
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
      <body className="flex min-h-full flex-col">
        {/*
          Sitewide Organization structured data, declared once for the whole
          app. It belongs here rather than on a page because it describes the
          publisher, not the document — repeating it per route would put the
          same node in the graph a dozen times and give later schema types
          (SoftwareApplication, Article, FAQPage) a dozen `@id`s to choose
          between instead of one to reference.

          Rendered inside `<body>` rather than `<head>`: both are valid for
          JSON-LD and Google states so explicitly, and the root layout owns no
          `<head>` element of its own — Next composes that from the Metadata
          API, and a `<head>` added by hand here would fight it.
        */}
        <JsonLd id="organization-schema" schema={buildOrganizationSchema()} />
        {children}
      </body>
    </html>
  );
}
