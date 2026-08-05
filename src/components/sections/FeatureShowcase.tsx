import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { routeFor } from "@/constants/routes";
import { getFeaturedControls } from "@/lib/content";

/**
 * Key controls in focus (§5.1 #6).
 *
 * Four controls, each with the outcome it delivers and what the merchant
 * actually gets. Which four are featured is a flag on the content record, so
 * changing the emphasis is a data edit rather than a code change.
 *
 * The pointer-following highlight is the one interaction on the page that is
 * purely tactile. It earns its place because these cards are the section a
 * merchant scans rather than reads, and a card that responds to the cursor
 * makes the grid feel handled rather than printed. It degrades to a plain
 * bordered card without JavaScript.
 */
export function FeatureShowcase() {
  const controls = getFeaturedControls();

  return (
    <section className="bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What you turn on"
          title="The four controls that remove most of the loss"
          description="Each one works on its own. Together they close the gap between the orders you take and the orders you get paid for."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {controls.map((control, index) => (
            <BlurFade
              key={control.slug}
              delay={0.05 * index}
              inView
              className="h-full"
            >
              <MagicCard
                gradientColor="var(--brand)"
                gradientOpacity={0.07}
                gradientFrom="var(--brand)"
                gradientTo="var(--brand-accent)"
                className="h-full rounded-2xl border border-border bg-card shadow-card"
              >
                <article className="flex h-full flex-col p-7">
                  <h3 className="text-xl font-semibold">{control.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {control.outcome}
                  </p>

                  {control.benefits ? (
                    <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
                      {control.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5">
                          <Check
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-brand-check"
                          />
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
                    className="mt-6 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    How {control.name} works
                    <ArrowRight aria-hidden className="size-3.5" />
                  </Link>
                </article>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  );
}
