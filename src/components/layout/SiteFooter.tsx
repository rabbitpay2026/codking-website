import { Check, Star } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/constants/site";
import {
  getControlNavGroups,
  getFooterColumns,
  getProofMetrics,
} from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The global footer (§4.5).
 *
 * The architecture calls the footer the full index of the site and its most
 * under-used SEO surface, so every page in the §3 sitemap is reachable from
 * here. The Features column is generated from the controls repository and
 * keeps the order-stage grouping, which means the footer teaches the same
 * model as the mega-menu rather than flattening it into ten unrelated links.
 *
 * The rating and review count are read from the proof repository. §11.1
 * forbids typing a live number into page copy, so these render from the same
 * source the homepage and pricing page will use.
 */
export async function SiteFooter() {
  const proof = await getProofMetrics();
  const controlGroups = getControlNavGroups();
  const columns = getFooterColumns();
  const year = new Date().getFullYear();

  return (
    <footer
      data-slot="site-footer"
      className="mt-auto border-t border-border bg-cloud"
    >
      <Container className="py-14">
        <h2 className="sr-only">Site footer</h2>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-2">
            <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
              <Check aria-hidden className="size-3.5 text-brand-check" />
              Built for Shopify
            </li>
            <li
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
              aria-label={`Rated ${proof.rating} out of 5 from ${numberFormat.format(proof.reviewCount)} reviews on the Shopify App Store`}
            >
              <Star aria-hidden className="size-3.5 fill-brand text-brand" />
              <span aria-hidden>
                {proof.rating} · {numberFormat.format(proof.reviewCount)}+
                reviews
              </span>
            </li>
          </ul>
        </div>

        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
        >
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground">Features</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {controlGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                    {group.title}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <FooterLink href={item.href}>{item.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  readonly href: React.ComponentProps<typeof Link>["href"];
  readonly children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-sm text-sm text-muted-foreground transition-colors outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      {children}
    </Link>
  );
}
