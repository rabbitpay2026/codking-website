import {
  ArrowRight,
  BadgeIndianRupee,
  BadgePercent,
  ChartNoAxesCombined,
  MessageSquareText,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { FlagshipVisual } from "@/components/sections/flagship/FlagshipVisual";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/ui/grid-pattern";
import { routeFor, routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { getFeaturedControls, getHomepageControls } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  "otp-verification": ShieldCheck,
  "partial-cod-payment": Wallet,
  "cod-fees": BadgeIndianRupee,
  "cod-rules": SlidersHorizontal,
  "prepaid-nudge": BadgePercent,
  "messaging-gateways": MessageSquareText,
  analytics: ChartNoAxesCombined,
  "abandoned-cart-recovery": ShoppingCart,
};

/**
 * The capability board.
 *
 * Eight controls, one card each, on a four-column grid. The grid is the right
 * shape here precisely because these are peers: a merchant arrives knowing
 * their symptom, not our feature names, and a board they can scan in one pass
 * lets them find themselves in it. Ranked rows would impose an order the
 * merchant does not share.
 *
 * Every card is a link to the control's own page, so the section is also the
 * page's main branch point into the product — the card is the whole target,
 * not a "learn more" at the bottom of it.
 *
 * The set is read from the content repository (§11), so this grid and the
 * hero's checklist are one list rendered twice and cannot disagree.
 */
export function FeatureShowcase() {
  const controls = getHomepageControls();
  const featured = getFeaturedControls();

  return (
    <SectionShell
      seam="top"
      backdrop={
        <GridPattern
          width={64}
          height={64}
          className={cn(
            "absolute inset-0 h-full stroke-brand/[0.06]",
            "[mask-image:radial-gradient(70%_60%_at_50%_35%,white,transparent)]",
          )}
        />
      }
    >
      <SectionHeading
        eyebrow="The system"
        title="Ten controls, four moments in an order"
        description="Each one acts at a specific point. Switch on what matches your problem and the rest stays out of the way."
      />

      <ul className="mt-lede grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {controls.map((control, index) => {
          const Icon = iconFor[control.slug] ?? ShieldCheck;

          return (
            <li key={control.slug} className="h-full">
              <BlurFade delay={0.04 * index} inView className="h-full">
                <Link
                  href={routeFor.control(control.slug)}
                  className="group flex h-full surface-card flex-col p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <span
                    aria-hidden
                    className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-sky-200 to-white text-brand ring-1 ring-brand/12 transition-colors duration-300 group-hover:from-brand group-hover:to-brand-deep group-hover:text-white group-hover:ring-brand/30"
                  >
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-5 text-[15px] leading-snug font-semibold tracking-tight">
                    {control.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                    {control.outcome}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                    Learn more
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </BlurFade>
            </li>
          );
        })}
      </ul>

      {/*
        The three that carry most of the loss, running.

        A card can assert a capability and a screenshot can illustrate one, but
        only something that runs can demonstrate one — and a merchant who
        watches a rule fire has understood the product in a way no paragraph
        achieves. So the three flagged `featured` in the repository get a live
        panel directly under the board that names them, in the section where
        the features are explained rather than as decoration elsewhere.

        Each demonstration parks on its resolved frame off-screen and under
        reduced motion, so the still is always the frame that makes the point.
      */}
      <div className="mt-14 border-t border-border pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-[1.6rem] leading-tight font-semibold tracking-[-0.025em] text-balance sm:text-[1.9rem]">
            Three of them, running
          </h3>
          <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">
            Who you take cash from, whether the order is real, and what choosing
            cash costs the buyer. Get these right and the rest is housekeeping.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featured.map((control, index) => (
            <BlurFade key={control.slug} delay={0.06 * index} inView>
              <div className="relative">
                {/* Lifts the panel off the page without a hard shadow. */}
                <div
                  aria-hidden
                  className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_oklab,var(--brand)_12%,transparent),transparent_70%)] blur-2xl"
                />

                <p className="mb-3.5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                  <span className="grid size-5 place-items-center rounded-full bg-brand text-[10px] text-white tabular-nums">
                    {index + 1}
                  </span>
                  {control.name}
                </p>

                <FlagshipVisual slug={control.slug} />
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="secondary" size="lg">
          <Link href={routes.features}>
            Explore all ten controls
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
