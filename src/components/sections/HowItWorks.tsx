import {
  BadgeCheck,
  ShoppingCart,
  SlidersHorizontal,
  Store,
} from "lucide-react";

import { PageEnvironment } from "@/components/sections/PageEnvironment";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { getHowItWorksSteps, getHowItWorksTitle } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the record — changing a line of copy should not mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  install: Store,
  configure: SlidersHorizontal,
  order: ShoppingCart,
  protect: BadgeCheck,
};

/**
 * The connector between two steps.
 *
 * A process flow is only a process if the eye can see the direction, and four
 * cards in a row do not have one — they read as a set, like the capability board
 * two sections up, which is exactly what this must not be mistaken for. So the
 * connector does the work: a dashed run that travels toward the next card, and
 * an arrowhead that says which way.
 *
 * It turns with the layout. Stacked, it drops from the foot of one card to the
 * head of the next; four across, it crosses the gap between them. At the middle
 * breakpoint the steps sit two by two and there is no single reading order for
 * an arrow to assert, so it is simply not drawn.
 *
 * The travel is `animate-trace`, the existing token for a line moving toward
 * what it points at, and it is CSS on a dash offset — no client component, no
 * observer, nothing running on the main thread. The dash period divides exactly
 * into the offset, so the loop has no seam, and the global reduced-motion rule
 * parks it as a plain dashed line.
 */
function StepConnector() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute top-full left-[1.85rem] mt-1 block h-5 sm:hidden"
      >
        <svg viewBox="0 0 8 20" className="h-full" fill="none">
          <path
            d="M4 0v12"
            className="animate-trace text-ink/25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3 5"
          />
          <path
            d="m1 14 3 4 3-4"
            className="text-ink/30"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-full hidden w-8 -translate-y-1/2 lg:block"
      >
        <svg viewBox="0 0 32 8" className="w-full" fill="none">
          <path
            d="M2 4h20"
            className="animate-trace text-ink/25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3 5"
          />
          <path
            d="m25 1 4 3-4 3"
            className="text-ink/30"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
}

/**
 * How it works (§5.1 #7).
 *
 * The objection this removes is "how much work is this", and the answer is in
 * the shape rather than in a claim about it: four steps, of which the merchant
 * performs two. Install, configure, and then the flow continues without them.
 * Nowhere does the section say "it's easy" — it shows where the merchant's
 * involvement stops, which is the same statement made in a way that cannot be
 * disbelieved.
 *
 * A flow, not a timeline. The difference is entirely the connector: the same
 * four cards without one are the capability board two sections above, and the
 * whole point here is sequence. Every card is otherwise the site's standard
 * `surface-card` at the same radius, shadow and lift as sections four and five,
 * because a step is not a different kind of object from a control.
 *
 * The step number sits opposite its icon rather than above the title. On top it
 * competes with the title for the first read; at the head of the card, paired
 * with the icon, it becomes what it actually is — an index, not a heading.
 *
 * Carries the `how-it-works` anchor other parts of the site point at.
 *
 * The reveals stagger left to right so the row assembles in the direction it is
 * read, which is the only motion in the section besides the connectors.
 */
export function HowItWorks() {
  const steps = getHowItWorksSteps();
  const title = getHowItWorksTitle();

  return (
    /*
      Trimmed at the top for the same reason as the join above it: the board
      names what the product does and this shows the order it happens in, so the
      two belong together on the page.
    */
    <SectionShell
      id="how-it-works"
      backdrop={<PageEnvironment />}
      containerClassName="pt-7 md:pt-8 lg:pt-9"
    >
      <SectionHeading title={title} />

      <ol className="mt-lede grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = iconFor[step.id] ?? Store;

          return (
            <li key={step.id} className="relative h-full">
              {/*
                The reveal wrapper stays inside the list item so the markup
                remains a real `ol > li` list.
              */}
              <BlurFade delay={0.06 * index} className="h-full">
                <div className="group flex h-full surface-card flex-col rounded-[1.15rem] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink/12 bg-background text-[11.5px] leading-none font-semibold text-ink/50 tabular-nums transition-colors duration-300 ease-emphasized group-hover:border-brand/30 group-hover:text-brand">
                      {index + 1}
                    </span>

                    <Icon
                      aria-hidden
                      className="size-5 shrink-0 text-ink/30 transition-colors duration-300 ease-emphasized group-hover:text-brand"
                      strokeWidth={1.6}
                    />
                  </div>

                  <h3 className="mt-5 text-[14.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                    {step.body}
                  </p>
                </div>
              </BlurFade>

              {index < steps.length - 1 ? <StepConnector /> : null}
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
