import { Star } from "lucide-react";

import { ShopifyLockup, ShopifyMark } from "@/components/brand/ShopifyMarks";
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
 * Nothing here fades in. Entrance animation on the first thing a visitor sees
 * buys nothing and risks everything: the reveal components start at
 * `opacity: 0` and depend on JavaScript to undo it, so a slow hydration, a
 * failed chunk or a blocked script leaves the most important screen on the
 * site blank. Below the fold that trade is fine, because the content has
 * scrolled into view by the time it matters. Here it is not.
 *
 * The argument is made by showing rather than describing: a checkout that
 * already has the controls running in it, annotated where it counts.
 *
 * Shopify is stated three times before a word of product copy — the rating
 * badge, the platform badge, and the lockup on the credentials rail under the
 * actions. That is not repetition for its own sake. This product only exists
 * inside Shopify, and a visitor who has to hunt for that has already spent the
 * two seconds in which they decide whether the page is about them.
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
      containerClassName="pt-8 pb-12 md:pt-10 md:pb-14 lg:pt-12 lg:pb-16"
      backdrop={<HeroEnvironment />}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 py-1 pr-3.5 pl-1 shadow-card backdrop-blur-md">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums">
                <Star aria-hidden className="size-3 fill-white" />
                {proof.rating}
              </span>
              <AnimatedShinyText className="text-xs font-medium">
                {numberFormat.format(proof.reviewCount)}+ reviews on the App
                Store
              </AnimatedShinyText>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/80 py-1 pr-3 pl-1.5 text-xs font-semibold text-ink/75 shadow-card backdrop-blur-md">
              <ShopifyMark className="size-[18px]" />
              Built for Shopify
            </span>
          </div>

          {/*
            The gradient half is forced onto its own line rather than left to
            wrap where it lands. Allowed to reflow, "delivery pay" ends up
            sharing a line and reads as a phrase the sentence never contained.
          */}
          <h1 className="mt-6 text-[2.7rem] leading-[1] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-[3.9rem]">
            Make cash on delivery{" "}
            <span className="block bg-gradient-to-br from-brand via-brand to-brand-accent bg-clip-text text-transparent">
              pay like prepaid
            </span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-pretty text-ink/65">
            Verify the buyer before you pack. Price cash at what it really costs
            you. Make paying upfront the better deal — all inside the Shopify
            checkout you already run.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

          {/*
            The credentials rail. One surface carrying the platform lockup and
            the three figures, rather than a badge row and a separate stat row:
            two quiet strips under a hero read as leftovers, one composed strip
            reads as a record.
          */}
          <div className="mt-8 rounded-2xl border border-white/70 bg-white/62 p-4 shadow-card backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <ShopifyLockup
                title="Shopify"
                className="h-7 text-ink sm:h-[30px]"
              />
              <span aria-hidden className="h-6 w-px bg-ink/12" />
              <p className="text-[13px] leading-snug font-medium text-ink/70">
                Runs inside Shopify checkout.
                <span className="text-ink/45">
                  {" "}
                  Plus-ready, no theme edits.
                </span>
              </p>
            </div>

            {/*
              A grid rather than a wrapping flex row. Dividers between flex
              items land in the wrong place the moment the row wraps — you get
              a rule dangling at the end of a line — and this row wraps on
              every narrow viewport.
            */}
            <dl className="mt-4 grid grid-cols-3 border-t border-ink/8 pt-4 text-[13px] text-ink/55">
              <div className="pr-3">
                <dt className="sr-only">Merchants</dt>
                <dd className="text-base leading-tight font-semibold text-ink tabular-nums">
                  {numberFormat.format(proof.merchantCount)}+
                </dd>
                <span className="mt-0.5 block">merchants</span>
              </div>

              <div className="border-l border-ink/10 px-3">
                <dt className="sr-only">
                  {proof.countriesServed ? "Countries" : "Setup"}
                </dt>
                <dd className="text-base leading-tight font-semibold text-ink tabular-nums">
                  {proof.countriesServed
                    ? `${proof.countriesServed}+`
                    : "10 min"}
                </dd>
                <span className="mt-0.5 block">
                  {proof.countriesServed ? "countries" : "setup"}
                </span>
              </div>

              <div className="border-l border-ink/10 pl-3">
                <dt className="sr-only">Setup</dt>
                <dd className="text-base leading-tight font-semibold text-ink">
                  {proof.countriesServed ? "10 min" : "No code"}
                </dd>
                <span className="mt-0.5 block">
                  {proof.countriesServed ? "setup, no code" : "to install"}
                </span>
              </div>
            </dl>
          </div>
        </div>

        <HeroDevices />
      </div>
    </SectionShell>
  );
}
