"use client";

import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { LeakageBreakdown } from "@/components/calculator/LeakageBreakdown";
import { RecoverySummary } from "@/components/calculator/RecoverySummary";
import { ResultsPanel } from "@/components/calculator/ResultsPanel";
import { ScenarioPresets } from "@/components/calculator/ScenarioPresets";
import { SolutionPathways } from "@/components/calculator/SolutionPathways";
import {
  computeCalculator,
  parseCalculatorValues,
  toCalculatorValues,
} from "@/utils";

import type {
  CalculatorFieldDefinition,
  CalculatorFieldId,
  CalculatorInput,
  CalculatorPreset,
  CalculatorPresetId,
  CalculatorValues,
  Control,
  ResolvedCalculatorPathway,
} from "@/types";

interface CodCalculatorProps {
  readonly fields: readonly CalculatorFieldDefinition[];
  readonly defaults: CalculatorInput;
  readonly presets: readonly CalculatorPreset[];
  readonly targets: readonly Control[];
  readonly pathways: readonly ResolvedCalculatorPathway[];
}

/**
 * The state owner.
 *
 * Everything below this component is presentational, and everything the model
 * knows lives in `@/utils/calculator`. This file only holds what the merchant
 * has typed and asks the engine what it means — which is what lets the
 * assumptions be revised without touching a single piece of markup.
 *
 * The result is recomputed on every keystroke rather than behind a "calculate"
 * button. A number that moves while you edit the input above it is the thing
 * that makes a calculator feel like a model of your business instead of a form;
 * the whole computation is a few dozen multiplications, so there is nothing to
 * defer.
 *
 * State is deliberately not persisted or lifted to the URL. Every figure here
 * is derived from public assumptions and the merchant's own numbers, and a
 * calculator that quietly remembers a store's margins across sessions is
 * carrying data it was never asked to keep.
 */
export function CodCalculator({
  fields,
  defaults,
  presets,
  targets,
  pathways,
}: CodCalculatorProps) {
  const initialValues = useMemo(() => toCalculatorValues(defaults), [defaults]);
  const [values, setValues] = useState<CalculatorValues>(initialValues);

  const grouped = useMemo(
    () => ({
      business: fields.filter((field) => field.group === "business"),
      costs: fields.filter((field) => field.group === "costs"),
      assumptions: fields.filter((field) => field.group === "assumptions"),
    }),
    [fields],
  );

  const input = useMemo(
    () => parseCalculatorValues(values, fields, defaults),
    [values, fields, defaults],
  );

  const result = useMemo(() => computeCalculator(input), [input]);

  /**
   * Which preset the current numbers still match.
   *
   * Derived rather than stored, so editing a rate by hand drops the highlight
   * on its own. A stored selection would keep claiming "Average RTO" over an
   * RTO rate the merchant had just changed to 38.
   */
  const activePresetId: CalculatorPresetId | null = useMemo(() => {
    const match = presets.find((preset) =>
      (Object.entries(preset.values) as [CalculatorFieldId, number][]).every(
        ([id, value]) => input[id] === value,
      ),
    );

    return match?.id ?? null;
  }, [presets, input]);

  function handleChange(id: CalculatorFieldId, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  function handlePreset(preset: CalculatorPreset) {
    setValues((current) => {
      const next = { ...current };

      for (const [id, value] of Object.entries(preset.values) as [
        CalculatorFieldId,
        number,
      ][]) {
        next[id] = String(value);
      }

      return next;
    });
  }

  const modified = useMemo(
    () =>
      (Object.keys(initialValues) as CalculatorFieldId[]).some(
        (id) => values[id] !== initialValues[id],
      ),
    [values, initialValues],
  );

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ScenarioPresets
          presets={presets}
          activeId={activePresetId}
          onSelect={handlePreset}
        />

        {modified ? (
          <button
            type="button"
            onClick={() => setValues(initialValues)}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink/45 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:outline-none"
          >
            <RotateCcw aria-hidden className="size-3" />
            Reset
          </button>
        ) : null}
      </div>

      {/*
        Inputs take three fifths and the answer two, which is the reverse of
        how these are usually built. The form is the part with seventeen
        controls in it; giving it the wider column keeps its fields in two
        readable columns instead of squeezing them into one tall stack.

        The result sticks on desktop so it stays on screen while the merchant
        works down the cost fields — the point of live recalculation is lost if
        the figure it updates has scrolled away. On tablet and mobile it simply
        follows the form, which is the right order to read it in when both
        cannot be seen at once.
      */}
      <div className="mt-4 grid gap-5 lg:grid-cols-5 lg:items-start">
        <div className="lg:col-span-3">
          <CalculatorForm
            business={grouped.business}
            costs={grouped.costs}
            assumptions={grouped.assumptions}
            values={values}
            onChange={handleChange}
          />
        </div>

        {/*
          The height cap is what makes the sticky safe. A pinned element taller
          than the viewport can never be scrolled to the end of — it is stuck,
          so there is nothing left to scroll — and this panel runs to roughly
          750px, which clears a 1366×768 laptop's viewport. Capping it lets the
          overflow scroll inside the card on a short window, and does nothing at
          all on a tall one, where `auto` shows no scrollbar.
        */}
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+1.25rem)] lg:col-span-2 lg:max-h-[calc(100dvh-var(--spacing-header)-2.5rem)] lg:overflow-y-auto lg:overscroll-contain">
          <ResultsPanel result={result} targets={targets} />
        </div>
      </div>

      {/*
        Everything below is driven by the same `result` object as the panel
        above, so there is one computation per keystroke and no second path a
        figure could arrive by. That is what makes "change RTO from 25% to 35%
        and everything updates" true by construction rather than by discipline.
      */}
      <div className="mt-10">
        <LeakageBreakdown current={result.current} />
        <SolutionPathways result={result} pathways={pathways} />
        <RecoverySummary result={result} />
      </div>
    </div>
  );
}
