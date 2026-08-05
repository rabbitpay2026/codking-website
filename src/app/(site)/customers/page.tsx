import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Customers",
  path: routes.customers,
  noIndex: true,
});

/** Named merchant stories and the live App Store review feed (§3.1). */
export default function CustomersPage() {
  return <PagePlaceholder title="Customers" reference="§3.1" />;
}
