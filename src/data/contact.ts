import { externalLinks, whatsappDisplayNumber } from "@/constants/external";

import type { CompanySectionCopy, ContactChannel, ContactField } from "@/types";

/**
 * The Contact page (§3.1).
 *
 * The channels below are the ones that exist. WhatsApp is the number published
 * on codking.tech today and is read from `constants/external.ts` rather than
 * retyped here. Live chat and email are stated as the FAQ states them — seven
 * days a week, inside the app — and deliberately carry no address, because the
 * site does not publish one and inventing a plausible `support@` is inventing a
 * mailbox nobody is reading.
 *
 * There is no office address and no phone number for the same reason. A contact
 * page that lists a fictional street is worse than one that lists three real
 * ways to get an answer.
 */
export const contactHeroCopy: CompanySectionCopy = {
  eyebrow: "Contact us",
  title: "Talk to the people who built it",
  description:
    "Questions about how a control behaves on your store, a plan that does not fit, or a number you want checked before you install — send it over. Support runs seven days a week.",
};

/**
 * The WhatsApp card, which is the page's primary action.
 *
 * Given its own record rather than sitting in the channel list, because it is
 * treated differently: it is the one channel that opens a conversation
 * immediately, in every market this product sells into, and the page leads with
 * it rather than listing it third.
 */
export const contactWhatsApp = {
  title: "Chat on WhatsApp",
  body: "The fastest way to reach us. Your message is already written — press send and the team picks it up.",
  number: whatsappDisplayNumber,
  href: externalLinks.whatsapp,
  actionLabel: "Open WhatsApp",
} as const;

export const contactChannels: readonly ContactChannel[] = [
  {
    id: "in-app",
    title: "Live chat & email",
    body: "Available seven days a week from inside the app, and it typically replies within minutes.",
    href: null,
    actionLabel: null,
    external: false,
  },
  {
    id: "docs",
    title: "Documentation",
    body: "Setup and configuration for every control — usually faster than waiting for a reply.",
    href: externalLinks.docs,
    actionLabel: "Read the docs",
    external: true,
  },
];

/**
 * The form's fields.
 *
 * Four, and no more. Every extra field on a contact form is a reason not to
 * send it. Three are required because they are what an answer actually needs —
 * who you are, how to reach you, and which store this is about; a Shopify
 * question without the store domain costs a round trip before anyone can even
 * look. Email is optional precisely because the phone number is not: one
 * working channel is the requirement, not two.
 */
export const contactFormFields: readonly ContactField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+91 98765 43210",
    autoComplete: "tel",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@yourstore.com",
    autoComplete: "email",
    required: false,
  },
  {
    name: "shopUrl",
    label: "Shop URL",
    type: "text",
    placeholder: "yourstore.myshopify.com",
    autoComplete: "url",
    required: true,
  },
];

export const contactFormCopy = {
  title: "Send us a message",
  description:
    "Tell us where to reach you and which store this is about. We come back the same day.",
  submitLabel: "Send Message",
} as const;

/**
 * What the form does today.
 *
 * There is no endpoint behind it yet, and the form says so on submit rather
 * than showing a green tick for a message nobody received. The alternative —
 * a fake success state — is the single worst thing a contact page can do.
 */
export const contactFormFallback = {
  title: "This form is not connected yet",
  body: "We are still wiring up the mailbox behind it, so nothing has been sent. Message us on WhatsApp and you will get an answer today.",
} as const;

/**
 * The support facts beside the form.
 *
 * All three are stated elsewhere on the site already — the FAQ for the hours
 * and the response time, the proof repository for the rating — so this restates
 * nothing the site does not already say. The rating is left as a token here and
 * resolved from that repository at render, per §11.1.
 */
export const contactAssurances: readonly string[] = [
  "Support seven days a week",
  "Typically replies within minutes",
  "Priority support on enterprise plans",
];
