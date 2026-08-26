import {
  ArrowRight,
  Check,
  PackageCheck,
  PauseCircle,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  getOrderVerificationFlowResult,
  getOrderVerificationFlowSteps,
  getOrderVerificationPageCopy,
} from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record.
 */
const iconFor: Record<string, LucideIcon> = {
  placed: ShoppingCart,
  queue: PauseCircle,
  decide: Check,
  ship: Truck,
};

/**
 * The three answers, drawn where the third stage sits.
 *
 * This is the whole reason the page does not use the shared flow slab. Every
 * other control on the site is a sequence: one thing happens, then the next.
 * This one is a sequence with a fork in the middle, and a rail of four equal
 * beats draws the fork as though it were a fourth beat — which is exactly
 * backwards, because the fork is the control and the beats around it are
 * context.
 */
const DECISIONS: readonly {
  id: string;
  icon: LucideIcon;
  label: string;
  outcome: string;
  ships: boolean;
}[] = [
  {
    id: "confirm",
    icon: PackageCheck,
    label: "Confirm",
    outcome: "Carries on to fulfilment",
    ships: true,
  },
  {
    id: "hold",
    icon: PauseCircle,
    label: "Hold",
    outcome: "Waits for a second look",
    ships: false,
  },
  {
    id: "cancel",
    icon: X,
    label: "Cancel",
    outcome: "Stops before it is picked",
    ships: false,
  },
];

/**
 * How a cash order gets an answer.
 *
 * A lifecycle rail rather than the shared four-card flow: the order moves left
 * to right through two stages, forks into three at the decision, and only one
 * of the three branches reaches the last stage. The fork is drawn rather than
 * described, which is the difference between a diagram of this control and a
 * diagram that would fit any control.
 *
 * The stage copy is read from the repository — the same four records the
 * shared panel would have rendered — so this presentation cannot describe the
 * control differently from the knowledge base or the llms.txt entry.
 *
 * The rail collapses to a single column below `lg`. A fork drawn sideways in a
 * 360px column is three arrows pointing at nothing, so on a phone the three
 * decisions become three rows under their stage and the spine runs down the
 * page instead of across it.
 */
export function Flow() {
  const copy = getOrderVerificationPageCopy();
  const steps = getOrderVerificationFlowSteps();

  const [placed, queued, decide, ship] = steps;
  if (!placed || !queued || !decide || !ship) return null;

  const stages = [placed, queued] as const;

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
        <div className="rounded-2xl border border-ink/[0.08] bg-card p-6 shadow-card sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,0.9fr)] lg:items-center lg:gap-6">
            {/* The two stages before the fork. */}
            <ol className="flex flex-col gap-6">
              {stages.map((stage, index) => {
                const Icon = iconFor[stage.id] ?? ShoppingCart;

                return (
                  <li key={stage.id} className="relative">
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-sky-50 text-ink/50"
                      >
                        <Icon className="size-[17px]" strokeWidth={1.7} />
                      </span>
                      <span className="text-[10px] leading-none font-bold tracking-[0.12em] text-ink/35 uppercase">
                        Step {index + 1}
                      </span>
                    </span>

                    <h3 className="mt-3 text-[14.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                      {stage.body}
                    </p>
                  </li>
                );
              })}
            </ol>

            {/* The fork. */}
            <div className="relative rounded-2xl border border-brand/15 bg-brand/[0.035] p-5">
              <p className="flex items-center gap-2 text-[10px] leading-none font-bold tracking-[0.12em] text-brand uppercase">
                <span aria-hidden className="h-px w-4 bg-brand/40" />
                Step 3 — your decision
              </p>

              <h3 className="mt-3 text-[14.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                {decide.title}
              </h3>

              <ul className="mt-4 space-y-2">
                {DECISIONS.map((decision) => (
                  <li
                    key={decision.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                      decision.ships
                        ? "border-brand-check/30 bg-white"
                        : "border-ink/[0.08] bg-white/60",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-lg",
                        decision.ships
                          ? "bg-brand-check/15 text-ink/70"
                          : "bg-ink/[0.05] text-ink/40",
                      )}
                    >
                      <decision.icon
                        className="size-3.5"
                        strokeWidth={decision.id === "cancel" ? 2.6 : 1.9}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-[12.5px] leading-none font-semibold",
                          decision.ships ? "text-ink" : "text-ink/65",
                        )}
                      >
                        {decision.label}
                      </span>
                      <span className="mt-1.5 block text-[11px] leading-none text-ink/45">
                        {decision.outcome}
                      </span>
                    </span>

                    {/*
                      Only the branch that reaches the last stage carries an
                      arrow, and that is the diagram's entire claim: three
                      answers go in, one parcel comes out.
                    */}
                    {decision.ships ? (
                      <ArrowRight
                        aria-hidden
                        className="hidden size-4 shrink-0 text-brand/55 lg:block"
                        strokeWidth={2.2}
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            {/* What comes out of the fork. */}
            <div>
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-xl border border-brand-check/30 bg-brand-check/10 text-ink/60"
                >
                  <Truck className="size-[17px]" strokeWidth={1.7} />
                </span>
                <span className="text-[10px] leading-none font-bold tracking-[0.12em] text-ink/35 uppercase">
                  Step 4
                </span>
              </span>

              <h3 className="mt-3 text-[14.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                {ship.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                {ship.body}
              </p>
            </div>
          </div>

          <div aria-hidden className="mt-7 h-px bg-ink/[0.07]" />

          <p className="mt-5 flex items-start gap-2.5 text-[13px] leading-relaxed text-pretty text-ink/60 sm:items-center sm:justify-center">
            <span
              aria-hidden
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-check/15 sm:mt-0"
            >
              <Check className="size-3 text-ink/60" strokeWidth={3} />
            </span>
            <span className="font-medium text-ink/70">
              {getOrderVerificationFlowResult()}
            </span>
          </p>
        </div>
      </BlurFade>
    </SectionShell>
  );
}
