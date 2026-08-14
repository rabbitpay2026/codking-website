"use client";

import { Lightbulb } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { FaqItem, WithClassName } from "@/types";

interface FeatureFaqProps extends WithClassName {
  readonly faqs: readonly FaqItem[];
  /** The line under the open answer. Omitted when a page has nothing to add. */
  readonly tip?: string;
  readonly title?: string;
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
        "relative grid size-5 shrink-0 place-items-center rounded-full border border-border text-ink/45",
        "transition-colors duration-200",
        "group-hover:border-ink/20 group-hover:text-ink/70",
        "group-data-[state=active]:border-brand/40 group-data-[state=active]:text-brand",
      )}
    >
      <span className="absolute h-px w-2.5 rounded-full bg-current" />
      <span className="absolute h-px w-2.5 rotate-90 rounded-full bg-current transition-transform duration-300 ease-emphasized group-data-[state=active]:rotate-0" />
    </span>
  );
}

/**
 * The questions, beside the answer.
 *
 * The blueprint sets a list of prompts on the left and one open answer on the
 * right rather than a column of disclosures, and that is the better shape for
 * this content: the questions are short and the answers are a paragraph each,
 * so a stack of accordions spends most of its height on rows nobody expanded
 * while the answer they did expand pushes everything below it down the page.
 * Here the panel is a fixed place, and choosing a question changes what is in
 * it rather than how tall the section is.
 *
 * Which makes this a tab set, and it is built as one — Radix Tabs, vertical —
 * rather than as buttons wired to a div. Roving focus, arrow-key traversal and
 * the `aria-controls` / `aria-selected` pairing are the part hand-rolled
 * versions always get wrong, and a section whose only route to four of its
 * five answers is a mouse is a section four in five keyboard users cannot
 * read.
 *
 * Every panel is `forceMount`ed and the inactive ones hidden with CSS, so all
 * of the answers are in the document rather than only the open one. That is
 * what keeps them findable by a crawler and by in-page search — the same
 * reason the homepage FAQ keeps its collapsed answers mounted.
 *
 * Below `lg` the panel drops under the list, so the reading order is still
 * question then answer. The rows keep one height whatever they contain, which
 * is what stops the left column reading as a ragged list of different-sized
 * things.
 *
 * Reusable by contract: it takes the questions and renders them, and knows
 * nothing about which control it is describing.
 */
export function FeatureFaq({
  faqs,
  tip,
  title = "Frequently asked questions",
  className,
}: FeatureFaqProps) {
  const first = faqs[0];
  if (!first) return null;

  return (
    <div className={className}>
      <h2 className="text-center text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[2.125rem]">
        {title}
      </h2>

      <Tabs
        defaultValue={first.id}
        orientation="vertical"
        className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-5"
      >
        {/*
          The list is restyled from the primitive's pill row into a column of
          rows. Everything the default carries — the fitted width, the rounded
          track, the muted fill — is wrong here, so it is all replaced rather
          than added to.
        */}
        <TabsList className="flex w-full flex-col items-stretch gap-2 rounded-none border-0 bg-transparent p-0">
          {faqs.map((faq) => (
            <TabsTrigger
              key={faq.id}
              value={faq.id}
              className={cn(
                "group w-full justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3",
                "min-h-[3rem] text-left text-[13.5px] leading-snug font-medium whitespace-normal text-ink",
                "transition-[background-color,border-color,box-shadow] duration-200 ease-emphasized",
                "hover:border-ink/15 hover:text-ink",
                "data-[state=active]:border-brand/35 data-[state=active]:bg-brand/[0.04] data-[state=active]:text-ink data-[state=active]:shadow-none",
              )}
            >
              <span className="min-w-0">{faq.question}</span>
              <PlusMinus />
            </TabsTrigger>
          ))}
        </TabsList>

        {/*
          One panel, in one place. `forceMount` keeps every answer in the
          document; `data-[state=inactive]:hidden` is what actually shows one
          at a time.
        */}
        <div className="rounded-xl border border-border bg-card p-5 lg:p-6">
          {faqs.map((faq) => (
            <TabsContent
              key={faq.id}
              value={faq.id}
              forceMount
              className="data-[state=inactive]:hidden"
            >
              <h3 className="text-[14.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                {faq.question}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-pretty text-ink/60">
                {faq.answer}
              </p>
            </TabsContent>
          ))}

          {tip ? (
            <p className="mt-5 flex items-start gap-2.5 rounded-lg bg-sky-100 px-3 py-2.5 text-[11.5px] leading-relaxed text-ink/60">
              <Lightbulb
                aria-hidden
                className="mt-px size-3.5 shrink-0 text-brand"
                strokeWidth={1.7}
              />
              {tip}
            </p>
          ) : null}
        </div>
      </Tabs>
    </div>
  );
}
