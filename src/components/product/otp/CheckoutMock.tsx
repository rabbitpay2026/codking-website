import { Check, ShieldCheck } from "lucide-react";

import { IndiaFlag } from "@/components/product/otp/IndiaFlag";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

import type { CheckoutStage } from "@/types";

const CODE = ["4", "9", "2", "7", "1", "6"] as const;

/** One line of an address the buyer has already typed. */
function FieldLine({ width }: { readonly width: string }) {
  return (
    <span
      className="block h-1.5 rounded-full bg-ink/[0.09]"
      style={{ width }}
    />
  );
}

/** The label above a group of checkout fields. */
function FieldLabel({ children }: { readonly children: string }) {
  return (
    <p className="text-[8.5px] font-bold tracking-[0.12em] text-ink/35 uppercase">
      {children}
    </p>
  );
}

interface CheckoutMockProps {
  /**
   * Which of the three checkout moments this is drawing. `before` and `after`
   * are deliberately the same screen with two rows changed — that identity is
   * the argument the walkthrough is making.
   */
  readonly stage?: CheckoutStage["id"];
  /** Window controls at the head, for a mock standing in for a browser. */
  readonly chrome?: boolean;
  readonly className?: string;
}

/**
 * A Shopify checkout, drawn small.
 *
 * Deliberately generic and deliberately unbranded. This is somebody else's
 * surface — the merchant's store inside Shopify's checkout — and drawing it
 * with real copy and a real logo would be claiming a screen we do not own.
 * What it needs to say is only "this is the checkout you already have", so the
 * address is rules rather than text and nothing in it competes with the one
 * element on the page that is ours.
 *
 * The three stages differ in exactly two rows: the payment line and the
 * action under it. Everything else is identical between `before` and `after`,
 * which is the point the checkout walkthrough is making and would be lost the
 * moment the two were drawn separately.
 *
 * Only the address block flexes. Every other row is fixed, so the same
 * component reads correctly behind the hero's verification panel and at
 * two-thirds that height in the walkthrough, with the leftover going
 * somewhere it cannot look wrong.
 *
 * Purely decorative: it repeats what the copy beside it already states, so it
 * is hidden from assistive technology rather than announced twice.
 */
export function CheckoutMock({
  stage = "before",
  chrome = false,
  className,
}: CheckoutMockProps) {
  const verifying = stage === "verify";
  const placed = stage === "after";

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[1.1rem] border border-border bg-card",
        "shadow-[0_1px_2px_rgba(11,27,54,0.04)]",
        className,
      )}
    >
      {chrome ? (
        <div className="flex shrink-0 items-center gap-1.5 border-b border-border bg-gradient-to-b from-cloud to-card px-3.5 py-2.5">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-3.5">
        {/* Contact — the number the whole control turns on. */}
        <div className="shrink-0">
          <FieldLabel>Contact</FieldLabel>
          <div className="mt-1.5 flex h-8 items-center gap-1.5 rounded-lg border border-ink/10 bg-background px-2">
            <IndiaFlag className="h-2.5 w-[15px]" />
            <span className="text-[10px] font-semibold text-ink/70 tabular-nums">
              +91 98765 43210
            </span>
            {placed ? (
              <span className="ml-auto grid size-3.5 shrink-0 place-items-center rounded-full bg-brand-check">
                <Check className="size-2 text-white" strokeWidth={3} />
              </span>
            ) : null}
          </div>
        </div>

        {/* Shipping address, as rules rather than as somebody's real address. */}
        <div className="flex min-h-0 flex-1 flex-col">
          <FieldLabel>Shipping address</FieldLabel>
          <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-center gap-2 overflow-hidden rounded-lg border border-ink/10 bg-background px-2">
            <FieldLine width="78%" />
            <FieldLine width="92%" />
            <FieldLine width="58%" />
          </div>
        </div>

        {/* Payment, and what it becomes once the order is through. */}
        <div className="shrink-0">
          <FieldLabel>{placed ? "Order status" : "Payment"}</FieldLabel>
          {placed ? (
            <p className="mt-1.5 flex h-8 items-center gap-1.5 rounded-lg bg-brand-check/14 px-2 text-[9.5px] font-semibold text-ink/75">
              <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-brand-check">
                <Check className="size-2 text-white" strokeWidth={3} />
              </span>
              Order placed successfully
            </p>
          ) : (
            <div className="mt-1.5 flex h-8 items-center gap-1.5 rounded-lg border border-ink/10 bg-background px-2">
              <span className="grid size-3 shrink-0 place-items-center rounded-full border-[1.5px] border-ink/45">
                <span className="size-1.5 rounded-full bg-ink/70" />
              </span>
              <span className="text-[9.5px] font-semibold text-ink/70">
                Cash on Delivery
              </span>
            </div>
          )}
        </div>

        {/* The action. */}
        {placed ? (
          <p className="grid h-8 shrink-0 place-items-center rounded-lg border border-ink/12 bg-background text-[10px] font-semibold text-ink/70">
            View order
          </p>
        ) : (
          <p
            className={cn(
              "grid h-8 shrink-0 place-items-center rounded-lg bg-ink text-[10px] font-semibold text-white",
              "transition-opacity duration-300",
              verifying && "opacity-45",
            )}
          >
            Place order
          </p>
        )}
      </div>

      {/*
        The verification step, laid over the checkout rather than beside it.

        Over is the whole point of the section: the merchant is being shown
        that COD King adds one step *inside* the checkout they already have,
        and a card sitting next to the screen would be arguing the opposite.
      */}
      {verifying ? (
        <>
          <div className="absolute inset-0 bg-ink/[0.07] backdrop-blur-[1px]" />

          <div className="absolute inset-x-2.5 top-1/2 -translate-y-1/2 rounded-[0.85rem] border border-border bg-card p-2.5 shadow-[0_10px_30px_-12px_rgba(11,27,54,0.45)]">
            <div className="flex items-center gap-1.5">
              <span className="grid size-4 shrink-0 place-items-center rounded-[5px] bg-brand">
                <ShieldCheck className="size-2.5 text-white" />
              </span>
              <p className="text-[9.5px] leading-none font-semibold text-ink">
                Verify mobile number
              </p>
            </div>

            <div className="mt-2 flex gap-1">
              {CODE.map((digit, index) => (
                <span
                  key={`${digit}-${index}`}
                  className="grid h-6 min-w-0 flex-1 place-items-center rounded-[5px] border border-brand/45 bg-background text-[10px] font-bold text-ink tabular-nums"
                >
                  {digit}
                </span>
              ))}
            </div>

            <p className="mt-2 grid h-6 place-items-center rounded-md bg-brand text-[9px] font-semibold text-white">
              Verify &amp; place order
            </p>
            <p className="mt-1.5 text-center text-[8px] font-medium text-ink/35">
              Powered by{" "}
              <span className="font-bold text-ink/55">{siteConfig.name}</span>
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
