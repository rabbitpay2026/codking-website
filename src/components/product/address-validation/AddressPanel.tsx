import { Check, MapPinHouse, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The buyer's own details, as the checkout fills them in.
 *
 * Deliberately the same example the hero device fills on the homepage, down to
 * the digits. This control is what puts those details on that screen, so
 * showing a second invented customer here would mean the site had two examples
 * of one feature — and a visitor who scrolled the homepage would meet a
 * different person doing the same thing.
 *
 * The number is the documentation number every Indian example uses, which is
 * the point: nothing here belongs to anybody.
 */
const BUYER = {
  phone: "+91 98765 43210",
  name: "Aditi Sharma",
  line: "14 Nandanam Residency, 3rd Cross",
  area: "Indiranagar, Bengaluru",
  pin: "560038",
} as const;

/**
 * The delivery step of a Shopify checkout, filled in.
 *
 * One typed field at the top and four that arrived by themselves, with the
 * line that says where they came from. That line is the whole panel: an
 * address appearing in a form with no explanation reads as a mockup rather
 * than as a feature, and "fetched from past orders" is the difference between
 * a filled form and a filled form somebody did something to.
 *
 * The typed field is drawn as an input and the fetched ones are not. They are
 * still ordinary checkout fields — the page says so — but drawing five
 * identical boxes would lose the only distinction the panel exists to make.
 */
export function AddressPanel({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/[0.07] bg-white p-4",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-[11px] bg-gradient-to-b from-brand to-brand-deep shadow-[0_6px_16px_-8px_var(--brand)]">
          <MapPinHouse className="size-4 text-white" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[13px] leading-none font-semibold tracking-[-0.01em] text-ink">
            Delivery details
          </span>
          <span className="mt-1.5 block text-[11px] leading-none text-ink/45">
            Cash on delivery
          </span>
        </span>
      </div>

      {/* The one field the customer types. */}
      <div className="mt-3.5">
        <p className="text-[9.5px] leading-none font-semibold tracking-[0.06em] text-ink/40 uppercase">
          Mobile number
        </p>
        <p className="mt-1.5 flex items-center gap-2 rounded-xl border border-brand/25 bg-brand/[0.04] px-3 py-2">
          <span className="min-w-0 flex-1 truncate text-[12.5px] leading-none font-semibold text-ink tabular-nums">
            {BUYER.phone}
          </span>
          <span
            aria-hidden
            className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-check"
          >
            <Check className="size-2.5 text-white" strokeWidth={4} />
          </span>
        </p>
      </div>

      {/* Everything below it arrived on its own. */}
      <p className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-brand/[0.07] px-2 py-1 ring-1 ring-brand/[0.13]">
        <Sparkles aria-hidden className="size-2.5 text-brand" />
        <span className="text-[9px] leading-[1.6] font-bold tracking-[0.05em] text-ink/65 uppercase">
          Prefilled from past orders
        </span>
      </p>

      <dl className="mt-2.5 space-y-2">
        <Field label="Full name" value={BUYER.name} />
        <Field label="Address" value={BUYER.line} />
        <Field label="Area" value={BUYER.area} />
        <Field label="PIN code" value={BUYER.pin} numeric />
      </dl>
    </div>
  );
}

/**
 * One fetched field.
 *
 * Label above value rather than beside it. A two-column row would set four
 * short labels against four long values and leave the address wrapping under
 * its own label, which is the one arrangement that makes a filled form look
 * like a table.
 */
function Field({
  label,
  value,
  numeric = false,
}: {
  readonly label: string;
  readonly value: string;
  readonly numeric?: boolean;
}) {
  return (
    <div className="rounded-xl bg-ink/[0.025] px-3 py-2">
      <dt className="text-[9px] leading-none font-semibold tracking-[0.06em] text-ink/35 uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1.5 truncate text-[11.5px] leading-none font-medium text-ink/80",
          numeric && "tabular-nums",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
