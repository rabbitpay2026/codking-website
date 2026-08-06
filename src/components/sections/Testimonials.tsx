import { ArrowRight, Quote, Star } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { getCustomerStories, getProofMetrics } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * Proof (§5.1 #8).
 *
 * Named merchants with one metric each. §10.1 requires every claim to point
 * at a source, so an anonymous quote is not publishable here — and the shape
 * of the content set enforces that by requiring a name.
 *
 * A soft neutral surface on purpose: this section sits between the product
 * and the price, and its only job is to be read. The rating comes from the
 * proof repository rather than the copy, so it can never disagree with the
 * hero or the footer (§11.1).
 */
export async function Testimonials() {
  const stories = getCustomerStories();
  const proof = await getProofMetrics();

  if (stories.length === 0) return null;

  return (
    <SectionShell
      tone="muted"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 45% at 50% 100%, color-mix(in oklab, var(--brand) 8%, transparent), transparent 70%)",
          }}
        />
      }
    >
      <SectionHeading
        eyebrow="Merchants"
        title="Reviews from stores running it now"
        description={`Rated ${proof.rating} out of 5 from ${numberFormat.format(proof.reviewCount)}+ reviews on the Shopify App Store.`}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16">
        {stories.map((story, index) => (
          <BlurFade
            key={story.id}
            delay={0.07 * index}
            inView
            className="h-full"
          >
            <figure className="relative flex h-full surface-card flex-col overflow-hidden p-8">
              <Quote
                aria-hidden
                className="absolute -top-2 right-5 size-20 fill-brand/[0.05] text-transparent"
              />

              <div
                className="relative flex items-center gap-0.5"
                aria-label={`Rated ${proof.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    aria-hidden
                    className="size-4 fill-brand text-brand"
                  />
                ))}
              </div>

              <blockquote className="relative mt-6 flex-1 text-base leading-relaxed text-pretty text-foreground/90">
                “{story.quote}”
              </blockquote>

              <figcaption className="relative mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid size-9 place-items-center rounded-full bg-brand/10 text-xs font-semibold text-brand"
                  >
                    {story.merchantName.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold">
                    {story.merchantName}
                  </span>
                </span>

                <span className="text-right">
                  <span className="block text-sm font-semibold text-brand">
                    {story.metricValue}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {story.metricLabel}
                  </span>
                </span>
              </figcaption>
            </figure>
          </BlurFade>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Button asChild variant="secondary" size="lg">
          <Link href={routes.customers}>
            Read merchant stories
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
