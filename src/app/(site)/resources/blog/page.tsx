import { PagePlaceholder } from "@/components/shared/PagePlaceholder";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  path: routes.blog,
  noIndex: true,
});

/** Product news, newest first — kept separate so Guides are not buried (§7). */
export default function BlogPage() {
  return <PagePlaceholder title="Blog" reference="§7" />;
}
