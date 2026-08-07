import type { FaqItem } from "@/types";

/**
 * The tagged question pool (§11).
 *
 * One pool, surfaced on the right page by tag — homepage, pricing, calculator,
 * or a specific control — rather than one long list nobody reads. The homepage
 * set answers the objections §5.1 #10 names: theme safety, no-code, country
 * coverage, cancel anytime, and how the product actually works.
 *
 * Answers are the product's own, from codking.tech.
 */
export const faqs: readonly FaqItem[] = [
  {
    id: "themes",
    question: "Does COD King work with all Shopify themes?",
    answer:
      "Yes. COD King integrates directly with Shopify and works with all themes. No coding or developer skills are required, and setup takes less than 10 minutes.",
    tags: ["home", "control:otp-verification"],
  },
  {
    id: "countries",
    question: "Which countries does COD King support?",
    answer:
      "COD King works in 100+ countries including India, the Philippines, the UAE, Saudi Arabia, Pakistan, Bangladesh, Egypt, and all major COD markets. Local SMS provider integration is available in most countries.",
    tags: ["home", "integrations"],
  },
  {
    id: "otp",
    question: "How does OTP verification reduce fake orders?",
    answer:
      "When a customer places a COD order, COD King sends them a one-time password over SMS or WhatsApp. The order is only confirmed once they enter the correct code, which blocks bots, random entries, and fake buyers instantly.",
    tags: ["home", "control:otp-verification"],
  },
  {
    id: "partial-payment",
    question: "Can I collect a partial payment on COD orders?",
    answer:
      "Yes. You can collect any amount — a fixed sum or a percentage — as an advance payment at checkout. Customers pay it securely through Shopify's payment gateway, and the balance is collected on delivery.",
    tags: ["home", "calculator", "control:partial-cod-payment"],
  },
  {
    id: "checkout-impact",
    question: "Will this affect my existing checkout or store design?",
    answer:
      "No. COD King works within your existing Shopify checkout. There are no visual changes to your theme unless you choose to add COD fee labels or messaging, and even those are fully customisable.",
    tags: ["home", "control:cod-fees"],
  },
  {
    id: "free-trial",
    question: "Is there a free trial?",
    answer:
      "Yes. All plans include a 7-day free trial and no credit card is required. You can install COD King and test every feature before committing to a paid plan.",
    tags: ["home", "pricing"],
  },
  {
    id: "local-sms",
    question: "How do I set up local SMS providers to save on costs?",
    answer:
      "COD King supports regional SMS providers including MSG91, Textlocal and Gupshup in India, and Semaphore in the Philippines. Once connected, you pay your provider directly in local currency, cutting costs by up to 70% against international rates.",
    tags: ["pricing", "integrations", "control:messaging-gateways"],
  },
  {
    id: "support",
    question: "What kind of support does COD King provide?",
    answer:
      "Support is available 7 days a week over live chat and email, and typically responds within minutes. Enterprise customers get priority support with a dedicated account manager.",
    tags: ["pricing"],
  },
];
