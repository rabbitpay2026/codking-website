import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { getCustomerStories, getProofMetrics } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * Proof (§5.1 #8).
 *
 * Named merchants with one metric each. §10.1 requires every claim to point
 * at a source, so an anonymous quote is not publishable here and the shape of
 * the content set enforces that by requiring a name.
 *
 * The rating comes from the proof repository rather than being typed into the
 * copy, so it can never disagree with the footer or the hero (§11.1).
 */
export async function Testimonials() {
  const stories = getCustomerStories();
  const proof = await getProofMetrics();

  if (stories.length === 0) return null;

  return (
    <section className="border-y border-border bg-cloud py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Proof"
          title="What merchants say after switching"
          description={`Rated ${proof.rating} out of 5 from ${numberFormat.format(proof.reviewCount)}+ reviews on the Shopify App Store.`}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {stories.map((story, index) => (
            <BlurFade
              key={story.id}
              delay={0.06 * index}
              inView
              className="h-full"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card">
                <div
                  className="flex items-center gap-0.5"
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

                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-pretty text-foreground/90">
                  “{story.quote}”
                </blockquote>

                <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                  <span className="text-sm font-semibold">
                    {story.merchantName}
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

        <div className="mt-12 text-center">
          <Button asChild variant="secondary" size="lg">
            <Link href={routes.customers}>
              Read merchant stories
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
