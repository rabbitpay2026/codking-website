import { FeatureFaq } from "@/components/features/FeatureFaq";
import { SectionShell } from "@/components/sections/SectionShell";
import { getAnalyticsPageCopy, getFaqsByTag } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * What the report tracks, restated beside the questions.
 *
 * The FAQ's left column used to hold a heading and nothing else, which is what
 * made the band mostly empty page. On this control the answer to almost every
 * question underneath is a list of the four figures, so the list is drawn once
 * where it can do some work — as a legend rather than as four more cards.
 *
 * The same four headings the product scene shows and the pipeline attributes
 * to their controls, so a merchant meets one report on this page rather than
 * three drawings of one. No figure appears beside them, for the reason the
 * product scene gives at length: every number in this report belongs to the
 * merchant reading the page.
 */
const TRACKED: readonly string[] = [
  "Verified vs unverified orders",
  "Prepaid share",
  "Carts recovered",
  "RTO and fake-order trends",
];

/**
 * The last objection.
 *
 * Questions come from the single tagged pool by tag (§11), so an answer written
 * once appears here and anywhere else it is tagged for without being retyped —
 * and cannot drift between them. Not one word of them is authored in this file.
 *
 * An empty set is a valid state rather than an error: the section simply does
 * not render, and the page closes on its call to action instead.
 */
export function Faq() {
  const faqs = getFaqsByTag("control:analytics");
  const copy = getAnalyticsPageCopy();

  if (faqs.length === 0) return null;

  return (
    <SectionShell
      tone="muted"
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <FeatureFaq
        faqs={faqs}
        tip={copy.faqTip}
        description="What merchants ask before trusting a number about their own cash-on-delivery orders."
        aside={
          <div className="rounded-xl border border-ink/[0.08] bg-card p-4">
            <p className="text-[10.5px] leading-none font-bold tracking-[0.12em] text-ink/35 uppercase">
              Reported in one place
            </p>

            <ul className="mt-3.5 space-y-2.5">
              {TRACKED.map((figure, index) => (
                <li key={figure} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-1.5 w-10 shrink-0 overflow-hidden rounded-full bg-ink/[0.07]"
                  >
                    <span
                      className={cn(
                        "block h-full rounded-full",
                        index % 2 === 0 ? "bg-brand/70" : "bg-brand-violet/55",
                      )}
                      style={{ width: index % 2 === 0 ? "72%" : "54%" }}
                    />
                  </span>

                  <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-ink/65">
                    {figure}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 border-t border-ink/[0.07] pt-3 text-[11px] leading-none text-ink/40">
              Your figures, from your own orders.
            </p>
          </div>
        }
      />
    </SectionShell>
  );
}
