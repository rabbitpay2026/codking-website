import { Section } from "@/components/shared/Section";
import { headingClass } from "@/constants/theme";

import type { WithChildren } from "@/types";

import type { ReactNode } from "react";

interface DocsPageTemplateProps extends WithChildren {
  readonly title: string;
  /**
   * Documentation navigation. §7 gives Docs its own navigation and search,
   * unlike the other resource surfaces, so it is a slot rather than a fixed
   * part of the layout.
   */
  readonly sidebar?: ReactNode;
}

/**
 * The Documentation layout (§7).
 *
 * Docs answer "how do I configure X?" and exist to reduce support load. They
 * are kept structurally distinct from the Help Center on purpose: Docs explain
 * how something works, Help explains what to do when it goes wrong, and
 * collapsing the two is what makes both harder to maintain.
 */
export function DocsPageTemplate({
  title,
  sidebar,
  children,
}: DocsPageTemplateProps) {
  return (
    <Section spacing="compact">
      {sidebar ? <aside aria-label="Documentation">{sidebar}</aside> : null}

      <article>
        <h1 className={headingClass.h2}>{title}</h1>
        {children}
      </article>
    </Section>
  );
}
