import Link from "next/link";

import { Section } from "@/components/shared/Section";
import { routes } from "@/constants/routes";
import { bodyClass, headingClass, transitionClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Section spacing="compact">
      <h1 className={headingClass.h2}>Page not found</h1>
      <p className={cn(bodyClass.base, "mt-3 text-muted-foreground")}>
        The page you are looking for does not exist.
      </p>
      <Link
        href={routes.home}
        className={cn(
          "mt-6 inline-block text-sm text-foreground underline underline-offset-4",
          transitionClass.colors,
        )}
      >
        Back to home
      </Link>
    </Section>
  );
}
