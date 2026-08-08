import { SectionShell } from "@/components/sections/SectionShell";
import { siteConfig } from "@/constants/site";
import { getControlBoardTitle } from "@/lib/content";

/**
 * The top of the Features index.
 *
 * Compact by design: this is a navigation page, and the cards under it are
 * what the merchant came for. A heading, one line, and out of the way.
 *
 * Both lines are existing copy — the board title the homepage uses for the
 * same set of controls, and the product's own one-line definition — so the
 * page introduces the feature set in the words the rest of the site already
 * uses rather than in new ones written for this template.
 */
export function FeaturesHero() {
  return (
    <SectionShell
      size="compact"
      containerClassName="pt-10 pb-0 md:pt-14 md:pb-0"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
          Features
        </p>

        <h1 className="mt-5 text-[2rem] leading-[1.06] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[2.5rem]">
          {getControlBoardTitle()}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>
    </SectionShell>
  );
}
