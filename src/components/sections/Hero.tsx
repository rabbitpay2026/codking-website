import { Check, Star } from "lucide-react";

import { ShopifyLockup, ShopifyMark } from "@/components/brand/ShopifyMarks";
import { ActionLink } from "@/components/layout/ActionLink";
import { HeroDevices } from "@/components/sections/hero/HeroDevices";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import {
  getHomepageControls,
  getProofMetrics,
  getUtilityActions,
} from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en");

/**
 * The homepage hero.
 *
 * Nothing here fades in. Entrance animation on the first thing a visitor sees
 * buys nothing and risks everything: the reveal components start at
 * `opacity: 0` and depend on JavaScript to undo it, so a slow hydration, a
 * failed chunk or a blocked script leaves the most important screen on the
 * site blank. Below the fold that trade is fine, because the content has
 * scrolled into view by the time it matters. Here it is not.
 *
 * The argument is made by showing rather than describing: a checkout with the
 * controls already applied, the verification card attached to it, and the
 * capability list beside them so the three things the product is — verify,
 * price, convert — are legible before a single scroll.
 *
 * The checklist is the control repository read directly, so it is the same
 * eight capabilities the feature grid renders further down and cannot drift
 * from them (§11).
 *
 * Shopify is stated three times before a word of product copy — the rating
 * badge, the platform badge, and the lockup on the credentials rail. This
 * product only exists inside Shopify, and a visitor who has to hunt for that
 * has already spent the two seconds in which they decide whether the page is
 * about them.
 */
export async function Hero() {
  const proof = await getProofMetrics();
  const controls = getHomepageControls();
  const actions = getUtilityActions();
  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <SectionShell
      containerClassName="pt-8 pb-12 md:pt-10 md:pb-14 lg:pt-12 lg:pb-16"
      backdrop={<HeroEnvironment />}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-6">
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
          <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-[3.2rem] lg:text-[3.6rem]">
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

          {/*
            Two columns rather than a wrapping row: eight short items in a flex
            row break at a different point on every viewport and the list stops
            reading as a set. A grid keeps the second column aligned at all
            widths, which is what makes it scan as a specification.
          */}
          <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {controls.map((control) => (
              <li key={control.slug} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid size-[18px] shrink-0 place-items-center rounded-full bg-brand-check/20"
                >
                  <Check className="size-2.5 text-ink/70" />
                </span>
                <span className="text-[13.5px] font-medium text-ink/80">
                  {control.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {installAction ? (
              <ActionLink
                action={{ ...installAction, label: "Install free on Shopify" }}
                size="lg"
                className="shadow-[0_12px_32px_-10px_var(--brand)]"
              />
            ) : null}

            {demoAction ? (
              <ActionLink
                action={demoAction}
                size="lg"
                className="border-white/70 bg-white/70 backdrop-blur-md"
              />
            ) : null}
          </div>

          {/*
            The credentials rail. One surface carrying the platform lockup and
            the marketplace verdict, rather than a badge row and a separate
            stat row: two quiet strips under a hero read as leftovers, one
            composed strip reads as a record. The countable figures now have
            their own band directly below, so nothing here is said twice.
          */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-white/70 bg-white/62 px-4 py-3.5 shadow-card backdrop-blur-xl">
            <ShopifyLockup title="Shopify" className="h-7 text-ink" />
            <span aria-hidden className="h-6 w-px bg-ink/12" />
            <span
              className="flex items-center gap-1"
              aria-label={`Rated ${proof.rating} out of 5`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  aria-hidden
                  className="size-[15px] fill-brand text-brand"
                />
              ))}
            </span>
            {/*
              The merchant and country figures are not restated here. They have
              their own band two sections down, and the rail's job is the
              platform relationship rather than a second copy of the numbers.
            */}
            <p className="text-[13px] leading-snug font-medium text-ink/70">
              <span className="tabular-nums">{proof.rating}</span> on the App
              Store
              <span className="text-ink/45"> · Runs inside your checkout</span>
            </p>
          </div>
        </div>

        <HeroDevices />
      </div>
    </SectionShell>
  );
}
