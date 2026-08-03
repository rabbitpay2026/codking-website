import { Section } from "@/components/common/Section";
import { routes } from "@/constants/routes";
import { headingClass } from "@/constants/theme";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  path: routes.pricing,
});

export default function PricingPage() {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>Pricing Page</h1>
    </Section>
  );
}
