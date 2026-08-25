/**
 * Integrations answer one merchant question: "does it work with X?" (§3.1).
 *
 * SMS gateways are the commercially significant category — routing through a
 * local provider is what cuts the per-message cost (§6.2 Messaging Gateways).
 *
 * `payment-gateway` answers a different shape of the same question, and the
 * difference matters to how its members are read. The other categories are
 * compatibility lists: a provider is on them or the product does not work with
 * it. Payment gateways are not — a merchant connects whichever gateway they
 * already use, so the records in that category are examples chosen to be
 * recognisable, never the set of gateways that work. Anything rendering them
 * has to say so in words; the type cannot.
 */
import type { BrandLogo } from "@/types/homepage";

export type IntegrationCategory =
  "sms-gateway" | "payment-gateway" | "platform" | "ads";

export interface Integration {
  readonly slug: string;
  readonly name: string;
  readonly category: IntegrationCategory;
  /**
   * Marks the handful the homepage gives a card to. The rest are still listed
   * there, as names — a compatibility list belongs under the argument, not
   * instead of it.
   */
  readonly featured?: boolean;
  /** One line on what connecting it changes. Required for a featured card. */
  readonly blurb?: string;
  /**
   * The vendor's own supplied mark.
   *
   * Optional, and the card degrades to the provider's initials without it. A
   * wrong logo is worse than no logo, and a monogram is at least honest about
   * being a placeholder until the vendor's file arrives.
   */
  readonly logo?: BrandLogo;
}
