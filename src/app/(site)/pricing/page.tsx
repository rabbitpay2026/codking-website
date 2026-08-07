import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  path: routes.pricing,
  noIndex: true,
});

/** Plans and per-message pricing, stated plainly (§3.1). */
export default function PricingPage() {
  return <PagePlaceholder title="Pricing" reference="§3.1" />;
}
