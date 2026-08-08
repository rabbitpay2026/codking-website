import { FeatureShowcase } from "@/components/features/FeatureShowcase";
import { FeaturesHero } from "@/components/features/FeaturesHero";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description:
    "The COD controls COD King gives a Shopify store: OTP verification, upfront partial payments, prepaid conversion, abandoned cart recovery, COD rules and COD fees.",
  path: routes.features,
});

/**
 * The controls overview (§6.2).
 *
 * A composition file and nothing more: both sections read their own content
 * from the repository, so this page states what it is made of and holds no
 * copy of its own.
 *
 * It is a showcase, not a list. The homepage already makes the case; a
 * merchant who has navigated here is looking for the one control that matches
 * their symptom, so the page opens, ranks the six by how often that symptom is
 * theirs, and hands them to it.
 */
export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeatureShowcase />
    </>
  );
}
