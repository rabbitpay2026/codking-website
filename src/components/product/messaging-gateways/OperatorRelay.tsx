import {
  ChevronDown,
  MessageSquareText,
  Radio,
  Smartphone,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The route a message takes, in the three parties that touch it.
 *
 * Three, because three is the whole point: the merchant is being asked to
 * understand that COD King is no longer in the middle of the billing even
 * though it is still in the middle of the sending. Two boxes cannot say that
 * and four would add a party the product does not name.
 *
 * Each note is what that party does and nothing else. None of them carries a
 * figure, a rate or a delivery claim — the relay is a diagram of an
 * arrangement, and the moment a number appears in it, it starts arguing.
 */
const RELAY: readonly {
  id: string;
  icon: LucideIcon;
  title: string;
  note: string;
}[] = [
  {
    id: "platform",
    icon: MessageSquareText,
    title: "COD King",
    note: "Platform & automation",
  },
  {
    id: "operator",
    icon: Radio,
    title: "Local operator",
    note: "Your selected provider",
  },
  {
    id: "customer",
    icon: Smartphone,
    title: "Customer",
    note: "SMS / WhatsApp updates",
  },
];

/**
 * The hero's product scene.
 *
 * A panel rather than an illustration: the merchant meets this control as a
 * setting in a dashboard, and a scene drawn as anything else sets an
 * expectation the product then has to disappoint.
 *
 * It stacks at every width. A three-across relay would fit the page at `lg`
 * and nowhere else, and a diagram that reads left-to-right on a desktop and
 * top-to-bottom on a phone is two diagrams to keep true; one direction, always
 * downward, is one.
 *
 * The two lines under the rule are the arrangement stated in money, which is
 * the part a merchant is actually deciding about. They are the same two facts
 * the benefit cards below the hero make into cards — said once here in the
 * smallest possible form, so the hero can be understood without scrolling and
 * the cards are still worth arriving at.
 */
export function OperatorRelay({ className }: WithClassName) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Key light, so the panel is lit against the field rather than placed on it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%] -z-10"
        style={{
          backgroundImage:
            "radial-gradient(46% 46% at 44% 44%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 46%, transparent 74%)",
        }}
      />

      <div
        className={cn(
          "mx-auto w-full max-w-[23rem] rounded-2xl border border-ink/[0.07] bg-white p-4 lg:mx-0 lg:max-w-none",
          "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-[11px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]">
            <Radio className="size-4 text-white" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[13px] leading-none font-semibold tracking-[-0.01em] text-ink">
              Message routing
            </span>
            <span className="mt-1.5 block text-[11px] leading-none text-ink/45">
              Sending on your selected operator
            </span>
          </span>
        </div>

        <div aria-hidden className="mt-3.5 h-px bg-ink/[0.07]" />

        <ol className="mt-3">
          {RELAY.map((stop, index) => (
            <li key={stop.id}>
              <div className="flex items-center gap-2.5 rounded-xl bg-ink/[0.02] px-2.5 py-2.5">
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-sky-50 text-ink/55"
                >
                  <stop.icon className="size-3.5" strokeWidth={1.8} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] leading-none font-semibold text-ink">
                    {stop.title}
                  </span>
                  <span className="mt-1.5 block text-[11px] leading-none text-ink/45">
                    {stop.note}
                  </span>
                </span>
              </div>

              {/*
                Between the stops and never after the last one, so the column
                ends on a party rather than on an arrow pointing at nothing.
              */}
              {index < RELAY.length - 1 ? (
                <div
                  aria-hidden
                  className="flex h-4 items-center justify-center"
                >
                  <ChevronDown
                    className="size-3.5 text-brand/45"
                    strokeWidth={2.5}
                  />
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <div aria-hidden className="mt-3.5 h-px bg-ink/[0.07]" />

        <dl className="mt-3 space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-[11px] leading-none text-ink/45">
              SMS charges
            </dt>
            <dd className="text-right text-[11.5px] leading-none font-semibold text-ink">
              Paid to the operator
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-[11px] leading-none text-ink/45">
              Subscription
            </dt>
            <dd className="text-right text-[11.5px] leading-none font-semibold text-ink">
              Paid to COD King
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
