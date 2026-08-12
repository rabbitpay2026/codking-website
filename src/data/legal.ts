import type { LegalDocument } from "@/types";

/**
 * The four legal documents (§3).
 *
 * What is written here and what is deliberately not written here are two
 * different decisions.
 *
 * Written: everything that follows from what the product observably is — a
 * Shopify app that reads store and order data, sends an OTP over SMS or
 * WhatsApp, takes an upfront payment through the merchant's own gateway,
 * messages abandoned carts, and reports on the result. Those practices are
 * described from the product itself rather than from a template, because a
 * privacy policy that does not match the app is not a policy.
 *
 * Not written: anything only the business can state — the registered entity and
 * its address, the governing jurisdiction, retention periods, the named
 * sub-processors, refund windows, liability caps. None of it is guessed and
 * none of it is filled with a plausible-looking default. Each such item is
 * listed in its section's `confirm` array, which the page renders as a visible
 * open item, so publishing is a matter of replacing arrays rather than
 * proofreading paragraphs for invented facts.
 *
 * `lastUpdated` stays `null` and `status` stays `draft` for the same reason: a
 * legal page showing a fabricated revision date is worse than one showing none.
 */
export const legalDocuments: readonly LegalDocument[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "What COD King collects when you install the app, why we hold it, and what we do with the order data that passes through it.",
    lastUpdated: null,
    status: "draft",
    sections: [
      {
        id: "scope",
        heading: "1. Scope",
        body: [
          "This policy covers the COD King application installed on a Shopify store, this website, and the support channels we answer on. It explains what we collect, why we hold it, and how long it stays with us.",
          "It does not cover Shopify itself, nor the payment gateways, messaging providers or courier services a merchant connects their store to. Those are separate services under their own policies, and a merchant's relationship with them is their own.",
        ],
        confirm: [
          "The legal entity that operates COD King, and its registered address",
        ],
      },
      {
        id: "what-we-collect",
        heading: "2. Information we collect",
        body: [
          "COD King is installed by a merchant onto their own Shopify store, so most of what we hold is either the merchant's account information or the store data Shopify grants the app access to at install time.",
        ],
        points: [
          "Merchant account details — the store domain, the contact name and address Shopify provides, and the plan you are on.",
          "Store and order data — orders, line items, cart values, delivery addresses, order status and fulfilment state, read through Shopify's APIs under the permissions granted at install.",
          "Shopper contact details — the phone number or email address on an order, used to send an OTP, an upfront-payment link, or an abandoned-cart reminder.",
          "Configuration — the COD rules, fees, discounts and message templates you set up in the app.",
          "Support correspondence — the messages you send us and our replies.",
          "Website usage — pages viewed on this site and the general information a browser sends with every request. See the Cookie Policy for the detail.",
        ],
      },
      {
        id: "how-we-use-it",
        heading: "3. How we use it",
        body: [
          "Every use below exists because a feature of the app requires it. We do not sell data, and we do not use shopper contact details to market anything of our own.",
        ],
        points: [
          "Verifying orders — sending a one-time password over SMS or WhatsApp and recording whether it was confirmed.",
          "Collecting upfront payments — generating the partial-payment request and recording whether it was paid.",
          "Applying COD rules and fees — evaluating a cart against the rules you configured to decide whether COD is offered and at what charge.",
          "Recovering abandoned carts and converting COD to prepaid — sending the reminder or offer you configured to the contact on the cart or order.",
          "Reporting — producing the verification, RTO and prepaid figures shown in your dashboard.",
          "Running the service — billing, support, security monitoring, and fixing faults.",
        ],
      },
      {
        id: "controller-and-processor",
        heading: "4. Who controls the data",
        body: [
          "For shopper data, the merchant is the controller and COD King is the processor: the data reaches us because a merchant installed the app on their store, and we act on it to deliver the features that merchant switched on. We do not use it for our own purposes.",
          "For a merchant's own account and billing information, COD King is the controller.",
          "A merchant is responsible for having a lawful basis to contact their own customers, including consent where their market requires it before sending an SMS or WhatsApp message.",
        ],
      },
      {
        id: "sharing",
        heading: "5. Sharing and sub-processors",
        body: [
          "Delivering the app means passing some data to the services that carry it. A phone number reaches a messaging provider so an OTP can be delivered; an amount and an order reference reach a payment gateway so an upfront payment can be taken.",
          "We share data with a service only where a feature requires it, and only the fields that feature needs. We also disclose data where the law compels us to.",
        ],
        confirm: [
          "The current list of sub-processors — hosting, messaging and payment providers — and the region each operates in",
          "The process and notice period for notifying merchants of a change to that list",
        ],
      },
      {
        id: "retention",
        heading: "6. Retention",
        body: [
          "Configuration and reporting data stay for as long as the app is installed. Uninstalling the app from a Shopify store ends our access to that store's data, and Shopify's own webhooks notify us to begin deletion.",
        ],
        confirm: [
          "How long order and verification records are kept after uninstall",
          "How long support correspondence and billing records are kept",
        ],
      },
      {
        id: "security",
        heading: "7. Security",
        body: [
          "Data is encrypted in transit. Access to production systems is limited to the people who need it to operate the service, and API credentials are scoped to the permissions Shopify granted at install rather than to the whole store.",
          "No service can promise that a breach is impossible. What we can commit to is that access is minimised by design and that a security issue is treated as an incident rather than a ticket.",
        ],
        confirm: [
          "Certifications or audits to reference, if any",
          "The breach-notification window offered to merchants",
        ],
      },
      {
        id: "your-rights",
        heading: "8. Your rights",
        body: [
          "Depending on where you are, you may have the right to ask for a copy of the data we hold about you, to have it corrected, to have it deleted, or to object to how it is used.",
          "A shopper asking about data held because of an order should contact the store they ordered from — that merchant is the controller. Where we receive such a request directly, we pass it to the merchant and assist them in answering it.",
          "A merchant can raise any of these requests with us through the contact page.",
        ],
      },
      {
        id: "transfers",
        heading: "9. International transfers",
        body: [
          "COD King serves merchants in COD-heavy markets across several regions, so data may be processed outside the country an order was placed in.",
        ],
        confirm: [
          "The regions data is stored and processed in",
          "The transfer mechanism relied on for cross-border processing",
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
          "When this policy changes, the revision date at the top of the page changes with it. Where a change materially affects how merchant or shopper data is handled, we notify merchants in the app before it takes effect.",
        ],
      },
      {
        id: "contact",
        heading: "12. Contact",
        body: [
          "Questions about this policy, or a request about data we hold, can be sent through the contact page.",
        ],
        confirm: [
          "A dedicated privacy contact address, and whether a data protection officer is appointed",
        ],
      },
    ],
  },

  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary:
      "The agreement between COD King and the merchant who installs it — what the service does, what each side is responsible for, and how it ends.",
    lastUpdated: null,
    status: "draft",
    sections: [
      {
        id: "agreement",
        heading: "1. The agreement",
        body: [
          "These terms govern the use of the COD King application and this website. Installing the app on a Shopify store means accepting them, on behalf of the business that owns the store.",
        ],
        confirm: [
          "The legal entity these terms are entered into with, and its registered address",
        ],
      },
      {
        id: "the-service",
        heading: "2. The service",
        body: [
          "COD King is an application for Shopify stores that manages cash-on-delivery orders. It verifies orders by one-time password, collects partial payments upfront, adds or removes COD as a checkout option under rules the merchant configures, applies COD fees, offers prepaid conversion, and recovers abandoned carts.",
          "The app operates within the permissions Shopify grants at install. Features that depend on a third-party service — a messaging provider, a payment gateway — work to the extent that service is available and correctly configured.",
        ],
      },
      {
        id: "accounts",
        heading: "3. Eligibility and accounts",
        body: [
          "The app is for businesses operating a Shopify store. The merchant is responsible for the accuracy of the store details held in the account, for the security of access to the Shopify admin the app is installed under, and for everything done through their account.",
        ],
      },
      {
        id: "billing",
        heading: "4. Plans and billing",
        body: [
          "Plans are listed on the pricing page. Charges for the app are made through Shopify's billing, so they appear on the store's Shopify invoice rather than being collected separately.",
          "Some features consume messages or payment-gateway transactions. Where those are charged by a third-party provider a merchant connects themselves, they are billed by that provider directly.",
        ],
        confirm: [
          "The billing cycle, and whether usage above a plan's included volume is charged",
          "Notice given before a price change takes effect",
        ],
      },
      {
        id: "merchant-responsibilities",
        heading: "5. Merchant responsibilities",
        body: [
          "COD King sends messages to a merchant's own customers, on that merchant's behalf and under their store's name. The merchant is responsible for the lawfulness of that contact.",
        ],
        points: [
          "Obtaining any consent required in your market before sending an SMS or WhatsApp message to a customer.",
          "The content of message templates, offers and discounts you configure.",
          "Complying with consumer, distance-selling and tax law applicable to your store.",
          "Publishing your own store policies, including how you handle refunds on COD orders.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "6. Acceptable use",
        body: [
          "The app may not be used to send unsolicited bulk messaging, to impersonate another business, to process orders for goods that are unlawful to sell in the destination market, or to attempt to circumvent Shopify's platform rules.",
          "It may not be reverse engineered, resold as a service of your own, or used to build a competing product.",
        ],
      },
      {
        id: "third-parties",
        heading: "7. Third-party services",
        body: [
          "Shopify, payment gateways and messaging providers are independent services under their own terms. COD King is not responsible for their availability, their pricing, or for a message a carrier fails to deliver.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "8. Intellectual property",
        body: [
          "The app, this website, and the COD King name and marks remain ours. Installing the app grants a non-exclusive, non-transferable right to use it while a valid plan is in place, and nothing more.",
          "A merchant's own data, store content and configuration remain the merchant's.",
        ],
      },
      {
        id: "warranties",
        heading: "9. Warranties and disclaimers",
        body: [
          "The service is provided as it is. We work to keep it available and correct, but we do not warrant uninterrupted operation, and we do not warrant a commercial outcome.",
          "Figures published on this site — reduced fake orders, lower RTO, higher prepaid share — describe results merchants have reported. They are not a guarantee of what any particular store will see.",
        ],
      },
      {
        id: "liability",
        heading: "10. Limitation of liability",
        body: [
          "Nothing in these terms limits liability where the law does not allow it to be limited.",
        ],
        confirm: [
          "The liability cap, and the categories of loss excluded",
          "Whether an indemnity is offered, and on what terms",
        ],
      },
      {
        id: "termination",
        heading: "11. Suspension and termination",
        body: [
          "A merchant can end the agreement at any time by uninstalling the app from their Shopify store. Uninstalling stops future charges through Shopify billing and ends our access to store data.",
          "We may suspend or end access where these terms are breached, where use of the app puts the service or another merchant at risk, or where we are required to by law.",
        ],
      },
      {
        id: "changes",
        heading: "12. Changes",
        body: [
          "The app changes as features ship, and these terms change with it. Material changes are notified before they take effect, and continuing to use the app after that point means accepting them.",
        ],
      },
      {
        id: "governing-law",
        heading: "13. Governing law",
        body: [
          "These terms, and any dispute arising from them, are governed by a single jurisdiction rather than by the location of each merchant.",
        ],
        confirm: [
          "The governing law and the courts with exclusive jurisdiction",
          "Whether disputes go to arbitration first, and where",
        ],
      },
      {
        id: "contact",
        heading: "14. Contact",
        body: [
          "Questions about these terms can be sent through the contact page.",
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
          "Evaluating the app on your own store first is the intended path, and it is why most refund requests never need to happen.",
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
          "Because Shopify is the biller, a refund is issued back through Shopify to the same account, and appears on a subsequent invoice or as a credit rather than as a separate transfer.",
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
          "We would rather fix the problem than keep the money. Where the app has not worked as described and support could not resolve it, tell us and we will look at the charge.",
        ],
        confirm: [
          "The refund window, and whether it is pro-rated or whole-period",
          "Which plans and charge types are eligible",
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
        heading: "7. Requesting a refund",
        body: [
          "Send us the store domain, the charge in question, and what went wrong, through the contact page. We will confirm receipt and tell you the outcome.",
        ],
        confirm: [
          "The target turnaround for a refund decision, and how long the credit takes to appear",
        ],
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
