import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Guides",
  path: routes.guides,
  noIndex: true,
});

/** Evergreen how-to content that ranks in search and educates (§7). */
export default function GuidesPage() {
  return <PagePlaceholder title="Guides" reference="§7" />;
}
