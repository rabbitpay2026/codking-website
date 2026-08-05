import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Resources",
  path: routes.resources,
  noIndex: true,
});

/**
 * The Resources hub.
 *
 * §4.1 makes Resources a dropdown rather than a link, so this page is not a
 * primary navigation target. It exists because §3 defines `/resources` as a
 * real branch of the sitemap, and a parent that 404s while its children
 * resolve is a broken hierarchy for both merchants and crawlers.
 */
export default function ResourcesPage() {
  return <PagePlaceholder title="Resources" reference="§7" />;
}
