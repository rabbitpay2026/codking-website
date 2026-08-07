import { FinalCta } from "@/components/sections/FinalCta";
import { SectionShell } from "@/components/sections/SectionShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { getFaqsByTag } from "@/lib/content";

/**
 * A plus that unfolds into a minus.
 *
 * Two bars, one of them rotated. Closed, the upright bar crosses the flat one
 * and the pair reads as a plus; open, it rotates back onto its partner and
 * the same two elements read as a minus. Nothing is swapped, nothing fades —
 * which is why the transition is a single continuous movement rather than one
 * glyph blinking into another.
 *
 * Driven by the trigger's own `data-state`, so it needs no JavaScript of its
 * own and cannot fall out of step with the panel it belongs to.
 */
function PlusMinus() {
  return (
    <span
      aria-hidden
      className="relative grid size-6 shrink-0 place-items-center rounded-full border border-border text-ink/50 transition-colors duration-200 group-hover:border-ink/20 group-hover:text-ink/70"
    >
      <span className="absolute h-px w-2.5 rounded-full bg-current" />
      <span className="absolute h-px w-2.5 rotate-90 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-emphasized)] group-data-[state=open]:rotate-0" />
    </span>
  );
}

/**
 * The last objection and the close, on one band.
 *
 * The blueprint sets the questions beside the call to action rather than above
 * it, and that is the better arrangement: a merchant working through the FAQ
 * is resolving their final doubt, and the install should be in view the moment
 * it resolves rather than one scroll further on. The split is roughly a third
 * to two thirds, because the questions are a list of one-line prompts and the
 * close carries a video.
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

        Nothing is stretched and nothing is centred: both halves hang from the
        same top edge, so the FAQ heading, the CTA heading and the player all
        start on one line.
      */}
      <div className="grid gap-8 rounded-[20px] border border-border bg-card p-6 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-10 lg:p-8">
        <div>
          <h2 className="text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.5rem]">
            Frequently asked questions
          </h2>

          {faqs.length > 0 ? (
            <BlurFade inView className="mt-4">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    /* `last:border-b` restores the bottom edge the primitive
                       drops for a ruled list, which these are not. */
                    className="rounded-2xl border border-border bg-card px-4 transition-colors duration-200 last:border-b hover:border-ink/12"
                  >
                    <AccordionTrigger
                      indicator={<PlusMinus />}
                      className="group gap-3 py-2.5 text-[14px] leading-snug font-medium text-ink hover:text-ink"
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
          className="lg:border-l lg:border-border lg:pl-8"
        >
          <FinalCta />
        </BlurFade>
      </div>
    </SectionShell>
  );
}
