import { notFound } from "next/navigation";

import { LegalPageTemplate } from "@/components/templates/LegalPageTemplate";
import { routeFor } from "@/constants/routes";
import { getLegalDocument, getLegalDocuments } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

/** Privacy · Terms · Refund · Cookies, from one template (§3). */
export function generateStaticParams() {
  return getLegalDocuments().map((document) => ({ slug: document.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) return createMetadata({ noIndex: true });

  return createMetadata({
    title: document.title,
    path: routeFor.legal(document.slug),
    noIndex: true,
  });
}

export default async function LegalPage({
  params,
}: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) notFound();

  return (
    <LegalPageTemplate document={document}>
      <p>Copy supplied by the business. Implemented in a later phase.</p>
    </LegalPageTemplate>
  );
}
