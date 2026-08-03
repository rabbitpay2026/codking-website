import { routes } from "./routes";

import type { NavGroup, NavItem } from "@/types";

/** Links rendered in the header. */
export const primaryNav: readonly NavItem[] = [
  { label: "Features", href: routes.features },
  { label: "Pricing", href: routes.pricing },
  { label: "Integrations", href: routes.integrations },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];

/** Column structure rendered in the footer. */
export const footerNav: readonly NavGroup[] = [
  {
    title: "Product",
    items: [
      { label: "Features", href: routes.features },
      { label: "Pricing", href: routes.pricing },
      { label: "Integrations", href: routes.integrations },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: routes.about },
      { label: "Contact", href: routes.contact },
    ],
  },
];
