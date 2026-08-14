import { notFound } from "next/navigation";

import {
  Audience,
  Benefits,
  Cta,
  Demo,
  Faq,
  Features,
  Flow,
  Hero,
  Testimonials,
} from "@/components/features/cod-fees";
import { routeFor } from "@/constants/routes";
import { getControlBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const SLUG = "cod-fees";

/**
 * The description is the control record's, so the sentence the mega-menu, the
 * footer and the Features index use for this control is the sentence a search
 * result shows (§11).
 *
 * The title is the record's own `name` too — unlike COD Show/Hide, the name the
 * product markets this control under and the name it carries inside the
 * repository are the same three letters and one word.
 */
export function generateMetadata(): Metadata {
  const control = getControlBySlug(SLUG);

  if (!control) return createMetadata({ noIndex: true });

  return createMetadata({
    title: `${control.name} for Shopify COD orders`,
    description: control.outcome,
    path: routeFor.control(SLUG),
  });
}

/**
 * COD Fees (§6.3).
 *
 * The sixth feature page, and a composition file and nothing more: every
 * section reads its own content from the repository, so this states the order
 * of the argument and holds no copy.
 *
 * That order is the argument, and it is deliberately the order its siblings
 * make it in. What it is and what it does (hero), what it is worth (results),
 * how it runs (flow), proof that it runs (demo), what the merchant can
 * configure (features), who it suits (audience), who else uses the product
 * (testimonials), the last objection (FAQ), and only then the ask.
 *
 * It sits beside `features/[control]`, the generic template still serving the
 * remaining controls. A static segment takes precedence over its dynamic
 * sibling, and the template's `generateStaticParams` excludes this slug, so
 * exactly one route claims this URL.
 */
export default function CodFeesPage() {
  if (!getControlBySlug(SLUG)) notFound();

  return (
    <>
      <Hero />
      <Benefits />
      <Flow />
      <Demo />
      <Features />
      <Audience />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
