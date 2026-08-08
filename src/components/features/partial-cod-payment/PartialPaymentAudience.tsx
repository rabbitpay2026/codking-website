import { PencilRuler, RefreshCcw, Shirt, Sofa, Store } from "lucide-react";

import { SectionShell } from "@/components/sections/SectionShell";
import { cardHoverClass } from "@/constants/theme";
import { getPartialAudience, getPartialPageCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

const iconFor: Record<string, LucideIcon> = {
  custom: Shirt,
  shipping: Sofa,
  refurbished: RefreshCcw,
  "made-to-order": PencilRuler,
  "cod-heavy": Store,
};

/**
 * Who this is for.
 *
 * Five categories on one line, deliberately the smallest objects on the page.
 * This section answers one question — *is my kind of store on the list* — and
 * that is a question answered by scanning, not by reading. Five cards at the
 * size of the key features above would give a list of nouns the same weight as
 * the capabilities they qualify.
 *
 * So: a pill each, a small mark, the category, and the examples underneath
 * where an abstract name needs them. Two of the five carry no examples and
 * that is on purpose — "refurbished products" and "made-to-order items" are
 * already concrete, and inventing a parenthetical for them would be padding
 * the row to look symmetrical.
 *
 * A short heading and nothing else. Any supporting line here would be
 * explaining a list that explains itself.
 */
export function PartialPaymentAudience() {
  const audience = getPartialAudience();
  const copy = getPartialPageCopy();

  return (
    <SectionShell
      size="compact"
      className="border-t border-ink/[0.07]"
      containerClassName="py-7 md:py-9"
    >
      <h2 className="text-center text-[1.5rem] leading-[1.12] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.75rem]">
        {copy.audienceTitle}
      </h2>

      {/*
        Two shared tracks — the category, and the examples under it — adopted
        by every pill with `subgrid`. Three of the five names take two lines at
        this width and two of the five carry no examples at all, so five
        independently sized pills would put the notes at three different
        heights and leave the two without one looking short. Sharing the tracks
        makes the row one object. A browser without subgrid falls back to each
        pill sizing itself, held level by `items-stretch`.
      */}
      <ul className="mt-7 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-[auto_auto]">
        {audience.map((segment) => {
          const Icon = iconFor[segment.id] ?? Store;

          return (
            <li
              key={segment.id}
              className={cn(
                "grid h-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2.5 rounded-xl border border-ink/[0.08] bg-card px-3.5 py-3",
                "lg:row-span-2 lg:grid-rows-subgrid lg:gap-y-0",
                cardHoverClass,
              )}
            >
              <span
                aria-hidden
                className="col-start-1 row-start-1 grid size-7 shrink-0 place-items-center self-center rounded-lg border border-border bg-sky-50 text-ink/45 lg:row-span-2"
              >
                <Icon className="size-[15px]" strokeWidth={1.7} />
              </span>

              <span className="col-start-2 row-start-1 self-center text-[12.5px] leading-tight font-semibold text-balance text-ink">
                {segment.title}
              </span>

              <span className="col-start-2 row-start-2 self-start text-[10.5px] leading-tight text-pretty text-ink/45">
                {segment.note ? (
                  <span className="mt-1 block">{segment.note}</span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
