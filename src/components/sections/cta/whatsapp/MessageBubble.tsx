import { Check, CheckCheck, PackageCheck } from "lucide-react";

import {
  WHATSAPP,
  type AutomationMessage,
} from "@/components/sections/cta/whatsapp/messages";
import { OrderMessage } from "@/components/sections/cta/whatsapp/OrderMessage";
import { ProductMessage } from "@/components/sections/cta/whatsapp/ProductMessage";
import { cn } from "@/lib/utils";

/**
 * One message in the thread.
 *
 * ── Which way it arrives ──────────────────────────────────────────────────
 * The direction is the whole grammar of this component and it drives three
 * things at once, which is why they can never disagree: an `incoming` message
 * is the buyer's, so it sits left, is drawn white, and *enters from the left*;
 * an `outgoing` message is COD King's, so it sits right, is drawn in
 * WhatsApp's green, and enters from the right. A reader who never reads a word
 * of the thread can still see two parties talking.
 *
 * The entrance is sixteen pixels and half a second of fade — no scale, no
 * bounce, nothing that draws attention to the movement rather than to the
 * message. It runs on mount and only on mount: the caller keys each bubble by message id, so a
 * bubble that is merely being pushed up the thread by a newer one is the same
 * node and does not re-animate. The site's global reduced-motion rule
 * collapses the duration to nothing, so a visitor who asked for stillness gets
 * the messages and none of the movement.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The read receipt is on outgoing messages only, which is where WhatsApp puts
 * it: ticks are the sender's confirmation, and the sender here is COD King.
 * The meta row lives inside the bubble and is pushed to its trailing edge — a
 * timestamp under a bubble reads as a caption, and a caption is not what it is.
 */
export function MessageBubble({
  message,
}: {
  readonly message: AutomationMessage;
}) {
  const outgoing = message.direction === "outgoing";

  return (
    <div
      className={cn(
        "flex shrink-0 animate-in duration-500 ease-emphasized fade-in",
        outgoing
          ? "justify-end slide-in-from-right-4"
          : "justify-start slide-in-from-left-4",
      )}
    >
      <div
        className={cn(
          "max-w-[86%] rounded-xl px-2.5 py-2 shadow-[0_1px_1px_rgba(11,27,54,0.09)]",
          outgoing ? "rounded-br-sm" : "rounded-bl-sm bg-white",
        )}
        style={outgoing ? { backgroundColor: WHATSAPP.bubble } : undefined}
      >
        {message.order ? <OrderMessage order={message.order} /> : null}

        <span className="block text-[13px] leading-[1.5] text-ink/80">
          {message.text}
        </span>

        {message.status ? (
          <span className="mt-2 flex items-center gap-2 rounded-md bg-white/70 px-2 py-1.5">
            <PackageCheck
              aria-hidden
              className="size-3.5 shrink-0 text-brand-check"
              strokeWidth={2.2}
            />
            <span className="flex min-w-0 items-center gap-1.5 text-[11px] leading-none">
              <span className="font-semibold text-ink/70">
                {message.status.done}
              </span>
              <Check
                aria-hidden
                className="size-2.5 shrink-0 text-brand-check"
                strokeWidth={3.5}
              />
              <span aria-hidden className="text-ink/20">
                ·
              </span>
              <span className="truncate text-ink/50">
                {message.status.next}
              </span>
            </span>
          </span>
        ) : null}

        {message.product ? <ProductMessage product={message.product} /> : null}

        <span
          className={cn(
            "mt-1 flex items-center gap-1",
            outgoing ? "justify-end" : "justify-start",
          )}
        >
          <span className="text-[10px] leading-none text-ink/40 tabular-nums">
            {message.time}
          </span>
          {outgoing ? (
            <CheckCheck
              aria-hidden
              className="size-3"
              strokeWidth={2.5}
              style={{ color: WHATSAPP.read }}
            />
          ) : null}
        </span>
      </div>
    </div>
  );
}
