import Link from "next/link";

import { Section } from "@/components/shared/Section";
import { routes } from "@/constants/routes";
import { bodyClass, headingClass } from "@/constants/theme";
import { cn } from "@/lib/utils";

import type { Control, OrderStage, WithChildren } from "@/types";

interface ControlPageTemplateProps extends WithChildren {
  readonly control: Control;
  readonly stage: OrderStage;
}

/**
 * The shared layout behind all ten control pages (§6.3).
 *
 * §12.1 is the rule this exists to satisfy: adding a control must be a content
 * record dropped into an existing component, never a new custom page. So this
 * template owns the parts every control page shares — the order-stage
 * breadcrumb required on every feature page (§4.6), the name, and the one
 * problem the control removes — and exposes the rest as a slot.
 *
 * The §6.3 body sections (the problem in plain words, how it works, setup
 * requirements, proof, control-specific questions, and the related-controls
 * rail) are composed into `children` by the phase that builds them, so adding
 * them never changes this contract.
 */
export function ControlPageTemplate({
  control,
  stage,
  children,
}: ControlPageTemplateProps) {
  return (
    <Section spacing="compact">
      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href={routes.features}>Features</Link>
          </li>
          <li>{stage.label}</li>
          <li aria-current="page">{control.name}</li>
        </ol>
      </nav>

      <h1 className={headingClass.h2}>{control.name}</h1>
      <p className={cn(bodyClass.base, "mt-3 text-muted-foreground")}>
        {control.outcome}
      </p>

      {children}
    </Section>
  );
}
