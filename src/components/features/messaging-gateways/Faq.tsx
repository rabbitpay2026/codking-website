import { FeatureFaq } from "@/components/features/FeatureFaq";
import { SectionShell } from "@/components/sections/SectionShell";
import {
  getFaqsByTag,
  getGatewayPageCopy,
  getRegionalSmsOperatorGroups,
  getWorldwideSmsOperators,
} from "@/lib/content";

/**
 * The last objection.
 *
 * Questions come from the single tagged pool by tag (§11), so an answer written
 * once appears here and anywhere else it is tagged for without being retyped —
 * and cannot drift between them. Not one word of them is authored in this file.
 *
 * The left column carries the shape of the operator list rather than the list
 * itself: three counts, all of them derived from the operator repository, so
 * they cannot fall out of step with the board further up the page. Half the
 * questions underneath are some form of "is my market covered", and three
 * numbers answer that faster than any of the answers do.
 *
 * An empty set is a valid state rather than an error: the section simply does
 * not render, and the page closes on its call to action instead.
 */
export function Faq() {
  const faqs = getFaqsByTag("control:messaging-gateways");
  const copy = getGatewayPageCopy();

  if (faqs.length === 0) return null;

  const worldwide = getWorldwideSmsOperators();
  const groups = getRegionalSmsOperatorGroups();
  const regional = groups.reduce(
    (total, group) => total + group.operators.length,
    0,
  );

  const counts: readonly { label: string; value: number }[] = [
    { label: "Operators", value: worldwide.length + regional },
    { label: "Worldwide", value: worldwide.length },
    { label: "Markets", value: groups.length },
  ];

  return (
    <SectionShell
      tone="muted"
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <FeatureFaq
        faqs={faqs}
        tip={copy.faqTip}
        description="What merchants ask before moving their messaging onto an operator of their own."
        aside={
          <dl className="grid grid-cols-3 overflow-hidden rounded-xl border border-ink/[0.08] bg-card">
            {counts.map((count, index) => (
              <div
                key={count.label}
                className={
                  index > 0
                    ? "border-l border-ink/[0.07] px-4 py-4"
                    : "px-4 py-4"
                }
              >
                <dt className="text-[10.5px] leading-none font-bold tracking-[0.08em] text-ink/35 uppercase">
                  {count.label}
                </dt>
                <dd className="mt-2.5 text-[1.5rem] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
                  {count.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />
    </SectionShell>
  );
}
