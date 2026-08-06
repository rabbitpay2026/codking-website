import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { FlagshipVisual } from "@/components/sections/flagship/FlagshipVisual";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { GridPattern } from "@/components/ui/grid-pattern";
import { routeFor } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { getFeaturedControls } from "@/lib/content";

/**
 * Headline written per capability rather than stored on the record.
 *
 * The control's `outcome` describes what it does and is reused everywhere;
 * these are the promise the homepage makes about it, which is a different
 * sentence with a different job and belongs to this section alone.
 */
const promiseFor: Record<string, string> = {
  "otp-verification": "Every order proves it is real before you pack it",
  "cod-rules": "Cash disappears exactly where it loses you money",
  "prepaid-nudge": "Buyers choose prepaid because it is genuinely better",
};

/**
 * The flagship capabilities (§5.1 #6).
 *
 * Three, not ten. These are the controls that carry most of the loss, and
 * they are given full-width rows with a working product surface each instead
 * of a card in a grid — because a card can only assert a capability, and a
 * screen can show it.
 *
 * Rows alternate side so the eye zig-zags down the section rather than
 * running down a single column, which is what stops three long rows reading
 * as three repetitions of the same block.
 *
 * Which controls appear here is the `featured` flag on the content record, so
 * changing the emphasis is a data edit (§12.1).
 */
export function FeatureShowcase() {
  const controls = getFeaturedControls();

  return (
    <SectionShell
      backdrop={
        <GridPattern
          width={64}
          height={64}
          className={cn(
            "absolute inset-0 h-full stroke-brand/[0.055]",
            "[mask-image:radial-gradient(70%_60%_at_50%_35%,white,transparent)]",
          )}
        />
      }
    >
      <SectionHeading
        eyebrow="The three that matter"
        title="Most of the loss comes down to three decisions"
        description="Who you take cash from, whether the order is real, and what it costs the buyer to choose cash. Get those right and the rest is housekeeping."
      />

      <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
        {controls.map((control, index) => {
          const reversed = index % 2 === 1;

          return (
            <BlurFade key={control.slug} inView>
              <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn(reversed && "lg:order-2")}>
                  <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                    <span className="grid size-6 place-items-center rounded-full bg-brand text-[11px] text-white tabular-nums">
                      {index + 1}
                    </span>
                    {control.name}
                  </p>

                  <h3 className="mt-5 text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.025em] text-balance lg:text-[2.15rem]">
                    {promiseFor[control.slug] ?? control.outcome}
                  </h3>

                  <p className="mt-4 max-w-lg leading-relaxed text-pretty text-muted-foreground">
                    {control.outcome}
                  </p>

                  {control.benefits ? (
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {control.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5">
                          <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-check/25">
                            <Check
                              aria-hidden
                              className="size-2.5 text-ink/70"
                            />
                          </span>
                          <span className="text-sm leading-relaxed text-foreground/85">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <Link
                    href={routeFor.control(control.slug)}
                    className="group mt-8 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    How {control.name} works
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <div className={cn("relative", reversed && "lg:order-1")}>
                  {/* Lifts the surface off the page without a hard shadow. */}
                  <div
                    aria-hidden
                    className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand/[0.07] blur-2xl"
                  />
                  <FlagshipVisual slug={control.slug} />
                </div>
              </article>
            </BlurFade>
          );
        })}
      </div>
    </SectionShell>
  );
}
