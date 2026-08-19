import { BookOpen, MessageCircleQuestionMark, Newspaper } from "lucide-react";

import type { ResourceNavIcon } from "@/types";

import type { LucideIcon } from "lucide-react";

/**
 * The mark for each Resources item.
 *
 * Icons are presentation, not content, so they are mapped here rather than
 * stored on the navigation record — the same split `featureIcons.ts` makes for
 * the control marks. Each glyph describes the artefact rather than the action:
 * a manual, a question and a paper, which is what a merchant is choosing
 * between.
 */
export const resourceNavIcons: Record<ResourceNavIcon, LucideIcon> = {
  docs: BookOpen,
  faq: MessageCircleQuestionMark,
  blog: Newspaper,
};
