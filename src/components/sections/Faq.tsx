import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { routes } from "@/constants/routes";
import { getFaqsByTag } from "@/lib/content";

/**
 * Common questions (§5.1 #10).
 *
 * Drawn from the single tagged pool by tag, so an answer written once appears
 * on the homepage, the pricing page and the relevant control page without
 * being retyped (§11).
 *
 * The answers stay in the DOM when collapsed, which is what makes them
 * crawlable and searchable in-page rather than hidden behind a click.
 */
export function Faq() {
  const faqs = getFaqsByTag("home");

  if (faqs.length === 0) return null;

  return (
    <section className="border-t border-border bg-cloud py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Questions"
              title="The things merchants ask before installing"
            />

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Still unsure about something?
            </p>
            <Link
              href={routes.help}
              className="mt-1 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              Visit the Help Center
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>

          <Accordion type="single" collapsible defaultValue={faqs[0]?.id}>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
