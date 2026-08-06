import { ArrowRight, Quote, Star } from "lucide-react";
import Link from "next/link";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routes } from "@/constants/routes";
import { getCustomerStories, getProofMetrics } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * Proof (§5.1 #8).
 *
 * Named merchants with one metric each. §10.1 requires every claim to point at
 * a source, so an anonymous quote is not publishable here — and the shape of
 * the content set enforces that by requiring a name.
 *
 * The heading sits beside the cards rather than centred above them, which is
 * the third distinct heading treatment on this page and deliberate: a long
 * marketing page where every section opens the same way reads as a template
 * being filled in. It also puts the marketplace verdict — the rating card —
 * in the same row as the quotes it is a summary of, so two merchants read as
 * a sample of many rather than as all there is.
 *
 * The rating comes from the proof repository rather than the copy, so it can
 * never disagree with the hero or the footer (§11.1).
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
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            <span aria-hidden className="h-px w-6 bg-brand/40" />
            Merchants
          </p>
          <h2 className="mt-4 text-[2rem] leading-[1.06] font-semibold tracking-[-0.025em] text-balance lg:text-[2.6rem]">
            Written by stores running it now
          </h2>
        </div>

        <Link
          href={routes.customers}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors outline-none hover:border-brand/35 hover:text-brand focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          Read merchant stories
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="mt-lede grid gap-5 lg:grid-cols-3">
        {/* The marketplace verdict, as the first card in the set. */}
        <BlurFade inView className="h-full">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-soft via-card to-brand-soft/60 p-7 shadow-card">
            <div
              aria-hidden
              className="absolute -top-20 -right-12 size-52 rounded-full bg-brand/12 blur-3xl"
            />

            <div className="relative">
              <ShopifyMark className="size-9" />
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-[3.25rem] leading-none font-semibold tracking-[-0.03em] text-brand tabular-nums">
                  {proof.rating}
                </span>
                <span className="text-sm text-muted-foreground">out of 5</span>
              </p>
              <div
                className="mt-3 flex items-center gap-0.5"
                aria-label={`Rated ${proof.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden
                    className="size-4 fill-brand text-brand"
                  />
                ))}
              </div>
            </div>

            <p className="relative mt-7 text-sm leading-relaxed text-muted-foreground">
              From {numberFormat.format(proof.reviewCount)}+ verified reviews on
              the Shopify App Store, left by merchants who installed it
              themselves.
            </p>
          </div>
        </BlurFade>

        {stories.map((story, index) => (
          <BlurFade
            key={story.id}
            delay={0.07 * (index + 1)}
            inView
            className="h-full"
          >
            <figure className="relative flex h-full surface-card flex-col overflow-hidden p-7">
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

              <blockquote className="relative mt-5 flex-1 text-[15px] leading-relaxed text-pretty text-foreground/90">
                “{story.quote}”
              </blockquote>

              <figcaption className="relative mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
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
    </SectionShell>
  );
}
