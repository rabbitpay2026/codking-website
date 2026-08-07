import { Section } from "@/components/shared/Section";
import { bodyClass, headingClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

interface PagePlaceholderProps {
  readonly title: string;
  /**
   * The Website Architecture section that specifies this page, e.g. `"§5"`.
   * Keeps every route traceable to the document that justifies it.
   */
  readonly reference: string;
}

/**
 * The body of a route that exists but is not yet built.
 *
 * Every route in the §3 sitemap is created in the foundation phase so that
 * typed links compile and the information architecture is real before any UI
 * exists. This component is the one place that renders them, so retiring a
 * placeholder is a single-line change in the page and nothing is left behind.
 *
 * Pages using it must also set `noIndex` on their metadata.
 */
export function PagePlaceholder({ title, reference }: PagePlaceholderProps) {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>{title}</h1>
      <p className={cn(bodyClass.base, "mt-3 text-muted-foreground")}>
        Specified in Website Architecture {reference}. Implemented in a later
        phase.
      </p>
    </Section>
  );
}
