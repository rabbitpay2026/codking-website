import { notFound } from "next/navigation";

import { ControlPageTemplate } from "@/components/templates/ControlPageTemplate";
import { routeFor } from "@/constants/routes";
import { getControlBySlug, getControls, getOrderStage } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { ControlSlug } from "@/types";

import type { Metadata } from "next";

/**
 * Controls that have a hand-built page of their own.
 *
 * A static segment wins over its dynamic sibling at request time, so
 * `/features/otp-verification` would resolve to the dedicated page regardless.
 * Excluding the slug here is about the build rather than the route: generating
 * a param for a URL another file already owns produces a second prerendered
 * output for the same path — one that no request will ever reach, and one more
 * page to keep in step with a template it no longer uses.
 *
 * The remaining feature pages join this list as they land.
 */
const DEDICATED_PAGES: readonly ControlSlug[] = [
  "otp-verification",
  "partial-cod-payment",
  "cod-to-prepaid",
  "abandoned-cart-recovery",
];

/**
 * The remaining control pages are generated from the controls repository
 * (§6.3).
 *
 * `dynamicParams = false` keeps the set closed: a URL that does not correspond
 * to a real control returns 404 rather than rendering an empty page.
 */
export function generateStaticParams() {
  return getControls()
    .filter((control) => !DEDICATED_PAGES.includes(control.slug))
    .map((control) => ({ control: control.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/features/[control]">): Promise<Metadata> {
  const { control: slug } = await params;
  const control = getControlBySlug(slug);

  if (!control) return createMetadata({ noIndex: true });

  return createMetadata({
    title: control.name,
    description: control.outcome,
    path: routeFor.control(control.slug),
    noIndex: true,
  });
}

export default async function ControlPage({
  params,
}: PageProps<"/features/[control]">) {
  const { control: slug } = await params;
  const control = getControlBySlug(slug);
  const stage = control ? getOrderStage(control.stage) : undefined;

  if (!control || !stage) notFound();

  return (
    <ControlPageTemplate control={control} stage={stage}>
      <p>
        Specified in Website Architecture §6.3. Implemented in a later phase.
      </p>
    </ControlPageTemplate>
  );
}
