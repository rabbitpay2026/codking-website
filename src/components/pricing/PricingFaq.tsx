"use client";

import { Lightbulb } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusMinus } from "@/components/ui/plus-minus";

import type { FaqItem } from "@/types";

interface PricingFaqProps {
  readonly items: readonly FaqItem[];
  /** The question the page opens with expanded. */
  readonly defaultItemId: string;
  /** True of every question in the list, so it is stated once beside them. */
  readonly note: string;
}

/**
 * Questions on the left, the answer on the right (§3.1).
 *
 * The blueprint's arrangement, and the right one for pricing: the answers here
 * are two or three sentences each, and an accordion that pushes the next
 * question a paragraph down the page every time one is opened makes comparing
 * two answers a scrolling exercise. A fixed panel means the list never moves.
 *
 * One question is always open — `collapsible` is off — because an empty panel
 * beside a list of questions is a layout that looks broken rather than one
 * that looks ready. The billing question is the default because it is the one
 * a merchant looking at a Shopify app's price page actually came to ask.
 *
 * Below `lg` the panel would sit under the list, a scroll away from whatever
 * was tapped, so the answer folds back into the list instead and the panel is
 * dropped. The two never show at once, so no answer is duplicated on screen.
 *
 * Client-side only for the selection: it is a single string of state, and
 * everything above it on this page stays a server component.
 */
export function PricingFaq({ items, defaultItemId, note }: PricingFaqProps) {
  const fallbackId = items[0]?.id ?? "";
  const initialId = items.some((item) => item.id === defaultItemId)
    ? defaultItemId
    : fallbackId;
  const [openId, setOpenId] = useState(initialId);

  const selected = items.find((item) => item.id === openId);

  return (
    /*
      Stretched, not top-aligned. The panel is one answer and the list is five
      questions, so left to themselves the two columns end at different heights
      and the band reads as a card that stopped early beside a list that did
      not. `items-stretch` hands the panel the row's full height and the two
      columns start and end on the same lines.
    */
    <div className="grid items-stretch gap-5 lg:grid-cols-2">
      <Accordion
        type="single"
        value={openId}
        onValueChange={(value) => setOpenId(value || openId)}
        className="space-y-2.5"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            /* `last:border-b` restores the bottom edge the primitive drops for
               a ruled list, which these are not. */
            className="rounded-xl border border-border bg-card px-4 transition-colors duration-200 last:border-b hover:border-ink/15 data-[state=open]:border-brand/35"
          >
            <AccordionTrigger
              indicator={<PlusMinus />}
              className="group gap-3 py-3 text-[13.5px] leading-snug font-medium text-ink hover:text-ink"
            >
              {item.question}
            </AccordionTrigger>
            {/* The panel on the right says this at `lg` and above. */}
            <AccordionContent className="pb-3.5 lg:hidden">
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {selected ? (
        <div className="hidden h-full rounded-2xl border border-border bg-card p-6 lg:block">
          <h3 className="text-[15px] font-semibold text-ink">
            {selected.question}
          </h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
            {selected.answer}
          </p>

          <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-sky-100 px-4 py-3 text-[12.5px] leading-relaxed text-ink/70">
            <Lightbulb
              aria-hidden
              className="mt-px size-4 shrink-0 text-brand"
              strokeWidth={1.75}
            />
            {note}
          </p>
        </div>
      ) : null}
    </div>
  );
}
