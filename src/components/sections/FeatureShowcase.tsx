import { ArrowRight, Check, ChevronRight, X } from "lucide-react";
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
 * The argument this section makes about each control.
 *
 * Written per capability and owned here rather than stored on the record: the
 * control's `outcome` describes what it does and is reused on every surface,
 * while these three lines are the case the *homepage* makes for it. Same
 * capability, different job, different sentence.
 *
 * Each one is a story rather than a description — what it costs today, what
 * changes, and the shape of the mechanism — because a merchant does not buy a
 * feature, they buy the end of a specific problem.
 */
interface FlagshipStory {
  readonly promise: string;
  readonly problem: string;
  readonly change: string;
  /** The mechanism in three or four beats, shown as a flow. */
  readonly flow: readonly string[];
}

const stories: Record<string, FlagshipStory> = {
  "otp-verification": {
    promise: "Every order proves it is real before you pack it",
    problem:
      "A parcel leaves on trust and comes back unopened. You paid the freight both ways, and nothing about the order looked wrong at checkout.",
    change:
      "The buyer confirms on their own phone before anything is picked. Orders nobody confirms are held instead of shipped — so what you pack is what somebody actually wanted.",
    flow: ["Order placed", "Code on WhatsApp", "Buyer confirms", "Dispatch"],
  },
  "cod-rules": {
    promise: "Cash disappears exactly where it loses you money",
    problem:
      "The orders that come back look identical to the ones that stick, right up until the courier scans them into your warehouse again.",
    change:
      "Decide where cash is offered at all — by pincode, cart value, product or customer history. The orders you would have paid twice to move are never placed.",
    flow: ["Pincode", "Cart value", "Customer tag", "Verdict"],
  },
  "prepaid-nudge": {
    promise: "Buyers pick prepaid because it is genuinely the better deal",
    problem:
      "Cash feels free to the buyer. It costs you a handling fee, weeks of tied-up capital, and a return you fund from both ends.",
    change:
      "Put the real cost on cash, put a discount on prepaid, and let the gap do the persuading. Nobody is forced; the money simply arrives the day the order does.",
    flow: ["Fee on cash", "Discount on prepaid", "Buyer chooses"],
  },
};

/** The mechanism, as a flow the eye can follow in one pass. */
function Flow({ steps }: { readonly steps: readonly string[] }) {
  return (
    <ol
      aria-hidden
      className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2"
    >
      {steps.map((label, index) => (
        <li key={label} className="flex items-center gap-1.5">
          {index > 0 ? <ChevronRight className="size-3 text-brand/45" /> : null}
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap",
              index === steps.length - 1
                ? "border-brand/30 bg-brand/10 text-brand"
                : "border-border bg-card text-foreground/70",
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * The flagship capabilities (§5.1 #6).
 *
 * Three, not ten. These are the controls that carry most of the loss, and each
 * gets a full-width row with a *working* product surface beside it rather than
 * a card in a grid. That is the whole design decision here: a card can assert
 * a capability, a screenshot can illustrate one, but only something that runs
 * can demonstrate one — and a merchant who watches a rule fire has understood
 * the product in a way no paragraph achieves.
 *
 * Each row is built as one composition rather than as heading-then-body: the
 * ghost numeral, the problem stated as a cost, the change stated as a
 * mechanism, the flow, and the demonstration are a single argument laid out
 * across two columns. Rows alternate side so the eye zig-zags down the section
 * instead of running down one rail, and the glow behind each demonstration
 * follows it across, which is what stops three long rows reading as three
 * repetitions of the same block.
 *
 * Which controls appear here is the `featured` flag on the content record, so
 * changing the emphasis is a data edit (§12.1).
 */
export function FeatureShowcase() {
  const controls = getFeaturedControls();

  return (
    <SectionShell
      seam="top"
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
        title="Three controls carry almost all of the loss"
        description="Who you take cash from, whether the order is real, and what choosing cash costs the buyer. Get these right and the rest is housekeeping."
      />

      <div className="mt-lede space-y-14 lg:space-y-20">
        {controls.map((control, index) => {
          const reversed = index % 2 === 1;
          const story = stories[control.slug];

          return (
            <BlurFade key={control.slug} inView>
              <article className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.08fr] lg:gap-14">
                {/* The number, as a watermark rather than a label. */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-10 hidden text-[9rem] leading-none font-semibold tracking-tighter text-brand/[0.06] tabular-nums lg:block",
                    reversed ? "right-0" : "left-0",
                  )}
                >
                  0{index + 1}
                </span>

                <div className={cn("relative", reversed && "lg:order-2")}>
                  <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                    <span className="grid size-6 place-items-center rounded-full bg-brand text-[11px] text-white tabular-nums">
                      {index + 1}
                    </span>
                    {control.name}
                  </p>

                  <h3 className="mt-4 text-[1.7rem] leading-[1.1] font-semibold tracking-[-0.028em] text-balance lg:text-[2.2rem]">
                    {story?.promise ?? control.outcome}
                  </h3>

                  {story ? (
                    <dl className="mt-6 space-y-3.5">
                      <div className="flex items-start gap-3">
                        <dt>
                          <span className="sr-only">The problem</span>
                          <span
                            aria-hidden
                            className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-destructive/10"
                          >
                            <X className="size-3 text-destructive" />
                          </span>
                        </dt>
                        <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">
                          {story.problem}
                        </dd>
                      </div>

                      <div className="flex items-start gap-3">
                        <dt>
                          <span className="sr-only">What changes</span>
                          <span
                            aria-hidden
                            className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-check/25"
                          >
                            <Check className="size-3 text-ink/70" />
                          </span>
                        </dt>
                        <dd className="text-sm leading-relaxed text-pretty text-foreground/85">
                          {story.change}
                        </dd>
                      </div>
                    </dl>
                  ) : (
                    <p className="mt-6 max-w-lg leading-relaxed text-pretty text-muted-foreground">
                      {control.outcome}
                    </p>
                  )}

                  {story ? <Flow steps={story.flow} /> : null}

                  {control.benefits ? (
                    <ul className="mt-6 grid gap-2.5 border-t border-border pt-6 sm:grid-cols-2">
                      {control.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/55"
                          />
                          <span className="text-[13px] leading-relaxed text-foreground/75">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <Link
                    href={routeFor.control(control.slug)}
                    className="group mt-6 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-brand transition-colors outline-none hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60"
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
                    className={cn(
                      "absolute -inset-8 -z-10 rounded-[2.5rem] blur-3xl",
                      reversed
                        ? "bg-[radial-gradient(60%_60%_at_30%_40%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent_70%)]"
                        : "bg-[radial-gradient(60%_60%_at_70%_40%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent_70%)]",
                    )}
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
