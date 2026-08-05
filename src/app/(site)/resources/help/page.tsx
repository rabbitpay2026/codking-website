import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Help Center",
  path: routes.help,
  noIndex: true,
});

/** Troubleshooting and account questions — what to do when it goes wrong (§7). */
export default function HelpPage() {
  return <PagePlaceholder title="Help Center" reference="§7" />;
}
