import { Star } from "lucide-react";

import { MerchantMark } from "@/components/brand/MerchantMarks";
import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { SectionShell } from "@/components/sections/SectionShell";
import { Marquee } from "@/components/ui/marquee";
import { getProofMetrics, getTrustedBrands } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The proof strip (§5.1 #3).
 *
 * Deliberately one idea, not four. An earlier pass put a stat block here as
 * well, which restated the merchant count and the country count the hero had
 * already given — and a figure a visitor has just read does not become more
 * true the second time, it becomes filler. Everything countable now lives on
 * the hero's credentials rail; this strip carries the two things the hero
 * cannot: the marketplace verdict and the names behind it.
 *
 * The panel is pulled up so it overlaps the hero's floor. That single overlap
 * does more to join the top of the page than any amount of space between the
 * two would: the strip reads as the hero's own footing rather than as the
 * second of thirteen slabs.
 *
 * Every figure comes from the proof repository, so none of them can drift from
 * the hero or the footer (§11.1).
 */
export async function TrustBar() {
  const proof = await getProofMetrics();
  const brands = getTrustedBrands();

  return (
    <SectionShell
      size="flush"
      allowOverflow
      className="z-10 -mt-8 lg:-mt-10"
      ariaLabel="Marketplace rating and merchants using COD King"
      containerClassName="pb-2"
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 shadow-overlay backdrop-blur-2xl">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />

        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:px-8">
          <div className="flex items-center gap-3">
            <ShopifyMark className="size-8 shrink-0" />
            <p className="text-sm leading-snug font-semibold tracking-tight">
              Rated{" "}
              <span className="tabular-nums">{proof.rating} out of 5</span> on
              the Shopify App Store
              <span className="block text-[13px] font-normal text-muted-foreground">
                {numberFormat.format(proof.reviewCount)}+ verified merchant
                reviews
              </span>
            </p>
          </div>

          <div
            className="flex shrink-0 items-center gap-1"
            aria-label={`Rated ${proof.rating} out of 5`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                aria-hidden
                className="size-[18px] fill-brand text-brand"
              />
            ))}
          </div>
        </div>

        {/* The wall. */}
        <div className="relative border-t border-border/70 bg-gradient-to-b from-transparent to-cloud/70 py-4">
          <p className="mb-1 px-6 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground/70 uppercase lg:px-8">
            Running on stores like
          </p>

          {/*
            Hidden from assistive technology: the marquee repeats its children
            four times to fill the track, so a screen reader would hear every
            store named four times. The `sr-only` sentence below states the
            list once, in order.
          */}
          <Marquee
            aria-hidden
            pauseOnHover
            className="[--duration:44s] [--gap:3.5rem]"
          >
            {brands.map((brand) => (
              <MerchantMark
                key={brand.id}
                id={brand.id}
                name={brand.name}
                className="text-[17px] text-ink/45 transition-colors duration-300 hover:text-ink"
              />
            ))}
          </Marquee>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/85 to-transparent lg:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/85 to-transparent lg:w-24"
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
