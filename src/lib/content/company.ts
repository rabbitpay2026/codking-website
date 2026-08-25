import {
  aboutCapabilitiesCopy,
  aboutCtaTitle,
  aboutHelp,
  aboutHero,
  aboutMission,
  aboutProblem,
  aboutReasons,
} from "@/data/about";
import {
  contactAssurances,
  contactChannels,
  contactFormCopy,
  contactFormFields,
  contactFormStates,
  contactHeroCopy,
  contactWhatsApp,
} from "@/data/contact";

import type {
  AboutHero,
  CompanySection,
  CompanySectionCopy,
  ContactChannel,
  ContactField,
} from "@/types";

export function getAboutHero(): AboutHero {
  return aboutHero;
}

export function getAboutMission(): CompanySection {
  return aboutMission;
}

export function getAboutProblem(): CompanySection {
  return aboutProblem;
}

export function getAboutHelp(): CompanySection {
  return aboutHelp;
}

export function getAboutCapabilitiesCopy(): CompanySectionCopy {
  return aboutCapabilitiesCopy;
}

export function getAboutReasons(): CompanySection {
  return aboutReasons;
}

export function getAboutCtaTitle(): string {
  return aboutCtaTitle;
}

export function getContactHeroCopy(): CompanySectionCopy {
  return contactHeroCopy;
}

/**
 * The channels that actually exist, with the unconfigured ones dropped.
 *
 * A channel whose destination comes from the environment can resolve to `null`,
 * and a card offering a way to reach us that goes nowhere is worse than one
 * card fewer. Channels with no link by design — live chat, which opens inside
 * the app — declare `actionLabel: null` and are kept.
 */
export function getContactChannels(): readonly ContactChannel[] {
  return contactChannels.filter(
    (channel) => channel.href !== null || channel.actionLabel === null,
  );
}

export function getContactFormFields(): readonly ContactField[] {
  return contactFormFields;
}

export function getContactFormCopy(): typeof contactFormCopy {
  return contactFormCopy;
}

export function getContactFormStates(): typeof contactFormStates {
  return contactFormStates;
}

/** The WhatsApp card, or `null` when no number is configured. */
export function getContactWhatsApp(): typeof contactWhatsApp | null {
  return contactWhatsApp.href ? contactWhatsApp : null;
}

export function getContactAssurances(): readonly string[] {
  return contactAssurances;
}
