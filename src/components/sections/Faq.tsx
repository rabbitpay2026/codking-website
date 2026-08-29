import { SectionShell } from "@/components/sections/SectionShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { PlusMinus } from "@/components/ui/plus-minus";
import { getFaqsByTag } from "@/lib/content";

/**
 * The questions, on their own band.
 *
 * This used to be a two-column footer — six questions on the left, the page's
 * close on the right, and the demo storefront across the foot of both — and
 * everything but the questions has been taken out at the reviewer's
 * instruction. What is left has the whole panel.
 *
 * Two columns of three rather than one column of six, which is the whole of
 * the layout decision. A one-line question set across the full measure of this
 * page leaves most of an 1100-pixel row empty with a plus sign marooned at the
 * far end of it, and six of those read as a table with a missing column. Split
 * in two, each card is about the width its content wants, the block is half as
 * tall, and the panel is filled rather than stretched.
 *
 * `items-start`, so an opened answer grows its own card and leaves the one
 * beside it alone. The accordion is still `type="single"`, so at most one is
 * ever open and at most one row is ever taller than the rest.
 *
 * Questions are drawn from the single tagged pool by tag, so an answer written
 * once appears on the homepage, the pricing page and the relevant control page
 * without being retyped (§11). Not one word of them is authored here.
 *
 * Answers stay in the DOM when collapsed, which is what makes them crawlable
 * and findable with in-page search rather than hidden behind a click.
 *
 * Each question is its own bordered card rather than a row in a ruled list.
 * A hairline drawn across a column tells the eye these are one continuous
 * thing to get through; separate cards say they are six independent questions
 * of which you probably only care about one — which is true, and is the
 * difference between a section that gets read and one that gets scrolled.
 */
export function Faq() {
  const faqs = getFaqsByTag("home");

  return (
    <SectionShell
      tone="muted"
      size="compact"
      seam="top"
      ariaLabel="Questions, and getting started"
    >
      {/*
        One panel, one border.

        The surface is the one the band always drew — same radius, same
        hairline, same card fill — it simply holds one thing now instead of
        three. The rule that used to run down the middle went with the column
        it divided: a panel with nothing to separate should not draw a
        separator.
      */}
      <div className="rounded-[20px] border border-border bg-card p-6 lg:p-8">
        <div className="min-w-0">
          <h2 className="text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.5rem]">
            Frequently asked questions
          </h2>

          {faqs.length > 0 ? (
            <BlurFade inView className="mt-5">
              <Accordion
                type="single"
                collapsible
                className="grid items-start gap-2.5 md:grid-cols-2 md:gap-3"
              >
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    /* `last:border-b` restores the bottom edge the primitive
                       drops for a ruled list, which these are not.

                       The stretch this card used to carry has gone with the
                       column that made it necessary: there is no taller
                       neighbour to match now, so a card is the height of its
                       own question and a grid row is the height of the tallest
                       card in it. */
                    className="rounded-2xl border border-border bg-card px-4 transition-colors duration-200 last:border-b hover:border-ink/12"
                  >
                    <AccordionTrigger
                      indicator={<PlusMinus />}
                      className="group gap-3 py-3 text-[14px] leading-snug font-medium text-ink hover:text-ink"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3.5">
                      <p className="text-[13px] leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </BlurFade>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
