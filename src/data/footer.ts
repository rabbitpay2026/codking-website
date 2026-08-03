import { routes } from "@/constants/routes";

import type { NavGroup } from "@/types";

export const footerGroups: readonly NavGroup[] = [
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
