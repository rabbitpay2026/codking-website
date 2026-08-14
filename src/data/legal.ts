import { externalLinks, legalEntityName } from "@/constants/external";

import type { LegalDocument } from "@/types";

const SUPPORT_EMAIL = externalLinks.supportEmail;

/**
 * The four legal documents (§3).
 *
 * Privacy and Terms are not drafted here. They reproduce the documents
 * Notifik Technologies already publishes for COD King on codking.tech, clause
 * for clause and in the published order — the account terms, the eighteen
 * general conditions, the payment terms, the tax line, the refund position and
 * the support address. The wording is set for this site's typography rather
 * than pasted as one wall of text, but no obligation has been added, softened
 * or dropped, because a website that states different terms from the ones the
 * business publishes is worse than a website with no terms at all.
 *
 * Refund and Cookies have no published counterpart, so those two are still
 * described from what the product observably does.
 *
 * What is deliberately absent everywhere is anything only the business can
 * state: the registered address, the courts with exclusive jurisdiction,
 * retention periods, named sub-processors, certifications. None of it is
 * guessed and none of it is filled with a plausible-looking default. Each such
 * item sits in its section's `confirm` array, which the page renders as a
 * visible open item, so publishing is a matter of deleting arrays rather than
 * proofreading paragraphs for invented facts.
 *
 * `lastUpdated` stays `null` for the same reason: the published documents carry
 * no revision date, and a legal page showing a fabricated one is worse than one
 * showing none.
 *
 * `**like this**` marks a phrase for emphasis, rendered as `<strong>` by
 * `LegalText`. It is the only formatting these strings carry, and it is
 * presentation rather than content: the marks fall on the part of a sentence a
 * merchant is bound by — the age limit, the payment window, "does not issue
 * refunds" — and never on a phrase the published document does not contain. No
 * clause has been added, softened or reordered to make room for one.
 */
export const legalDocuments: readonly LegalDocument[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: `How ${legalEntityName} collects, uses and safeguards your information when you use the COD King website, app and related services.`,
    lastUpdated: null,
    status: "draft",
    notice: `The sections below reproduce the Privacy Policy ${legalEntityName} publishes for COD King. A small number of details the published policy does not state — retention periods, processing regions, the registered address — are listed inside the section they belong to rather than left as gaps in the text.`,
    facts: [
      { id: "operator", label: "Operated by", value: legalEntityName },
      {
        id: "applies",
        label: "Applies to",
        value: "The COD King website, app and related services",
      },
      ...(SUPPORT_EMAIL
        ? [
            {
              id: "contact",
              label: "Privacy questions",
              value: SUPPORT_EMAIL,
              href: `mailto:${SUPPORT_EMAIL}`,
            },
          ]
        : []),
    ],
    sections: [
      {
        id: "introduction",
        heading: "1. Introduction",
        body: [
          `This Privacy Policy explains how ${legalEntityName} ("we", "our", "us") collects, uses and safeguards your personal information when you access our website, our applications and the related services we operate — including COD King, our Shopify application. Together these are referred to below as **the Services**.`,
          "**By using the Services you agree to the terms set out here.** If you do not agree, please discontinue use of our website and Services.",
        ],
        confirm: [
          `The full registered name and address of ${legalEntityName}, and the domains this policy formally covers`,
        ],
      },
      {
        id: "information-we-collect",
        heading: "2. Information we collect",
        body: [
          "We collect the following categories of information when you register for, configure and use the Services.",
        ],
        points: [
          "**Personal information** — name, email address, phone number and other identifiable details.",
          "**Account data** — login credentials, and third-party account information where you have linked one.",
          "**Payment information** — card details, bank account information and compliance documents.",
          "**Customer information** — the addresses, email addresses, mobile numbers and wallet details attached to your customers' orders.",
          "**User activity** — pages visited, searches, IP address, device and browser details, and timestamps.",
        ],
      },
      {
        id: "how-we-use-it",
        heading: "3. How we use your information",
        body: ["We use the information above to:"],
        points: [
          "Provide and improve our Services.",
          "Enable secure transactions.",
          "Detect fraud and errors.",
          "Communicate updates, offers and notifications.",
          "Personalise your experience of the Services.",
        ],
      },
      {
        id: "merchant-accounts",
        heading: "4. Merchant account information",
        body: [
          "If you register as a merchant, we may request additional details — financial information, compliance documents and similar — in order to give you full access to the Services.",
        ],
        points: [
          "**Email** may be used to send you updates, newsletters and important notices.",
          "**SMS and WhatsApp** may be used for transaction alerts and reminders.",
          "**You can unsubscribe at any time** by following the links in our communications.",
        ],
      },
      {
        id: "no-sale",
        heading: "5. We do not sell your information",
        body: [
          "**We do not sell your information**, and we do not publicly disclose it.",
        ],
      },
      {
        id: "customer-information",
        heading: "6. Customer information",
        body: [
          "Customer data — contact details, payment methods and similar — is **only shared with businesses if the customer consents**.",
          `${legalEntityName} **is not liable for misuse of that data by third-party businesses**.`,
        ],
      },
      {
        id: "user-activity",
        heading: "7. User activity data",
        body: [
          "We collect technical and behavioural data — browser, device, IP address and usage patterns — in order to:",
        ],
        points: [
          "Maintain website security.",
          "Improve the user experience.",
          "Conduct aggregated statistical analysis.",
        ],
      },
      {
        id: "security",
        heading: "8. Security and data deletion",
        body: [
          "We implement **industry-standard safeguards** to protect your data, but **no service can guarantee complete security** over the internet.",
          "**You may request deletion of your data at any time**, and we will erase it from our systems.",
        ],
        confirm: [
          "How long account, order and support records are kept before deletion is requested",
          "The regions data is stored and processed in, and the sub-processors relied on",
          "Any certifications or audits to reference, and the breach-notification window offered",
        ],
      },
      {
        id: "intellectual-property",
        heading: "9. Intellectual property",
        body: [
          `All content and intellectual property on ${legalEntityName} properties **remain our sole property**. Downloading or otherwise using our materials **does not transfer any ownership right** in them.`,
        ],
      },
      {
        id: "cookies",
        heading: "10. Cookies",
        body: [
          "This website uses a small number of cookies, and the app sets its own on a storefront where a feature requires it. The Cookie Policy sets out which, and what each is for.",
        ],
      },
      {
        id: "changes",
        heading: "11. Changes to this policy",
        body: [
          "When this policy changes, the revision date at the top of the page changes with it. Where a change **materially affects how information is handled**, we notify merchants **before it takes effect**.",
        ],
      },
      {
        id: "contact",
        heading: "12. Contact us",
        body: [
          SUPPORT_EMAIL
            ? `If you have any questions about this policy, or a request about data we hold, contact us at **${SUPPORT_EMAIL}**. You can also reach us through the contact page.`
            : "If you have any questions about this policy, or a request about data we hold, reach us through the contact page.",
        ],
        confirm: [
          "Whether a dedicated privacy contact or data protection officer is appointed",
        ],
      },
    ],
  },

  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary: `The agreement between ${legalEntityName} and the merchant using COD King — the account terms, the general conditions, and how fees are paid.`,
    lastUpdated: null,
    status: "draft",
    notice: `The clauses below reproduce the Terms & Conditions ${legalEntityName} publishes for COD King, in the published order. The few points the published text leaves open — the registered address, the courts with exclusive jurisdiction — are listed inside the section they belong to rather than answered here.`,
    facts: [
      { id: "operator", label: "Agreement with", value: legalEntityName },
      {
        id: "applies",
        label: "Applies to",
        value: "The COD King website, app and related services",
      },
      ...(SUPPORT_EMAIL
        ? [
            {
              id: "contact",
              label: "Questions",
              value: SUPPORT_EMAIL,
              href: `mailto:${SUPPORT_EMAIL}`,
            },
          ]
        : []),
    ],
    sections: [
      {
        id: "agreement",
        heading: "1. The agreement",
        body: [
          `These Terms & Conditions govern your use of COD King and the related services operated by ${legalEntityName} (the "Service"). **You must read, agree to and accept all terms** set out in this User Agreement and in the Privacy Policy **before becoming a member** of ${legalEntityName}.`,
        ],
        confirm: [
          `The full registered name and address of the entity these terms are entered into with — the published site also carries the credit "COD King by Meraki Design Agency", which needs reconciling with ${legalEntityName}`,
        ],
      },
      {
        id: "account-terms",
        heading: "2. Account terms",
        clauses: [
          "You must be **at least 18 years of age** to access and utilise this Service.",
          "During registration you are required to provide your **complete legal name, current address, a valid email address**, and any other information necessary to complete your signup.",
          `**It is your responsibility to ensure the security of your password.** ${legalEntityName} will not be liable for any loss or damage resulting from your failure to protect your account and password.`,
          `The ${legalEntityName} service **must not be used for any illegal or unauthorised activity**, and you are required to comply with all laws applicable in your jurisdiction, as well as **the laws of India**.`,
          `**You are accountable for all actions and content** — including data, graphics, images and links — associated with your ${legalEntityName} account.`,
          "The transmission of any malicious software, virus or destructive code is **strictly prohibited**.",
          `If any violation of these account terms is identified by ${legalEntityName}, it may lead to the **immediate termination of your services**.`,
        ],
      },
      {
        id: "general-conditions",
        heading: "3. General conditions",
        body: [
          "The following apply to your use of the Service in addition to the account terms above.",
        ],
        clauses: [
          "We retain the right to **modify or discontinue the Service** for any reason at any time **without prior notice**.",
          "**We may refuse service to anyone**, for any reason, at any time.",
        ],
      },
      {
        id: "service-availability",
        heading: "4. Service availability and limitations",
        clauses: [
          'Your use of the Service is **entirely at your own risk**. The Service is offered **"as is" and "as available"**, without any guarantee or warranty, either express or implied.',
          `${legalEntityName} **does not assure that the Service will be continuous, prompt, secure or free of errors**.`,
          "The results obtained from using the Service **may not always be accurate or reliable**.",
          `${legalEntityName} **does not guarantee** that any product, service, information or other material acquired through the Service will meet your expectations, or that any error in the Service will be rectified.`,
        ],
      },
      {
        id: "your-content",
        heading: "5. Your content and its transmission",
        clauses: [
          "You acknowledge that your content — **excluding credit card data** — **may be transmitted unencrypted**, and that this may involve (a) data being sent over various networks, and (b) adaptations required to meet the technical specifications of connecting networks or devices.",
          "While we may review content, **we are not obliged to do so**. We may **remove content and accounts** that we consider unlawful, offensive, threatening, defamatory or otherwise objectionable, at our discretion.",
          `${legalEntityName} **does not claim ownership rights** over the materials you provide to our Service.`,
          `By submitting images and product descriptions to ${legalEntityName}, **you grant permission for other internet users to see this content**, and you agree that we may display, store and review all content submitted to our Service.`,
        ],
      },
      {
        id: "prohibited-activities",
        heading: "6. Prohibited activities",
        clauses: [
          `You agree **not to duplicate, copy, sell, resell or exploit any part of the Service**, or access to it, without obtaining **explicit written permission** from ${legalEntityName}.`,
          `Any form of abuse — verbal or in writing — aimed at any ${legalEntityName} customer, employee, member or representative **will result in the immediate termination of your account**.`,
          `**You are prohibited from acquiring search engine or similar pay-per-click keywords** (such as Google Ads keywords), or domain names, that incorporate the ${legalEntityName} name or trademarks, including variations and misspellings.`,
        ],
      },
      {
        id: "liability",
        heading: "7. Limitation of liability",
        body: [
          `You agree that ${legalEntityName} **will not be held responsible for any direct, indirect, incidental, special, consequential or exemplary damages** — including but not limited to lost profits, goodwill or data — resulting from your use of, or inability to use, the Service.`,
          `${legalEntityName} and our suppliers **will not be liable for any loss or special damage** arising from the use of our site, our services or this agreement, however the situation arises, **including through negligence**.`,
        ],
      },
      {
        id: "indemnification",
        heading: "8. Indemnification",
        body: [
          `**You agree to indemnify and hold** ${legalEntityName}, along with our affiliates and employees, **harmless from any claim made by a third party** arising from **your breach of this Agreement** or any related document, or from your violation of any law or third-party right.`,
        ],
      },
      {
        id: "technical-support",
        heading: "9. Technical support",
        body: [
          "Technical support is available **only to paying account holders**, by email and — where prearranged — through phone and ticketing systems.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "10. Intellectual property",
        body: [
          `The Service, this website, and the COD King and ${legalEntityName} names and marks **remain ours**. **Nothing in these terms transfers ownership of them to you**, and the restrictions in section 6 apply to any use of them.`,
          "Materials you provide to the Service remain yours, subject to the permission described in section 5.",
        ],
      },
      {
        id: "payment-of-fees",
        heading: "11. Payment of fees",
        clauses: [
          `Various payment options are available. **The merchant must pay according to the terms agreed** with ${legalEntityName} — **monthly, quarterly, bi-annually or annually**.`,
          "Payments should be made **within 7 days of the invoice date**. Beyond that, the merchant risks **potential closure or termination of their online store**.",
        ],
        confirm: [
          "Whether charges made through Shopify billing follow this invoice cycle or Shopify's own",
        ],
      },
      {
        id: "taxes",
        heading: "12. Taxes",
        body: [
          "**All fees are subject to state and central taxes**, service charges, sales tax, and any other applicable taxes.",
        ],
      },
      {
        id: "refunds",
        heading: "13. Refunds",
        body: [`${legalEntityName} **does not issue refunds**.`],
        confirm: [
          "Whether any exception applies — a trial period, or a charge for a service that was not delivered",
        ],
      },
      {
        id: "entire-agreement",
        heading: "14. Waiver and entire agreement",
        body: [
          `If ${legalEntityName} fails to enforce or exercise any right or provision of these terms, that **will not be viewed as a waiver** of the right or provision.`,
          `These terms represent the **entire understanding** between you and ${legalEntityName} regarding your use of the Service, and **override any prior agreement**, including earlier versions of these Terms.`,
        ],
      },
      {
        id: "governing-law",
        heading: "15. Governing law",
        body: [
          "You are required to **comply with all laws applicable in your jurisdiction**, as well as **the laws of India**.",
        ],
        confirm: [
          "The governing law of the agreement itself, and the courts with exclusive jurisdiction",
          "Whether disputes go to arbitration first, and where",
        ],
      },
      {
        id: "contact",
        heading: "16. Contact us",
        body: [
          SUPPORT_EMAIL
            ? `Questions about these terms can be sent to **${SUPPORT_EMAIL}**, or through the contact page.`
            : "Questions about these terms can be sent through the contact page.",
        ],
      },
    ],
  },

  {
    slug: "refund-policy",
    title: "Refund Policy",
    summary:
      "How COD King is billed, what happens when you cancel, and when a charge can be refunded.",
    lastUpdated: null,
    status: "draft",
    sections: [
      {
        id: "overview",
        heading: "1. Overview",
        body: [
          "This policy covers charges for the COD King app itself. It does not cover refunds a merchant gives their own customers on a COD order — that is the store's own policy, and this app has no part in it.",
        ],
      },
      {
        id: "before-you-pay",
        heading: "2. Before you pay",
        body: [
          "COD King can be installed and set up before any charge applies, and the pricing page states what each plan includes. The COD calculator on this site sizes the saving against your own numbers without an account.",
          "Evaluating the app on your own store first is the intended path, and — given the no-refund clause in the Terms & Conditions — it is the step that matters most.",
        ],
        confirm: [
          "Whether a free plan, a free trial, or both are offered, and the length of the trial",
        ],
      },
      {
        id: "billing",
        heading: "3. How billing works",
        body: [
          "App charges are processed through Shopify's billing rather than collected by us, so they appear on your Shopify invoice and are paid with the payment method on your Shopify account.",
          "Where an invoice is raised directly instead, the Terms & Conditions require payment within 7 days of the invoice date.",
        ],
      },
      {
        id: "cancelling",
        heading: "4. Cancelling",
        body: [
          "Uninstalling the app from your Shopify store cancels it. There is no cancellation fee and no notice period.",
          "Cancelling stops future charges. A period already invoiced is not automatically refunded — see the section below.",
        ],
      },
      {
        id: "eligibility",
        heading: "5. When a refund applies",
        body: [
          `The published Terms & Conditions state that ${legalEntityName} does not issue refunds. Nothing on this page overrides that clause, and it is the position that applies today.`,
          "Where the app has not worked as described, tell us before the next invoice falls due. Support can usually fix the cause, and uninstalling stops the charge that follows — which is the remedy currently available.",
        ],
        confirm: [
          "Whether any exception to the no-refund clause is offered in practice, and on what grounds",
          "If exceptions are offered: the window, whether it is pro-rated, and which plans are eligible",
        ],
      },
      {
        id: "usage-charges",
        heading: "6. Message and gateway costs",
        body: [
          "Where SMS, WhatsApp or payment-gateway costs are billed by a provider you connected yourself, those charges are that provider's and are refunded under their policy, not this one.",
        ],
        confirm: [
          "How message credits bought through COD King, if any, are treated on cancellation",
        ],
      },
      {
        id: "how-to-request",
        heading: "7. Raising a billing problem",
        body: [
          SUPPORT_EMAIL
            ? `Send the store domain, the charge in question and what went wrong to ${SUPPORT_EMAIL}, or through the contact page. We will confirm receipt and tell you the outcome.`
            : "Send us the store domain, the charge in question, and what went wrong, through the contact page. We will confirm receipt and tell you the outcome.",
        ],
        confirm: ["The target turnaround for a decision on a billing problem"],
      },
    ],
  },

  {
    slug: "cookies",
    title: "Cookie Policy",
    summary:
      "The cookies this website and the COD King app set, what each is for, and how to turn them off.",
    lastUpdated: null,
    status: "draft",
    sections: [
      {
        id: "what-cookies-are",
        heading: "1. What cookies are",
        body: [
          "A cookie is a small file a website asks your browser to keep, so that the next page you open knows something the last one did. Similar technologies — local storage, for instance — do the same job and are covered here too.",
        ],
      },
      {
        id: "on-this-site",
        heading: "2. Cookies on this website",
        body: [
          "This is a marketing site and it is deliberately light on cookies. Nothing here is needed to read the pages.",
        ],
        points: [
          "Preference — remembers small choices you make, such as dismissing the announcement bar, so it does not reappear on every page. Stored in your browser and never sent to us.",
          "Analytics — measures which pages are read and which links are followed, in aggregate, so we can tell what is worth writing next.",
        ],
        confirm: [
          "The analytics provider in use, the cookies it sets, and how long each lasts",
          "Whether a consent banner is required for the markets served",
        ],
      },
      {
        id: "in-the-app",
        heading: "3. Cookies set by the app",
        body: [
          "Inside a merchant's Shopify admin, the app relies on the session Shopify establishes. On a storefront, a cookie is set only where a feature needs to carry state between the cart and the checkout — remembering that an order has already passed OTP verification, for example, so a shopper is not asked twice.",
          "These are functional. Without them the feature the merchant switched on cannot work.",
        ],
      },
      {
        id: "shopify",
        heading: "4. Cookies set by Shopify",
        body: [
          "A Shopify storefront sets its own cookies for the cart, the checkout and its own analytics. Those are Shopify's, not ours, and are covered by Shopify's cookie policy and by the store's own.",
        ],
      },
      {
        id: "managing",
        heading: "5. Managing cookies",
        body: [
          "Every major browser can block or clear cookies, per site or entirely, from its privacy settings. Blocking functional cookies on a storefront may mean a verification step repeats itself; blocking preference cookies on this site means the announcement bar returns on each visit.",
        ],
      },
      {
        id: "changes",
        heading: "6. Changes",
        body: [
          "This policy is updated when the cookies we set change. The revision date at the top of the page tracks it.",
        ],
      },
      {
        id: "contact",
        heading: "7. Contact",
        body: ["Questions about cookies can be sent through the contact page."],
      },
    ],
  },
];
