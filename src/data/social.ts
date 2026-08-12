import { externalLinks, whatsappDisplayNumber } from "@/constants/external";

import type { SocialLink } from "@/types";

/**
 * The profiles the business publishes.
 *
 * Ordered by what a merchant evaluating the app would actually open. YouTube
 * first because it is where the product is shown working, and WhatsApp last
 * because it is not a profile to browse — it is a conversation, and it closes
 * the row the way a call to action closes a section.
 *
 * Every URL comes from `constants/external.ts`, so the footer and the contact
 * page cannot point at different accounts, and swapping one is a one-line edit
 * in a file that already owns every other off-site destination.
 */
export const socialLinks: readonly SocialLink[] = [
  {
    id: "youtube",
    label: "YouTube",
    href: externalLinks.youtube,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: externalLinks.facebook,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: externalLinks.instagram,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: externalLinks.whatsapp,
    detail: whatsappDisplayNumber,
  },
];
