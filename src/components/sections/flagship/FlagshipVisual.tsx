import { OtpFlow } from "@/components/sections/flagship/OtpFlow";
import { PrepaidChoice } from "@/components/sections/flagship/PrepaidChoice";
import { RulesConsole } from "@/components/sections/flagship/RulesConsole";

import type { ControlSlug } from "@/types";

const demos: Partial<Record<ControlSlug, () => React.ReactElement>> = {
  "cod-show-hide": RulesConsole,
  "otp-verification": OtpFlow,
  "cod-to-prepaid": PrepaidChoice,
};

/**
 * The working demonstration for one flagship capability.
 *
 * A dispatcher and nothing else, so the section never learns which control has
 * which demo. Returns `null` for a control with no demonstration, so promoting
 * a fourth control to flagship degrades to copy rather than to a broken frame.
 *
 * Each demonstration is drawn in markup and animated in the browser rather
 * than recorded, which is why the section can afford three of them: no video
 * bytes, no poster frames, sharp at any density, real text throughout, and
 * every one of them re-tints with the brand.
 */
export function FlagshipVisual({ slug }: { readonly slug: ControlSlug }) {
  const Demo = demos[slug];
  return Demo ? <Demo /> : null;
}
