import type { Integration } from "@/types";

/**
 * Supported SMS gateways and platforms (§3.1).
 *
 * Routing through a regional provider is what cuts the per-message cost
 * (§6.2 Messaging Gateways), so the gateway list is a commercial argument as
 * much as a compatibility answer. Only the providers codking.tech names are
 * listed — an integrations claim is a promise, and an unverified one is worse
 * than an absent one.
 */
export const integrations: readonly Integration[] = [
  {
    slug: "shopify",
    name: "Shopify",
    category: "platform",
    featured: true,
    blurb:
      "Runs inside the checkout you already have. No theme edits, no developer, nothing to deploy.",
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    category: "platform",
    featured: true,
    blurb:
      "Send the OTP, the order confirmation and the recovery reminder on the channel buyers already read.",
  },
  {
    slug: "msg91",
    name: "MSG91",
    category: "sms-gateway",
    featured: true,
    blurb:
      "Bring your own regional gateway and pay their rate directly, in local currency.",
  },
  { slug: "textlocal", name: "Textlocal", category: "sms-gateway" },
  { slug: "gupshup", name: "Gupshup", category: "sms-gateway" },
  { slug: "semaphore", name: "Semaphore", category: "sms-gateway" },
  { slug: "twilio", name: "Twilio", category: "sms-gateway" },
  { slug: "wavecell", name: "Wavecell", category: "sms-gateway" },
];
