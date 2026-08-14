"use client";

import { cn } from "@/lib/utils";

import type { CalculatorPreset, CalculatorPresetId } from "@/types";

interface ScenarioPresetsProps {
  readonly presets: readonly CalculatorPreset[];
  readonly activeId: CalculatorPresetId | null;
  readonly onSelect: (preset: CalculatorPreset) => void;
}

/**
 * Three starting risk profiles.
 *
 * A merchant who cannot recall their RTO rate stalls on the third field, and a
 * calculator that cannot be started is worth nothing. Picking a profile fills
 * only the COD behaviour fields, never the order count or order value — those
 * are the two numbers a merchant is certain about, and overwriting them would
 * be taking away the part of the answer they already trust.
 *
 * Rendered as a radio group rather than buttons: the three are mutually
 * exclusive and one can be current, which is exactly what a radio group means
 * to a screen reader. The selection drops to none as soon as any of the three
 * fields is edited by hand, because the row would otherwise keep claiming a
 * profile the numbers no longer match.
 */
export function ScenarioPresets({
  presets,
  activeId,
  onSelect,
}: ScenarioPresetsProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Starting risk profile"
      className="flex flex-wrap gap-2"
    >
      {presets.map((preset) => {
        const active = preset.id === activeId;

        return (
          <button
            key={preset.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={preset.description}
            onClick={() => onSelect(preset)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium",
              "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-emphasized)]",
              "focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:outline-none",
              active
                ? "border-brand/30 bg-brand-soft text-brand-deep"
                : "border-[#E5E7EB] bg-white text-ink/55 hover:border-[#D9DFE8] hover:text-ink",
            )}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}
