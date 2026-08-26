import { BadgeCheck, ShieldCheck } from "lucide-react";

import { WhatsappMark } from "@/components/brand/BrandMarks";
import { demoMerchant } from "@/constants/demoMerchant";

/**
 * The business profile at the top of the thread.
 *
 * ── Whose name is on it ───────────────────────────────────────────────────
 * The merchant's, not ours, and that is the entire argument of the block. The
 * product automates the message; the store sends it. A buyer's phone showing
 * "COD King" would tell a visitor we put our name on their customers' screens,
 * which is both untrue and the opposite of what they are being sold — so the
 * header wears `demoMerchant`, the same store the hero's checkout widget wears
 * at the top of the page. One constant, two scenes, one recognisable brand.
 *
 * The avatar is the hero's merchant mark repeated — a brand-blue tile with a
 * shield on it — because a visitor who scrolls the length of the page should
 * meet the same store twice rather than two unrelated placeholder logos.
 * COD King appears exactly once in this panel, on the "Automated by" line at
 * its foot, which is where the platform belongs.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * White rather than WhatsApp's own header green. The header is where a
 * depiction like this most easily tips from "your brand, in WhatsApp" into "an
 * advertisement for WhatsApp", and a saturated bar across the top of the object
 * is what does it. WhatsApp's mark is a 16-pixel tile at the end of the row,
 * which is the order of billing this section is arguing for.
 */
export function WhatsAppHeader() {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-ink/[0.07] bg-white px-4 py-3">
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-full bg-brand shadow-[0_1px_2px_rgba(37,99,235,0.35)]"
      >
        <ShieldCheck className="size-[18px] text-white" strokeWidth={2.1} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-[13.5px] leading-none font-semibold tracking-[-0.01em] text-ink">
            {demoMerchant.name}
          </span>
          <BadgeCheck
            aria-hidden
            className="size-3.5 shrink-0 text-brand"
            strokeWidth={2.5}
          />
        </span>
        <span className="mt-1.5 flex items-center gap-1.5 text-[11px] leading-none text-ink/45">
          <span
            aria-hidden
            className="size-1.5 shrink-0 rounded-full bg-brand-check"
          />
          {demoMerchant.status}
        </span>
      </span>

      <span
        aria-hidden
        className="grid size-8 shrink-0 place-items-center rounded-full bg-ink/[0.04]"
      >
        <WhatsappMark className="size-4" />
      </span>
    </div>
  );
}
