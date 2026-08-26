import { ArrowRight, Shirt } from "lucide-react";

import {
  inr,
  type ProductAttachment,
} from "@/components/sections/cta/whatsapp/messages";

/**
 * The product card attached to an abandoned-cart reminder.
 *
 * The reminder is the one message in the sequence that has to sell something,
 * and a line of text saying a cart was left behind sells nothing — the buyer
 * has to see the thing they nearly bought. So the card carries what a commerce
 * message carries: the item, what it costs, and the one tap that finishes the
 * order.
 *
 * Compact by contract. It sits inside a bubble inside a thread inside a panel,
 * and at every step outwards it is the innermost object — a card that grows
 * until it dominates the viewport stops reading as an attachment and starts
 * reading as the point. Thumbnail, two lines, price and a single action row,
 * and nothing else.
 *
 * ── On the thumbnail ──────────────────────────────────────────────────────
 * There is no product photography in this repository and there should not be:
 * a stock image of a t-shirt is a claim about a merchant's catalogue that this
 * page has no business making. The thumbnail is therefore a neutral tile — the
 * site's own ink tint and a garment glyph — which reads as "a product" without
 * pretending to be a particular one. Replacing it with a real photograph is a
 * change to this element and nothing else.
 * ──────────────────────────────────────────────────────────────────────────
 */
export function ProductMessage({
  product,
}: {
  readonly product: ProductAttachment;
}) {
  return (
    <div className="mt-1.5 overflow-hidden rounded-lg border border-ink/[0.07] bg-white/95">
      <div className="flex items-center gap-2.5 p-2">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-md bg-ink/[0.05] ring-1 ring-ink/[0.06] ring-inset"
        >
          <Shirt className="size-[18px] text-ink/30" strokeWidth={1.6} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] leading-none font-semibold text-ink">
            {product.name}
          </span>
          <span className="mt-1 block truncate text-[10.5px] leading-none text-ink/45">
            {product.meta}
          </span>
          <span className="mt-1.5 block text-[12.5px] leading-none font-semibold text-ink tabular-nums">
            {inr.format(product.price)}
          </span>
        </span>
      </div>

      {/*
        The action, on its own row across the foot of the card.

        Drawn rather than interactive: this is a depiction of a message, and a
        button in it that a visitor could focus and press would be a control
        that does nothing. It sits on the site's own brand blue, because the
        thing being offered is the store's recovery link and not WhatsApp's.
      */}
      <span className="flex items-center justify-center gap-1.5 border-t border-ink/[0.07] py-1.5 text-[11.5px] leading-none font-semibold text-brand">
        {product.action}
        <ArrowRight aria-hidden className="size-3" strokeWidth={2.5} />
      </span>
    </div>
  );
}
