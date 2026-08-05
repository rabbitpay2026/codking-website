import { resourceArticles, resourceSections } from "@/data/resources";

import type { ResourceArticle, ResourceKind, ResourceSection } from "@/types";

export function getResourceSections(): readonly ResourceSection[] {
  return resourceSections;
}

/**
 * Articles for one surface.
 *
 * Blog is the only surface ordered by date — freshness is its job, whereas
 * Guides are evergreen and must not be buried under news (§7).
 */
export function getArticlesByKind(
  kind: ResourceKind,
): readonly ResourceArticle[] {
  const articles = resourceArticles.filter((article) => article.kind === kind);

  return kind === "blog"
    ? [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    : articles;
}

export function getArticle(
  kind: ResourceKind,
  slug: string,
): ResourceArticle | undefined {
  return resourceArticles.find(
    (article) => article.kind === kind && article.slug === slug,
  );
}
