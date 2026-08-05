import { Check } from "lucide-react";

import { ActionLink } from "@/components/layout/ActionLink";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { getHowItWorksSteps, getUtilityActions } from "@/lib/content";

const REASSURANCES = [
  "7-day free trial",
  "No credit card required",
  "Cancel anytime",
];

/**
 * How it works (§5.1 #7).
 *
 * The effort is stated honestly — no code, under ten minutes — because the
 * objection this section removes is "how much work is this", and a vague
 * answer reads as a large one.
 *
 * Carries the `how-it-works` anchor the hero's secondary action points at,
 * which is why that action can be a plain in-page link rather than a second
 * competing destination.
 */
export function HowItWorks() {
  const steps = getHowItWorksSteps();
  const installAction = getUtilityActions().find(
    (action) => action.variant === "primary",
  );

  return (
    <SectionShell
      id="how-it-works"
      tone="muted"
      className="border-y border-border/60"
      backdrop={
        <DotPattern
          width={30}
          height={30}
          cr={1}
          className={cn(
            "absolute inset-0 h-full fill-brand/15",
            "[mask-image:radial-gradient(70%_55%_at_50%_25%,white,transparent)]",
          )}
        />
      }
    >
      <SectionHeading
        eyebrow="Setup"
        title="Live in under ten minutes"
        description="No code, no theme changes, and no developer. Install it, set your rules, and it runs in the background."
      />

      <ol className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {steps.map((step, index) => (
          // The reveal wrapper stays inside the list item so the markup
          // remains a real `ol > li` list.
          <li key={step.id}>
            <BlurFade delay={0.07 * index} inView>
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-brand/25 bg-background text-sm font-semibold text-brand tabular-nums shadow-card">
                  {index + 1}
                </span>
                {/* Connector, drawn only between steps on wide screens. */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-gradient-to-r from-brand/35 to-transparent lg:block"
                  />
                ) : null}
              </div>

              <h3 className="mt-6 text-base font-semibold">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </BlurFade>
          </li>
        ))}
      </ol>

      <div className="mt-16 flex flex-col items-center gap-5 lg:mt-20">
        {installAction ? (
          <ActionLink
            action={{ ...installAction, label: "Install free on Shopify" }}
            size="lg"
            className="shadow-[0_10px_30px_-10px_var(--brand)]"
          />
        ) : null}

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {REASSURANCES.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check aria-hidden className="size-4 text-brand-check" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
