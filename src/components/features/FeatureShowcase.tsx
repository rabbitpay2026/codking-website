import { FeatureCard } from "@/components/features/FeatureCard";
import { FeatureLead } from "@/components/features/FeatureLead";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { getFeaturesByEmphasis } from "@/lib/content";

/**
 * The six controls, as a hierarchy rather than a list.
 *
 * One block, then two, then three. A grid of six identical cards asks the
 * merchant to read all six before deciding which matters; this arrangement
 * decides for them — the control that answers the question they arrived with
 * is shown working, the two that change what the buyer pays are given room to
 * say how, and the last three close the page as a row to scan.
 *
 * The tiers descend in size, padding and how much they say, which is what
 * makes the page read top to bottom instead of as three unrelated rows. Every
 * block is the same surface and the same hover, so the hierarchy is carried by
 * scale alone and nothing has to be decorated to look more important.
 *
 * Which control sits in which tier is read from the content repository (§11),
 * so promoting one is a data edit and this file never changes.
 */
export function FeatureShowcase() {
  const lead = getFeaturesByEmphasis("lead");
  const highlights = getFeaturesByEmphasis("highlight");
  const supporting = getFeaturesByEmphasis("supporting");

  return (
    <SectionShell
      size="compact"
      ariaLabel="COD King features"
      className="border-t border-ink/10"
    >
      <div className="flex flex-col gap-4">
        {lead.map((item) => (
          <BlurFade key={item.control.slug}>
            <FeatureLead {...item} />
          </BlurFade>
        ))}

        {highlights.length > 0 ? (
          <ul className="grid items-stretch gap-4 md:grid-cols-2">
            {highlights.map((item, index) => (
              <li key={item.control.slug} className="h-full">
                <BlurFade delay={0.05 * index} className="h-full">
                  <FeatureCard {...item} />
                </BlurFade>
              </li>
            ))}
          </ul>
        ) : null}

        {supporting.length > 0 ? (
          <ul className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supporting.map((item, index) => (
              <li key={item.control.slug} className="h-full">
                <BlurFade delay={0.05 * index} className="h-full">
                  <FeatureCard {...item} />
                </BlurFade>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </SectionShell>
  );
}
