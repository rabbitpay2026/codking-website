import { Check, CheckCheck } from "lucide-react";

import { WhatsAppMark } from "@/components/brand/SocialMarks";
import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * The example order the thread is about.
 *
 * The same shape the closing WhatsApp demonstration on the homepage uses — an
 * id and a value, no buyer name and no address. A second invented person on
 * this page would mean the site had two customers doing one thing.
 */
const ORDER = { id: "#1087", total: 2450 } as const;

/**
 * The messages, in the order a cash order produces them.
 *
 * Every one is something this repository already publishes for these controls:
 * the one-time password (OTP Verification), the order notification and the
 * fulfilment updates (Messaging Gateways), and the abandoned-cart reminder
 * (Abandoned Cart Recovery). There is no tracking number, no courier name and
 * no delivery promise anywhere in it, because the product publishes none of
 * those.
 *
 * `label` is the trigger rather than the text — what made COD King send this —
 * because the trigger is the part a merchant is buying. The bubble shows what
 * the customer reads; the label shows what the merchant configured.
 */
const THREAD: readonly {
  id: string;
  label: string;
  body: string;
  outgoing: boolean;
}[] = [
  {
    id: "otp",
    label: "OTP verification",
    body: "Your COD King verification code is 4821. Do not share it with anyone.",
    outgoing: true,
  },
  {
    id: "confirmed",
    label: "Order confirmed",
    body: `Order ${ORDER.id} for ${inr.format(ORDER.total)} is confirmed. Payment method: Cash on Delivery.`,
    outgoing: true,
  },
  {
    id: "reply",
    label: "Customer reply",
    body: "Thanks — please deliver after 6pm.",
    outgoing: false,
  },
  {
    id: "dispatch",
    label: "Out for delivery",
    body: `Order ${ORDER.id} is out for delivery today. Please keep ${inr.format(ORDER.total)} ready.`,
    outgoing: true,
  },
];

/** The rest of what COD King sends, named rather than drawn. */
const TRIGGERS: readonly string[] = [
  "Order packed",
  "Payment update",
  "Delivered",
  "Abandoned cart",
];

/**
 * A branded conversation, as the customer receives it.
 *
 * The one product scene on the site that is not a dashboard, and deliberately
 * so: every other control is something the merchant operates, and this one is
 * something the customer *reads*. A panel of settings would have shown where
 * the feature is configured and nothing about what it produces — and what it
 * produces is the reason to buy it.
 *
 * The header carries the store's own name and a verified mark, because
 * "branded" is the claim: these arrive from the store rather than from an
 * anonymous sender. The green is WhatsApp's own, used only in the header and
 * the outgoing bubbles where it identifies the channel, and nowhere else on
 * the page — the site's palette is otherwise untouched.
 *
 * Each bubble is captioned with the trigger that sent it, so the thread reads
 * as a specification rather than as a screenshot. The four triggers underneath
 * are the rest of what COD King sends: naming them costs four words each,
 * where drawing them would have made the panel twice as tall for no more
 * information.
 */
export function MessageThread({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-ink/[0.07] bg-white",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        className,
      )}
    >
      {/* The channel, and whose account it is. */}
      <div className="flex items-center gap-2.5 bg-[#075E54] px-4 py-3 sm:px-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white">
          <WhatsAppMark className="size-5" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-[13.5px] leading-none font-semibold text-white">
              Your store
            </span>
            <span
              aria-hidden
              className="grid size-3.5 shrink-0 place-items-center rounded-full bg-white/25"
            >
              <Check className="size-2 text-white" strokeWidth={4} />
            </span>
          </span>
          <span className="mt-1.5 block text-[10.5px] leading-none text-white/60">
            Business account
          </span>
        </span>
      </div>

      {/* The thread. */}
      <ul className="space-y-3 bg-[#ECE5DD]/45 px-4 py-4 sm:px-5">
        {THREAD.map((message) => (
          <li
            key={message.id}
            className={cn(
              "flex flex-col",
              message.outgoing ? "items-end" : "items-start",
            )}
          >
            <span
              className={cn(
                "text-[10px] leading-none font-bold tracking-[0.06em] text-ink/40 uppercase",
                message.outgoing ? "pr-1" : "pl-1",
              )}
            >
              {message.label}
            </span>

            <span
              className={cn(
                "mt-1.5 max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed text-pretty shadow-[0_1px_1px_rgba(11,27,54,0.08)]",
                message.outgoing
                  ? "rounded-tr-sm bg-[#DCF8C6] text-ink/80"
                  : "rounded-tl-sm bg-white text-ink/70",
              )}
            >
              {message.body}

              {message.outgoing ? (
                <CheckCheck
                  aria-hidden
                  className="mt-1.5 ml-auto block size-3 text-[#4FC3F7]"
                  strokeWidth={2.4}
                />
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      {/* Everything else the same connection carries. */}
      <div className="border-t border-ink/[0.07] px-4 py-3.5 sm:px-5">
        <p className="text-[10px] leading-none font-bold tracking-[0.1em] text-ink/40 uppercase">
          Also sent on this connection
        </p>

        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {TRIGGERS.map((trigger) => (
            <li key={trigger}>
              <span className="inline-flex items-center rounded-full border border-ink/[0.09] bg-sky-50 px-2.5 py-1 text-[11px] leading-none font-medium text-ink/55">
                {trigger}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
