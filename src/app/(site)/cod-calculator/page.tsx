import { CalculatorPageTemplate } from "@/components/templates/CalculatorPageTemplate";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

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
 * Partial Payment tools (§8).
 */
export default function CodCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="COD Calculator"
      description="Specified in Website Architecture §8. Implemented in a later phase."
    >
      {null}
    </CalculatorPageTemplate>
  );
}
