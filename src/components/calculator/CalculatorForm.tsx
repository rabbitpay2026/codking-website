"use client";

import { NumberField } from "@/components/calculator/NumberField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type {
  CalculatorFieldDefinition,
  CalculatorFieldId,
  CalculatorValues,
} from "@/types";

interface CalculatorFormProps {
  readonly business: readonly CalculatorFieldDefinition[];
  readonly costs: readonly CalculatorFieldDefinition[];
  readonly assumptions: readonly CalculatorFieldDefinition[];
  readonly values: CalculatorValues;
  readonly onChange: (id: CalculatorFieldId, value: string) => void;
}

function FieldGrid({
  fields,
  values,
  onChange,
}: {
  readonly fields: readonly CalculatorFieldDefinition[];
  readonly values: CalculatorValues;
  readonly onChange: (id: CalculatorFieldId, value: string) => void;
}) {
  return (
    <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      {fields.map((field) => (
        <NumberField
          key={field.id}
          field={field}
          value={values[field.id]}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

/**
 * The input side of the calculator.
 *
 * Five questions on arrival, and twelve more behind two disclosures. That split
 * is the whole design of this panel: the costs and the improvement assumptions
 * are not optional extras — the result is wrong without them — but they ship
 * with defaults that are defensible for Indian D2C, and a merchant who is asked
 * for seventeen numbers before seeing a single one leaves.
 *
 * Both disclosures use the site's accordion, so the disclosure behaviour here
 * is the same one the FAQ uses. `type="multiple"` because the two are unrelated
 * — opening the costs to correct a shipping rate should not close the
 * assumptions someone was in the middle of reading.
 *
 * There is no submit button and no form element. The result is derived from
 * state on every keystroke, so there is nothing to submit; wrapping this in a
 * `<form>` would promise an action that does not exist and hand Enter a
 * meaning it should not have.
 */
export function CalculatorForm({
  business,
  costs,
  assumptions,
  values,
  onChange,
}: CalculatorFormProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
      <FieldGrid fields={business} values={values} onChange={onChange} />

      <Accordion type="multiple" className="mt-5 border-t border-[#ECEFF3]">
        <AccordionItem value="costs" className="border-b-0">
          <AccordionTrigger className="py-3.5 text-[13.5px] font-semibold text-ink">
            Your costs per order
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <FieldGrid fields={costs} values={values} onChange={onChange} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="assumptions"
          className="border-t border-[#ECEFF3]"
        >
          <AccordionTrigger className="py-3.5 text-[13.5px] font-semibold text-ink">
            Improvement assumptions
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            {/*
              Stated before the fields, not after. These three numbers decide
              every "with COD King" figure on the page, and a merchant is
              entitled to know that before they read one — not once they have
              already believed it.
            */}
            <p className="mb-4 rounded-[0.65rem] bg-sky-100 px-3.5 py-3 text-[12px] leading-relaxed text-ink/55">
              These are planning assumptions, not measured results. They set
              every estimated figure on this page — change them to match what
              you think is achievable for your store.
            </p>

            <FieldGrid
              fields={assumptions}
              values={values}
              onChange={onChange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
