import { notFound } from "next/navigation";

import { ResourceArticleTemplate } from "@/components/templates/ResourceArticleTemplate";
import { routeFor } from "@/constants/routes";
import { getArticle, getArticlesByKind } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export function generateStaticParams() {
  return getArticlesByKind("help").map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/resources/help/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("help", slug);

  if (!article) return createMetadata({ noIndex: true });

  return createMetadata({
    title: article.title,
    description: article.description,
    path: routeFor.helpArticle(article.slug),
    noIndex: true,
  });
}

export default async function HelpArticlePage({
  params,
}: PageProps<"/resources/help/[slug]">) {
  const { slug } = await params;
  const article = getArticle("help", slug);

  if (!article) notFound();

  return (
    <ResourceArticleTemplate article={article}>{null}</ResourceArticleTemplate>
  );
}
