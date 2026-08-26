import { notFound } from "next/navigation";

import {
  Benefits,
  Configure,
  Cta,
  Faq,
  Features,
  Flow,
  Hero,
  Operators,
  PaymentModel,
  Testimonials,
} from "@/components/features/messaging-gateways";
import { routeFor } from "@/constants/routes";
import { getControlBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

const SLUG = "messaging-gateways";

/**
 * The description is the control record's, so the sentence the mega-menu, the
 * footer and the Features index use for this control is the sentence a search
 * result shows (§11).
 *
 * The title is the record's `alias` — "Local SMS Gateway" — rather than its
 * `name`. The subsystem is called Messaging Gateways inside the product; the
 * plans, the FAQ pool and the Features index all publish it under the alias,
 * and a merchant searching for this control is searching for that.
 */
export function generateMetadata(): Metadata {
  const control = getControlBySlug(SLUG);

  if (!control) return createMetadata({ noIndex: true });

  return createMetadata({
    title: `${control.alias ?? control.name} integration for Shopify COD`,
    description: control.outcome,
    path: routeFor.control(SLUG),
  });
}

/**
 * Local SMS Operator Integration (§6.3).
 *
 * A composition file and nothing more: every section reads its own content
 * from the repository, so this states the order of the argument and holds no
 * copy.
 *
 * That order is the argument. What it is and what it does (hero), who gets
 * paid for what (payment model), what it is worth (results), how it runs
 * (flow), what the merchant can configure (features), which operators it
 * connects to (operators), the control those operators go into (configure),
 * who else uses the product (testimonials), the last objection (FAQ), and only
 * then the ask.
 *
 * The payment model comes second rather than later because the page is named
 * for it. A merchant arriving on "Direct-to-Operator Payment Model" is asking
 * "direct instead of what?", and every band after it reads more easily once
 * that has been answered.
 *
 * There is no product demo band. No recording of an operator being selected
 * exists, and this page has something better to put in that slot: the operator
 * board and the picker itself, read from the operator repository. `Operators`
 * and `Configure` stand where a sibling page puts its player.
 *
 * It sits beside `features/[control]`, the generic template that served this
 * control until the review asked for a page of its own. A static segment takes
 * precedence over its dynamic sibling, and the template's
 * `generateStaticParams` excludes every slug in `dedicatedControlPages`, so
 * exactly one route claims this URL.
 */
export default function MessagingGatewaysPage() {
  if (!getControlBySlug(SLUG)) notFound();

  return (
    <>
      <Hero />
      <PaymentModel />
      <Benefits />
      <Flow />
      <Features />
      <Operators />
      <Configure />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
