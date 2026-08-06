import { Banknote, PackageX, TriangleAlert, Undo2 } from "lucide-react";

import { LossScene } from "@/components/sections/pain/LossScene";
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
 * This is the section the rest of the page depends on. Everything above it says
 * how big and how trusted the product is; nothing yet has said why a merchant
 * should care. So it answers one question — why am I losing money on cash on
 * delivery — and deliberately does not answer the next one. The controls that
 * fix each of these are the following section's argument, and offering the cure
 * in the same breath as the diagnosis is what makes a page read as a pitch
 * rather than as an explanation.
 *
 * Three named costs in a row, one drawing of them beside it, and the line they
 * total to underneath — the blueprint's arrangement, exactly. The costs are set
 * as cards because this is the first section with weight to carry: the strip
 * and the band above are single continuous statements, and three separate
 * problems genuinely are three objects.
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
 * One reveal for the whole composition. Three staggered cards plus a drawing
 * would put four entrances on a section whose subject is loss, and motion is
 * the wrong register for it.
 */
export function PainPoints() {
  const painPoints = getPainPoints();
  const copy = getPainPointsCopy();

  return (
    /*
      The bottom padding is cut well below the section scale. The default is
      tuned for a section that ends on a paragraph; this one ends on a bordered
      bar, and a bar already reads as a stop — leaving the full gap under it puts
      a corridor between the problem and the answer to it, which is the one join
      on this page that should feel immediate.

      Every breakpoint the section scale defines has to be overridden, not just
      the first two. Tailwind orders utilities by breakpoint, so an unanswered
      `lg:py-section-lg` lands after `md:pb-8` in the stylesheet and quietly puts
      the full padding back on the widest screens — the only ones anyone reviews
      the page on.
    */
    <SectionShell
      backdrop={<PageEnvironment />}
      containerClassName="pb-7 md:pb-8 lg:pb-9"
    >
      {/*
        No eyebrow. The title is already the plainest possible statement of the
        subject, and a label above it saying the same thing in fewer words adds
        a line without adding a fact.
      */}
      <SectionHeading title={copy.title} description={copy.description} />

      <BlurFade className="mt-lede">
        <div className="grid items-center gap-9 lg:grid-cols-[1fr_auto] lg:gap-10 xl:gap-12">
          {/*
            The costs and the line that totals them are one block, which is why
            they share a column: the sentence underneath is what the three cards
            add up to, and putting it outside their measure would make it a
            separate remark about the section rather than its conclusion.
          */}
          <div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {painPoints.map((painPoint) => {
                const Icon = iconFor[painPoint.id] ?? PackageX;

                return (
                  <li
                    key={painPoint.id}
                    className="group flex surface-card items-start gap-3.5 rounded-[1.15rem] p-5"
                  >
                    <Icon
                      aria-hidden
                      className="mt-px size-5 shrink-0 text-ink/35 transition-colors duration-300 ease-emphasized group-hover:text-brand"
                      strokeWidth={1.6}
                    />

                    <div className="min-w-0">
                      <h3 className="text-[14.5px] leading-none font-semibold tracking-[-0.012em] text-ink">
                        {painPoint.title}
                      </h3>
                      <p className="mt-2.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
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
            */}
            <div className="relative mt-4">
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

          {/*
            Ordered after the costs in the markup so a screen reader and a
            narrow viewport both get them before the picture of them — the
            drawing is a second reading, and a second reading is no use first.
          */}
          <LossScene className="max-w-[17rem] lg:w-[15rem] lg:max-w-none xl:w-[17.5rem]" />
        </div>
      </BlurFade>
    </SectionShell>
  );
}
