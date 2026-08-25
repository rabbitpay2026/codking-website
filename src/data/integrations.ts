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
    slug: "meta-ads",
    name: "Meta Ads",
    category: "ads",
    featured: true,
    blurb: "Track conversions and optimize campaigns.",
    logo: { src: "/logos/marketing/meta.png", width: 41, height: 44 },
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    category: "ads",
    featured: true,
    blurb: "Improve ROI with better conversion tracking.",
    logo: { src: "/logos/marketing/google-ads.png", width: 44, height: 40 },
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    category: "platform",
    featured: true,
    blurb: "Send notifications and recover more orders.",
    logo: { src: "/logos/marketing/whatsapp.png", width: 44, height: 44 },
  },
  {
    slug: "msg91",
    name: "MSG91",
    category: "sms-gateway",
    featured: true,
    blurb: "Send transactional SMS at scale seamlessly.",
    logo: { src: "/logos/marketing/msg91.png", width: 44, height: 40 },
  },
  {
    /*
      The platform the product runs inside rather than one it connects out to,
      so it is not on the homepage's marketing-and-communication board. It stays
      in the repository because the integrations page still has to answer "does
      it work with Shopify" — the answer is just not this section's argument.
    */
    slug: "shopify",
    name: "Shopify",
    category: "platform",
    blurb:
      "Runs inside the checkout you already have. No theme edits, no developer, nothing to deploy.",
  },
  /*
    The payment gateways, and these four are examples rather than a list.

    Every other record in this file is a compatibility claim — the product
    either connects to that provider or it does not. These are not that. The
    confirmed product position is that a merchant connects whichever gateway
    they already use, so no set of names here is complete and none of them is
    a requirement. The four below were chosen by the team as the ones an Indian
    COD merchant recognises fastest, and `PaymentGateways` states in words that
    they are examples — a caller rendering them any other way would be making a
    claim the product does not make.

    Not `featured`: that flag is what the homepage's marketing-and-
    communication board reads, and a payment gateway is not one of those. They
    are read by category instead.

    No `blurb`, deliberately. Each mark is a wordmark carrying the provider's
    own name, and a line of prose under it would either repeat the name or
    describe a gateway we do not operate.
  */
  {
    slug: "razorpay",
    name: "Razorpay",
    category: "payment-gateway",
    logo: { src: "/logos/payments/razorpay.png", width: 133, height: 28 },
  },
  {
    slug: "payu",
    name: "PayU",
    category: "payment-gateway",
    logo: { src: "/logos/payments/payu.png", width: 56, height: 28 },
  },
  {
    slug: "cashfree",
    name: "Cashfree Payments",
    category: "payment-gateway",
    logo: { src: "/logos/payments/cashfree.png", width: 96, height: 28 },
  },
  {
    slug: "phonepe",
    name: "PhonePe",
    category: "payment-gateway",
    logo: { src: "/logos/payments/phonepe.png", width: 103, height: 28 },
  },

  { slug: "textlocal", name: "Textlocal", category: "sms-gateway" },
  { slug: "gupshup", name: "Gupshup", category: "sms-gateway" },
  { slug: "semaphore", name: "Semaphore", category: "sms-gateway" },
  { slug: "twilio", name: "Twilio", category: "sms-gateway" },
  { slug: "wavecell", name: "Wavecell", category: "sms-gateway" },
];
