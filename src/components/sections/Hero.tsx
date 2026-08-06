import { Star } from "lucide-react";

import { ShopifyMark } from "@/components/brand/BrandMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { HeroDevices } from "@/components/sections/hero/HeroDevices";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { getProofMetrics, getUtilityActions } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The homepage hero (§5.1 #2).
 *
 * Nothing here fades in. Entrance animation on the first thing a visitor
 * sees buys nothing and risks everything: the reveal components start at
 * `opacity: 0` and depend on JavaScript to undo it, so a slow hydration, a
 * failed chunk or a blocked script leaves the most important screen on the
 * site blank. Below the fold that trade is fine, because the content has
 * scrolled into view by the time it matters. Here it is not.
 *
 * The argument is made by showing rather than describing: a checkout that
 * already has the controls running in it, annotated where it counts.
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
      containerClassName="pt-10 pb-14 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20"
      backdrop={<HeroEnvironment />}
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 py-1 pr-3.5 pl-1 shadow-card backdrop-blur-md">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
                <Star aria-hidden className="size-3 fill-white" />
                {proof.rating}
              </span>
              <AnimatedShinyText className="text-xs font-medium">
                {numberFormat.format(proof.reviewCount)}+ merchant reviews
              </AnimatedShinyText>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-ink/70 shadow-card backdrop-blur-md">
              <ShopifyMark className="size-4" />
              Runs inside Shopify checkout
            </span>
          </div>

          <h1 className="mt-7 text-[2.7rem] leading-[0.98] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-[4.25rem]">
            Make COD as profitable as{" "}
            <span className="bg-gradient-to-br from-brand via-brand to-brand-accent bg-clip-text text-transparent">
              prepaid
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-pretty text-ink/65">
            Stop paying twice for orders that were never real. Verify the buyer,
            price cash honestly, and make paying upfront the obvious choice.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            {installAction ? (
              <ActionLink
                action={{ ...installAction, label: "Install free on Shopify" }}
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

          <dl className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink/55">
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
        </div>

        <HeroDevices />
      </div>
    </SectionShell>
  );
}
