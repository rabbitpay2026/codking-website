import { notFound } from "next/navigation";

import {
  PartialPaymentAudience,
  PartialPaymentBenefits,
  PartialPaymentCta,
  PartialPaymentDemo,
  PartialPaymentFaq,
  PartialPaymentFeatures,
  PartialPaymentFlow,
  PartialPaymentHero,
} from "@/components/features/partial-cod-payment";
import { routeFor } from "@/constants/routes";
import { getControlBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const SLUG = "partial-cod-payment";

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
 * Partial COD Payment (§6.3).
 *
 * The second feature page, and a composition file and nothing more: every
 * section reads its own content from the repository, so this states the order
 * of the argument and holds no copy.
 *
 * That order is the argument, and it is deliberately the same order the OTP
 * page makes it in. What it is and what it does (hero), what it is worth
 * (results), how it runs (flow), proof that it runs (demo), what the merchant
 * can configure (features), who it suits (audience), the last objection (FAQ),
 * and only then the ask.
 *
 * It sits beside `features/[control]`, the generic template still serving the
 * remaining controls. A static segment takes precedence over its dynamic
 * sibling, and the template's `generateStaticParams` excludes this slug, so
 * exactly one route claims this URL.
 */
export default function PartialCodPaymentPage() {
  if (!getControlBySlug(SLUG)) notFound();

  return (
    <>
      <PartialPaymentHero />
      <PartialPaymentBenefits />
      <PartialPaymentFlow />
      <PartialPaymentDemo />
      <PartialPaymentFeatures />
      <PartialPaymentAudience />
      <PartialPaymentFaq />
      <PartialPaymentCta />
    </>
  );
}
