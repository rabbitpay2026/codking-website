import { Check, Pencil } from "lucide-react";

import { FeatureFaq } from "@/components/features/FeatureFaq";
import { SectionShell } from "@/components/sections/SectionShell";
import { getAddressPageCopy, getFaqsByTag } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The five delivery fields, and who fills each one.
 *
 * The FAQ's left column used to hold a heading and nothing else, which is what
 * made the band mostly empty page. What belongs there on this control is the
 * count — one typed, four fetched — because every question underneath is some
 * version of "which of these does the customer still have to do".
 *
 * The same five fields the product scene fills and the process band counts, so
 * a merchant meets one form on this page rather than three drawings of one.
 */
const FIELDS: readonly { label: string; typed: boolean }[] = [
  { label: "Mobile number", typed: true },
  { label: "Full name", typed: false },
  { label: "Address", typed: false },
  { label: "Area", typed: false },
  { label: "PIN code", typed: false },
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
  const faqs = getFaqsByTag("control:address-validation");
  const copy = getAddressPageCopy();

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
        description="What merchants ask before letting a checkout fill itself in."
        aside={
          <div className="rounded-xl border border-ink/[0.08] bg-card p-4">
            <p className="text-[10.5px] leading-none font-bold tracking-[0.12em] text-ink/35 uppercase">
              The delivery step
            </p>

            <ul className="mt-3.5 space-y-1.5">
              {FIELDS.map((field) => (
                <li
                  key={field.label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2",
                    field.typed ? "bg-brand/[0.05]" : "bg-ink/[0.025]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full",
                      field.typed
                        ? "bg-brand/12 text-brand"
                        : "bg-brand-check/15 text-ink/50",
                    )}
                  >
                    {field.typed ? (
                      <Pencil className="size-2.5" strokeWidth={2.2} />
                    ) : (
                      <Check className="size-2.5" strokeWidth={3.5} />
                    )}
                  </span>

                  <span className="min-w-0 flex-1 truncate text-[12px] leading-none font-medium text-ink/70">
                    {field.label}
                  </span>

                  <span className="shrink-0 text-[10px] leading-none font-semibold tracking-[0.04em] text-ink/35 uppercase">
                    {field.typed ? "Typed" : "Fetched"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        }
      />
    </SectionShell>
  );
}
