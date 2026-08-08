"use client";

import { cn } from "@/lib/utils";

import type { CalculatorFieldDefinition, CalculatorFieldId } from "@/types";

interface NumberFieldProps {
  readonly field: CalculatorFieldDefinition;
  readonly value: string;
  readonly onChange: (id: CalculatorFieldId, value: string) => void;
}

/**
 * One numeric input, driven entirely by its field definition.
 *
 * There is no generic `<Input>` in the design system yet, and adding one for
 * this page would mean deciding the site's whole form language on the strength
 * of a single screen. So the control is calculator-local: every field on this
 * page is a number with an affix and a hint, which is a narrower problem than
 * "an input" and can be solved properly rather than generally.
 *
 * The affix is positioned rather than placed in a bordered addon, so the field
 * stays one rectangle and a column of them reads as a list of answers instead
 * of a stack of widgets. The text is padded past the affix by the same amount
 * on whichever side carries it.
 *
 * Native spinners are removed. They invite click-click-click on a field whose
 * useful range is hundreds, and on mobile they are a hit target that does
 * nothing. `inputMode="decimal"` is what actually matters there: it brings up
 * the numeric keypad without rejecting a decimal point, which `numeric` would.
 */
export function NumberField({ field, value, onChange }: NumberFieldProps) {
  const inputId = `calc-${field.id}`;
  const hintId = `${inputId}-hint`;
  const isCurrency = field.unit === "currency";
  const isPercent = field.unit === "percent";

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[13px] leading-none font-medium tracking-[-0.005em] text-ink"
      >
        {field.label}
      </label>

      <div className="relative mt-2">
        {isCurrency ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[13px] text-ink/35"
          >
            ₹
          </span>
        ) : null}

        <input
          id={inputId}
          name={field.id}
          type="number"
          inputMode="decimal"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          aria-describedby={hintId}
          onChange={(event) => onChange(field.id, event.target.value)}
          className={cn(
            "h-10 w-full rounded-[0.65rem] border border-[#E5E7EB] bg-white",
            "text-[14px] font-medium text-ink tabular-nums",
            "transition-[border-color,box-shadow] duration-200 ease-[var(--ease-emphasized)]",
            "hover:border-[#D9DFE8]",
            "focus:border-brand/45 focus:ring-2 focus:ring-brand/15 focus:outline-none",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            isCurrency ? "pl-7" : "pl-3",
            isPercent ? "pr-8" : "pr-3",
          )}
        />

        {isPercent ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[13px] text-ink/35"
          >
            %
          </span>
        ) : null}
      </div>

      <p id={hintId} className="mt-1.5 text-[11.5px] leading-snug text-ink/40">
        {field.hint}
      </p>
    </div>
  );
}
