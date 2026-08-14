import { Handshake } from "lucide-react";

import {
  AboutCapabilities,
  AboutHero,
  CompanyPointGrid,
} from "@/components/company";
import { FeatureCtaBand } from "@/components/features/sections";
import { routes } from "@/constants/routes";
import {
  getAboutCtaTitle,
  getAboutHelp,
  getAboutMission,
  getAboutProblem,
  getAboutReasons,
} from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "About COD King",
  description:
    "COD King is a Shopify app for managing cash-on-delivery orders — verifying them, collecting payment upfront, controlling where COD is offered, and recovering the carts that never converted.",
  path: routes.about,
});

/**
 * About Us (§3.1).
 *
 * A composition file and nothing more: every section reads its own content from
 * the repository, so this states the order of the argument and holds no copy.
 *
 * That order is the argument. What we build (hero), what the app does
 * (mission), what it costs a merchant not to (problem), the control that closes
 * each of those (help), what it ships (capabilities), what running it is
 * actually like (reasons), and only then the ask.
 *
 * Problem and help are adjacent and share their four beats one for one, which
 * is the whole reason they are two sections instead of one: a page that lists
 * four costs and then four unrelated benefits makes the reader do the matching.
 *
 * The problem sits *after* the mission rather than opening the page, because a
 * visitor who clicked "About" has already been told the problem elsewhere on
 * the site — they are here to find out who is behind the fix.
 *
 * The close is the feature pages' own CTA band, unchanged. A company page that
 * invents a new closing offer is telling the merchant this is a different
 * product from the one they were reading about a page ago.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyPointGrid {...getAboutMission()} columns={2} />
      <CompanyPointGrid {...getAboutProblem()} columns={2} tone="muted" />
      <CompanyPointGrid {...getAboutHelp()} columns={2} />
      <AboutCapabilities tone="muted" />
      <CompanyPointGrid {...getAboutReasons()} columns={3} />
      <FeatureCtaBand title={getAboutCtaTitle()} icon={Handshake} />
    </>
  );
}
