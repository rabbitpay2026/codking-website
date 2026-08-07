import { Section } from "@/components/shared/Section";
import { bodyClass, headingClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { LegalDocument, WithChildren } from "@/types";

interface LegalPageTemplateProps extends WithChildren {
  readonly document: LegalDocument;
}

/**
 * The shared layout for Privacy, Terms, Refund and Cookies (§3).
 *
 * All four are long-form documents with the same needs, so they share one
 * template and are rendered at the narrow prose measure. The revision date is
 * omitted rather than defaulted when unknown — a legal page showing an
 * invented date is worse than one showing none.
 */
export function LegalPageTemplate({
  document,
  children,
}: LegalPageTemplateProps) {
  return (
    <Section spacing="compact" width="prose">
      <article>
        <h1 className={headingClass.h2}>{document.title}</h1>

        {document.lastUpdated ? (
          <p className={cn(bodyClass.sm, "mt-2 text-muted-foreground")}>
            Last updated{" "}
            <time dateTime={document.lastUpdated}>{document.lastUpdated}</time>
          </p>
        ) : null}

        {children}
      </article>
    </Section>
  );
}
