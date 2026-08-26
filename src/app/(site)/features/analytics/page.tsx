import { notFound } from "next/navigation";

import {
  Audience,
  Benefits,
  Cta,
  Faq,
  Features,
  Flow,
  Hero,
  Testimonials,
} from "@/components/features/analytics";
import { routeFor } from "@/constants/routes";
import { getControlBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const SLUG = "analytics";

/**
 * The description is the control record's, so the sentence the mega-menu, the
 * footer and the Features index use for this control is the sentence a search
 * result shows (§11).
 *
 * The title is the record's own `name` too — the name the product markets this
 * control under and the name it carries inside the repository are the same two
 * words.
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
 * Analytics & Reports (§6.3).
 *
 * A composition file and nothing more: every section reads its own content
 * from the repository, so this states the order of the argument and holds no
 * copy.
 *
 * That order is the argument, and it is deliberately the order its siblings
 * make it in. What it is and what it does (hero), what it is worth (results),
 * how it runs (flow), what the merchant can configure (features), who it suits (audience), who else uses the
 * product (testimonials), the last objection (FAQ), and only then the ask.
 *
 * There is no product demo band. The demo registry holds no recording for this
 * control, and the page will not substitute the site's general demo for one —
 * a real video of a different feature under a heading promising this one is
 * worse than no video. The hero's scene shows the shape of the report instead,
 * and deliberately carries no figures: every number this control shows belongs
 * to the merchant reading the page.
 *
 * It sits beside `features/[control]`, the generic template that served this
 * control until the review asked for a page of its own. A static segment takes
 * precedence over its dynamic sibling, and the template's
 * `generateStaticParams` excludes every slug in `dedicatedControlPages`, so
 * exactly one route claims this URL.
 */
export default function AnalyticsPage() {
  if (!getControlBySlug(SLUG)) notFound();

  return (
    <>
      <Hero />
      <Benefits />
      <Flow />
      <Features />
      <Audience />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
