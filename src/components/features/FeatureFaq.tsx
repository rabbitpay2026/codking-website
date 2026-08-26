"use client";

import { Lightbulb } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import type { FaqItem, WithClassName } from "@/types";

import type { ReactNode } from "react";

interface FeatureFaqProps extends WithClassName {
  readonly faqs: readonly FaqItem[];
  /** The line under the questions. Omitted when a page has nothing to add. */
  readonly tip?: string;
  readonly title?: string;
  /** The lede beside the questions. Falls back to nothing rather than filler. */
  readonly description?: string;
  /**
   * The page's own object for the left column — a short list, a stat, a strip
   * of the product. Optional, and the column composes without it.
   *
   * This is the whole reason the section was rebuilt. It used to be a list of
   * questions beside a single open answer, which is a fine shape when there
   * are six questions and a poor one when there are two: the panel was sized
   * by its longest answer, the list was two rows tall, and the difference was
   * a rectangle of empty page. A column that carries the heading, the lede and
   * something of the feature has content of its own to be tall with.
   */
  readonly aside?: ReactNode;
}

/**
 * A plus that unfolds into a minus.
 *
 * Two bars, one of them rotated. Closed, the upright bar crosses the flat one
 * and the pair reads as a plus; open, it rotates back onto its partner and the
 * same two elements read as a minus. Nothing is swapped and nothing fades,
 * which is why the change is one continuous movement rather than one glyph
 * blinking into another.
 *
 * Driven by the trigger's own `data-state`, so it needs no JavaScript of its
 * own and cannot fall out of step with the panel it belongs to. The same
 * device the homepage FAQ uses, so a merchant meets one affordance on both.
 */
function PlusMinus() {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-6 shrink-0 place-items-center rounded-full border border-border text-ink/45",
        "transition-colors duration-200",
        "group-hover:border-ink/20 group-hover:text-ink/70",
        "group-data-[state=open]:border-brand/40 group-data-[state=open]:text-brand",
      )}
    >
      <span className="absolute h-px w-2.5 rounded-full bg-current" />
      <span className="absolute h-px w-2.5 rotate-90 rounded-full bg-current transition-transform duration-300 ease-emphasized group-data-[state=open]:rotate-0" />
    </span>
  );
}

/**
 * The last objection, answered.
 *
 * Two columns that both carry content: the heading, the lede and the page's
 * own object on the left; the questions themselves on the right. The previous
 * arrangement — a list of prompts beside one open answer — sized its own
 * height from whichever answer happened to be longest, which on a control with
 * two questions left most of the band empty. A disclosure list grows with what
 * it holds, so the section is exactly as tall as its content and no taller.
 *
 * The first question is open on arrival. A column of closed rows is a section
 * that looks like it is still loading, and the first answer is the one most
 * visitors came for.
 *
 * `type="single"` with `collapsible`: one answer at a time, because the
 * questions are alternatives rather than steps, and closing the last open one
 * is allowed because a merchant who has finished reading should be able to see
 * the whole list again.
 *
 * Reusable by contract: it takes the questions and renders them, and knows
 * nothing about which control it is describing.
 */
export function FeatureFaq({
  faqs,
  tip,
  title = "Frequently asked questions",
  description,
  aside,
  className,
}: FeatureFaqProps) {
  const first = faqs[0];
  if (!first) return null;

  return (
    <div
      className={cn(
        "grid gap-9 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-start lg:gap-14",
        className,
      )}
    >
      {/*
        `lg:sticky` so the heading stays with the questions on a long list
        rather than scrolling away from them. `top-header` is the sticky site
        header's own height token, so the column never parks underneath it.
      */}
      <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
        <h2 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[2.125rem]">
          {title}
        </h2>

        {description ? (
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-pretty text-ink/55">
            {description}
          </p>
        ) : null}

        {aside ? <div className="mt-7">{aside}</div> : null}

        {tip ? (
          <p className="mt-7 flex items-start gap-2.5 rounded-xl border border-brand/15 bg-brand/[0.04] px-4 py-3.5 text-[12.5px] leading-relaxed text-pretty text-ink/60">
            <Lightbulb
              aria-hidden
              className="mt-px size-4 shrink-0 text-brand"
              strokeWidth={1.7}
            />
            {tip}
          </p>
        ) : null}
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue={first.id}
        className="rounded-2xl border border-ink/[0.08] bg-card px-5 shadow-card sm:px-6"
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border-ink/[0.07]"
          >
            <AccordionTrigger
              indicator={<PlusMinus />}
              className={cn(
                "group gap-4 py-5 text-left",
                "text-[15px] leading-snug font-semibold tracking-[-0.012em] text-ink hover:no-underline",
                "data-[state=open]:text-ink",
              )}
            >
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="pb-5">
              <p className="max-w-prose text-[14px] leading-relaxed text-pretty text-ink/60">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
