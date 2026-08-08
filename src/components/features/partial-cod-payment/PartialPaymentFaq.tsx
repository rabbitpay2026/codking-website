import { FeatureFaq } from "@/components/features/FeatureFaq";
import { SectionShell } from "@/components/sections/SectionShell";
import { getFaqsByTag } from "@/lib/content";

/**
 * The last objection.
 *
 * Questions come from the single tagged pool by tag (§11), so an answer
 * written once appears here, on the homepage and on the calculator without
 * being retyped — and cannot drift between them. Not one word of them is
 * authored in this file.
 *
 * An empty set is a valid state rather than an error: the section simply does
 * not render, and the page closes on its call to action instead.
 */
export function PartialPaymentFaq() {
  const faqs = getFaqsByTag("control:partial-cod-payment");

  if (faqs.length === 0) return null;

  return (
    <SectionShell
      tone="muted"
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <FeatureFaq
        faqs={faqs}
        tip="Every rule and message here is set from the COD King dashboard — no theme edits, no code."
      />
    </SectionShell>
  );
}
