import { CtaVideo } from "@/components/sections/cta/CtaVideo";
import { SectionShell } from "@/components/sections/SectionShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { PlusMinus } from "@/components/ui/plus-minus";
import { panelHoverClass } from "@/constants/theme";
import { getFaqsByTag } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The recording shown beside the questions.
 *
 * Not drawn from `demoVideos` (`src/data/demoVideos.ts`): that registry names
 * per-control product demos and the homepage's own closing-band recording,
 * which a reviewer deliberately took off the page and which this is not — a
 * second, unrelated use of that `"home"` slot would make the registry lie
 * about which recording plays where. This video is the FAQ band's own and is
 * shown nowhere else, so it is named once, here.
 */
const FAQ_VIDEO_ID = "xbZqrTWnhz4";

/**
 * The questions, on their own band — now beside a recording rather than
 * alone.
 *
 * This used to be a two-column footer — six questions on the left, the page's
 * close on the right, and the demo storefront across the foot of both — and
 * everything but the questions had been taken out at an earlier reviewer's
 * instruction. The column freed up by that decision is what the video now
 * fills: the panel still holds one thing conceptually (the last objections,
 * answered) but reads across two columns again, because a recording is a
 * legitimate second thing to put beside them and a stretch of empty card was
 * not.
 *
 * The FAQ column dropped its own internal two-up grid for this reason: six
 * short answers used to need the full panel width to avoid a lopsided block,
 * and now they share it with the video, so a single vertical list is the one
 * that stays readable at the column's narrower measure.
 *
 * The split leans toward the video rather than sitting at an even half —
 * `0.85fr` beside `1.15fr` — because a 16:9 box only gets taller by getting
 * wider: at an even split the player read as a card floating in mostly empty
 * column, and the extra width is what closes most of that gap without
 * touching the aspect ratio. `items-center` on the outer grid then centres
 * whatever gap is left over the row's height instead of stacking all of it
 * under the player, which is what a merely wider box cannot fix on its own.
 * The FAQ column is unaffected either way — it is the taller of the two, so
 * centering it against its own height is a no-op.
 *
 * Questions are drawn from the single tagged pool by tag, so an answer written
 * once appears on the homepage, the pricing page and the relevant control page
 * without being retyped (§11). Not one word of them is authored here.
 *
 * Answers stay in the DOM when collapsed, which is what makes them crawlable
 * and findable with in-page search rather than hidden behind a click.
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
        hairline, same card fill. It holds two columns now instead of one, but
        neither draws a border of its own: a rule down the middle would tell
        the eye these are two sections rather than one band answered two ways.
      */}
      <div className="rounded-[20px] border border-border bg-card p-6 lg:p-8">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-6 lg:gap-10">
          {/* LEFT: the questions, first in the markup so a stacked layout
              reads them before the video underneath. */}
          <div className="min-w-0">
            <h2 className="text-[1.4rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink sm:text-[1.5rem]">
              Frequently asked questions
            </h2>

            {faqs.length > 0 ? (
              <BlurFade inView className="mt-5">
                <Accordion
                  type="single"
                  collapsible
                  className="flex flex-col gap-2.5"
                >
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      /* `last:border-b` restores the bottom edge the
                         primitive drops for a ruled list, which these are
                         not: each question is still its own bordered card. */
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

          {/*
            RIGHT: the video showcase.

            `CtaVideo` is the site's existing embed — YouTube's own player,
            lazily loaded, boxed to a 16:9 ratio before anything arrives so
            the row never jumps — reused untouched. The shadow and hover
            response are the same pairing `FeatureDemoSplit` already puts on
            a video someone is about to press play on: a resting lift plus a
            soft border-and-shadow reaction, nothing that scales or moves the
            frame's box.
          */}
          <BlurFade inView delay={0.06}>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-ink/40 uppercase">
              See COD King in action
            </p>
            <CtaVideo
              videoId={FAQ_VIDEO_ID}
              title="See COD King in action"
              className={cn(
                "mt-2 w-full shadow-[0_1px_2px_rgba(11,27,54,0.05),0_18px_44px_-24px_rgba(11,27,54,0.4)]",
                panelHoverClass,
              )}
            />
          </BlurFade>
        </div>
      </div>
    </SectionShell>
  );
}
