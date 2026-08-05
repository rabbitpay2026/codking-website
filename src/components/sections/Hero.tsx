import { Star } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { HeroDevices } from "@/components/sections/hero/HeroDevices";
import { SectionShell } from "@/components/sections/SectionShell";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Aurora } from "@/components/ui/aurora";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Noise } from "@/components/ui/noise";
import { cn } from "@/lib/utils";
import { getProofMetrics, getUtilityActions } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The homepage hero (§5.1 #2).
 *
 * States the value in one line, backs it with the trust line the architecture
 * specifies, and offers exactly two actions: install, or see how it works.
 * Nothing else competes — every additional choice here costs conversions.
 *
 * The backdrop is layered rather than flat: a drifting colour field for
 * warmth, a grid for structure, and grain over the top to stop the gradient
 * banding. Each layer is masked so it fades before it reaches the content,
 * which is what keeps the type crisp on top of it — and every one of them is
 * CSS, so the whole scene costs nothing after first paint.
 *
 * Trust figures come from the proof repository, never from copy (§11.1).
 */
export async function Hero() {
  const proof = await getProofMetrics();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <SectionShell
      size="spacious"
      containerClassName="pt-14 md:pt-20 lg:pt-24"
      backdrop={
        <>
          <Aurora />
          <GridPattern
            width={56}
            height={56}
            className={cn(
              "absolute inset-0 h-full stroke-brand/[0.07]",
              "[mask-image:radial-gradient(80%_60%_at_50%_0%,white,transparent)]",
            )}
          />
          <Noise />
          {/* Settles the section into the one below it. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
          />
        </>
      }
    >
      <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        <div>
          <BlurFade delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 py-1 pr-3.5 pl-1 shadow-card backdrop-blur-md">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
                <Star aria-hidden className="size-3 fill-white" />
                {proof.rating}
              </span>
              <AnimatedShinyText className="text-xs font-medium">
                {numberFormat.format(proof.reviewCount)}+ reviews on the Shopify
                App Store
              </AnimatedShinyText>
            </span>
          </BlurFade>

          <BlurFade delay={0.12}>
            <h1 className="mt-7 text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4rem]">
              Stop losing money on{" "}
              <span className="bg-gradient-to-br from-brand via-brand to-brand-accent bg-clip-text text-transparent">
                fake COD orders
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.18}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
              COD King helps Shopify merchants verify orders, collect advance
              payments, and turn Cash on Delivery into a profitable, low-risk
              growth channel.
            </p>
          </BlurFade>

          <BlurFade delay={0.24}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              {installAction ? (
                <ActionLink
                  action={{
                    ...installAction,
                    label: "Install free on Shopify",
                  }}
                  size="lg"
                  className="shadow-[0_10px_30px_-10px_var(--brand)]"
                />
              ) : null}

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-background/70 backdrop-blur-md"
              >
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <dl className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-baseline gap-1.5">
                <dt className="sr-only">Merchants</dt>
                <dd className="text-base font-semibold text-foreground">
                  {numberFormat.format(proof.merchantCount)}+
                </dd>
                <span>merchants</span>
              </div>
              <span aria-hidden className="h-4 w-px bg-border" />
              <div className="flex items-baseline gap-1.5">
                <dt className="sr-only">App Store rating</dt>
                <dd className="text-base font-semibold text-foreground">
                  {proof.rating}★
                </dd>
                <span>rating</span>
              </div>
              {proof.countriesServed ? (
                <>
                  <span aria-hidden className="h-4 w-px bg-border" />
                  <div className="flex items-baseline gap-1.5">
                    <dt className="sr-only">Countries</dt>
                    <dd className="text-base font-semibold text-foreground">
                      {proof.countriesServed}+
                    </dd>
                    <span>countries</span>
                  </div>
                </>
              ) : null}
            </dl>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="lg:pl-4">
          <HeroDevices />
        </BlurFade>
      </div>
    </SectionShell>
  );
}
