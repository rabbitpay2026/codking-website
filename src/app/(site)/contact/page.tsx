import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  path: routes.contact,
  noIndex: true,
});

/** Footer-only by design (§4.3). */
export default function ContactPage() {
  return <PagePlaceholder title="Contact" reference="§3.1" />;
}
