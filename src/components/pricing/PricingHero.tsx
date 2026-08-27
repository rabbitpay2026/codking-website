import { ActionLink } from "@/components/layout/ActionLink";
import { FeatureCheck } from "@/components/pricing/FeatureCheck";
import { SectionShell } from "@/components/sections/SectionShell";
import { getPricingAssurances, getUtilityActions } from "@/lib/content";

/**
 * The top of the pricing page (§3.1).
 *
 * Deliberately short. A merchant who has navigated to Pricing has already been
 * persuaded of the argument; what they want is the number, and every line
 * between the header and the first card is a line delaying it. So this is a
 * badge, a heading, one sentence, one action and the three facts that decide
 * whether the number is safe to trust — nothing else.
 *
 * The reassurances sit under the call to action rather than inside the cards
 * because they are true of all three plans. Repeated on every card they would
 * read as three separate promises; stated once here they read as the terms of
 * the page.
 */
export function PricingHero() {
  const assurances = getPricingAssurances();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <SectionShell
      size="compact"
      containerClassName="pt-10 pb-0 md:pt-14 md:pb-0"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
          Simple &amp; flexible pricing
        </p>

        <h1 className="mt-5 text-[2rem] leading-[1.06] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[2.5rem] lg:text-[2.75rem]">
          Choose the plan that fits your business
        </h1>

        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
          Flexible pricing designed for every stage of your COD journey.
        </p>

        {installAction ? (
          <ActionLink
            action={{ ...installAction, label: "Start for Free" }}
            size="md"
            location="pricing-hero"
            className="mt-6"
          />
        ) : null}

        {/*
          One row on desktop, one column on a phone. Wrapping rather than
          scrolling, because these are three independent facts and a merchant
          who only sees two of them has been told less, not shown a hint to
          swipe.
        */}
        <ul className="mt-6 flex w-fit flex-col items-start gap-3 text-left text-[13px] text-muted-foreground sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7 sm:gap-y-2.5 sm:text-center">
          {assurances.map((assurance) => (
            <li key={assurance} className="inline-flex items-center gap-2">
              <FeatureCheck />
              {assurance}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
