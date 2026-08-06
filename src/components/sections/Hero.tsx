import { Star } from "lucide-react";

import { ShopifyMark } from "@/components/brand/BrandMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { HeroDevices } from "@/components/sections/hero/HeroDevices";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { getProofMetrics, getUtilityActions } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The homepage hero (§5.1 #2).
 *
 * One promise, one sentence of substance, and two actions. Everything else
 * on this screen is the product itself — the argument is made by showing a
 * checkout that already has the controls working in it, not by describing
 * them.
 *
 * The environment is light on purpose. A dark hero makes a bright product
 * screen the only lit object in the frame, which flatters the effect and not
 * the product; a lavender room lets the devices read as physical objects
 * standing in it.
 *
 * Trust figures render from the proof repository, never from copy (§11.1).
 */
export async function Hero() {
  const proof = await getProofMetrics();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <SectionShell
      size="spacious"
      containerClassName="pt-12 md:pt-16 lg:pt-20"
      backdrop={<HeroEnvironment />}
    >
      <div className="grid items-center gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
        <div className="max-w-xl">
          <BlurFade delay={0.05}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 py-1 pr-3.5 pl-1 shadow-card backdrop-blur-md">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
                  <Star aria-hidden className="size-3 fill-white" />
                  {proof.rating}
                </span>
                <AnimatedShinyText className="text-xs font-medium">
                  {numberFormat.format(proof.reviewCount)}+ merchant reviews
                </AnimatedShinyText>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-ink/70 shadow-card backdrop-blur-md">
                <ShopifyMark className="size-4" />
                Works inside Shopify checkout
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.12}>
            <h1 className="mt-8 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.1rem]">
              Make COD as profitable as{" "}
              <span className="bg-gradient-to-br from-brand via-brand to-brand-accent bg-clip-text text-transparent">
                prepaid
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.18}>
            <p className="mt-7 text-lg leading-relaxed text-pretty text-ink/65">
              Verify every order before it ships, price cash properly, and give
              buyers a reason to pay upfront — without touching your theme.
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
                  className="shadow-[0_12px_32px_-10px_var(--brand)]"
                />
              ) : null}

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="border-white/70 bg-white/70 backdrop-blur-md"
              >
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <dl className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink/55">
              <div className="flex items-baseline gap-1.5">
                <dt className="sr-only">Merchants</dt>
                <dd className="text-base font-semibold text-ink">
                  {numberFormat.format(proof.merchantCount)}+
                </dd>
                <span>merchants</span>
              </div>
              {proof.countriesServed ? (
                <>
                  <span aria-hidden className="h-4 w-px bg-ink/15" />
                  <div className="flex items-baseline gap-1.5">
                    <dt className="sr-only">Countries</dt>
                    <dd className="text-base font-semibold text-ink">
                      {proof.countriesServed}+
                    </dd>
                    <span>countries</span>
                  </div>
                </>
              ) : null}
              <span aria-hidden className="h-4 w-px bg-ink/15" />
              <div className="flex items-baseline gap-1.5">
                <dt className="sr-only">Setup</dt>
                <dd className="text-base font-semibold text-ink">10 min</dd>
                <span>setup, no code</span>
              </div>
            </dl>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="lg:-mr-8 xl:-mr-16">
          <HeroDevices />
        </BlurFade>
      </div>
    </SectionShell>
  );
}
