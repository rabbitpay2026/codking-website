import {
  FacebookMark,
  InstagramMark,
  WhatsAppMark,
  YouTubeMark,
} from "@/components/brand/SocialMarks";

import type { SocialIcon, WithClassName } from "@/types";

import type { ComponentType } from "react";

/**
 * The glyph for each social channel.
 *
 * Mapped here rather than stored on the record, for the reason `featureIcons`
 * gives: art is presentation, and a link's URL changing should never mean
 * touching a component. The map is also what lets the navigation data cross the
 * server-client boundary — an icon *name* serialises, a component does not.
 */
export const socialMarks: Record<SocialIcon, ComponentType<WithClassName>> = {
  youtube: YouTubeMark,
  facebook: FacebookMark,
  instagram: InstagramMark,
  whatsapp: WhatsAppMark,
};
