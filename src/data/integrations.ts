import type { Integration } from "@/types";

/**
 * Supported SMS gateways and platforms (§3.1).
 *
 * Empty until the supported list is confirmed. §6.2 names MSG91, Gupshup,
 * Semaphore and Twilio as examples, but an integrations page that claims
 * support is a compatibility promise — it is populated from the product, not
 * from the architecture document.
 */
export const integrations: readonly Integration[] = [];
