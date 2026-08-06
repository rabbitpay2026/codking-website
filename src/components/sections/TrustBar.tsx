import { Star } from "lucide-react";

import { ShopifyMark } from "@/components/brand/BrandMarks";
import { SectionShell } from "@/components/sections/SectionShell";
import { Marquee } from "@/components/ui/marquee";
import { getProofMetrics, getTrustedBrands } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The proof block (§5.1 #3).
 *
 * Sits directly under the hero, where a visitor decides whether to keep
 * reading, so it is built as a composition rather than a line of text: the
 * Shopify relationship stated at a size that registers without being read,
 * the rating beside it, the numbers on their own ruled row, and the merchant
 * names moving underneath.
 *
 * The four figures share one row and one baseline so they read as a set. That
 * is the whole trick — four numbers in four boxes look like four claims; four
 * numbers on a rule look like a record.
 *
 * Every figure comes from the proof repository, so none of them can drift
 * from the hero or the footer (§11.1).
 */
export async function TrustBar() {
  const proof = await getProofMetrics();
  const brands = getTrustedBrands();

  const stats = [
    {
      value: `${numberFormat.format(proof.merchantCount)}+`,
      label: "Merchants",
    },
    { value: `${proof.rating}★`, label: "App Store rating" },
    {
      value: `${numberFormat.format(proof.reviewCount)}+`,
      label: "Verified reviews",
    },
    {
      value: proof.countriesServed ? `${proof.countriesServed}+` : "—",
      label: "Countries",
    },
  ];

  return (
    <SectionShell
      tone="muted"
      size="compact"
      ariaLabel="Marketplace rating and merchants"
      containerClassName="py-12 md:py-14"
    >
      <div className="rounded-3xl border border-border/70 bg-card/70 p-7 shadow-card backdrop-blur-xl sm:p-9">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          {/* The Shopify relationship, at a size that registers. */}
          <div className="flex items-center gap-4">
            <ShopifyMark className="size-11 shrink-0" />
            <div>
              <p className="text-lg leading-tight font-semibold tracking-tight">
                Built on the Shopify App Store
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Installs in one click. No theme edits, no code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
            <span className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-4 fill-brand text-brand" />
              ))}
            </span>
            <span className="text-sm">
              <span className="font-semibold tabular-nums">{proof.rating}</span>
              <span className="text-muted-foreground">
                {" "}
                from {numberFormat.format(proof.reviewCount)}+ reviews
              </span>
            </span>
          </div>
        </div>

        {/* One ruled row, one baseline — a record rather than four claims. */}
        <dl className="mt-8 grid grid-cols-2 gap-y-8 border-t border-border pt-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                index === 0
                  ? "px-2 text-center lg:px-6 lg:text-left"
                  : "border-l border-border px-2 text-center lg:px-6 lg:text-left"
              }
            >
              <dd className="text-[2rem] leading-none font-semibold tracking-[-0.03em] text-brand tabular-nums lg:text-[2.5rem]">
                {stat.value}
              </dd>
              <dt className="mt-2 text-xs font-medium tracking-wide text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <div className="relative mt-8 border-t border-border pt-7">
          <p className="mb-4 text-center text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
            Trusted by stores like
          </p>

          <Marquee pauseOnHover className="[--duration:40s] [--gap:4rem]">
            {brands.map((brand) => (
              <span
                key={brand.name}
                aria-hidden
                className="text-lg font-semibold tracking-tight whitespace-nowrap text-muted-foreground/55 transition-colors duration-300 hover:text-foreground"
              >
                {brand.name}
              </span>
            ))}
          </Marquee>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-card to-transparent"
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
