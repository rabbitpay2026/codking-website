import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Integrations",
  path: routes.integrations,
  noIndex: true,
});

/** Which SMS gateways and platforms are supported (§3.1). */
export default function IntegrationsPage() {
  return <PagePlaceholder title="Integrations" reference="§3.1" />;
}
