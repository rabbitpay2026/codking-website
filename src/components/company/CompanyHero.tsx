import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { routes } from "@/constants/routes";

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
 * The text column is capped at `max-w-2xl` rather than the feature hero's
 * `max-w-xl`, because nothing sits beside it here. Left unbounded the
 * description would run the full 72rem and stop being readable. Whatever a page
 * passes as children is rendered outside that cap — see below.
 */
export function CompanyHero({
  current,
  eyebrow,
  headline,
  description,
  children,
}: CompanyHeroProps) {
  return (
    <SectionShell
      containerClassName="pt-5 pb-11 md:pt-6 md:pb-14"
      backdrop={<HeroEnvironment />}
    >
      <Breadcrumb trail={COMPANY_TRAIL} current={current} />

      <div className="mt-7 max-w-2xl">
        <FeatureEyebrow>{eyebrow}</FeatureEyebrow>

        <h1 className="mt-5 text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[2.45rem] lg:text-[2.6rem]">
          {headline}
        </h1>

        <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-ink/55">
          {description}
        </p>
      </div>

      {/*
        Outside the measure, not inside it. The copy above is capped so it stays
        readable; a stat rail or a row of channel cards capped at the same width
        would be a set of columns squeezed into two-thirds of the page for no
        reason other than sharing a parent.
      */}
      {children}
    </SectionShell>
  );
}
