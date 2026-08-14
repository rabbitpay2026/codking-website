import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

import type { NavItem } from "@/types";

import type { ReactNode } from "react";

const COMPANY_TRAIL: readonly NavItem[] = [
  { label: "Home", href: routes.home },
];

interface CompanyHeroProps {
  /** The page's own name, for the breadcrumb's last item. */
  readonly current: string;
  readonly eyebrow: string;
  /** Passed as a node so a page can colour the statement it wants coloured. */
  readonly headline: ReactNode;
  readonly description: string;
  /** Actions, proof, anything the page wants under the description. */
  readonly children?: ReactNode;
  /**
   * The composition on the right, at `lg` and above.
   *
   * Optional, because a company page without one should not be given an empty
   * track to hold — the text column simply takes the measure back.
   */
  readonly visual?: ReactNode;
  /**
   * A full-width band closing the hero, under both tracks.
   *
   * The stat rail goes here rather than in `children`: four figures inside a
   * `max-w-xl` text column are four figures at 130px each, which is where the
   * labels start wrapping and the rail stops reading as one row.
   */
  readonly rail?: ReactNode;
}

/**
 * The top of a company page — About and Contact.
 *
 * The same opening as a feature page, minus the product scene: same backdrop,
 * same breadcrumb, same eyebrow pill, same headline scale and the same measure
 * on the line beneath it. A visitor arriving at About from a feature page
 * should not be able to tell that a different component drew the top of it.
 *
 * No entrance animation, for the reason the feature hero gives: the reveal
 * utilities start hidden and depend on the browser finishing its work to become
 * visible, and the first thing on the page is the last thing worth risking that
 * on.
 *
 * The text column is capped so the description stays readable — at `max-w-xl`
 * where a visual sits beside it, and at `max-w-2xl` where the column has the
 * page to itself and would otherwise run the full 72rem. Whatever a page passes
 * as children is rendered outside that cap; see below.
 *
 * With a visual the split is the feature hero's, `1.02fr / 0.98fr`, so a
 * visitor arriving here from a feature page meets the same frame. Without one
 * the grid collapses to a single track rather than leaving an empty one, which
 * is the state the About page used to open in: a headline, a paragraph and four
 * hundred pixels of nothing to the right of them.
 */
export function CompanyHero({
  current,
  eyebrow,
  headline,
  description,
  children,
  visual,
  rail,
}: CompanyHeroProps) {
  return (
    <SectionShell
      containerClassName="pt-5 pb-9 md:pt-6 md:pb-11"
      backdrop={<HeroEnvironment />}
    >
      <Breadcrumb trail={COMPANY_TRAIL} current={current} />

      <div
        className={cn(
          "mt-6",
          visual &&
            "grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10",
        )}
      >
        <div className={visual ? "min-w-0" : undefined}>
          <div className={visual ? "max-w-xl" : "max-w-2xl"}>
            <FeatureEyebrow>{eyebrow}</FeatureEyebrow>

            <h1 className="mt-4 text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[2.45rem] lg:text-[2.3rem] xl:text-[2.6rem]">
              {headline}
            </h1>

            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-ink/55">
              {description}
            </p>
          </div>

          {/*
            Outside the measure, not inside it. The copy above is capped so it
            stays readable; a stat rail or a row of channel cards capped at the
            same width would be a set of columns squeezed into two-thirds of the
            page for no reason other than sharing a parent.
          */}
          {children}
        </div>

        {visual}
      </div>

      {rail}
    </SectionShell>
  );
}
