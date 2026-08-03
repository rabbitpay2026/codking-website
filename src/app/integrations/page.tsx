import { Section } from "@/components/common/Section";
import { routes } from "@/constants/routes";
import { headingClass } from "@/constants/theme";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Integrations",
  path: routes.integrations,
});

export default function IntegrationsPage() {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>Integrations Page</h1>
    </Section>
  );
}
