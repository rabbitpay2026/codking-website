import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * Third-party marks used to establish compatibility and trust.
 *
 * IMPORTANT — these are drawn approximations, not the official trademarks.
 * They are here so the composition is real rather than lorem, and every one
 * should be replaced with the vendor's own SVG from their brand-asset page
 * before this page ships. An approximated logo is acceptable in review and
 * not acceptable in production: a wrong mark is worse than no mark.
 *
 * Each is decorative beside its own visible text label, so all are hidden
 * from assistive technology rather than being given invented alt text.
 */

/** Shopify's bag silhouette, in their brand green. */
export function ShopifyMark({ className }: WithClassName) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-5", className)}
      fill="none"
    >
      <path
        d="M14.8 3.2c-.2-.1-.5-.1-.7 0-.1 0-.4.1-.8.2-.4-1.1-1-1.7-1.9-1.7h-.2c-.3-.4-.7-.6-1.2-.6-1.7 0-2.9 2.1-3.3 3.7l-1.2.4c-.4.1-.4.1-.5.5C5 6 4 13.6 4 13.6L11.6 15l4.1-.9s-.9-10.8-.9-10.9ZM11.5 2.9c-.7.2-1.4.5-2.1.7.3-1 .9-2 1.7-2.1.2.3.3.8.4 1.4Zm-1.3-2c-.9 0-1.7 1.4-2.1 2.9l-1.4.4c.4-1.4 1.3-3.3 3.5-3.3Z"
        className="fill-[#95BF47]"
      />
      <path
        d="M14.1 3.2c-.1 0-.3 0-.4.1L11.6 15l4.1-.9s-.9-10.8-.9-10.9c-.2-.1-.5-.1-.7 0Z"
        className="fill-[#5E8E3E]"
      />
      <path
        d="M12.2 7.3 11.7 9s-.6-.3-1.3-.3c-1 0-1.1.6-1.1.8 0 .9 2.4 1.2 2.4 3.4 0 1.7-1.1 2.8-2.5 2.8-1.7 0-2.6-1.1-2.6-1.1l.5-1.5s.9.8 1.7.8c.5 0 .7-.4.7-.7 0-1.2-2-1.3-2-3.3 0-1.7 1.2-3.3 3.6-3.3.9 0 1.1.3 1.1.3Z"
        className="fill-white"
      />
    </svg>
  );
}

/** Mastercard's interlocking discs. */
export function MastercardMark({ className }: WithClassName) {
  return (
    <svg
      viewBox="0 0 32 20"
      aria-hidden
      className={cn("h-4 w-auto", className)}
    >
      <circle cx="12" cy="10" r="7" className="fill-[#EB001B]" />
      <circle cx="20" cy="10" r="7" className="fill-[#F79E1B]" opacity="0.9" />
    </svg>
  );
}

/** Visa, as its wordmark. */
export function VisaMark({ className }: WithClassName) {
  return (
    <span
      aria-hidden
      className={cn(
        "text-[11px] font-bold tracking-tight text-[#1434CB] italic",
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
      className={cn("text-[11px] font-bold tracking-tight", className)}
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
      className={cn("text-[11px] font-bold tracking-tight", className)}
    >
      <span className="text-[#097939]">Ru</span>
      <span className="text-[#F26F21]">Pay</span>
    </span>
  );
}
