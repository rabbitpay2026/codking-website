import { Button, type ButtonProps } from "@/components/ui/button";

import type { UtilityAction, UtilityActionVariant } from "@/types";

/**
 * Maps the architecture's action hierarchy onto button variants.
 *
 * §4.2 assigns the weight, not the component: Install Free is the only filled
 * action, Book a Demo is present but quieter, and Log in stays a text link so
 * returning merchants never compete with the install for attention.
 */
const variantForAction: Record<UtilityActionVariant, ButtonProps["variant"]> = {
  primary: "primary",
  secondary: "secondary",
  link: "quiet",
};

interface ActionLinkProps {
  readonly action: UtilityAction;
  readonly size?: ButtonProps["size"];
  readonly block?: boolean;
  readonly className?: string;
}

/**
 * Renders one utility action.
 *
 * Every action here leaves the site — the App Store, the app, the demo
 * booker, WhatsApp — so each opens in a new tab and says so to assistive
 * technology rather than silently replacing the page.
 *
 * When a destination is not yet configured the action renders disabled rather
 * than as a dead link. `aria-disabled` is used instead of `disabled` on
 * purpose: the control stays focusable, so a screen-reader user can find it
 * and hear that it is unavailable instead of it vanishing from the tab order.
 */
export function ActionLink({
  action,
  size = "md",
  block = false,
  className,
}: ActionLinkProps) {
  const variant = variantForAction[action.variant];

  if (!action.href) {
    return (
      <Button
        variant={variant}
        size={size}
        block={block}
        className={className}
        aria-disabled="true"
        role="link"
      >
        {action.label}
        <span className="sr-only"> (not available yet)</span>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      block={block}
      className={className}
    >
      <a href={action.href} target="_blank" rel="noopener noreferrer">
        {action.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Button>
  );
}
