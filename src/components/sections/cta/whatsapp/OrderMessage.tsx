import { Check } from "lucide-react";

import {
  inr,
  type OrderAttachment,
} from "@/components/sections/cta/whatsapp/messages";

/**
 * The order summary attached to a confirmation message.
 *
 * A real order notification does not restate the order in a sentence — it
 * attaches the order. So this is a card and not a paragraph: the reference,
 * the amount, the payment method, and the state the order is now in.
 *
 * It is drawn on white rather than on the bubble's green. Inside a coloured
 * bubble a card in the same colour is invisible and a card in a new colour is
 * a third surface; white is what WhatsApp itself uses for an attachment and it
 * lets the amount carry the weight, which is the only figure here a buyer
 * actually checks.
 */
export function OrderMessage({ order }: { readonly order: OrderAttachment }) {
  return (
    <div className="mb-1.5 rounded-lg border border-ink/[0.07] bg-white/95 px-3 py-2.5">
      <div className="flex items-start justify-between gap-2">
        <span className="min-w-0">
          <span className="block truncate text-[11px] leading-none font-semibold tracking-[0.04em] text-ink/45 uppercase">
            {order.id}
          </span>
          <span className="mt-1.5 block text-[16px] leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums">
            {inr.format(order.total)}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-check/12 px-2 py-1 text-[10.5px] leading-none font-semibold text-brand-check">
          <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
          {order.state}
        </span>
      </div>

      <div aria-hidden className="mt-2.5 h-px bg-ink/[0.06]" />

      <span className="mt-2 block text-[11.5px] leading-none font-medium text-ink/55">
        {order.method}
      </span>
    </div>
  );
}
