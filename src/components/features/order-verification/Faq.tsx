import { PackageCheck, PauseCircle, XCircle } from "lucide-react";

import { FeatureFaq } from "@/components/features/FeatureFaq";
import { SectionShell } from "@/components/sections/SectionShell";
import { getFaqsByTag, getOrderVerificationPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * The three answers, restated beside the questions.
 *
 * The FAQ's left column used to hold a heading and nothing else, which is what
 * made the band mostly empty page. What belongs there is the one thing a
 * merchant is still holding in their head at the bottom of this page — that
 * the control is three answers — so it is drawn once more, compactly, where it
 * can do some work.
 *
 * Not a card each: a ruled list, because these are three values of one setting
 * rather than three objects.
 */
const ANSWERS: readonly {
  id: string;
  icon: LucideIcon;
  label: string;
  note: string;
}[] = [
  {
    id: "confirm",
    icon: PackageCheck,
    label: "Confirm",
    note: "Carries on to fulfilment",
  },
  {
    id: "hold",
    icon: PauseCircle,
    label: "Hold",
    note: "Waits for a second look",
  },
  {
    id: "cancel",
    icon: XCircle,
    label: "Cancel",
    note: "Stops before it is picked",
  },
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
  const faqs = getFaqsByTag("control:order-verification");
  const copy = getOrderVerificationPageCopy();

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
        description="Everything a merchant asks before putting a gate in front of their own fulfilment."
        aside={
          <ul className="overflow-hidden rounded-xl border border-ink/[0.08] bg-card">
            {ANSWERS.map((answer, index) => (
              <li key={answer.id} className={cnRow(index)}>
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-lg bg-sky-50 text-ink/45"
                >
                  <answer.icon className="size-4" strokeWidth={1.7} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] leading-none font-semibold text-ink">
                    {answer.label}
                  </span>
                  <span className="mt-1.5 block text-[11.5px] leading-none text-ink/45">
                    {answer.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        }
      />
    </SectionShell>
  );
}

/** A rule above every row but the first. */
function cnRow(index: number): string {
  return index === 0
    ? "flex items-center gap-3 px-4 py-3.5"
    : "flex items-center gap-3 border-t border-ink/[0.07] px-4 py-3.5";
}
