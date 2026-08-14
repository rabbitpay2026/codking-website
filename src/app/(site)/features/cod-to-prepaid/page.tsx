import { notFound } from "next/navigation";

import {
  CodToPrepaidAudience,
  CodToPrepaidBenefits,
  CodToPrepaidCta,
  CodToPrepaidDemo,
  CodToPrepaidFaq,
  CodToPrepaidFeatures,
  CodToPrepaidFlow,
  CodToPrepaidHero,
} from "@/components/features/cod-to-prepaid";
import { routeFor } from "@/constants/routes";
import { getControlBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const SLUG = "cod-to-prepaid";

/**
 * Read from the control record rather than typed here, so the page's title and
 * description are the same words the mega-menu, the footer and the Features
 * index use for this control (§11).
 */
export function generateMetadata(): Metadata {
  const control = getControlBySlug(SLUG);

  if (!control) return createMetadata({ noIndex: true });

  return createMetadata({
    title: `${control.name} for Shopify COD orders`,
    description: control.outcome,
    path: routeFor.control(control.slug),
  });
}

/**
 * COD to Prepaid (§6.3).
 *
 * The third feature page, and a composition file and nothing more: every
 * section reads its own content from the repository, so this states the order
 * of the argument and holds no copy.
 *
 * That order is the argument, and it is deliberately the same order the OTP
 * and Partial COD Payment pages make it in. What it is and what it does
 * (hero), what it is worth (results), how it runs (flow), proof that it runs
 * (demo), what the merchant can configure (features), who it suits (audience),
 * the last objection (FAQ), and only then the ask.
 *
 * It sits beside `features/[control]`, the generic template still serving the
 * remaining controls. A static segment takes precedence over its dynamic
 * sibling, and the template's `generateStaticParams` excludes this slug, so
 * exactly one route claims this URL. The control's earlier address,
 * `/features/prepaid-nudge`, is redirected onto this one in `next.config.ts`.
 */
export default function CodToPrepaidPage() {
  if (!getControlBySlug(SLUG)) notFound();

  return (
    <>
      <CodToPrepaidHero />
      <CodToPrepaidBenefits />
      <CodToPrepaidFlow />
      <CodToPrepaidDemo />
      <CodToPrepaidFeatures />
      <CodToPrepaidAudience />
      <CodToPrepaidFaq />
      <CodToPrepaidCta />
    </>
  );
}
