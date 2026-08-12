import { ShopifyMark } from "@/components/brand/ShopifyMarks";
import { AboutStats } from "@/components/company/AboutStats";
import { CompanyHero } from "@/components/company/CompanyHero";
import { ActionLink } from "@/components/layout/ActionLink";
import { getAboutHero, getUtilityActions } from "@/lib/content";

/**
 * The top of the About page.
 *
 * The headline is the record's three statements with the middle one carrying
 * the colour — the feature pages' construction, because a merchant arriving
 * here from one of them should not meet a different typographic idea.
 *
 * The two actions are the header's own, unchanged. An About page that invents
 * its own call to action is telling the visitor this is a different offer, and
 * the install button here is the same object it has been on every page since
 * they arrived — ink, not brand, with Shopify's mark as its only colour.
 */
export async function AboutHero() {
  const hero = getAboutHero();
  const actions = getUtilityActions();

  const installAction = actions.find((action) => action.variant === "primary");
  const demoAction = actions.find((action) => action.variant === "secondary");

  return (
    <CompanyHero
      current="About Us"
      eyebrow={hero.eyebrow}
      headline={
        <>
          {hero.headlineLead}
          <span className="block text-brand">{hero.headlineAccent}</span>
          <span className="block">{hero.headlineTail}</span>
        </>
      }
      description={hero.description}
    >
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {installAction ? (
          <ActionLink
            action={{ ...installAction, label: "Install on Shopify" }}
            size="lg"
            icon={<ShopifyMark className="size-[22px]" />}
            className="h-12 gap-2.5 bg-ink px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(11,27,54,0.24),0_10px_28px_-12px_rgba(11,27,54,0.7)] hover:bg-ink/90 hover:shadow-[0_2px_4px_rgba(11,27,54,0.24),0_14px_32px_-12px_rgba(11,27,54,0.75)]"
          />
        ) : null}

        {demoAction ? (
          <ActionLink
            action={demoAction}
            size="lg"
            className="h-12 border-ink/10 bg-white/80 px-6 text-[15px] font-semibold text-ink/80 shadow-[0_1px_2px_rgba(11,27,54,0.05)] backdrop-blur-md hover:border-ink/16 hover:bg-white hover:text-ink"
          />
        ) : null}
      </div>

      <AboutStats />
    </CompanyHero>
  );
}
