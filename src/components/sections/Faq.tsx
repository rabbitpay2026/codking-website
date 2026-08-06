import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

import { FinalCta } from "@/components/sections/FinalCta";
import { SectionShell } from "@/components/sections/SectionShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { routes } from "@/constants/routes";
import { getFaqsByTag } from "@/lib/content";

/**
 * The last objection and the close, on one band.
 *
 * The blueprint sets the questions beside the call to action rather than above
 * it, and that is the better arrangement: a merchant working through the FAQ
 * is resolving their final doubt, and the install should be in view the moment
 * it resolves rather than one scroll further on.
 *
 * Questions are drawn from the single tagged pool by tag, so an answer written
 * once appears on the homepage, the pricing page and the relevant control page
 * without being retyped (§11). Answers stay in the DOM when collapsed, which
 * is what makes them crawlable and findable with in-page search rather than
 * hidden behind a click.
 */
export function Faq() {
  const faqs = getFaqsByTag("home");

  return (
    <SectionShell
      tone="muted"
      seam="top"
      ariaLabel="Questions, and getting started"
    >
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            <span aria-hidden className="h-px w-6 bg-brand/40" />
            Before you install
          </p>
          <h2 className="mt-4 text-[1.9rem] leading-[1.08] font-semibold tracking-[-0.025em] text-balance lg:text-[2.4rem]">
            The questions merchants actually ask
          </h2>

          {faqs.length > 0 ? (
            <BlurFade inView className="mt-8">
              <Accordion type="single" collapsible defaultValue={faqs[0]?.id}>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="py-5 text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </BlurFade>
          ) : null}

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft">
              <MessageCircleQuestion
                aria-hidden
                className="size-4 text-brand"
              />
            </span>
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Still unsure about something?
              </p>
              <Link
                href={routes.help}
                className="group mt-1 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                Visit the Help Center
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/*
          The close sits in the second column and stays there while the
          questions scroll past it, so the action is in view at the moment a
          merchant runs out of objections rather than below the fold.
        */}
        <BlurFade delay={0.08} inView className="h-full">
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
            <FinalCta />
          </div>
        </BlurFade>
      </div>
    </SectionShell>
  );
}
