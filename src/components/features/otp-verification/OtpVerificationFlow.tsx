import {
  KeyRound,
  MousePointerClick,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";

import { PageEnvironment } from "@/components/sections/PageEnvironment";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { getOtpFlowSteps } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the step id
 * here rather than stored on the record — changing a line of copy should never
 * mean picking art.
 */
const iconFor: Record<string, LucideIcon> = {
  select: ShoppingBag,
  checkout: MousePointerClick,
  verify: KeyRound,
  placed: PackageCheck,
};

/**
 * The connector between two steps.
 *
 * A row of four things is a set; a row of four things with arrows between them
 * is a sequence, and sequence is the entire claim this section makes. The
 * arrow turns with the layout — down the page when the steps stack, across the
 * gap when they sit in a row — and is simply not drawn at the middle
 * breakpoint, where two-by-two has no single reading order for an arrow to
 * assert.
 *
 * The dash travels on `animate-trace`, the token the homepage flow already
 * uses for a line moving toward what it points at: pure CSS on a dash offset,
 * no client component, nothing on the main thread, and parked as a plain
 * dashed rule under reduced motion.
 */
function StepConnector() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute top-full left-1/2 mt-2.5 block h-5 -translate-x-1/2 sm:hidden"
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

      {/*
        Pinned to the icon's own centre line rather than to the middle of the
        block. The titles below run to one line or two depending on the
        measure, so a connector centred on the block would sit at a different
        height in each gap — which is the clearest way to make four aligned
        steps look like four unaligned ones.

        `3.75rem` is that centre: a 24px index, a 12px gap and half of a 48px
        tile. `-right-9` centres a 32px arrow inside the row's 40px gutter.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[3.75rem] -right-9 hidden w-8 -translate-y-1/2 lg:block"
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
 * How OTP verification works, in four beats.
 *
 * Flat by instruction and by judgement. Four cards in a row would make this
 * look like the capability board it is not — a board says "here are four
 * things you get", a flow says "here is one thing, happening". Nothing here is
 * boxed: an index, a mark, a title, a line, and the arrows carrying the
 * direction.
 *
 * The steps read as things that *happen* rather than things to do, because
 * all four are the buyer's and none of them are the merchant's. That is the
 * argument the section makes without ever claiming setup is easy.
 *
 * The sequence is the reviewer's: the buyer picks something, goes to checkout,
 * verifies their number, and the order is placed. It starts at the product
 * rather than at the phone field on purpose — beginning at "customer enters
 * mobile number" makes the verification look like a form bolted onto the
 * store instead of one step inside a checkout the buyer was already in.
 */
export function OtpVerificationFlow() {
  const steps = getOtpFlowSteps();

  return (
    /*
      The page's section rule, owned by the section *below* each join so that
      exactly one side ever draws it — two neighbours each drawing their own
      edge would stack a pair of hairlines into a line twice as dark as every
      other one on the page.

      This section is the exception that proves it: `PageEnvironment` already
      draws the same `ink/7%` rule at its own foot, so the join with the demo
      below is carried from up here and the demo adds none of its own.
    */
    <SectionShell
      backdrop={<PageEnvironment />}
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <SectionHeading as="h2" title="How OTP verification works" />

      <ol className="mt-lede grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = iconFor[step.id] ?? ShoppingBag;

          return (
            <li key={step.id} className="relative">
              <BlurFade delay={0.06 * index}>
                <div className="flex flex-col items-center text-center">
                  <span className="grid size-6 place-items-center rounded-full border border-brand/25 bg-brand/[0.07] text-[11px] leading-none font-semibold text-brand tabular-nums">
                    {index + 1}
                  </span>

                  <span
                    aria-hidden
                    className="mt-3 grid size-12 place-items-center rounded-2xl border border-border bg-background text-ink/45 shadow-[0_1px_2px_rgba(11,27,54,0.04)]"
                  >
                    <Icon className="size-[22px]" strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-4 text-[14.5px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[15rem] text-[12.5px] leading-relaxed text-pretty text-ink/50">
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
