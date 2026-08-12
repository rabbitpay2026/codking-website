import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { FeatureMark } from "@/components/features/FeatureMark";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { routes } from "@/constants/routes";
import { cardHoverClass } from "@/constants/theme";
import { getAboutCapabilitiesCopy, getFeatureNavItems } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The six controls, on the About page.
 *
 * Read from `getFeatureNavItems()` — the same selection the mega-menu opens,
 * the footer lists and the Features page ranks. Restating them here as authored
 * copy would give the site a fifth place to disagree with itself about what the
 * product ships, which is the exact failure this page is meant to close.
 *
 * Each card is a link, so it takes the pointer response a link should have:
 * the mark warms to brand, the title takes the brand colour, and the arrow
 * travels a pixel. That is the whole animation — the same restraint the feature
 * pages use, because six cards that all lift and glow is a page that never
 * settles.
 */
export function AboutCapabilities({
  tone = "default",
}: {
  /** Matches `CompanyPointGrid`, so the page can alternate surfaces. */
  readonly tone?: "default" | "muted";
}) {
  const copy = getAboutCapabilitiesCopy();
  const features = getFeatureNavItems();

  return (
    <SectionShell
      tone={tone}
      size="compact"
      className="border-t border-ink/[0.07]"
      containerClassName="py-9 md:py-11"
    >
      <BlurFade>
        <div className="max-w-2xl">
          <FeatureEyebrow>{copy.eyebrow}</FeatureEyebrow>

          <h2 className="mt-3.5 text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.03em] text-pretty text-ink sm:text-[1.9rem]">
            {copy.title}
          </h2>

          <p className="mt-3 text-[15px] leading-relaxed text-pretty text-ink/55">
            {copy.description}
          </p>
        </div>
      </BlurFade>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <li key={feature.href}>
            <BlurFade delay={index * 0.05} className="h-full">
              <Link
                href={feature.href}
                className={cn(
                  "group flex h-full flex-col rounded-xl border border-ink/[0.08] bg-card p-5",
                  "outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                  cardHoverClass,
                )}
              >
                <FeatureMark
                  slug={feature.slug}
                  className="size-9 rounded-lg"
                />

                <h3 className="mt-4 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 ease-emphasized group-hover:text-brand">
                  {feature.label}
                </h3>

                {feature.description ? (
                  <p className="mt-2 text-[13.5px] leading-relaxed text-pretty text-ink/55">
                    {feature.description}
                  </p>
                ) : null}

                <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink/45 transition-colors duration-300 ease-emphasized group-hover:text-brand">
                  Explore feature
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 ease-emphasized group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </BlurFade>
          </li>
        ))}
      </ul>

      <BlurFade>
        <Link
          href={routes.features}
          className="mt-5 inline-flex items-center gap-1.5 rounded-sm py-1.5 text-[13.5px] font-medium text-brand transition-colors duration-200 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          See all features
          <ArrowRight aria-hidden className="size-3.5" />
        </Link>
      </BlurFade>
    </SectionShell>
  );
}
