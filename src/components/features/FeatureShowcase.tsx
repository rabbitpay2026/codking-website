import { FeatureCard } from "@/components/features/FeatureCard";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { getFeaturesByEmphasis } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The compact row's width at `lg`, keyed by how many controls are in it.
 *
 * Written out rather than interpolated, because a class name assembled at
 * runtime is a class name the compiler never sees and therefore never emits.
 * Anything outside this range falls back to three across and wraps, which is
 * ragged rather than broken.
 *
 * It exists so the closing row can end flush. Four compact cards over three
 * columns leave one alone on a second row with two empty tracks beside it,
 * which reads as a page that ran out rather than as a page that ended — the
 * same fault the homepage board solves with an eight-track grid.
 */
const supportingColumns: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * The ten controls, as a hierarchy rather than a list.
 *
 * Two across, then four. A grid of ten identical cards asks the merchant to
 * read all ten before deciding which matters; this arrangement decides for
 * them — the six controls that publish what they actually do are given room to
 * say it, and the four that publish an outcome line alone close the page as a
 * row to scan.
 *
 * There was a third tier above these, a single full-width panel carrying the
 * page's first control. The reviewer asked for it to be a card like the rest,
 * so it is one: OTP Verification is still first and still the control that
 * answers the question a merchant arrives with, at the same size as its
 * neighbours. What the page lost with it was an arrangement where the first
 * card was three times the width of the second — which is a hierarchy the
 * merchant did not ask for.
 *
 * The tiers descend in size, padding and how much they say, which is what
 * makes the page read top to bottom instead of as two unrelated blocks. Every
 * card is the same surface and the same hover, so the hierarchy is carried by
 * scale alone and nothing has to be decorated to look more important.
 *
 * Which control sits in which tier is read from the content repository (§11),
 * so promoting one is a data edit and this file never changes.
 */
export function FeatureShowcase() {
  const highlights = getFeaturesByEmphasis("highlight");
  const supporting = getFeaturesByEmphasis("supporting");

  return (
    <SectionShell
      size="compact"
      ariaLabel="COD King features"
      className="border-t border-ink/10"
    >
      <div className="flex flex-col gap-4">
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
          <ul
            className={cn(
              "grid items-stretch gap-4 sm:grid-cols-2",
              supportingColumns[supporting.length] ?? "lg:grid-cols-3",
            )}
          >
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
