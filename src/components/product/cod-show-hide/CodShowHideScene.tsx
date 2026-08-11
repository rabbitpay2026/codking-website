"use client";

import {
  ArrowDown,
  CheckCircle2,
  EyeOff,
  ScanSearch,
  Timer,
} from "lucide-react";

import { CodRuleCheckout } from "@/components/product/cod-show-hide/CodRuleCheckout";
import {
  CHECKING_STEP,
  DURATIONS,
  MATCHED_STEP,
  ORDER,
  RULE,
  inr,
} from "@/components/product/cod-show-hide/ruleBeats";
import { siteConfig } from "@/constants/site";
import { useStepTimeline } from "@/hooks/use-step-timeline";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * What the engine is doing, one beat at a time.
 *
 * A line rather than a chip carousel, and it says what is happening rather
 * than what the product is called. "Checking ₹6,400 against your rules" names
 * the number the merchant can already see on the order below it, which is what
 * makes the match on the next beat verifiable instead of asserted.
 */
const STATUS: readonly { icon: LucideIcon; label: string; lit: boolean }[] = [
  { icon: Timer, label: "Waiting for checkout", lit: false },
  {
    icon: ScanSearch,
    label: `Checking ${inr.format(ORDER.total)} against your rules`,
    lit: false,
  },
  { icon: CheckCircle2, label: "Rule matched", lit: true },
  { icon: CheckCircle2, label: "Rule matched", lit: true },
];

/**
 * The condition, as the merchant wrote it.
 *
 * `IF` and `THEN` are set as small keys rather than as sentence words, because
 * that is what makes two short lines read as a *rule* and not as a caption. A
 * merchant recognises the shape before they read either line.
 */
function RuleClause({
  keyword,
  children,
}: {
  readonly keyword: string;
  readonly children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-2 text-[11px] leading-none">
      <span className="w-9 shrink-0 rounded-md bg-ink/[0.06] py-1 text-center text-[8.5px] leading-none font-bold tracking-[0.08em] text-ink/45 uppercase">
        {keyword}
      </span>
      <span className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
        {children}
      </span>
    </p>
  );
}

/**
 * The hero's product scene.
 *
 * Two objects and one relationship, stacked in the order cause and effect
 * happen in: the rule the merchant wrote, an arrow, and the checkout it
 * governs. A visitor understands what this control is before reading a word of
 * the headline beside it — something decides, and the payment options change.
 *
 * The checkout is the larger of the two and gets the elevation, because it is
 * the surface the control acts on; the rule above it is deliberately compact,
 * a control panel rather than a second screen competing with the first.
 *
 * Stacked at every width rather than floated beside the panel at `lg` and
 * dropped below it on a tablet. The sibling scenes can afford to shed their
 * annotation chips because the hero checklist names those settings anyway —
 * here the rule *is* the story, and a mobile visitor shown a checkout with no
 * rule above it would be shown a checkout.
 *
 * One timeline, held here and read by both halves, so the card cannot claim a
 * match while the checkout is still offering cash on delivery. Under reduced
 * motion `useStepTimeline` parks on the last beat — matched, hidden, online
 * payment selected — which is the frame the whole sequence exists to reach.
 * Nothing runs at all while the hero is off screen.
 */
export function CodShowHideScene({ className }: WithClassName) {
  const { ref, step } = useStepTimeline<HTMLDivElement>(DURATIONS);

  const matched = step >= MATCHED_STEP;
  const checking = step === CHECKING_STEP;
  const status = STATUS[step] ?? STATUS[0];
  const StatusIcon = status.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto w-full max-w-[24rem] lg:mx-0 lg:max-w-none",
        className,
      )}
    >
      {/* Key light, so the panels are lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 50% 46%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      <div
        role="img"
        aria-label={`${siteConfig.name} applies a COD rule to a Shopify checkout: the rule hides cash on delivery when the order value is over ${inr.format(RULE.threshold)}, the ${inr.format(ORDER.total)} order matches it, and cash on delivery is hidden while online payment stays available.`}
      >
        {/* The merchant's side: one rule, and what it is doing right now. */}
        <div
          className={cn(
            "rounded-[1.25rem] border border-border bg-card px-3.5 py-3",
            "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_12px_30px_-20px_rgba(11,27,54,0.4)]",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="grid size-[22px] shrink-0 place-items-center rounded-lg bg-brand">
              <EyeOff className="size-3.5 text-white" strokeWidth={1.9} />
            </span>
            <p className="min-w-0 flex-1 truncate text-[12px] leading-none font-semibold text-ink">
              COD rules
            </p>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand/[0.08] px-2 py-1 text-[9px] leading-none font-bold tracking-[0.06em] text-brand uppercase">
              <span
                className={cn(
                  "size-1.5 rounded-full bg-brand",
                  checking && "animate-pulse",
                )}
              />
              Live
            </span>
          </div>

          {/*
            The rule itself, lit when it fires. Border, tint and a soft ring —
            the same response the checkout's selected option uses, so "this one
            is active" means one thing in both halves of the scene.
          */}
          <div
            className={cn(
              "mt-2.5 space-y-1.5 rounded-xl border px-3 py-2.5",
              "transition-[background-color,border-color,box-shadow] duration-500 ease-emphasized",
              matched
                ? "border-brand bg-brand/[0.05] shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand)_10%,transparent)]"
                : "border-ink/10 bg-background",
            )}
          >
            <RuleClause keyword="If">
              <span className="font-semibold text-ink">{RULE.field}</span>
              <span className="text-ink/45">{RULE.comparator}</span>
              <span className="font-semibold text-ink tabular-nums">
                {inr.format(RULE.threshold)}
              </span>
            </RuleClause>

            <RuleClause keyword="Then">
              <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                <EyeOff
                  className={cn(
                    "size-3 transition-colors duration-500 ease-emphasized",
                    matched ? "text-brand" : "text-ink/40",
                  )}
                  strokeWidth={2}
                />
                {RULE.action}
              </span>
            </RuleClause>
          </div>

          {/*
            The status line, in a slot of its own height. Three different
            sentences share it over a loop and the card must not change size as
            they trade places.
          */}
          <p className="mt-2.5 flex h-3.5 items-center gap-1.5">
            <StatusIcon
              className={cn(
                "size-3 shrink-0 transition-colors duration-500 ease-emphasized",
                status.lit ? "text-brand-check" : "text-ink/35",
              )}
              strokeWidth={2.2}
            />
            <span
              className={cn(
                "min-w-0 truncate text-[10px] leading-none font-semibold transition-colors duration-500 ease-emphasized",
                status.lit ? "text-ink/75" : "text-ink/45",
              )}
            >
              {status.label}
            </span>
          </p>
        </div>

        {/*
          The connector — the whole argument in one glyph. It is what turns two
          panels into cause and effect, and it warms to brand at the moment the
          rule fires so the eye is carried down to the checkout on the beat the
          checkout changes.
        */}
        <div
          aria-hidden
          className="relative mx-auto flex h-7 w-full items-end justify-center"
        >
          <span
            className={cn(
              "absolute top-0 bottom-2 w-px transition-colors duration-500 ease-emphasized",
              matched ? "bg-brand/40" : "bg-ink/10",
            )}
          />
          <ArrowDown
            className={cn(
              "relative size-3.5 transition-colors duration-500 ease-emphasized",
              matched ? "text-brand/70" : "text-ink/20",
            )}
            strokeWidth={2.4}
          />
        </div>

        <CodRuleCheckout step={step} />
      </div>
    </div>
  );
}
