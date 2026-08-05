import { Star } from "lucide-react";

import { SectionShell } from "@/components/sections/SectionShell";
import { Marquee } from "@/components/ui/marquee";
import { getProofMetrics, getTrustedBrands } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The proof strip (§5.1 #3).
 *
 * Deliberately the quietest band on the page. It sits directly under the
 * hero, and its job is to be believed rather than admired — so it is almost
 * white, hairline-ruled, and carries no colour of its own. The restraint is
 * what makes it read as a fact rather than a claim.
 *
 * A marquee earns its place here and nowhere else: the brand list is short,
 * and scrolling it signals "more than fits" without padding the row out with
 * filler. It pauses on hover so a merchant can read a name they recognise,
 * and the same names are repeated in a visually hidden list so assistive
 * technology gets a static, complete version.
 */
export async function TrustBar() {
  const [proof, brands] = [await getProofMetrics(), getTrustedBrands()];

  return (
    <SectionShell
      size="compact"
      ariaLabel="Merchants using COD King"
      className="border-y border-border/60"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background via-cloud to-background"
        />
      }
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
        <div className="flex shrink-0 items-center gap-2.5 text-sm">
          <span className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="size-3.5 fill-brand text-brand" />
            ))}
          </span>
          <span className="font-semibold">{proof.rating}</span>
          <span className="text-muted-foreground">
            from {numberFormat.format(proof.reviewCount)}+ reviews
          </span>
        </div>

        <span
          aria-hidden
          className="hidden h-8 w-px shrink-0 bg-border lg:block"
        />

        <div className="relative w-full min-w-0 flex-1">
          <Marquee pauseOnHover className="[--duration:38s] [--gap:4rem]">
            {brands.map((brand) => (
              <span
                key={brand.name}
                aria-hidden
                className="text-base font-semibold whitespace-nowrap text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
              >
                {brand.name}
              </span>
            ))}
          </Marquee>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cloud to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cloud to-transparent"
          />

          <p className="sr-only">
            Merchants using COD King include{" "}
            {brands.map((brand) => brand.name).join(", ")}.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
