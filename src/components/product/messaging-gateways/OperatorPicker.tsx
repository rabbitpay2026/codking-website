"use client";

import { Check, ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { OperatorMark } from "@/components/product/messaging-gateways/OperatorMark";
import { cn } from "@/lib/utils";

import type { SmsOperator, WithClassName } from "@/types";

/**
 * One row of the dropdown, spelled the way the dashboard spells it.
 *
 * The coverage is part of the label rather than a second column, because it is
 * part of the label in the product: a merchant scanning for their market is
 * scanning the option text itself. `alias` is folded in the same way, so
 * "ProWebSms (Smshare) (Global)" reads here exactly as it reads there.
 */
function optionLabel(operator: SmsOperator): string {
  const alias = operator.alias ? ` (${operator.alias})` : "";
  return `${operator.name}${alias} (${operator.coverage})`;
}

interface OperatorPickerProps extends WithClassName {
  /** The picker's default — COD King's own sending. */
  readonly fallback: SmsOperator;
  /** The local operators, in the order the dashboard lists them. */
  readonly operators: readonly SmsOperator[];
}

/**
 * The operator setting itself.
 *
 * The one control on this page that is a control. The board above it is a
 * showcase and answers "is my market covered"; this answers "and how do I
 * choose it", and replacing it with more cards would have removed the only
 * thing on the page that behaves like the product.
 *
 * A native `<select>`, not a custom listbox. Sixteen options with a default
 * that means something different from the other fifteen is exactly the case a
 * platform control already solves — keyboard, type-ahead, screen readers, and
 * a phone's own wheel — and a rebuilt one would trade all of that for a
 * matching border radius.
 *
 * Selection is held in component state and drives the panel above it, so the
 * consequence of a choice is visible in the same glance as the choice. Nothing
 * is persisted and nothing is sent: the merchant's real operator lives in
 * their COD King dashboard, and the section around this component says so
 * rather than letting the control imply otherwise.
 */
export function OperatorPicker({
  fallback,
  operators,
  className,
}: OperatorPickerProps) {
  const [slug, setSlug] = useState(fallback.slug);
  const selectId = useId();

  const selected =
    operators.find((operator) => operator.slug === slug) ?? fallback;
  const isFallback = selected.slug === fallback.slug;

  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/[0.08] bg-card p-4 shadow-card sm:p-5",
        className,
      )}
    >
      <p className="text-[11px] leading-none font-bold tracking-[0.12em] text-ink/40 uppercase">
        Selected operator
      </p>

      {/*
        The mark sits in a bordered tile of its own rather than loose beside the
        name. Fifteen operators' artwork ranges from a square icon to a 8:1
        wordmark, and without a fixed tile the name below would start at a
        different place for every one of them.
      */}
      <div className="mt-3.5 flex items-center gap-3.5">
        <span className="grid h-16 w-28 shrink-0 place-items-center rounded-xl border border-ink/[0.07] bg-sky-50 px-3.5">
          <OperatorMark operator={selected} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[15px] leading-tight font-semibold tracking-[-0.015em] text-ink">
            {selected.name}
            {selected.alias ? (
              <span className="font-medium text-ink/45">
                {" "}
                ({selected.alias})
              </span>
            ) : null}
          </span>

          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-ink/[0.09] bg-background px-2.5 py-1 text-[11px] leading-none font-semibold text-ink/60">
            {isFallback ? (
              <Check className="size-3 text-brand-check" strokeWidth={3} />
            ) : null}
            {isFallback ? "Current default" : selected.coverage}
          </span>
        </span>
      </div>

      <div aria-hidden className="mt-4 h-px bg-ink/[0.07]" />

      <label
        htmlFor={selectId}
        className="mt-4 block text-[12.5px] leading-none font-semibold text-ink/70"
      >
        Network operator
      </label>

      {/*
        The chevron is drawn rather than inherited: `appearance-none` is what
        lets the control take the site's border, radius and type, and it takes
        the platform's own arrow with it. `pointer-events-none` keeps the glyph
        from swallowing the click that opens the menu.
      */}
      <div className="relative mt-2">
        <select
          id={selectId}
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          className={cn(
            "w-full appearance-none rounded-xl border border-ink/[0.12] bg-background py-3 pr-11 pl-3.5",
            "text-[13.5px] font-medium text-ink",
            "transition-[border-color,box-shadow] duration-200 ease-[var(--ease-emphasized)]",
            "hover:border-ink/20",
            "outline-none focus-visible:border-brand/40 focus-visible:ring-2 focus-visible:ring-ring/50",
          )}
        >
          <option value={fallback.slug}>{fallback.name}</option>
          {operators.map((operator) => (
            <option key={operator.slug} value={operator.slug}>
              {optionLabel(operator)}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink/35"
        />
      </div>

      {/*
        Two sentences, one per state, and the operator's own name is written
        into the second. "You pay them directly" is the whole change a merchant
        is making here, and it lands differently when it names who.
      */}
      <p
        aria-live="polite"
        className="mt-3 text-[12.5px] leading-relaxed text-pretty text-ink/50"
      >
        {isFallback
          ? "Messages leave on COD King's own sending. Choose a local operator to send on an account you hold and settle with the operator directly."
          : `You'll pay SMS charges directly to ${selected.name} at their standard rates.`}
      </p>
    </div>
  );
}
