import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  path: routes.home,
  noIndex: true,
});

/**
 * Homepage. The twelve sections in §5.1 are built one per phase, in that
 * order, on top of this route.
 */
export default function HomePage() {
  return <PagePlaceholder title="Home" reference="§5" />;
}
