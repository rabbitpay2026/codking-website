import { Banknote, PackageX, TriangleAlert, Undo2 } from "lucide-react";

import { PageEnvironment } from "@/components/sections/PageEnvironment";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { getPainPoints, getPainPointsCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  "fake-orders": PackageX,
  rto: Undo2,
  prepaid: Banknote,
};

/**
 * The COD loss, made visible (§5.1 #4).
 *
 * This is the section the rest of the page depends on. It answers one question
 * — why am I losing money on cash on delivery — in the merchant's own words,
 * and it names no cure of its own. The controls that fix each of these are the
 * board immediately above it, and each card here already carries the slug of
 * the one that removes it, so the answer is one scroll away rather than
 * restated here.
 *
 * It used to open that pair and now closes it, at the reviewer's instruction.
 * Nothing about the argument changed: the board and the costs are still
 * adjacent and still one thing in two halves. What moved with it is the
 * trimmed padding that closes the seam between them — it was on the bottom
 * edge and is now on the top.
 *
 * Three named costs in a row and the line they total to underneath. The costs
 * are set as cards because this is the first section with weight to carry: the
 * strip and the band above are single continuous statements, and three separate
 * problems genuinely are three objects.
 *
 * There was a fourth object here — a drawing of an opened parcel in a column
 * beside the cards — and the review took it out. It was the weakest thing in
 * the section and it was costing the most: it restated in pictures what the
 * three cards state in the merchant's own vocabulary, and to make room for it
 * the costs were squeezed into two thirds of the page while the illustration
 * held the remaining third at full height. Removing it does not leave a hole to
 * fill, because the row simply takes the measure back — which is why what
 * replaces it is nothing at all rather than a fourth card.
 *
 * A row rather than a stacked column. Three costs listed downward read as a
 * sequence — first this, then that — and these are not sequential; they are
 * three simultaneous leaks. Side by side, the eye takes all three at once,
 * which is the shape of the problem.
 *
 * Nothing in this section is coloured by its subject. An earlier pass gave the
 * cards red chips and the close a pink banner, and the page stopped being one
 * page — the hero establishes a white, almost achromatic system where the only
 * saturated things are the product and Shopify's mark, and a section that
 * introduces a second palette to say "this part is bad" reads as a different
 * site making the point. The costs are stated in words; the surface stays the
 * surface. Cards use the shared `surface-card`, so their radius, border, shadow
 * and lift are the same decision every other card on the site makes, and the
 * only colour that ever appears is the brand tint they take on hover.
 *
 * The titles are the merchant's own words for these — fake orders, RTO, prepaid
 * share — because recognition is the entire job of the section, and recognition
 * runs on familiar vocabulary.
 *
 * The line underneath is the close, and it is deliberately a cost rather than a
 * call to action. §5.2 is explicit that the install is not asked for until the
 * merchant has seen what it is worth, and the worth is what the next four
 * sections are for.
 *
 * One reveal for the whole composition. Three staggered cards would put three
 * entrances on a section whose subject is loss, and motion is the wrong
 * register for it.
 */
export function PainPoints() {
  const painPoints = getPainPoints();
  const copy = getPainPointsCopy();

  return (
    /*
      The top padding is cut well below the section scale, so this arrives
      directly under the board rather than across a corridor from it — the one
      join on this page that should feel immediate. The full gap stays under the
      section, where the next subject genuinely begins.

      Every breakpoint the section scale defines has to be overridden, not just
      the first two. Tailwind orders utilities by breakpoint, so an unanswered
      `lg:py-section-lg` lands after `md:pt-8` in the stylesheet and quietly puts
      the full padding back on the widest screens — the only ones anyone reviews
      the page on.
    */
    <SectionShell
      backdrop={<PageEnvironment />}
      containerClassName="pt-7 md:pt-8 lg:pt-9"
    >
      {/*
        No eyebrow. The title is already the plainest possible statement of the
        subject, and a label above it saying the same thing in fewer words adds
        a line without adding a fact.
      */}
      <SectionHeading title={copy.title} description={copy.description} />

      <BlurFade className="mt-lede">
        {/*
          One centred column on the page's own measure. The three costs are
          peers of each other and of nothing else in the section, so they take
          the full width and divide it equally — which is the arrangement that
          says "these are the three, and there are only three".

          The measure is pulled in from the container. Three cards stretched
          across the full page width run to about 350px each for two lines of
          copy, and a card much wider than its content reads as a box waiting
          for something that never arrived. `max-w-5xl` sets each card at
          roughly the width of the paragraph inside it.
        */}
        <div className="mx-auto max-w-5xl">
          <ul className="grid gap-4 sm:grid-cols-3">
            {painPoints.map((painPoint) => {
              const Icon = iconFor[painPoint.id] ?? PackageX;

              return (
                <li
                  key={painPoint.id}
                  className="group flex surface-card flex-col gap-3.5 rounded-[1.15rem] p-6"
                >
                  {/*
                    The mark sits above the title rather than beside it, in the
                    same container the capability board gives its own marks.
                    Three cards this wide give the icon its own line for free,
                    a stacked card has one reading order — mark, name, cost —
                    and the two sections are read one after the other, so a
                    bare glyph here under a chipped one there would look like
                    two hands rather than one system.

                    The chip is the only part that differs, and it differs on
                    purpose: the board's marks are lit in brand and violet
                    because those are capabilities being offered, and these are
                    costs being named, so they stay in ink and warm to brand
                    only under the pointer.
                  */}
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-ink/[0.04] text-ink/45 ring-1 ring-ink/[0.07] transition-colors duration-300 ease-emphasized group-hover:bg-brand/[0.08] group-hover:text-brand group-hover:ring-brand/15"
                  >
                    <Icon className="size-[19px]" strokeWidth={1.7} />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[15px] leading-none font-semibold tracking-[-0.012em] text-ink">
                      {painPoint.title}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-pretty text-ink/50">
                      {painPoint.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/*
            The close.

            An earlier pass set this as a red banner, and a red banner is the
            one thing on this page loud enough to outrank the hero — which is
            the wrong outcome for a line whose whole authority comes from
            being stated flatly. It is the same white surface as everything
            else, lit from behind rather than filled: the glow is what makes
            it the last thing the eye lands on, and light does that without
            raising its voice.

            The sentence carries the alarm. Nothing around it needs to.

            It is narrower than the row above it and centred under it, so it
            reads as what the three cards total to rather than as a fourth
            object in the set.
          */}
          <div className="relative mx-auto mt-4 max-w-3xl">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -inset-y-5 rounded-[2.5rem] bg-brand/[0.07] blur-2xl"
            />

            <p className="relative flex items-center justify-center gap-3 rounded-[1.15rem] border border-border bg-card px-5 py-4 text-center shadow-card">
              <TriangleAlert
                aria-hidden
                className="size-[17px] shrink-0 text-ink/40"
                strokeWidth={1.6}
              />
              <span className="text-[13.5px] leading-snug font-medium text-pretty text-ink/75 sm:text-[14.5px]">
                {copy.callout}
              </span>
            </p>
          </div>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
