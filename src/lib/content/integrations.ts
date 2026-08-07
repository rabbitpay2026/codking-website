import { integrations } from "@/data/integrations";

import type { Integration, IntegrationCategory } from "@/types";

export function getIntegrations(): readonly Integration[] {
  return integrations;
}

export function getIntegrationsByCategory(
  category: IntegrationCategory,
): readonly Integration[] {
  return integrations.filter(
    (integration) => integration.category === category,
  );
}

/** The ones the homepage gives a card to (§5.1). */
export function getFeaturedIntegrations(): readonly Integration[] {
  return integrations.filter((integration) => integration.featured);
}

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find((integration) => integration.slug === slug);
}
