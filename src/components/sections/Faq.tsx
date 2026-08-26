import { CtaLiveDemoStore } from "@/components/sections/cta/CtaLiveDemoStore";
import { FinalCta } from "@/components/sections/FinalCta";
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
 * The last objection and the close, on one band.
 *
 * The blueprint sets the questions beside the call to action rather than above
 * it, and that is the better arrangement: a merchant working through the FAQ
 * is resolving their final doubt, and the install should be in view the moment
 * it resolves rather than one scroll further on.
 *
 * The two halves are near enough to equal — 42/58 — because they now carry
 * comparable weight: six questions on one side, and on the other a headline,
 * two buttons and a working demonstration of the product's WhatsApp
 * automation. The close keeps the wider share only because a message thread
 * has a legible minimum width and a one-line question does not.
 *
 * Both halves are `items-stretch` grid cells and everything inside them is
 * elastic, so the taller half sets the row and the shorter one grows into it.
 * That is the entire alignment mechanism: the questions and the close start on
 * the same line and end on the same line, at every width, with no fixed height
 * anywhere in the band.
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
 * thing to get through; separate cards say they are five independent questions
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
        One panel, one rule down the middle.

        The blueprint draws a single bordered surface across the whole band
        rather than two cards side by side, and that is what makes the
        questions and the close read as one footer instead of two things that
        happen to be adjacent. So the border lives here and nothing inside
        draws another.

        Nothing is centred: both halves hang from the same top edge, so the FAQ
        heading and the CTA heading start on one line, and both stretch to the
        same bottom edge, so the rule between them runs the full height of what
        it divides.
      */}
      <div className="grid items-stretch gap-8 rounded-[20px] border border-border bg-card p-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-10 lg:p-8">
        {/*
          The questions, filling their half of the row.

          Every box down this column is a flex parent and the list inside it is
          `flex-1`, which is what makes the two halves of the band end on the
          same line without a fixed height anywhere. Six one-line questions are
          naturally shorter than a headline, two buttons and a message thread,
          so the list is given the leftover space to absorb.

          The cards absorb it, not the gaps. Spare height poured into `gap`
          pushes six small cards apart until they read as six unrelated
          objects drifting down a column; poured into the cards themselves it
          reads as a roomy list, which is what it is. `flex-1` on the items
          therefore splits the leftover evenly between them and the question
          centres in whatever height its card ends up with, so every card is
          the same size whether its question runs to one line or two.
        */}
        <div className="flex min-w-0 flex-col">
          <h2 className="text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.5rem]">
            Frequently asked questions
          </h2>

          {faqs.length > 0 ? (
            <BlurFade inView className="mt-4 flex flex-1 flex-col">
              <Accordion
                type="single"
                collapsible
                className="flex flex-1 flex-col gap-2.5"
              >
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    /* `last:border-b` restores the bottom edge the primitive
                       drops for a ruled list, which these are not.

                       `[&>h3]:flex-1` grows Radix's header rather than the
                       item, which is what centres the question inside a card
                       that is taller than its text. Targeting the header by
                       element keeps the primitive unchanged — no other
                       accordion on the site stretches, and none of them
                       should. */
                    className="flex flex-1 flex-col rounded-2xl border border-border bg-card px-4 transition-colors duration-200 last:border-b hover:border-ink/12 [&>h3]:flex-1"
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

        <BlurFade
          delay={0.08}
          inView
          className="flex min-w-0 flex-col lg:border-l lg:border-border lg:pl-8"
        >
          <FinalCta />
        </BlurFade>

        {/*
          The demo store, across the foot of the same panel.

          A third row rather than a fourth thing in either column, and the
          width is the argument. Under the questions it would read as a sixth
          question; under the close it would be a second ask stacked on the
          first, in the column that is already the longer of the two. Spanning
          both, it is the panel's own footer — the last offer the page makes,
          and the only one that costs the merchant nothing to accept.

          It draws its own top rule and no border, so the panel still has
          exactly one edge. Nothing above it moves: both columns hang from the
          same top line they did before.
        */}
        <BlurFade delay={0.16} inView className="lg:col-span-2">
          <CtaLiveDemoStore />
        </BlurFade>
      </div>
    </SectionShell>
  );
}
