import { ShieldCheck, Star } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { OtpScreen } from "@/components/sections/hero/OtpScreen";
import { Container } from "@/components/shared/Container";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Iphone } from "@/components/ui/iphone";
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
 * The trust figures come from the proof repository, never from copy (§11.1).
 */
export async function Hero() {
  const proof = await getProofMetrics();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <section className="relative overflow-hidden">
      <DotPattern
        width={28}
        height={28}
        cr={1}
        className={cn(
          "absolute inset-0 h-full fill-brand/25",
          "[mask-image:radial-gradient(560px_circle_at_35%_25%,white,transparent)]",
        )}
      />

      <Container className="relative py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <BlurFade delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 py-1 pr-3 pl-1 shadow-card backdrop-blur">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                  <Star aria-hidden className="size-3 fill-brand" />
                  {proof.rating}
                </span>
                <AnimatedShinyText className="text-xs font-medium">
                  {numberFormat.format(proof.reviewCount)}+ reviews on the
                  Shopify App Store
                </AnimatedShinyText>
              </span>
            </BlurFade>

            <BlurFade delay={0.12}>
              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
                Stop losing money on{" "}
                <span className="text-brand">fake COD orders</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.18}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
                COD King helps Shopify merchants verify orders, collect advance
                payments, and turn Cash on Delivery into a profitable, low-risk
                growth channel.
              </p>
            </BlurFade>

            <BlurFade delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {installAction ? (
                  <ActionLink
                    action={{
                      ...installAction,
                      label: "Install free on Shopify",
                    }}
                    size="lg"
                  />
                ) : null}

                <Button asChild variant="secondary" size="lg">
                  <a href="#how-it-works">See how it works</a>
                </Button>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <dl className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-baseline gap-1.5">
                  <dt className="sr-only">Merchants</dt>
                  <dd className="font-semibold text-foreground">
                    {numberFormat.format(proof.merchantCount)}+
                  </dd>
                  <span>merchants</span>
                </div>
                <span aria-hidden className="text-border">
                  ·
                </span>
                <div className="flex items-baseline gap-1.5">
                  <dt className="sr-only">App Store rating</dt>
                  <dd className="font-semibold text-foreground">
                    {proof.rating}★
                  </dd>
                  <span>rating</span>
                </div>
                {proof.countriesServed ? (
                  <>
                    <span aria-hidden className="text-border">
                      ·
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <dt className="sr-only">Countries</dt>
                      <dd className="font-semibold text-foreground">
                        {proof.countriesServed}+
                      </dd>
                      <span>countries</span>
                    </div>
                  </>
                ) : null}
              </dl>
            </BlurFade>
          </div>

          <BlurFade delay={0.2} className="justify-self-center">
            <div className="relative w-[clamp(15rem,70vw,20rem)]">
              {/* Soft brand light behind the device, so it reads as lit rather
                  than pasted onto the page. */}
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-full bg-brand/18 blur-3xl"
              />

              <Iphone className="drop-shadow-2xl">
                <OtpScreen />
              </Iphone>

              <div className="absolute -right-4 bottom-24 hidden items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-overlay backdrop-blur sm:flex">
                <span className="grid size-6 place-items-center rounded-full bg-brand-check/15">
                  <ShieldCheck aria-hidden className="size-3.5 text-ink" />
                </span>
                <span className="text-xs font-medium">Fake order blocked</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </Container>
    </section>
  );
}
