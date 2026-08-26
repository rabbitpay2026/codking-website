import { Check } from "lucide-react";

import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { FeatureBreadcrumb } from "@/components/features/FeatureBreadcrumb";
import { ActionLink } from "@/components/layout/ActionLink";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { Stars } from "@/components/sections/proof/Stars";
import { SectionShell } from "@/components/sections/SectionShell";
import { getProofMetrics, getUtilityActions } from "@/lib/content";
import { formatRating } from "@/utils/format";

import type { FeatureCheckpoint } from "@/types";

import type { ReactNode } from "react";

const numberFormat = new Intl.NumberFormat("en");

interface FeatureHeroProps {
  /** The control's own name, for the breadcrumb's last item. */
  readonly current: string;
  readonly eyebrow: string;
  /** The headline's three statements. The middle one carries the colour. */
  readonly headlineLead: string;
  readonly headlineAccent: string;
  readonly headlineTail: string;
  readonly description: string;
  readonly checkpoints: readonly FeatureCheckpoint[];
  /** The label on the install button. */
  readonly primaryLabel: string;
  /** The product working, on the right. */
  readonly visual: ReactNode;
}

/**
 * The top of a feature page (§6.3).
 *
 * Words on the left, the product working on the right, and nothing between
 * them fading in: entrance animation on the first thing a visitor sees buys
 * nothing and risks everything, since the reveal utilities start hidden and
 * depend on the browser finishing its work to become visible.
 *
 * The headline is the blueprint's three lines, and the middle one carries the
 * colour. It is the only saturated thing on this side of the frame; the rest
 * of the premium is achromatic, which is what lets the product panel beside it
 * be the thing the eye lands on.
 *
 * One component across every feature page, because two pages that open
 * differently read as two websites. The only thing a page brings is its words
 * and its scene — the composition, the type scale and the button treatment are
 * decided once here.
 *
 * Every figure in the trust line is the proof repository's (§11.1), so the
 * rating a merchant reads here is the same object the homepage read.
 */
export async function FeatureHero({
  current,
  eyebrow,
  headlineLead,
  headlineAccent,
  headlineTail,
  description,
  checkpoints,
  primaryLabel,
  visual,
}: FeatureHeroProps) {
  const proof = await getProofMetrics();
  const actions = getUtilityActions();

  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <SectionShell
      containerClassName="pt-5 pb-12 md:pt-6 md:pb-14 lg:pt-7 lg:pb-16"
      backdrop={<HeroEnvironment />}
    >
      <FeatureBreadcrumb current={current} />

      {/*
        The split is set by the headline. Its second statement has to hold one
        line — broken across two it stops being one — so the text column takes
        the width that line needs and the scene takes what is left.
      */}
      <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.06] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {eyebrow}
          </p>

          {/*
            Broken where the blueprint breaks it, and `text-balance` is
            deliberately not used: balancing would re-wrap the three lines
            wherever the measure happens to land and the headline would stop
            being the three statements it is written as.

            It steps down at `lg` and back up at `xl` because below `lg` the
            headline has the full page, and at `lg` it is suddenly sharing that
            width with the product scene.
          */}
          <h1 className="mt-5 text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[2.45rem] lg:text-[2.3rem] xl:text-[2.6rem]">
            {headlineLead}
            <span className="block text-brand">{headlineAccent}</span>
            <span className="block">{headlineTail}</span>
          </h1>

          <p className="mt-6 max-w-lg text-[1.125rem] leading-[1.65] text-pretty text-ink/55">
            {description}
          </p>

          {/*
            Two columns rather than a wrapping row. Six short items in a flex
            row break at a different point on every viewport and the list stops
            reading as a set; column flow keeps the pairs reading down each
            column at every width, which is what makes it scan as a
            specification rather than as a sentence someone chopped up.
          */}
          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
            {checkpoints.map((point) => (
              <li key={point.id} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid size-[18px] shrink-0 place-items-center rounded-full bg-brand-check/14 ring-1 ring-brand-check/25 ring-inset"
                >
                  <Check className="size-2.5 text-ink/60" strokeWidth={3} />
                </span>
                <span className="text-[14px] leading-snug font-medium text-ink/75">
                  {point.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            {installAction ? (
              /*
                Ink, not brand — the homepage's install button to the pixel. A
                filled blue button under a headline this size is the loudest
                thing in the frame, and the loudest thing in the frame should
                be the product. The only colour on it is Shopify's own mark.
              */
              <ActionLink
                action={{ ...installAction, label: primaryLabel }}
                size="lg"
                icon={<ShopifyMark className="size-[22px]" />}
                className="h-12 gap-2.5 bg-ink px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(11,27,54,0.24),0_10px_28px_-12px_rgba(11,27,54,0.7)] hover:bg-ink/90 hover:shadow-[0_2px_4px_rgba(11,27,54,0.24),0_14px_32px_-12px_rgba(11,27,54,0.75)]"
              />
            ) : null}

            {demoAction ? (
              <ActionLink
                action={demoAction}
                size="lg"
                className="h-12 border-ink/10 bg-white/80 px-6 text-[15px] font-semibold text-ink/80 shadow-[0_1px_2px_rgba(11,27,54,0.05)] backdrop-blur-md hover:border-ink/16 hover:bg-white hover:text-ink"
              />
            ) : null}
          </div>

          {/* The credentials rail — a record, not a dashboard. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[13px]">
            <span className="flex items-center gap-2 text-ink/55">
              Built for
              <ShopifyMark className="size-[18px]" />
              <span className="font-semibold text-ink">Shopify</span>
            </span>

            <span aria-hidden className="h-3.5 w-px bg-ink/12" />

            <span
              className="flex items-center gap-2"
              aria-label={`Rated ${formatRating(proof.rating)} out of 5`}
            >
              <Stars rating={proof.rating} className="size-[15px]" />
              <span className="font-semibold text-ink tabular-nums">
                {formatRating(proof.rating)}
              </span>
              <span className="text-ink/45">
                ({numberFormat.format(proof.reviewCount)}+ reviews)
              </span>
            </span>
          </div>
        </div>

        {visual}
      </div>
    </SectionShell>
  );
}
