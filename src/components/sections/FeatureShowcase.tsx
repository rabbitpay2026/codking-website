import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import { routeFor } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { getFeaturedControls } from "@/lib/content";

/**
 * Key controls in focus (§5.1 #6).
 *
 * Four controls, each with the outcome it delivers and what the merchant
 * actually gets. Which four are featured is a flag on the content record, so
 * changing the emphasis is a data edit rather than a code change.
 *
 * The pointer-following highlight is the one purely tactile interaction on
 * the page. It earns its place because these cards are scanned rather than
 * read, and a card that answers the cursor makes the grid feel handled rather
 * than printed. It degrades to a plain bordered card without JavaScript.
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
            "absolute inset-0 h-full stroke-brand/[0.06]",
            "[mask-image:radial-gradient(70%_60%_at_50%_40%,white,transparent)]",
          )}
        />
      }
    >
      <SectionHeading
        eyebrow="What you turn on"
        title="The four controls that remove most of the loss"
        description="Each one works on its own. Together they close the gap between the orders you take and the orders you get paid for."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16">
        {controls.map((control, index) => (
          <BlurFade
            key={control.slug}
            delay={0.06 * index}
            inView
            className="h-full"
          >
            <MagicCard
              gradientColor="var(--brand)"
              gradientOpacity={0.06}
              gradientFrom="var(--brand)"
              gradientTo="var(--brand-accent)"
              className="group h-full surface-card"
            >
              <article className="flex h-full flex-col p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {control.name}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 text-xs font-semibold text-brand/35 tabular-nums"
                  >
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {control.outcome}
                </p>

                {control.benefits ? (
                  <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                    {control.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-check/20">
                          <Check aria-hidden className="size-2.5 text-ink/70" />
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/85">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex-1" />
                )}

                <Link
                  href={routeFor.control(control.slug)}
                  className="mt-7 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  How {control.name} works
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </article>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </SectionShell>
  );
}
