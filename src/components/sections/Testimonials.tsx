import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { TestimonialCarousel } from "@/components/sections/proof/TestimonialCarousel";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import {
  getCustomerStories,
  getPricingPlans,
  getProofMetrics,
} from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * Proof, in three columns on one band.
 *
 * The blueprint puts the merchant quotes, the marketplace verdict and the
 * price beside each other rather than in three stacked sections, and the
 * reason holds up: these are the three questions a merchant asks at exactly
 * this point — do stores like mine use it, does the marketplace agree, what
 * does it cost — and answering them in one glance is worth more than
 * answering them across three scrolls.
 *
 * The quotes get the widest column because they are the only one that takes
 * reading. The verdict and the price are both a number and a link.
 *
 * Every figure comes from the repository, so this band cannot disagree with
 * the hero, the pricing page or the footer (§11.1). §10.1 requires a claim to
 * point at a source, which is why an anonymous quote is not publishable here
 * and the content shape enforces it by requiring a merchant name.
 */
export async function Testimonials() {
  const stories = getCustomerStories();
  const proof = await getProofMetrics();
  const plans = getPricingPlans();

  if (stories.length === 0) return null;

  // The cheapest paid plan, so the teaser quotes a real entry price rather
  // than a rounded one written into copy.
  const paid = plans.find((plan) => plan.price?.kind === "fixed");
  const entryPrice =
    paid?.price?.kind === "fixed"
      ? new Intl.NumberFormat("en", {
          style: "currency",
          currency: paid.price.currency,
          minimumFractionDigits: paid.price.amount % 1 === 0 ? 0 : 2,
        }).format(paid.price.amount)
      : null;

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
      <div className="grid items-stretch gap-5 lg:grid-cols-[1.25fr_0.9fr_0.85fr]">
        {/* The quotes. */}
        <BlurFade inView className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card">
            <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">
              Loved by merchants
            </p>
            <h2 className="mt-3 text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] text-balance">
              Written by stores running it now
            </h2>

            <div className="mt-7 flex-1">
              <TestimonialCarousel stories={stories} rating={proof.rating} />
            </div>
          </div>
        </BlurFade>

        {/* The marketplace verdict. */}
        <BlurFade delay={0.07} inView className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-soft via-card to-brand-soft/60 p-7 shadow-card">
            <div
              aria-hidden
              className="absolute -top-20 -right-12 size-52 rounded-full bg-brand/12 blur-3xl"
            />

            <div className="relative">
              <ShopifyMark className="size-9" />
              <h3 className="mt-5 text-sm font-semibold">
                Shopify App Store reviews
              </h3>

              <p className="mt-4 flex items-baseline gap-1.5">
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

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                From {numberFormat.format(proof.reviewCount)}+ verified reviews,
                left by merchants who installed it themselves.
              </p>
            </div>

            {/* The wrapper carries the spacing, so `mt-auto` can pin the
                action to the bottom of every card in the row without the
                margin collapsing against the button itself. */}
            <div className="relative mt-auto pt-8">
              <Button asChild variant="secondary" size="md" block>
                <Link href={routes.customers}>
                  Read merchant stories
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </BlurFade>

        {/*
          The price.

          A teaser rather than the full plan table: cost has to appear before
          the install is asked for (§5.1 #9), but a merchant deciding whether
          to keep reading needs the shape of the pricing, not the comparison.
          The comparison is one click away and is that page's whole job.
        */}
        <BlurFade delay={0.14} inView className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="text-sm font-semibold">
              Simple, transparent pricing
            </h3>

            <p className="mt-4 flex items-baseline gap-1.5">
              <span className="text-[2.5rem] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                Free
              </span>
              <span className="text-sm text-muted-foreground">to start</span>
            </p>

            {entryPrice ? (
              <p className="mt-2.5 text-sm text-muted-foreground">
                Paid plans from{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {entryPrice}
                </span>{" "}
                a month.
              </p>
            ) : null}

            <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
              {[
                "No setup fee",
                "Seven days free on every plan",
                "Messages billed at your plan rate",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-check/20"
                  >
                    <Check className="size-2.5 text-ink/70" />
                  </span>
                  <span className="text-[13px] leading-relaxed text-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Button asChild size="md" block>
                <Link href={routes.pricing}>
                  View pricing
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </BlurFade>
      </div>
    </SectionShell>
  );
}
