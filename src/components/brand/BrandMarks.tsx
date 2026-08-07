import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * Payment marks used inside the product screens.
 *
 * IMPORTANT — these are drawn approximations, not the official trademarks.
 * They exist so the checkout mockups read as a real payment sheet rather than
 * as grey boxes, and each should be replaced with the network's own SVG from
 * their brand-asset page before this page ships.
 *
 * Shopify's marks are the exception and are the vendor's real artwork — see
 * `ShopifyMarks.tsx`. That is the one relationship the page states as fact, so
 * it is the one mark that could not be approximated.
 *
 * Each is decorative beside its own visible text label, so all are hidden from
 * assistive technology rather than being given invented alt text.
 */

/** Mastercard's interlocking discs. */
export function MastercardMark({ className }: WithClassName) {
  return (
    <svg
      viewBox="0 0 32 20"
      aria-hidden
      className={cn("h-4 w-auto", className)}
    >
      <circle cx="12.5" cy="10" r="7" className="fill-[#EB001B]" />
      <circle cx="19.5" cy="10" r="7" className="fill-[#F79E1B]" />
      <path
        d="M16 4.6a7 7 0 0 0 0 10.8 7 7 0 0 0 0-10.8Z"
        className="fill-[#FF5F00]"
      />
    </svg>
  );
}

/** Visa, as its wordmark. */
export function VisaMark({ className }: WithClassName) {
  return (
    <span
      aria-hidden
      className={cn(
        "text-[11px] leading-none font-bold tracking-tight text-[#1434CB] italic",
        className,
      )}
    >
      VISA
    </span>
  );
}

/** UPI, as its wordmark. */
export function UpiMark({ className }: WithClassName) {
  return (
    <span
      aria-hidden
      className={cn(
        "text-[11px] leading-none font-bold tracking-tight",
        className,
      )}
    >
      <span className="text-[#097939]">U</span>
      <span className="text-[#ED752E]">P</span>
      <span className="text-[#097939]">I</span>
    </span>
  );
}

/** RuPay, as its wordmark. */
export function RupayMark({ className }: WithClassName) {
  return (
    <span
      aria-hidden
      className={cn(
        "text-[11px] leading-none font-bold tracking-tight",
        className,
      )}
    >
      <span className="text-[#097939]">Ru</span>
      <span className="text-[#F26F21]">Pay</span>
    </span>
  );
}

/** WhatsApp's handset-in-a-bubble, used where the channel is named. */
export function WhatsappMark({ className }: WithClassName) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4", className)}>
      <path
        className="fill-[#25D366]"
        d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7 1 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S18.6 0 12 0Z"
      />
      <path
        className="fill-white"
        d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.4.2-.7 0a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.4 0-.5.1-.7l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.5-.2Z"
      />
    </svg>
  );
}
