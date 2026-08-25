import { ContactAssurances } from "@/components/company/ContactAssurances";
import { ContactChannels } from "@/components/company/ContactChannels";
import { ContactForm } from "@/components/company/ContactForm";
import { ContactWhatsAppCard } from "@/components/company/ContactWhatsAppCard";
import { FeatureEyebrow } from "@/components/features/FeatureEyebrow";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { HeroEnvironment } from "@/components/sections/hero/HeroEnvironment";
import { SectionShell } from "@/components/sections/SectionShell";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { routes } from "@/constants/routes";
import { externalLinks } from "@/constants/external";
import {
  getContactFormCopy,
  getContactFormFields,
  getContactFormStates,
  getContactHeroCopy,
} from "@/lib/content";

import type { NavItem } from "@/types";

const CONTACT_TRAIL: readonly NavItem[] = [
  { label: "Home", href: routes.home },
];

/**
 * The Contact page, as one section rather than a hero above a body.
 *
 * A contact page has one job, and splitting it into a headline band and a
 * separate form band puts a horizontal rule between the sentence "talk to us"
 * and the means of doing it. So the heading, the ways to reach us and the form
 * share a single surface: words and channels on the left, the form on the
 * right, and the hero backdrop running under both.
 *
 * The form takes the narrower track on purpose. Four short inputs do not want
 * 600px of measure, and the left column is carrying more — a headline, a
 * primary action, two channels, a social row and the support panel — so the
 * weight balances even though the form is what the page is named after.
 *
 * Below `lg` they stack with the words first, then the WhatsApp card, then the
 * form: a merchant on a phone who wanted to message rather than type reaches
 * the thread without scrolling past a form to find it.
 */
export function ContactSupport() {
  const copy = getContactHeroCopy();

  return (
    <SectionShell
      containerClassName="pt-5 pb-12 md:pt-6 md:pb-16"
      backdrop={<HeroEnvironment />}
    >
      <Breadcrumb trail={CONTACT_TRAIL} current="Contact Us" />

      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-start lg:gap-12">
        <div>
          <FeatureEyebrow>{copy.eyebrow}</FeatureEyebrow>

          <h1 className="mt-5 max-w-xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[2.45rem]">
            {copy.title}
          </h1>

          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-pretty text-ink/55">
            {copy.description}
          </p>

          <div className="mt-8 max-w-xl">
            <ContactWhatsAppCard />
          </div>

          <ContactChannels className="mt-3 max-w-xl sm:grid-cols-2" />

          <div className="mt-3 max-w-xl">
            <ContactAssurances />
          </div>

          <div className="mt-8">
            <p className="text-[0.6875rem] font-semibold tracking-[0.08em] text-ink/45 uppercase">
              Follow us
            </p>
            <SocialLinks className="mt-3.5" />
          </div>
        </div>

        <ContactForm
          fields={getContactFormFields()}
          copy={getContactFormCopy()}
          states={getContactFormStates()}
          whatsappHref={externalLinks.whatsapp}
        />
      </div>
    </SectionShell>
  );
}
