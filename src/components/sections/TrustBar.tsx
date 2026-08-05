import { Star } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { Marquee } from "@/components/ui/marquee";
import { getProofMetrics, getTrustedBrands } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The proof strip (§5.1 #3).
 *
 * A marquee earns its place here and nowhere else on the page: the brand list
 * is short, and scrolling it signals "more than fits" without padding the row
 * with filler. It pauses on hover so a merchant can actually read a name they
 * recognise, and the same names are duplicated in a visually hidden list so
 * assistive technology gets a static, complete version rather than a moving
 * one.
 */
export async function TrustBar() {
  const [proof, brands] = [await getProofMetrics(), getTrustedBrands()];

  return (
    <section
      aria-label="Merchants using COD King"
      className="border-y border-border bg-background py-8"
    >
      <Container className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
        <div className="flex shrink-0 items-center gap-2 text-sm">
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

        <div className="relative w-full min-w-0 flex-1">
          <Marquee pauseOnHover className="[--duration:32s] [--gap:3rem]">
            {brands.map((brand) => (
              <span
                key={brand.name}
                aria-hidden
                className="text-base font-semibold whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {brand.name}
              </span>
            ))}
          </Marquee>

          {/* Fade the edges so names enter and leave rather than being cut. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"
          />

          <p className="sr-only">
            Merchants using COD King include{" "}
            {brands.map((brand) => brand.name).join(", ")}.
          </p>
        </div>
      </Container>
    </section>
  );
}
