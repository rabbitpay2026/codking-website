import { CodCalculator } from "@/components/calculator/CodCalculator";
import { CalculatorPageTemplate } from "@/components/templates/CalculatorPageTemplate";
import { routes } from "@/constants/routes";
import {
  getCalculatorById,
  getCalculatorDefaults,
  getCalculatorFields,
  getCalculatorPresets,
  getControlBySlug,
  getResolvedCalculatorPathways,
} from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Control } from "@/types";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "COD Calculator",
  description:
    "See what COD is costing you, and what it would take to fix it — free, no signup.",
  path: routes.codCalculator,
  noIndex: true,
});

/**
 * The site's main lead magnet: one page carrying the Savings, COD Fee and
 * Partial Payment tools (§8). The Savings tool — the COD profit & loss model —
 * is the one implemented here; the other two follow on this same route.
 *
 * Content is resolved on the server and handed down as props rather than
 * imported by the client component. The field definitions, the defaults and the
 * risk profiles are content (§11), and keeping the read on this side means the
 * interactive tree depends on the shape of that content, not on where it lives.
 *
 * The tool renders its default result in the server HTML — the state it starts
 * in is a real store, not an empty form — so the page answers its own question
 * for a crawler and for a visitor whose JavaScript never arrives (§13.1). The
 * number is never gated behind an email (§8.4).
 */
export default function CodCalculatorPage() {
  const definition = getCalculatorById("savings");

  const targets = (definition?.targetControlSlugs ?? [])
    .map((slug) => getControlBySlug(slug))
    .filter((control): control is Control => control !== undefined);

  return (
    <CalculatorPageTemplate
      title="COD Profit & Loss Calculator"
      description="Enter a month of orders to see what RTO and cancellations are taking out of your COD business — and what recovering part of it would be worth."
    >
      <CodCalculator
        fields={getCalculatorFields()}
        defaults={getCalculatorDefaults()}
        presets={getCalculatorPresets()}
        targets={targets}
        pathways={getResolvedCalculatorPathways()}
      />
    </CalculatorPageTemplate>
  );
}
