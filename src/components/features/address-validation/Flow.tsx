import { ArrowRight, Check, Sparkles } from "lucide-react";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  getAddressFlowResult,
  getAddressFlowSteps,
  getAddressPageCopy,
} from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The checkout's five delivery fields, in the order it asks for them.
 *
 * The same five the product scene fills, so the three states below and the
 * panel in the hero are the same form at different moments rather than two
 * drawings of a form.
 */
const FIELDS: readonly string[] = [
  "Mobile number",
  "Full name",
  "Address",
  "Area",
  "PIN code",
];

/**
 * How many fields are filled at each moment, and by whom.
 *
 * `typed` is what the customer entered; `fetched` is what arrived on its own.
 * Everything past `typed + fetched` is still empty. Three states, one array,
 * so the story cannot get out of step with itself.
 */
const STATES: readonly {
  id: string;
  caption: string;
  typed: number;
  fetched: number;
}[] = [
  { id: "arrive", caption: "Nothing filled", typed: 0, fetched: 0 },
  { id: "identify", caption: "One field typed", typed: 1, fetched: 0 },
  { id: "prefill", caption: "Four fields fetched", typed: 1, fetched: 4 },
];

/**
 * One moment in the checkout, as the form actually looks.
 *
 * A skeleton rather than lettering. The point being made is about *how many
 * boxes are still empty*, and real text in the boxes would invite the reader
 * to read it instead of counting them — which is the one thing this diagram
 * does not want. The typed field carries the brand, the fetched ones a lighter
 * fill, and the empty ones nothing at all, so the three states are legible at
 * a glance and from across the room.
 */
function FormState({
  state,
  index,
}: {
  readonly state: (typeof STATES)[number];
  readonly index: number;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-ink/[0.08] bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] leading-none font-bold tracking-[0.12em] text-ink/35 uppercase">
          Step {index + 1}
        </span>

        {state.fetched > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand/[0.08] px-2 py-1 ring-1 ring-brand/15">
            <Sparkles aria-hidden className="size-2.5 text-brand" />
            <span className="text-[10px] leading-none font-bold tracking-[0.04em] text-ink/60 uppercase">
              Prefilled
            </span>
          </span>
        ) : null}
      </div>

      <ul aria-hidden className="mt-4 space-y-2">
        {FIELDS.map((field, fieldIndex) => {
          const typed = fieldIndex < state.typed;
          const fetched =
            fieldIndex >= state.typed &&
            fieldIndex < state.typed + state.fetched;

          return (
            <li
              key={field}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2",
                typed
                  ? "border border-brand/25 bg-brand/[0.05]"
                  : fetched
                    ? "bg-ink/[0.035]"
                    : "border border-dashed border-ink/[0.12] bg-transparent",
              )}
            >
              <span
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  typed
                    ? "bg-brand/60"
                    : fetched
                      ? "bg-ink/20"
                      : "bg-ink/[0.07]",
                )}
                style={{ maxWidth: `${58 + ((fieldIndex * 13) % 34)}%` }}
              />

              {typed || fetched ? (
                <span
                  className={cn(
                    "grid size-3.5 shrink-0 place-items-center rounded-full",
                    typed ? "bg-brand-check" : "bg-ink/15",
                  )}
                >
                  <Check
                    className={cn(
                      "size-2",
                      typed ? "text-white" : "text-white/90",
                    )}
                    strokeWidth={4}
                  />
                </span>
              ) : (
                <span className="size-3.5 shrink-0" />
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-auto pt-4 text-[12px] leading-none font-semibold text-ink/45">
        {state.caption}
      </p>
    </div>
  );
}

/**
 * How the form fills itself.
 *
 * The same checkout at three moments, side by side, rather than the shared
 * four-card flow. This control's argument is entirely about a *quantity* —
 * how much of the form the customer still has to fill — and a quantity is
 * shown by putting the before and the after next to each other, not by writing
 * four paragraphs about it.
 *
 * The step copy is read from the repository, so this presentation cannot
 * describe the control differently from the knowledge base or the mega-menu.
 * Five records exist; three of them are moments the form is in, and the two
 * that are not — the customer arriving, the order going through — are drawn as
 * the rail beneath instead of as two more mockups of a form that has not
 * changed.
 */
export function Flow() {
  const copy = getAddressPageCopy();
  const steps = getAddressFlowSteps();

  const byId = new Map(steps.map((step) => [step.id, step]));

  /*
    The two beats the three mockups do not show. `STATES` already renders
    `arrive`, `identify` and `prefill` under their own form, so taking those
    ids again here would print the same sentence twice on the same band — which
    is exactly what it did before this was keyed off the remainder.
  */
  const shown = new Set(STATES.map((state) => state.id));
  const rest = steps.filter((step) => !shown.has(step.id));

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
        {/*
          Two shared tracks — the mockup, and the caption under it — adopted by
          every column with `subgrid`. The captions run to two lines in one
          column and three in another, so independently sized columns would end
          their forms on three different baselines. A browser without subgrid
          falls back to each column sizing itself: legible, slightly ragged.
        */}
        <ul className="grid items-stretch gap-4 sm:grid-cols-3 sm:grid-rows-[auto_auto] sm:gap-x-3 sm:gap-y-0 lg:gap-x-5">
          {STATES.map((state, index) => {
            const step = byId.get(state.id);

            return (
              <li
                key={state.id}
                className="relative flex h-full flex-col sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:gap-0"
              >
                <FormState state={state} index={index} />

                {/*
                  The arrow sits in the gutter between two states and turns
                  with the layout. It is not drawn after the last one, because
                  the last one is the answer rather than another step.
                */}
                {index < STATES.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 -right-3.5 hidden -translate-y-1/2 text-brand/45 sm:block lg:-right-4"
                  >
                    <ArrowRight className="size-5" strokeWidth={2} />
                  </span>
                ) : null}

                {step ? (
                  <div className="mt-4 sm:row-start-2">
                    <h3 className="text-[14px] leading-snug font-semibold tracking-[-0.012em] text-balance text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-pretty text-ink/50">
                      {step.body}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/*
          Everything the mockups do not show — the lookup itself, and the order
          going through. Drawn as a rule rather than as two more panels,
          because neither of them is a state of the form.
        */}
        {rest.length > 0 ? (
          <ul className="mt-8 grid gap-3 border-t border-ink/[0.07] pt-6 sm:grid-cols-2 sm:gap-8">
            {rest.map((step) => (
              <li key={step.id} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-check/15"
                >
                  <Check className="size-3 text-ink/55" strokeWidth={3} />
                </span>
                <span>
                  <span className="block text-[13px] leading-snug font-semibold text-ink">
                    {step.title}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-pretty text-ink/50">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-7 text-center text-[13px] leading-relaxed text-pretty text-ink/55">
          <span className="font-semibold text-ink/70">
            {getAddressFlowResult()}
          </span>
        </p>
      </BlurFade>
    </SectionShell>
  );
}
