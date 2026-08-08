import { notFound } from "next/navigation";

import {
  OtpVerificationBenefits,
  OtpVerificationCapabilities,
  OtpVerificationCheckout,
  OtpVerificationCta,
  OtpVerificationDemo,
  OtpVerificationFlow,
  OtpVerificationHero,
  OtpVerificationTestimonials,
} from "@/components/features/otp-verification";
import { routeFor } from "@/constants/routes";
import { getControlBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const SLUG = "otp-verification";

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
 * OTP Verification (§6.3).
 *
 * The first of the six feature pages, and a composition file and nothing more:
 * every section reads its own content from the repository, so this states the
 * order of the argument and holds no copy.
 *
 * That order is the argument. What it is and what it does (hero), how it runs
 * (flow), proof that it runs (demo), what it is worth (outcomes), what it
 * costs the buyer (checkout), what else it does (capabilities), who else uses
 * it (testimonials), and only then the ask.
 *
 * It sits beside `features/[control]`, the generic template that still serves
 * the other nine controls. A static segment takes precedence over its dynamic
 * sibling, and the template's `generateStaticParams` excludes this slug, so
 * exactly one route claims this URL.
 *
 * It renders 404 rather than an empty page if the control record ever
 * disappears — a feature page for a capability the product no longer lists is
 * worse than no page.
 */
export default function OtpVerificationPage() {
  if (!getControlBySlug(SLUG)) notFound();

  return (
    <>
      <OtpVerificationHero />
      <OtpVerificationFlow />
      <OtpVerificationDemo />
      <OtpVerificationBenefits />
      <OtpVerificationCheckout />
      <OtpVerificationCapabilities />
      <OtpVerificationTestimonials />
      <OtpVerificationCta />
    </>
  );
}
