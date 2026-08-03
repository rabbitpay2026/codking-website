import { routes } from "@/constants/routes";

import type { NavItem } from "@/types";

export const primaryNav: readonly NavItem[] = [
  { label: "Features", href: routes.features },
  { label: "Pricing", href: routes.pricing },
  { label: "Integrations", href: routes.integrations },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

export const headerCta: NavItem = {
  label: "Book a Demo",
  href: routes.contact,
};
