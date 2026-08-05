import { notFound } from "next/navigation";

import { DocsPageTemplate } from "@/components/templates/DocsPageTemplate";
import { routeFor } from "@/constants/routes";
import { getArticle, getArticlesByKind } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

/**
 * Documentation pages.
 *
 * A catch-all rather than a single segment because docs nest — a control's
 * setup page sits under its own section — and §7 gives Docs its own
 * navigation. Slugs are stored as paths (`otp-verification/setup`) and split
 * here, so the content set decides the depth rather than the routing.
 */
export function generateStaticParams() {
  return getArticlesByKind("docs").map((article) => ({
    slug: article.slug.split("/"),
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/resources/docs/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const article = getArticle("docs", path);

  if (!article) return createMetadata({ noIndex: true });

  return createMetadata({
    title: article.title,
    description: article.description,
    path: routeFor.doc(article.slug),
    noIndex: true,
  });
}

export default async function DocPage({
  params,
}: PageProps<"/resources/docs/[...slug]">) {
  const { slug } = await params;
  const article = getArticle("docs", slug.join("/"));

  if (!article) notFound();

  return <DocsPageTemplate title={article.title}>{null}</DocsPageTemplate>;
}
