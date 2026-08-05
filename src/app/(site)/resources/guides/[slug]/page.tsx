import { notFound } from "next/navigation";

import { ResourceArticleTemplate } from "@/components/templates/ResourceArticleTemplate";
import { routeFor } from "@/constants/routes";
import { getArticle, getArticlesByKind } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

/**
 * Guide articles.
 *
 * The article set is empty until the resources phase, so this route generates
 * nothing today. It exists now so that publishing a guide is a content change
 * against a compiled contract rather than new routing work.
 */
export function generateStaticParams() {
  return getArticlesByKind("guide").map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/resources/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("guide", slug);

  if (!article) return createMetadata({ noIndex: true });

  return createMetadata({
    title: article.title,
    description: article.description,
    path: routeFor.guide(article.slug),
    noIndex: true,
  });
}

export default async function GuideArticlePage({
  params,
}: PageProps<"/resources/guides/[slug]">) {
  const { slug } = await params;
  const article = getArticle("guide", slug);

  if (!article) notFound();

  return (
    <ResourceArticleTemplate article={article}>{null}</ResourceArticleTemplate>
  );
}
