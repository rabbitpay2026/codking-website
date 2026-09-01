import { PricingRegionSelect } from "@/components/pricing/PricingRegionSelect";
import { SectionShell } from "@/components/sections/SectionShell";
import { getPricingMarket } from "@/lib/content";

/**
 * Who the prices below are quoted for (§3.1).
 *
 * Between the hero and the cards, because every figure on this page is a
 * rupee figure against Indian messaging rates — and a merchant who reads four
 * cards before being told that has read four prices they cannot use. Stated
 * once here, the cards are free to be nothing but plans.
 *
 * The three badges are not features; they are the conditions an Indian store
 * needs met before a price is a price at all. A rupee number on a gateway that
 * cannot clear DLT is not something a merchant can act on, so they sit with
 * the market rather than in a card.
 *
 * Same band as the cards, no rule between them: the market and the plans it
 * prices are one statement, and a divider here would make them two.
 */
export function PricingMarket() {
  const market = getPricingMarket();

  return (
    <SectionShell
      size="compact"
      ariaLabel="Pricing market"
      containerClassName="pb-0"
    >
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-sky-50 px-6 py-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div>
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
            {market.title}
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-pretty text-muted-foreground">
            {market.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {market.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-border bg-background px-3 py-1 text-[11.5px] font-medium text-ink/70"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:shrink-0">
          <PricingRegionSelect
            label={market.selectorLabel}
            regions={market.regions}
            defaultRegion={market.defaultRegion}
          />
        </div>
      </div>
    </SectionShell>
  );
}
