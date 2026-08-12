import { ArrowUpRight, Star } from "lucide-react";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { WhatsAppMark } from "@/components/brand/SocialMarks";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/shared/Container";
import { externalLinks, whatsappDisplayNumber } from "@/constants/external";
import { routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import {
  getFooterColumns,
  getFooterFeatureLinks,
  getFooterLegalLinks,
  getProofMetrics,
} from "@/lib/content";
import { cn } from "@/lib/utils";

import type { NavDestination } from "@/types";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The global footer (§4.5).
 *
 * The architecture calls the footer the full index of the site, so every page
 * a merchant can actually read is reachable from here — and, just as
 * deliberately, nothing else is. The Features column is the six features the
 * product ships, read from the same selection the mega-menu opens, rather than
 * all ten records in the controls repository: four of those have no finished
 * page, and a footer that indexes pages the site has not written is an index of
 * disappointments. Solutions sits beside it as the second door into those same
 * six, for a merchant who knows their problem but not our name for the control
 * that solves it.
 *
 * Nothing here is authored in this file. Every destination comes from the
 * navigation config, so the footer's Resources column and the header's
 * Resources dropdown resolve to the same two subdomains by construction.
 *
 * The rating and review count are read from the proof repository. §11.1 forbids
 * typing a live number into page copy, so these render from the same source the
 * homepage and pricing page use.
 *
 * The separation from the page above is the hairline the feature pages use
 * between their own sections — `border-ink/[0.07]` — rather than the heavier
 * `border-border`. The footer is a change of surface, not a change of document,
 * and a dark slab under a very light blue page would read as a second website.
 */
export async function SiteFooter() {
  const proof = await getProofMetrics();
  const featureLinks = getFooterFeatureLinks();
  const columns = getFooterColumns();
  const legalLinks = getFooterLegalLinks();
  const whatsappHref = externalLinks.whatsapp;
  const year = new Date().getFullYear();

  return (
    <footer
      data-slot="site-footer"
      className="mt-auto border-t border-ink/[0.07] bg-cloud"
    >
      <Container className="py-14 lg:py-16">
        <h2 className="sr-only">Site footer</h2>

        {/*
          The brand band.

          Identity and description on the left, the two ways to reach a person
          beside it. Those two belong up here rather than in the columns below
          for the same reason the legal row belongs in the bottom bar: the
          columns are for pages, and neither a WhatsApp thread nor an Instagram
          profile is a page. Putting them in a link column would also have meant
          a fifth heading and four more rows in a grid already carrying five.

          A twelve-track grid rather than `justify-between`, and that is the
          fix for the thing that made this band read as unfinished. Pushed to
          opposite edges, the brand block and the contact block left roughly
          four hundred pixels of nothing between them at desktop — a hole the
          eye reads as a missing column. Given explicit spans they distribute
          across the measure instead, and each block's width is a decision
          rather than a leftover.
        */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="max-w-sm lg:col-span-5">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
              <li className="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-background px-3 py-1.5 text-xs font-medium text-foreground">
                <ShopifyMark className="size-4" />
                Works with Shopify checkout
              </li>
              <li
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-background px-3 py-1.5 text-xs font-medium text-foreground"
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

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:col-span-7 lg:gap-12">
            <div>
              <FooterHeading>Follow us</FooterHeading>
              <SocialLinks className="mt-4" />
            </div>

            <div>
              <FooterHeading>Get in touch</FooterHeading>

              {/*
                The number, readable, and the page — in that order. A merchant
                with a question about a COD rule wants the thread, not a form,
                and every market this product sells into answers on WhatsApp.
              */}
              <div className="mt-4 flex flex-col items-start gap-2.5">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-sm py-1 text-sm font-medium text-foreground transition-colors duration-200 ease-[var(--ease-emphasized)] outline-none hover:text-brand focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    <WhatsAppMark className="size-4 shrink-0 text-ink/40 transition-colors duration-200 group-hover:text-brand" />
                    {whatsappDisplayNumber}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}

                <FooterLink
                  item={{ label: "Contact us", href: routes.contact }}
                />
              </div>
            </div>
          </div>
        </div>

        {/*
          One grid, five headings, no second band.

          Features holds six links against two to five in the others, and its
          labels are the longest on the site — "Partial COD Payment – Upfront
          Payments" in a Company-width column wraps to three lines. So it takes
          two column widths and runs its own links in two sub-columns of three.
          That trades the one tall column for a block three rows deep, which is
          within a row of every column beside it: the row has a level bottom
          edge instead of one spike and four short stacks, and no column is left
          holding a rectangle of empty page.

          The steps follow from that. At `lg` the six tracks are Features twice
          plus the four columns, all on one row. At `sm` the four columns wrap
          beneath Features, two and two. Below `sm` the sub-columns collapse so
          each feature keeps a full-width line to itself — two columns of 140px
          is where those labels start breaking mid-word.

          Those sub-columns are CSS multi-column and not a nested grid, which is
          not a stylistic preference. A two-track grid sizes each row to its
          tallest cell, and these labels run one, two and three lines — so the
          one-line links inherited the gap of whatever sat beside them and the
          block read as six links scattered down a column. Multi-column flows
          each side independently, so the spacing between links is the spacing
          it was set to.
        */}
        <nav
          aria-label="Footer"
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/[0.07] pt-12 sm:grid-cols-4 lg:grid-cols-6 lg:gap-x-8"
        >
          <div className="col-span-2">
            <FooterHeading>Features</FooterHeading>
            <FooterLinkList
              items={featureLinks}
              itemClassName="break-inside-avoid"
              className="mt-4 sm:columns-2 sm:gap-x-6 lg:gap-x-8"
            />
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <FooterHeading>{column.title}</FooterHeading>
              <FooterLinkList items={column.items} className="mt-4" />
            </div>
          ))}
        </nav>

        {/*
          The legal bar. These pages are kept out of the columns above because
          they are looked up deliberately and never browsed — a heading among
          the product columns would spend the footer's most scanned row on its
          least read pages.

          The order reverses below `sm`: on a phone the copyright is the last
          thing on a very long page, and the four links a merchant might
          actually be scrolling for should not sit under it.
        */}
        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-ink/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-0.5">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <FooterLink item={item} size="xs" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({ children }: { readonly children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-foreground">{children}</h3>;
}

function FooterLinkList({
  items,
  className,
  itemClassName,
}: {
  readonly items: readonly NavDestination[];
  readonly className?: string;
  /** Needed only where the list flows in columns and a link must not split. */
  readonly itemClassName?: string;
}) {
  return (
    <ul className={cn("space-y-1", className)}>
      {items.map((item) => (
        <li key={item.href} className={itemClassName}>
          <FooterLink item={item} />
        </li>
      ))}
    </ul>
  );
}

/**
 * One footer link.
 *
 * The vertical padding is the point of it: at `text-sm` the glyphs are 20px
 * tall, and a column of bare 20px targets is a thumb hitting the wrong row.
 * `py-1` takes each row to 28px without loosening the column enough to notice.
 *
 * Off-site links carry the outbound glyph, which travels a pixel toward where
 * it points on hover. That is the entire animation — a footer of forty links
 * that all move is a footer that never sits still.
 */
function FooterLink({
  item,
  size = "sm",
}: {
  readonly item: NavDestination;
  readonly size?: "sm" | "xs";
}) {
  return (
    <NavLink
      item={item}
      className={cn(
        "group inline-flex items-center gap-1 rounded-sm py-1 text-muted-foreground",
        "transition-colors duration-200 ease-[var(--ease-emphasized)] outline-none",
        "hover:text-brand focus-visible:text-brand focus-visible:ring-2 focus-visible:ring-ring/60",
        size === "sm" ? "text-sm" : "text-xs",
      )}
    >
      {item.label}
      {item.external ? (
        <ArrowUpRight
          aria-hidden
          className="size-3.5 shrink-0 opacity-60 transition-[transform,opacity] duration-200 ease-[var(--ease-emphasized)] group-hover:translate-x-px group-hover:-translate-y-px group-hover:opacity-100"
        />
      ) : null}
    </NavLink>
  );
}
