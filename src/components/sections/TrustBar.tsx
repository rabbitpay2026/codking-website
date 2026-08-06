import { Star } from "lucide-react";

import { ShopifyMark } from "@/components/brand/BrandMarks";
import { SectionShell } from "@/components/sections/SectionShell";
import { Marquee } from "@/components/ui/marquee";
import { getProofMetrics, getTrustedBrands } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The proof rail (§5.1 #3).
 *
 * Sits directly under the hero and has one job: be believed. So it is quiet —
 * no colour of its own, no card, no emphasis beyond the rating itself. The
 * restraint is the point; a trust strip that shouts reads as a claim rather
 * than a fact.
 *
 * The rating and review count come from the proof repository, so this figure
 * and the hero's can never disagree (§11.1).
 *
 * Merchant names scroll rather than sit in a fixed row: the list is short,
 * and motion signals "more than fits" without padding it out with filler. It
 * pauses on hover so a recognisable name can be read, and the same names are
 * repeated in a visually hidden sentence so nothing depends on the animation.
 */
export async function TrustBar() {
  const proof = await getProofMetrics();
  const brands = getTrustedBrands();

  return (
    <SectionShell
      tone="muted"
      size="compact"
      ariaLabel="Merchants and marketplace rating"
    >
      <div className="flex flex-col items-center gap-7 lg:flex-row lg:gap-10">
        <div className="flex shrink-0 items-center gap-3">
          <ShopifyMark className="size-5" />
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-3 fill-brand text-brand" />
                ))}
              </span>
              <span className="text-sm font-semibold tabular-nums">
                {proof.rating}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {numberFormat.format(proof.reviewCount)}+ reviews on the Shopify
              App Store
            </p>
          </div>
        </div>

        <span
          aria-hidden
          className="hidden h-9 w-px shrink-0 bg-border lg:block"
        />

        <div className="relative w-full min-w-0 flex-1">
          <Marquee pauseOnHover className="[--duration:42s] [--gap:3.5rem]">
            {brands.map((brand) => (
              <span
                key={brand.name}
                aria-hidden
                className="text-[15px] font-semibold tracking-tight whitespace-nowrap text-muted-foreground/55 transition-colors duration-300 hover:text-foreground"
              >
                {brand.name}
              </span>
            ))}
          </Marquee>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cloud to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cloud to-transparent"
          />

          <p className="sr-only">
            Stores using COD King include{" "}
            {brands.map((brand) => brand.name).join(", ")}.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
