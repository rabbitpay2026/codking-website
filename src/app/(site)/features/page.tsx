import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Features",
  path: routes.features,
  noIndex: true,
});

/** The controls overview, grouped by order stage (§6.1). */
export default function FeaturesPage() {
  return <PagePlaceholder title="Features" reference="§6" />;
}
