import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";

import type { UtilityAction, UtilityActionVariant } from "@/types";

import type { Route } from "next";
import type { ReactNode } from "react";

/**
 * Maps the architecture's action hierarchy onto button variants.
 *
 * The data assigns the weight, not the component: Install Free is the only
 * filled action, and Book a Demo is present but quieter beside it.
 *
 * There were three weights until the reviewer removed Log in. The text-link
 * weight went with it rather than staying behind unused — a variant nothing
 * holds is a variant that quietly acquires a second, unrelated meaning the
 * next time someone needs a quiet action.
 */
const variantForAction: Record<UtilityActionVariant, ButtonProps["variant"]> = {
  primary: "primary",
  secondary: "secondary",
};

interface ActionLinkProps {
  readonly action: UtilityAction;
  readonly size?: ButtonProps["size"];
  readonly block?: boolean;
  readonly className?: string;
  /**
   * Rendered before the label.
   *
   * Optional and unset everywhere but the hero, where the primary action
   * carries Shopify's own mark: the single most valuable thing the first
   * button on the site can say is *which platform this runs on*, and a logo
   * says it faster than the word does. Everywhere else the action is one of
   * several in a row and a mark would only add noise.
   *
   * Decorative by contract — the label beside it is always the accessible
   * name, so the caller passes an `aria-hidden` mark.
   */
  readonly icon?: ReactNode;
}

/**
 * Renders one utility action.
 *
 * Most of these leave the site — the App Store, the app, WhatsApp — so they
 * open in a new tab and say so to assistive technology rather than silently
 * replacing the page. An action pointing at one of our own routes is client
 * navigated instead, and never announces a new tab it does not open.
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
  icon,
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
        {icon}
        {action.label}
        <span className="sr-only"> (not available yet)</span>
      </Button>
    );
  }

  const isInternal = action.href.startsWith("/");

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      block={block}
      className={className}
    >
      {isInternal ? (
        // Asserted rather than widened: `UtilityAction.href` also carries
        // absolute URLs, so it cannot be typed as `Route`, and the branch
        // above has already established this is one of our own paths.
        <Link href={action.href as Route}>
          {icon}
          {action.label}
        </Link>
      ) : (
        <a href={action.href} target="_blank" rel="noopener noreferrer">
          {icon}
          {action.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </Button>
  );
}
