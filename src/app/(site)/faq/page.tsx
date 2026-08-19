import { MessageCircleQuestionMark } from "lucide-react";

import { CompanyHero } from "@/components/company";
import {
  FaqCategorySection,
  FaqContactPrompt,
  FaqQuickFacts,
  FaqTopicLinks,
} from "@/components/faq";
import { FeatureCtaBand } from "@/components/features/sections";
import { LegalContents } from "@/components/legal";
import { SectionShell } from "@/components/sections/SectionShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { routes } from "@/constants/routes";
import { getFaqPageCategories, getFaqPageCopy } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { buildFaqPageSchema } from "@/lib/seo/faq";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to what Shopify merchants ask about COD King — setup, OTP verification, COD rules and fees, partial and prepaid payments, messaging costs, plans and billing.",
  path: routes.faq,
});

/**
 * Every question the site answers, on one page (§2).
 *
 * A composition file: the questions are read from the single tagged pool
 * through the content repository (§11), the grouping and order are the FAQ
 * page's own record beside them, and not one word of either is authored here.
 * A question shown here and on a control page is written once, so the two
 * surfaces cannot describe a control differently.
 *
 * The page is a server component. The only thing that hydrates is the
 * disclosure primitive inside each category, so every question ships in the
 * initial HTML and the FAQ data never crosses a client boundary as props.
 *
 * Its shape is the legal template's, because it is the same kind of document: a
 * long, sectioned reading surface with a contents rail that tracks where you
 * are. Reusing that arrangement — rather than inventing a FAQ layout — is what
 * makes this read as the same website at the same width as `/privacy-policy`,
 * and it is why the rail below is the site's existing one rather than a second
 * copy of it.
 */
export default function FaqPage() {
  const copy = getFaqPageCopy();
  const categories = getFaqPageCategories();

  const contents = categories.map((category) => ({
    id: category.id,
    label: category.title,
  }));

  return (
    <>
      {/*
        Built from the same resolved categories the page renders below, so the
        markup cannot list a question the page does not show or word an answer
        differently from the way a reader is given it (§7).

        It sits on the page rather than in the root layout because it describes
        this document. The Organization node the layout declares is referenced
        by `@id` rather than repeated.
      */}
      <JsonLd id="faq-schema" schema={buildFaqPageSchema(categories)} />

      <CompanyHero
        current="FAQ"
        eyebrow={copy.eyebrow}
        headline={copy.title}
        description={copy.description}
        visual={<FaqQuickFacts />}
        /*
          The topics close the hero across both tracks rather than sitting in
          the text column, for the reason `AboutStats` is passed the same way:
          seven chips inside a `max-w-xl` column is seven chips on four rows.
        */
        rail={<FaqTopicLinks categories={categories} className="mt-9" />}
      />

      {/*
        `allowOverflow`, for the reason the legal page gives: `SectionShell`
        clips its surface by default, and an ancestor with `overflow: hidden`
        becomes the scrolling ancestor of anything `position: sticky` inside it
        — so the rail would simply never stick. This section draws no backdrop,
        so it has nothing to clip and nothing to lose by letting the rail see
        the viewport.
      */}
      <SectionShell
        size="compact"
        allowOverflow
        className="border-t border-ink/[0.07]"
        containerClassName="py-10 md:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          {/*
            Desktop only, and with no compact fallback beneath it. The topic
            chips in the hero are this page's navigation on a phone: they are
            already above the first question, they need no JavaScript, and a
            second list of the same seven links inside the column would be the
            same errand offered twice.
          */}
          <aside className="hidden lg:block">
            <LegalContents variant="rail" items={contents} />
          </aside>

          <div className="min-w-0">
            {/*
              `divide-y` rather than a margin between categories. Seven groups
              separated by whitespace alone read as seven pages of a scroll;
              the hairline is the same rule the legal document sets between its
              sections, and it is what gives the column a rhythm — heading,
              questions, rule, next heading — instead of a gap.
            */}
            <div className="divide-y divide-ink/[0.07]">
              {categories.map((category) => (
                <div key={category.id} className="py-8 first:pt-0 last:pb-0">
                  <FaqCategorySection category={category} />
                </div>
              ))}
            </div>

            <FaqContactPrompt />
          </div>
        </div>
      </SectionShell>

      {/*
        The close is the band every feature page and the About page end on,
        unchanged. A page that invents a new closing offer is telling the
        merchant this is a different product from the one they were just
        reading about.
      */}
      <FeatureCtaBand title={copy.ctaTitle} icon={MessageCircleQuestionMark} />
    </>
  );
}
