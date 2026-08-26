import { Check, Lock, Sparkles } from "lucide-react";

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

/** The checkout's own steps, so the panel is placed inside a real flow. */
const STEPS: readonly { id: string; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
];

const ACTIVE_STEP = "delivery";

/**
 * The delivery step of a Shopify checkout, filled in.
 *
 * One typed field at the top and four that arrived by themselves, with the
 * line that says where they came from. That line is the whole panel: an
 * address appearing in a form with no explanation reads as a mockup rather
 * than as a feature, and "fetched from past orders" is the difference between
 * a filled form and a filled form somebody did something to.
 *
 * The step rail and the continue button were added because the panel needed to
 * be somewhere rather than floating: a form fragment on a white rectangle is a
 * design, a form fragment between "Contact" and "Payment" with a button under
 * it is a checkout. The control's whole claim is about what happens *during*
 * a purchase, and the frame is what places it there.
 *
 * The typed field is drawn as an input and the fetched ones are not. They are
 * still ordinary checkout fields — the page says so — but drawing five
 * identical boxes would lose the only distinction the panel exists to make.
 */
export function AddressPanel({ className }: WithClassName) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-ink/[0.07] bg-white",
        "shadow-[0_1px_2px_rgba(11,27,54,0.05),0_24px_56px_-28px_rgba(11,27,54,0.45)]",
        className,
      )}
    >
      {/* The checkout's own chrome. */}
      <div className="flex items-center gap-2 border-b border-ink/[0.07] bg-sky-50 px-4 py-2.5 sm:px-5">
        <Lock aria-hidden className="size-3 shrink-0 text-ink/35" />
        <span className="text-[10.5px] leading-none font-semibold tracking-[0.04em] text-ink/45 uppercase">
          Secure checkout
        </span>
      </div>

      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <ol className="flex items-center gap-2">
          {STEPS.map((step, index) => {
            const done = index < STEPS.findIndex((s) => s.id === ACTIVE_STEP);
            const active = step.id === ACTIVE_STEP;

            return (
              <li key={step.id} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden className="h-px w-3 bg-ink/[0.12]" />
                ) : null}

                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-[11px] leading-none font-semibold",
                    active ? "text-ink" : done ? "text-ink/45" : "text-ink/30",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-4 place-items-center rounded-full text-[8px] font-bold",
                      active
                        ? "bg-brand text-white"
                        : done
                          ? "bg-brand-check/20 text-ink/50"
                          : "bg-ink/[0.07] text-ink/40",
                    )}
                  >
                    {done ? (
                      <Check className="size-2.5" strokeWidth={4} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* The one field the customer types. */}
        <div className="mt-4">
          <p className="text-[10px] leading-none font-semibold tracking-[0.06em] text-ink/40 uppercase">
            Mobile number
          </p>
          <p className="mt-2 flex items-center gap-2 rounded-xl border border-brand/25 bg-brand/[0.04] px-3.5 py-2.5">
            <span className="min-w-0 flex-1 truncate text-[13.5px] leading-none font-semibold text-ink tabular-nums">
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
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand/[0.07] px-2.5 py-1 ring-1 ring-brand/[0.13]">
          <Sparkles aria-hidden className="size-3 text-brand" />
          <span className="text-[10px] leading-[1.6] font-bold tracking-[0.05em] text-ink/65 uppercase">
            Prefilled from past orders
          </span>
        </p>

        <dl className="mt-3 space-y-2">
          <Field label="Full name" value={BUYER.name} />
          <Field label="Address" value={BUYER.line} />
          <Field label="Area" value={BUYER.area} />
          <Field label="PIN code" value={BUYER.pin} numeric />
        </dl>

        <span
          aria-hidden
          className="mt-4 flex h-10 items-center justify-center rounded-xl bg-ink text-[13px] font-semibold text-white shadow-[0_1px_2px_rgba(11,27,54,0.2)]"
        >
          Continue to payment
        </span>
      </div>

      <p className="flex items-center justify-center gap-1.5 border-t border-ink/[0.07] bg-ink/[0.015] px-4 py-2.5 text-[11px] leading-none text-ink/45">
        <span className="font-semibold text-ink/60">1 field</span> typed
        <span aria-hidden className="text-ink/20">
          ·
        </span>
        <span className="font-semibold text-ink/60">4 fields</span> filled in
      </p>
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
    <div className="rounded-xl bg-ink/[0.025] px-3.5 py-2.5">
      <dt className="text-[10px] leading-none font-semibold tracking-[0.06em] text-ink/40 uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1.5 truncate text-[12.5px] leading-none font-medium text-ink/80",
          numeric && "tabular-nums",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
