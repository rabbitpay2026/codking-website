import { Check } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/shared/Container";
import { BlurFade } from "@/components/ui/blur-fade";
import { getHowItWorksSteps, getUtilityActions } from "@/lib/content";

/**
 * How it works (§5.1 #7).
 *
 * The effort is stated honestly — no code, under ten minutes — because the
 * objection this section exists to remove is "how much work is this going to
 * be", and a vague answer reads as a large one.
 *
 * The section carries the `how-it-works` anchor the hero's secondary action
 * points at, which is why that action can be a plain in-page link rather than
 * a second competing destination.
 */
export function HowItWorks() {
  const steps = getHowItWorksSteps();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <section
      id="how-it-works"
      className="scroll-mt-header border-b border-border bg-cloud py-20 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Setup"
          title="Live in under ten minutes"
          description="No code, no theme changes, and no developer. Install it, set your rules, and it runs in the background."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            // The reveal wrapper stays inside the list item so the markup
            // remains a real `ol > li` list.
            <li key={step.id}>
              <BlurFade delay={0.06 * index} inView>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brand/25 bg-brand-soft text-sm font-semibold text-brand tabular-nums">
                    {index + 1}
                  </span>
                  {/* Connector, drawn only between steps on wide screens. */}
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="hidden h-px flex-1 bg-gradient-to-r from-brand/30 to-transparent lg:block"
                    />
                  ) : null}
                </div>

                <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </BlurFade>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-center gap-4">
          {installAction ? (
            <ActionLink
              action={{ ...installAction, label: "Install free on Shopify" }}
              size="lg"
            />
          ) : null}

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {[
              "7-day free trial",
              "No credit card required",
              "Cancel anytime",
            ].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="size-4 text-brand-check" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
