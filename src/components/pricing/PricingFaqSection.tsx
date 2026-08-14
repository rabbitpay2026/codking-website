import { PricingFaq } from "@/components/pricing/PricingFaq";
import { SectionShell } from "@/components/sections/SectionShell";
import {
  defaultPricingFaqId,
  pricingFaqIds,
  pricingFaqNote,
} from "@/data/pricing";
import { getFaqsByIds } from "@/lib/content";

/**
 * The last objections, before the close (§3.1).
 *
 * Reads the questions on the server from the single tagged pool (§11) and
 * hands them to the client component as plain data, so the answers ship in the
 * initial HTML and only the selection is hydrated. Not one word of them is
 * authored here.
 */
export function PricingFaqSection() {
  const items = getFaqsByIds(pricingFaqIds);

  if (items.length === 0) return null;

  return (
    <SectionShell
      size="compact"
      ariaLabel="Frequently asked questions"
      className="border-t border-ink/10"
    >
      <h2 className="text-center text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[1.6rem]">
        Frequently asked questions
      </h2>

      <div className="mt-8">
        <PricingFaq
          items={items}
          defaultItemId={defaultPricingFaqId}
          note={pricingFaqNote}
        />
      </div>
    </SectionShell>
  );
}
