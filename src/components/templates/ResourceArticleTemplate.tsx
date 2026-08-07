import Link from "next/link";

import { Section } from "@/components/shared/Section";
import { bodyClass, headingClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { ResourceArticle, WithChildren } from "@/types";

interface ResourceArticleTemplateProps extends WithChildren {
  readonly article: ResourceArticle;
}

/**
 * The shared layout for Guides, Blog and Help articles (§7).
 *
 * The closing next-step link is rendered by the template rather than left to
 * the author, because §7.1 makes it a rule: every article ends by pointing at
 * the relevant tool or control page, never at a generic sign-up band. The
 * `nextStep` field is required on the article type, so an article that does
 * not comply cannot compile — the rule is enforced, not merely documented.
 *
 * Body content is rendered at the narrow prose measure for readability.
 */
export function ResourceArticleTemplate({
  article,
  children,
}: ResourceArticleTemplateProps) {
  return (
    <Section spacing="compact" width="prose">
      <article>
        <h1 className={headingClass.h2}>{article.title}</h1>
        <p className={cn(bodyClass.base, "mt-3 text-muted-foreground")}>
          {article.description}
        </p>
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>

        {children}

        <footer>
          <Link href={article.nextStep.href}>{article.nextStep.label}</Link>
        </footer>
      </article>
    </Section>
  );
}
