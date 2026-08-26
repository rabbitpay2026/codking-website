import { ArrowRight, Landmark, LayoutGrid } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { cardHoverClass } from "@/constants/theme";
import { getGatewayPageCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

/**
 * The two bills, as the product's own screen states them.
 *
 * `title` and `body` are the screen's benefit pair verbatim. `path` is that
 * same pair drawn rather than written: who pays whom, and for what. Nothing
 * else is added — no rate, no plan price, no percentage — because the moment
 * one of these cards carries a number the other one has to carry a comparable
 * one, and the product publishes neither.
 */
const MODELS: readonly {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  path: readonly [string, string];
  outcome: string;
}[] = [
  {
    id: "operator",
    icon: Landmark,
    title: "Pay directly to SMS operators",
    body: "No markup, competitive local rates.",
    path: ["Your store", "Your selected operator"],
    outcome: "Messaging charges, at the operator's standard rates",
  },
  {
    id: "platform",
    icon: LayoutGrid,
    title: "Subscription to COD King",
    body: "Pay only for platform features and support.",
    path: ["Your store", "COD King"],
    outcome: "Platform features and support",
  },
];

/**
 * Where each payment goes.
 *
 * The first band under the hero, and the one the page is named for. A merchant
 * arriving on "Direct-to-Operator Payment Model" has one question — direct
 * instead of what? — and every other band on this page is easier to read once
 * it has been answered.
 *
 * Two cards rather than a table. A table would invite a third column of rates
 * to compare, and the claim here is not that one bill is smaller than the
 * other; it is that they are separate, and that nothing is added on top of
 * either.
 *
 * White cards with a hairline and a soft shadow, as everywhere else on the
 * site. Neither is tinted: colouring the operator card would make the
 * arrangement look like a promotion, and colouring both would make the band
 * shout over the results directly beneath it.
 */
export function PaymentModel() {
  const copy = getGatewayPageCopy();

  return (
    <SectionShell size="compact" className="border-t border-ink/[0.07]">
      <SectionHeading
        as="h2"
        eyebrow={copy.paymentEyebrow}
        title={copy.paymentTitle}
        description={copy.paymentDescription}
      />

      <ul className="mt-9 grid items-stretch gap-3 sm:grid-cols-2">
        {MODELS.map((model, index) => (
          <li key={model.id} className="h-full">
            <BlurFade delay={0.04 * index} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border border-ink/[0.08] bg-card px-5 py-5",
                  cardHoverClass,
                )}
              >
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-sky-50 text-ink/45"
                >
                  <model.icon className="size-[18px]" strokeWidth={1.7} />
                </span>

                <h3 className="mt-4 text-[15px] leading-snug font-semibold tracking-[-0.015em] text-balance text-ink">
                  {model.title}
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-pretty text-ink/50">
                  {model.body}
                </p>

                {/*
                  `mt-auto` rather than a fixed gap: the two bodies are one line
                  apart at some widths and two at others, and a path that starts
                  at a different height in each card stops reading as the same
                  kind of object.
                */}
                <div className="mt-auto pt-5">
                  <div className="rounded-lg border border-ink/[0.07] bg-sky-50 px-3.5 py-3">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      {model.path.map((stop, stopIndex) => (
                        <span key={stop} className="flex items-center gap-2">
                          {stopIndex > 0 ? (
                            <ArrowRight
                              aria-hidden
                              className="size-3.5 shrink-0 text-brand/50"
                              strokeWidth={2.5}
                            />
                          ) : null}
                          <span className="text-[12.5px] leading-none font-semibold text-ink">
                            {stop}
                          </span>
                        </span>
                      ))}
                    </p>

                    <p className="mt-2 text-[12px] leading-snug text-pretty text-ink/50">
                      {model.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
