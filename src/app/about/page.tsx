import { Section } from "@/components/common/Section";
import { routes } from "@/constants/routes";
import { headingClass } from "@/constants/theme";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "About",
  path: routes.about,
});

export default function AboutPage() {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>About Page</h1>
    </Section>
  );
}
