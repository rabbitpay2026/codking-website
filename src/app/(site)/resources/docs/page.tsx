import { DocsPageTemplate } from "@/components/templates/DocsPageTemplate";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Documentation",
  path: routes.docs,
  noIndex: true,
});

/** How to set up and configure each control (§7). */
export default function DocsPage() {
  return (
    <DocsPageTemplate title="Documentation">
      <p>Specified in Website Architecture §7. Implemented in a later phase.</p>
    </DocsPageTemplate>
  );
}
