import type { CustomerStory } from "@/types";

/**
 * Named merchant stories, reused on the homepage, control pages, and the
 * Customers page (§11).
 *
 * These are the reviews the product publishes, attributed to the merchants
 * who wrote them. §10.1 requires every claim to point at a source, so the
 * metric on each card is drawn from what the merchant actually described —
 * not a number assigned to them afterwards.
 */
export const customerStories: readonly CustomerStory[] = [
  {
    id: "nuisance",
    merchantName: "Nuisance",
    metricLabel: "Fake orders",
    metricValue: "Solved",
    quote:
      "I was struggling with fake COD orders and losing time and money. After switching to COD King and enabling partial payment, the problem was solved. Customers now pay upfront, fake orders reduced, and operations run smoothly.",
    controlSlugs: ["partial-cod-payment", "otp-verification"],
  },
  {
    id: "bashariya-aferenz",
    merchantName: "Bashariya Aferenz Life Style",
    metricLabel: "Issue resolution",
    metricValue: "Same day",
    quote:
      "This app is super easy to use with excellent support from the team. Unlike other platforms, even small issues are resolved quickly without long delays. The COD King team is proactive and attentive.",
    controlSlugs: ["otp-verification"],
  },
];
