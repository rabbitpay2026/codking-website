import { Section } from "@/components/shared/Section";
import { bodyClass, headingClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { WithChildren } from "@/types";

interface CalculatorPageTemplateProps extends WithChildren {
  readonly title: string;
  readonly description: string;
}

/**
 * The COD Calculator page shell (§8).
 *
 * One page, three tools — there are no separate calculator pages, because
 * splitting them would split the tool search intent the calculator is meant to
 * own (§13). The tools themselves are passed as children so the shell stays
 * independent of how they are presented (tabs or stacked sections).
 *
 * Two architectural constraints belong to whatever fills this slot, not to the
 * shell: the page must render a crawlable default result without JavaScript
 * (§13.1), and the number must never be gated behind an email (§8.4).
 */
export function CalculatorPageTemplate({
  title,
  description,
  children,
}: CalculatorPageTemplateProps) {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>{title}</h1>
      <p className={cn(bodyClass.base, "mt-3 text-muted-foreground")}>
        {description}
      </p>

      {children}
    </Section>
  );
}
