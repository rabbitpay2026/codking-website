/**
 * Integrations answer one merchant question: "does it work with X?" (§3.1).
 *
 * SMS gateways are the commercially significant category — routing through a
 * local provider is what cuts the per-message cost (§6.2 Messaging Gateways).
 */
export type IntegrationCategory = "sms-gateway" | "platform";

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
}
