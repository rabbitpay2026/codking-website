import { Section } from "@/components/common/Section";
import { routes } from "@/constants/routes";
import { headingClass } from "@/constants/theme";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Features",
  path: routes.features,
});

export default function FeaturesPage() {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>Features Page</h1>
    </Section>
  );
}
