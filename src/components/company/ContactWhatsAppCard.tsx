import { ArrowUpRight } from "lucide-react";

import { WhatsAppMark } from "@/components/brand/SocialMarks";
import { panelHoverClass } from "@/constants/theme";
import { getContactWhatsApp } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The page's primary action: open a WhatsApp thread with the message written.
 *
 * Given more weight than the other channels because it is the one that produces
 * an answer immediately, and because in the markets this product sells into it
 * is the channel a merchant already lives in. The whole card is the target, not
 * a button inside it — a card this size with a small link in the corner is a
 * card most people will tap in the wrong place.
 *
 * `panelHoverClass` rather than `cardHoverClass`: this is the widest object in
 * its column and it holds the action, so it warms and elevates without moving.
 * A primary target that steps three pixels out from under the finger reaching
 * for it is a hover state working against the page.
 *
 * It renders nothing when no number is configured, rather than rendering a card
 * whose button goes nowhere.
 */
export function ContactWhatsAppCard() {
  const whatsapp = getContactWhatsApp();

  if (!whatsapp) return null;

  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-sky-100 to-background p-6",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        panelHoverClass,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(46% 60% at 12% 0%, color-mix(in oklab, var(--brand) 8%, transparent), transparent 68%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/70 bg-white/80 text-ink/50 shadow-[0_1px_2px_rgba(11,27,54,0.05)] backdrop-blur-sm transition-colors duration-300 ease-emphasized group-hover:text-brand"
        >
          <WhatsAppMark className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[1.0625rem] leading-snug font-semibold tracking-[-0.02em] text-ink">
            {whatsapp.title}
            <ArrowUpRight
              aria-hidden
              className="size-4 shrink-0 text-ink/30 transition-[transform,color] duration-300 ease-emphasized group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-brand"
            />
          </p>

          <p className="mt-2 text-[13.5px] leading-relaxed text-pretty text-ink/55">
            {whatsapp.body}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white/70 px-3 py-1.5 text-[13px] font-semibold text-ink tabular-nums backdrop-blur-sm">
            {whatsapp.number}
          </p>
        </div>
      </div>

      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
