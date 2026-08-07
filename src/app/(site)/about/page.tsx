import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "About",
  path: routes.about,
  noIndex: true,
});

/** Footer-only by design — trust comes from proof and reviews (§4.3). */
export default function AboutPage() {
  return <PagePlaceholder title="About" reference="§3.1" />;
}
