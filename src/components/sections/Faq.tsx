import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
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
 * Common questions (§5.1 #10).
 *
 * Drawn from the single tagged pool by tag, so an answer written once appears
 * on the homepage, the pricing page and the relevant control page without
 * being retyped (§11).
 *
 * Answers stay in the DOM when collapsed, which is what makes them crawlable
 * and findable with in-page search rather than hidden behind a click.
 *
 * The two-column split puts the heading beside the list rather than above it:
 * this is the last thing before the close, and a merchant scanning for their
 * own objection should see the questions immediately, not after a title.
 */
export function Faq() {
  const faqs = getFaqsByTag("home");

  if (faqs.length === 0) return null;

  return (
    // The seam matters more here than anywhere else on the page. This is the
    // last light section before the brand band, and the band opens by fading
    // the page background in over itself — which only vanishes if the page
    // background is what is actually there. Left as a muted gradient, this
    // section ends a percent or two off white, and a one-percent step across
    // two thousand flat pixels reads as a drawn line.
    <SectionShell tone="muted" seam="bottom">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+3rem)] lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Before you install"
            title="The questions merchants actually ask"
          />

          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border bg-cloud p-5">
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

        <BlurFade inView>
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
      </div>
    </SectionShell>
  );
}
