import {
  ArrowRight,
  BadgeCheck,
  ChartNoAxesCombined,
  ShoppingCart,
  SlidersHorizontal,
  Undo2,
  Wallet,
} from "lucide-react";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  getAnalyticsFlowResult,
  getAnalyticsFlowSteps,
  getAnalyticsPageCopy,
} from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

/**
 * The controls that feed the report, and the figure each one leaves behind.
 *
 * Every pairing here is already published by this repository — the four
 * reported figures are the ones in `analyticsFeatures` and in the `analytics`
 * FAQ answer, and each is attributed to the control that produces it. Nothing
 * is invented for the diagram, and no fifth source is added to make the column
 * look full.
 *
 * This is the whole reason the page does not use the shared flow slab. Its
 * argument is not a sequence in time, it is a *pipeline*: four sources on one
 * side, one report on the other, and the claim is that nothing has to be
 * carried across by hand. Four equal cards in a row cannot say that; a column
 * of sources pointing into a single panel says it without a caption.
 */
const SOURCES: readonly {
  id: string;
  icon: LucideIcon;
  control: string;
  figure: string;
}[] = [
  {
    id: "verified",
    icon: BadgeCheck,
    control: "OTP Verification",
    figure: "Verified vs unverified",
  },
  {
    id: "prepaid",
    icon: Wallet,
    control: "COD to Prepaid",
    figure: "Prepaid share",
  },
  {
    id: "recovered",
    icon: ShoppingCart,
    control: "Abandoned Cart Recovery",
    figure: "Carts recovered",
  },
  {
    id: "rto",
    icon: Undo2,
    control: "What shipped and came back",
    figure: "RTO and fake-order trends",
  },
];

/** Icons for the four recorded beats, mapped from the record's id. */
const iconFor: Record<string, LucideIcon> = {
  run: SlidersHorizontal,
  record: BadgeCheck,
  report: ChartNoAxesCombined,
  decide: SlidersHorizontal,
};

/**
 * How the report fills itself.
 *
 * A pipeline rather than a rail of four cards: the four controls that already
 * run on the merchant's orders, an arrow, and the one place their figures end
 * up. The four beats the repository publishes are set beneath it as a numbered
 * rule — they are the narration of the diagram, not four more objects, so they
 * are drawn at the weight of a caption instead of at the weight of a card.
 *
 * The step copy is read from the repository, so this presentation cannot
 * describe the control differently from the knowledge base or the mega-menu.
 */
export function Flow() {
  const copy = getAnalyticsPageCopy();
  const steps = getAnalyticsFlowSteps();

  return (
    <SectionShell
      tone="muted"
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <div className="flex flex-col items-center">
        <FeatureEyebrow>{copy.flowEyebrow}</FeatureEyebrow>
        <SectionHeading
          as="h2"
          title={copy.flowTitle}
          description={copy.flowDescription}
          className="mt-4 [&>h2]:mt-0"
        />
      </div>

      <BlurFade className="mt-10">
        <div className="rounded-2xl border border-ink/[0.08] bg-card p-5 shadow-card sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.78fr)] lg:items-center lg:gap-8">
            {/* The sources. */}
            <div>
              <p className="text-[10px] leading-none font-bold tracking-[0.12em] text-ink/35 uppercase">
                What already runs on your orders
              </p>

              <ul className="mt-4 space-y-2">
                {SOURCES.map((source) => (
                  <li
                    key={source.id}
                    className="flex items-center gap-3 rounded-xl border border-ink/[0.07] bg-sky-50 px-3.5 py-2.5"
                  >
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-ink/45 ring-1 ring-ink/[0.06]"
                    >
                      <source.icon className="size-4" strokeWidth={1.7} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] leading-none font-semibold text-ink">
                        {source.control}
                      </span>
                      <span className="mt-1.5 block truncate text-[11px] leading-none text-ink/45">
                        {source.figure}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/*
              The join. It turns with the layout — down the page when the two
              halves stack, across the gap when they sit side by side — because
              an arrow pointing right at a panel that is now underneath is
              worse than no arrow.
            */}
            <span
              aria-hidden
              className="mx-auto flex items-center justify-center text-brand/45"
            >
              <ArrowRight
                className="size-6 rotate-90 lg:rotate-0"
                strokeWidth={2}
              />
            </span>

            {/* The one place it lands. */}
            <div className="rounded-2xl border border-brand/15 bg-brand/[0.035] p-5">
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-xl bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]"
              >
                <ChartNoAxesCombined className="size-5 text-white" />
              </span>

              <h3 className="mt-4 text-[15px] leading-snug font-semibold tracking-[-0.015em] text-balance text-ink">
                One report, inside the app
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-pretty text-ink/55">
                Nothing to tag, nothing extra to install. The figures are a
                record of what the controls already did.
              </p>
            </div>
          </div>

          <div aria-hidden className="mt-7 h-px bg-ink/[0.07]" />

          {/* The four beats, as narration rather than as four more cards. */}
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = iconFor[step.id] ?? SlidersHorizontal;

              return (
                <li
                  key={step.id}
                  className={cn(
                    "lg:border-l lg:border-ink/[0.07] lg:pl-5",
                    index === 0 && "lg:border-l-0 lg:pl-0",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon
                      aria-hidden
                      className="size-4 shrink-0 text-ink/35"
                      strokeWidth={1.8}
                    />
                    <span className="text-[10px] leading-none font-bold tracking-[0.12em] text-ink/35 uppercase">
                      Step {index + 1}
                    </span>
                  </span>

                  <h3 className="mt-2.5 text-[13.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-pretty text-ink/50">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-7 text-center text-[13px] leading-relaxed text-pretty text-ink/55">
          <span className="font-semibold text-ink/70">
            {getAnalyticsFlowResult()}
          </span>
        </p>
      </BlurFade>
    </SectionShell>
  );
}
