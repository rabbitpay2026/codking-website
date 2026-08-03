import { Section } from "@/components/common/Section";
import { routes } from "@/constants/routes";
import { headingClass } from "@/constants/theme";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  path: routes.contact,
});

export default function ContactPage() {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>Contact Page</h1>
    </Section>
  );
}
