import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";

import type {
  AnalyticsEventName,
  UtilityAction,
  UtilityActionId,
  UtilityActionVariant,
} from "@/types";

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

/**
 * What a press of each action reports.
 *
 * A total map rather than a lookup with a fallback: adding a fifth utility
 * action is then a compile error here, which is the moment to decide what it
 * is called in a report — not six months later when someone asks why the
 * button nobody classified has no numbers.
 *
 * The event follows the action, not the label or the destination. Book a Demo
 * currently resolves to `/contact` because there is no booking tool yet, and
 * it is still `book_demo_click`: what the merchant pressed is what is worth
 * counting, and the day a scheduler exists the history stays comparable.
 */
const eventForAction: Record<UtilityActionId, AnalyticsEventName> = {
  install: "install_free_click",
  "book-demo": "book_demo_click",
  whatsapp: "whatsapp_click",
  "demo-store": "demo_store_click",
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
  /**
   * Which band of which page this instance sits in — `"hero"`,
   * `"pricing-cta"`, `"mobile-action-bar"`.
   *
   * Reported as the `location` parameter, and it is the parameter that makes
   * the numbers worth having. Install Free is rendered a dozen times across
   * the site and every one of them is the same action to GA4; without this,
   * "the install button was pressed" is the only question the data can answer,
   * and "the hero converts and the closing band does not" is not.
   *
   * The page is not encoded here. Every event already carries the URL it
   * happened on, so repeating it would be a second answer to a question that
   * already has one.
   */
  readonly location?: string;
}

/**
 * Renders one utility action.
 *
 * Most of these leave the site — the App Store, the app, WhatsApp — so they
 * open in a new tab and say so to assistive technology rather than silently
 * replacing the page. An action pointing at one of our own routes is client
 * navigated instead, and never announces a new tab it does not open.
 *
 * Every rendered action carries the `data-ga-*` attributes the site's one
 * click listener reads (see `components/analytics/ClickTracker.tsx`), so this
 * stays a server component and none of the sixteen places that render it needs
 * a client boundary to be measured. The disabled branch carries none: an
 * action that goes nowhere has nothing to report.
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
  location,
}: ActionLinkProps) {
  const variant = variantForAction[action.variant];
  const event = eventForAction[action.id];

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
        <Link
          href={action.href as Route}
          data-ga-event={event}
          data-ga-name={action.label}
          data-ga-location={location}
        >
          {icon}
          {action.label}
        </Link>
      ) : (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-event={event}
          data-ga-name={action.label}
          data-ga-location={location}
        >
          {icon}
          {action.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </Button>
  );
}
