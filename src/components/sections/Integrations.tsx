import { ArrowRight, Puzzle } from "lucide-react";
import Link from "next/link";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routes } from "@/constants/routes";
import { getFeaturedIntegrations, getIntegrations } from "@/lib/content";

import type { ReactNode } from "react";

/**
 * Vendor artwork, keyed by slug.
 *
 * A provider with no mark falls back to its own initials rather than to a
 * generic icon — a wrong logo is worse than no logo, and a monogram is honest
 * about being a placeholder until the vendor's own file arrives.
 */
const markFor: Record<string, ReactNode> = {
  shopify: <ShopifyMark className="size-5" />,
  whatsapp: <WhatsappMark className="size-5" />,
};

/**
 * The platforms COD King connects to.
 *
 * Compatibility sits here — after the product has been shown, before pricing —
 * because merchants check it once they are interested, not before (§4.3).
 *
 * Two tiers on one surface. The three platforms that change what a merchant
 * can do get a card and a sentence; every remaining gateway is listed by name
 * underneath, because a compatibility list belongs under the argument rather
 * than instead of it. Both tiers read from the same repository record, so a
 * provider added to the data appears in exactly one of them — and only the
 * providers the product actually names are in that record, because an
 * integration claim is a promise and an unverified one is worse than an
 * absent one (§3.1).
 */
export function Integrations() {
  const featured = getFeaturedIntegrations();
  const rest = getIntegrations().filter((integration) => !integration.featured);

  return (
    <SectionShell
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(55% 60% at 50% 0%, color-mix(in oklab, var(--brand) 8%, transparent), transparent 70%)",
          }}
        />
      }
    >
      <SectionHeading
        eyebrow="Integrations"
        title="Bring your own gateway, pay their rate"
        description="Every confirmation, every OTP, every recovery message is a line on somebody's bill. Connect a regional provider and it is theirs, at their price, in their currency — not a global rate with a margin on top."
      />

      <ul className="mt-lede grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((integration, index) => (
          <li key={integration.slug} className="h-full">
            <BlurFade delay={0.05 * index} inView className="h-full">
              <div className="flex h-full surface-card flex-col p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-border">
                  {markFor[integration.slug] ?? (
                    <span
                      aria-hidden
                      className="text-[13px] font-bold text-brand"
                    >
                      {integration.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </span>

                <h3 className="mt-5 text-[15px] font-semibold tracking-tight">
                  {integration.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {integration.blurb}
                </p>
              </div>
            </BlurFade>
          </li>
        ))}

        {/*
          The rest, as one card rather than a second grid of near-empties.

          It spans the full width only where that closes the grid. On three
          columns the featured providers fill row one exactly, so this takes
          row two whole. On two columns it is an ordinary cell, which is what
          pairs it with the third provider instead of stranding that provider
          beside a hole.
        */}
        <li className="h-full lg:col-span-3">
          <BlurFade delay={0.05 * featured.length} inView className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-dashed border-brand/25 bg-gradient-to-br from-sky-200 to-white p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-white text-brand ring-1 ring-brand/12">
                <Puzzle aria-hidden className="size-5" />
              </span>

              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">
                And every gateway below
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {rest.map((integration) => (
                  <li
                    key={integration.slug}
                    className="rounded-full border border-border bg-white px-2.5 py-1 text-[12px] font-medium text-foreground/75"
                  >
                    {integration.name}
                  </li>
                ))}
              </ul>

              <Link
                href={routes.integrations}
                className="group mt-auto inline-flex items-center gap-1.5 rounded-md pt-5 text-[13px] font-semibold text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                See all integrations
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </BlurFade>
        </li>
      </ul>
    </SectionShell>
  );
}
