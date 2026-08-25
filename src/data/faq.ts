import { routeFor, routes } from "@/constants/routes";

import type { FaqItem, FaqPageCategory } from "@/types";

/**
 * The tagged question pool (§11).
 *
 * One pool, surfaced on the right page by tag — homepage, pricing, calculator,
 * or a specific control — rather than one long list nobody reads. The homepage
 * set answers the objections §5.1 #10 names: theme safety, no-code, country
 * coverage, cancel anytime, and how the product actually works.
 *
 * Answers are the product's own, from codking.tech.
 */
export const faqs: readonly FaqItem[] = [
  {
    id: "themes",
    question: "Does COD King work with all Shopify themes?",
    answer:
      "Yes. COD King integrates directly with Shopify and works with all themes. No coding or developer skills are required, and setup takes less than 10 minutes.",
    tags: ["home", "control:otp-verification"],
  },
  {
    id: "countries",
    question: "Which countries does COD King support?",
    answer:
      "COD King works in 100+ countries including India, the Philippines, the UAE, Saudi Arabia, Pakistan, Bangladesh, Egypt, and all major COD markets. Local SMS provider integration is available in most countries.",
    tags: ["home", "integrations"],
  },
  {
    id: "otp",
    question: "How does OTP verification reduce fake orders?",
    answer:
      "When a customer places a COD order, COD King sends them a one-time password over SMS or WhatsApp. The order is only confirmed once they enter the correct code, which blocks bots, random entries, and fake buyers instantly.",
    tags: ["home", "control:otp-verification"],
  },
  /*
    The Partial COD Payment set (§6.3), in the order the feature page reads
    them: what it is, how it runs, and then the three questions a merchant asks
    once they have decided they want it.

    Answers are assembled from what the product already states elsewhere in
    this repository — the control's own `outcome` and `benefits` in
    `src/data/controls.ts`, and the answer immediately below — rather than
    written fresh, so the feature page cannot describe the control differently
    from the mega-menu or the Features index. Nothing here claims a capability
    the control record does not list.

    `partial-what` is declared before `partial-payment` because the pool is
    read in array order and the feature page leads with the definition. It
    carries no `home` tag, so the homepage's own set is unchanged by it.
  */
  {
    id: "partial-what",
    question: "What is partial payment?",
    answer:
      "Partial payment lets you collect a small token amount — a fixed sum or a percentage of the cart — from the customer at checkout, and collect the remaining balance on delivery. It filters out buyers who were never going to accept the parcel, which reduces fake orders and RTO while bringing some of your money in earlier.",
    tags: ["control:partial-cod-payment"],
  },
  {
    id: "partial-payment",
    question: "Can I collect a partial payment on COD orders?",
    answer:
      "Yes. You can collect any amount — a fixed sum or a percentage — as an advance payment at checkout. Customers pay it securely through Shopify's payment gateway, and the balance is collected on delivery.",
    tags: ["home", "calculator", "control:partial-cod-payment"],
  },
  {
    id: "partial-percentage",
    question: "Can I set the deposit as a percentage?",
    answer:
      "Yes. The deposit can be a fixed amount or a percentage of the cart value, and you can set it for your whole store or only for specific products, collections or tags.",
    tags: ["control:partial-cod-payment"],
  },
  {
    id: "partial-shipping",
    question: "Can I collect only the shipping charges upfront?",
    answer:
      "Yes. Setting the deposit to your shipping cost means a refused parcel no longer leaves you paying freight out and freight back — the delivery is already covered before the order ships.",
    tags: ["control:partial-cod-payment"],
  },
  {
    id: "partial-gateways",
    question: "Does it work with my payment gateway?",
    answer:
      "The deposit is taken through Shopify Payments or whichever gateway your store already uses, so there is nothing new to connect. The balance is still collected as cash on delivery exactly as it is today.",
    tags: ["control:partial-cod-payment"],
  },
  /*
    The COD to Prepaid set (§6.3), in the order the feature page reads them:
    what it is, how the discount is configured, who receives it, when the
    customer sees it, and how tax is handled.

    Assembled from what the product already states — the control's own
    `outcome` and `benefits` in `src/data/controls.ts`, and the four key
    features published on codking.tech/cod-to-prepaid — rather than written
    fresh, so the feature page cannot describe the control differently from the
    mega-menu or the Features index. Nothing here claims a capability the
    control record does not list, and nothing here quotes a figure.

    None carries the `home` tag, so the homepage's own set is unchanged.
  */
  {
    id: "prepaid-what",
    question: "What is COD to Prepaid?",
    answer:
      "COD to Prepaid nudges cash-on-delivery buyers to pay fully online instead. COD King shows a banner offering them a discount and sends a reminder carrying a payment link, so more of your orders arrive already paid rather than travelling as cash.",
    tags: ["control:cod-to-prepaid"],
  },
  {
    id: "prepaid-rules",
    question: "Can I set the discount as a percentage?",
    answer:
      "Yes. The prepaid discount can be a percentage of the cart or a fixed value, and the rules are fully configurable to your business needs.",
    tags: ["control:cod-to-prepaid"],
  },
  {
    id: "prepaid-only",
    question: "Can the discount apply only to prepaid payments?",
    answer:
      "Yes. The discount is attached to a specific type of payment option, so only orders paid online receive it and cash-on-delivery orders do not.",
    tags: ["control:cod-to-prepaid"],
  },
  {
    id: "prepaid-placement",
    question: "When does the customer see the nudge?",
    answer:
      "It can be shown during the checkout flow, or after the order has already been placed — a banner offering the discount, followed by a reminder with a payment link.",
    tags: ["control:cod-to-prepaid"],
  },
  {
    id: "prepaid-gateway",
    question: "Which payment gateway collects the money?",
    answer:
      "Your own. A gateway is connected to COD King with its API key and secret, and the payment link in the banner and the reminder is raised on that account — Razorpay is a commonly used option. Nothing is settled through us.",
    tags: ["control:cod-to-prepaid"],
  },
  /*
    The Abandoned Cart Recovery set (§6.3), in the order the feature page reads
    them: what it is, which channel carries it, how many messages, how the
    buyer gets back, and what it costs.

    This control is thinly documented — the product publishes one sentence for
    it — so every answer below is assembled from that sentence, the control's
    own `benefits` in `src/data/controls.ts`, and the plan matrix in
    `src/data/pricing.ts`. Nothing here states a recovery rate or a message
    count, because the product states neither.

    None carries the `home` tag, so the homepage's own set is unchanged.
  */
  {
    id: "cart-what",
    question: "What is abandoned cart recovery?",
    answer:
      "It recovers lost sales by sending timely SMS or WhatsApp reminders to COD buyers who started checkout and did not complete it. Each reminder carries a link straight back to the cart, so the buyer can finish the order they had already begun.",
    tags: ["control:abandoned-cart-recovery"],
  },
  {
    id: "cart-channels",
    question: "Are reminders sent over SMS or WhatsApp?",
    answer:
      "Either — whichever your buyers prefer. Both are sent from COD King, and local SMS provider integration is available in most countries so you can route messages through a regional provider.",
    tags: ["control:abandoned-cart-recovery"],
  },
  {
    id: "cart-sequence",
    question: "How many reminders does a customer get?",
    answer:
      "Recovery runs as an automated multi-step sequence rather than a single message, so a buyer who misses the first reminder still hears from you. The sequence runs on its own once it is switched on.",
    tags: ["control:abandoned-cart-recovery"],
  },
  {
    id: "cart-link",
    question: "Does the customer have to rebuild their cart?",
    answer:
      "No. Every reminder includes a direct checkout link, so the buyer returns to the cart they already filled rather than searching for the products again.",
    tags: ["control:abandoned-cart-recovery"],
  },
  {
    id: "cart-plans",
    question: "Which plans include abandoned cart recovery?",
    answer:
      "Every plan, including the free Standard plan. There is no separate charge for the feature itself — you pay only for the messages you send.",
    tags: ["control:abandoned-cart-recovery"],
  },
  /*
    The COD Show/Hide set (§6.3), in the order the feature page reads them:
    what it is, and then the four conditions a merchant asks whether they can
    build a rule from, followed by what it costs.

    Assembled from what the product already states — the control's own
    `outcome` and `benefits` in `src/data/controls.ts`, the capabilities and
    use cases published on codking.tech for this control, and the plan matrix
    in `src/data/pricing.ts` — rather than written fresh, so the feature page
    cannot describe the control differently from the mega-menu or the Features
    index. Nothing here claims a parameter the control record does not list,
    and the only figure quoted is the product's own "15+".

    None carries the `home` tag, so the homepage's own set is unchanged.
  */
  {
    id: "cod-rules-what",
    question: "What is COD Show/Hide?",
    answer:
      "It lets you decide where, when and to whom cash on delivery is offered. You set the conditions — order value, pin code, customer history, product type and more, from 15+ parameters in all — and COD King shows or hides the cash-on-delivery option at your Shopify checkout accordingly.",
    tags: ["control:cod-show-hide"],
  },
  {
    id: "cod-rules-pincode",
    question: "Can I hide COD for certain pin codes?",
    answer:
      "Yes. A rule can hide cash on delivery for high-risk pin codes or for whole regions — which is what stores do when a courier will not collect cash in an area, or when parcels sent there keep coming back.",
    tags: ["control:cod-show-hide"],
  },
  {
    id: "cod-rules-product",
    question: "Can I hide COD on specific products?",
    answer:
      "Yes. COD can be enabled or disabled per product or per collection. The usual reason is custom or made-to-order items, which cannot simply go back on the shelf if the parcel is refused.",
    tags: ["control:cod-show-hide"],
  },
  {
    id: "cod-rules-value",
    question: "Can I show COD only above or below a cart value?",
    answer:
      "Yes. A rule can offer cash on delivery only above or only below a cart value, so the baskets you would rather not send out as cash are paid for online instead.",
    tags: ["control:cod-show-hide"],
  },
  {
    id: "cod-rules-customer",
    question: "Can I stop a specific customer from using COD?",
    answer:
      "Yes. You can blacklist specific phone numbers or email addresses, and segment rules by customer tag or order history, so a buyer who has refused parcels before does not see the option again.",
    tags: ["control:cod-show-hide"],
  },
  {
    id: "cod-rules-plans",
    question: "Which plans include COD Show/Hide?",
    answer:
      "Show/hide COD rules are included on the Professional and Enterprise plans. Every plan comes with a 7-day free trial and no credit card is required, so you can build a rule and watch it run before committing.",
    tags: ["control:cod-show-hide"],
  },
  /*
    The COD Fees set (§6.3), in the order the feature page reads them: what it
    is, how it is configured, what the customer sees, and then the two
    questions a merchant asks once they have decided they want it.

    Answers are assembled from what the product already states — a fixed or
    percentage-based COD fee, the fee displayed clearly at checkout, fees set
    by weight and price range, reducing COD adoption without disabling it —
    together with what this repository already records: the control's own
    `outcome` in `src/data/controls.ts`, the plan availability in
    `src/data/pricing.ts`, and the `checkout-impact` answer immediately below.
    Nothing here claims a capability the source does not list, and no answer
    quotes a fee amount: the amount is the merchant's, not the product's.

    None carries the `home` tag, so the homepage's own set is unchanged.
  */
  {
    id: "cod-fees-what",
    question: "What is a COD fee?",
    answer:
      "It is an additional fee charged on an order when the customer chooses cash on delivery. It goes toward the logistics costs a COD order carries and a prepaid one does not, and it gives the customer a reason to pay online instead. Collecting a small additional fee on COD orders is the norm in the industry — more than 70% of merchants already do it.",
    tags: ["control:cod-fees"],
  },
  {
    id: "cod-fees-amount",
    question: "Can I charge a fixed amount or a percentage?",
    answer:
      "Both. You can set a fixed COD fee applied to every cash-on-delivery order, or a percentage-based fee calculated from the order value so larger baskets carry a larger fee. You choose the amount — COD King applies whatever you set.",
    tags: ["control:cod-fees"],
  },
  {
    id: "cod-fees-visible",
    question: "Will the customer see the COD fee?",
    answer:
      "Yes, and that is the point. The fee is displayed clearly at checkout as its own line, so the customer has complete visibility while placing the order and sees the final total before they confirm it.",
    tags: ["control:cod-fees"],
  },
  {
    id: "cod-fees-rules",
    question: "Can the fee change from one order to another?",
    answer:
      "Yes. COD fees can be set based on weight and price range, so a heavy parcel or a high-value basket can carry a different fee from a small, light one rather than every order paying the same amount.",
    tags: ["control:cod-fees"],
  },
  {
    id: "cod-fees-adoption",
    question: "Will a COD fee stop customers ordering?",
    answer:
      "It is designed to reduce COD adoption naturally rather than to block it. Cash on delivery stays on your checkout; the customer simply sees what it costs and can switch to online payment, which is how a COD fee also increases prepaid conversions.",
    tags: ["control:cod-fees"],
  },
  {
    id: "checkout-impact",
    question: "Will this affect my existing checkout or store design?",
    answer:
      "No. COD King works within your existing Shopify checkout. There are no visual changes to your theme unless you choose to add COD fee labels or messaging, and even those are fully customisable.",
    tags: ["home", "control:cod-fees"],
  },
  {
    id: "cod-fees-plans",
    question: "Which plans include COD Fees?",
    answer:
      "COD fees are included on the Professional and Enterprise plans. Every plan comes with a 7-day free trial and no credit card is required, so you can set a fee and watch it reach your checkout before committing.",
    tags: ["control:cod-fees"],
  },
  {
    id: "free-trial",
    question: "Is there a free trial?",
    answer:
      "Yes. All plans include a 7-day free trial and no credit card is required. You can install COD King and test every feature before committing to a paid plan.",
    tags: ["home", "pricing"],
  },
  {
    id: "billing",
    question: "How will I be billed?",
    answer:
      "Your COD King plan will be added directly to your Shopify invoice. It will appear as a line item and billed on your regular Shopify billing cycle.",
    tags: ["pricing"],
  },
  {
    id: "plan-change",
    question: "Can I change my plan later?",
    answer:
      "Yes. You can upgrade or downgrade at any time from your COD King dashboard, and the change takes effect on your next Shopify billing cycle.",
    tags: ["pricing"],
  },
  {
    id: "order-limit",
    question: "Is there an order limit?",
    answer:
      "No. Every plan handles unlimited orders, including the free Standard plan. You are never charged more for a busy month.",
    tags: ["pricing"],
  },
  {
    id: "free-plan-charges",
    question: "Are there any charges in the free plan?",
    answer:
      "The Standard plan is $0 per month. You only pay the 1% partial payment rate on orders that use it, and for the messages you send.",
    tags: ["pricing"],
  },
  {
    id: "local-sms",
    question: "How do I set up local SMS providers to save on costs?",
    answer:
      "COD King supports regional SMS providers including MSG91, Textlocal and Gupshup in India, and Semaphore in the Philippines. Once connected, you pay your provider directly in local currency, cutting costs by up to 70% against international rates.",
    tags: ["pricing", "integrations", "control:messaging-gateways"],
  },
  {
    id: "support",
    question: "What kind of support does COD King provide?",
    answer:
      "Support is available 7 days a week over live chat and email, and typically responds within minutes. Enterprise customers get priority support with a dedicated account manager.",
    tags: ["pricing"],
  },
  /*
    The questions the dedicated FAQ page had to add.

    Everything above this point was written for a surface that already existed —
    the homepage, the pricing page, a control page — and the FAQ page reuses it
    rather than restating it. What was missing was the set nobody had needed
    until the site had one page answering everything: what the product is, who
    it is for, what RTO means, what installing involves, what a message costs,
    and which plan a merchant should be looking at.

    Each answer is assembled from what this repository already records rather
    than written fresh — `src/data/about.ts`, `src/data/homepage.ts`,
    `src/data/controls.ts`, `src/data/calculator.ts`, `src/data/pricing.ts`,
    `src/data/integrations.ts` — so the FAQ page cannot describe the product
    differently from the pages it links to. No figure appears here that is not
    already published somewhere on this site.

    They carry the `faq` tag and no other, so no existing surface's set changes
    by their being added to the pool.
  */
  {
    id: "what-is-cod-king",
    question: "What is COD King?",
    answer:
      "COD King is a Shopify app for managing cash-on-delivery orders: verifying them, collecting payment upfront, controlling where COD is offered and at what fee, moving buyers to prepaid, and recovering carts that never converted. It runs inside the Shopify checkout you already have, so a cash order behaves more like a prepaid one.",
    tags: ["faq"],
  },
  {
    id: "who-is-it-for",
    question: "Who is COD King for?",
    answer:
      "Shopify merchants whose orders are largely cash on delivery, and who are carrying the cost of that in fake orders, RTO and working capital tied up in transit. It runs on stores from single-product launches to established brands, across the markets where cash on delivery dominates.",
    tags: ["faq"],
  },
  {
    id: "what-is-rto",
    question: "What is RTO, and why does it matter?",
    answer:
      "RTO — return to origin — is a shipped COD order that comes back undelivered. It costs freight out, freight back and the packaging in between, on a sale that never happened, and the marketing spend that won the order is gone either way. The COD Calculator puts a figure on it using your own order volume and costs.",
    tags: ["faq"],
  },
  {
    id: "install-steps",
    question: "How do I install and set up COD King?",
    answer:
      "Install COD King from the Shopify App Store, then set the controls you want from inside the app — OTP verification, COD fees, partial payment and rules. Setup takes less than 10 minutes and needs no coding. From there it runs on its own: a customer places an order on your store, and COD King verifies, collects and validates it.",
    tags: ["faq"],
  },
  {
    id: "no-developer",
    question: "Do I need a developer or any theme changes?",
    answer:
      "No. COD King runs inside the checkout you already have — no theme edits, no developer, nothing to deploy. Every control is configured from the app itself, and no coding or developer skills are required at any point.",
    tags: ["faq"],
  },
  {
    id: "otp-channel",
    question: "Can the OTP be sent on WhatsApp instead of SMS?",
    answer:
      "Yes. The one-time password can go over SMS or WhatsApp, whichever your buyers actually read. Either way it works on Shopify checkout without code changes.",
    tags: ["faq"],
  },
  {
    id: "reporting",
    question: "Can I see whether it is actually working?",
    answer:
      "Yes. COD King reports verified against unverified orders, prepaid share and recovered carts inside the app, so the effect is a figure you can check rather than a feeling. RTO, fake-order and prepaid trends are reported in one place.",
    tags: ["faq"],
  },
  {
    id: "message-billing",
    question: "How are SMS and WhatsApp messages charged?",
    answer:
      "You pay for the messages you send — the features that use them carry no separate charge of their own. The Professional plan earns a 15% discount on notification rates and Enterprise earns 35%, and connecting your own local SMS provider means you pay that provider directly in local currency instead.",
    tags: ["faq"],
  },
  {
    id: "which-plan",
    question: "Which plan do I need?",
    answer:
      "Standard is $0 per month and covers OTP verification, abandoned cart recovery, partial payment and unlimited orders. Professional at $7.99 adds COD fees, show/hide COD rules and a discount on notification rates. Enterprise at $39 adds a local SMS gateway, a dedicated account manager and 24/7 priority support. Every plan includes a 7-day free trial.",
    tags: ["faq"],
  },
];

/**
 * The FAQ page's own words — the only copy on it not drawn from the pool.
 *
 * Four strings: what the page is called, what it covers, and what it closes on.
 * The description says what a merchant will find rather than restating the
 * product, because someone on this URL has already read the product pitch and
 * arrived with a specific question.
 */
export const faqPageCopy = {
  eyebrow: "Support",
  title: "Frequently asked questions",
  description:
    "Everything merchants ask before and after installing COD King — how it runs inside Shopify checkout, what each control does, what messages cost, and how you are billed. If your question is not answered here, ask us directly.",
  ctaTitle: "Install COD King and see it on your own orders",
} as const;

/**
 * The four answers a merchant wants before they read any of the others.
 *
 * Every one of them is a sentence from an answer below, compressed to its
 * fact — the theme and setup-time claims from `themes`, the trial terms from
 * `free-trial`, the coverage from `countries`. Nothing here is a new claim, and
 * nothing here is a figure this site does not already publish; the panel is a
 * summary of the page it opens, not a fifth place to state a number.
 */
export const faqPageFacts: readonly { label: string; value: string }[] = [
  { label: "Works with", value: "All Shopify themes" },
  { label: "Setup time", value: "Under 10 minutes" },
  { label: "Free trial", value: "7 days, no card" },
  { label: "Available in", value: "100+ countries" },
];

/**
 * The dedicated FAQ page, grouped (§2).
 *
 * Ids into the pool above rather than copies of the answers, the way
 * `pricingFaqIds` works: a question asked here and on a control page is written
 * once. The grouping and the order are the page's own — the pool has no opinion
 * about either — and each category's `id` is the anchor the contents rail links
 * to, so renaming a heading cannot break a link to it.
 *
 * The order is the order a merchant asks these in: what is this, how do I start,
 * then the three problems they came with, then what it costs. Categories are
 * deliberately uneven — COD rules and payments carry the most questions because
 * those are the controls with the most to configure, and padding the shorter
 * groups to match would mean inventing questions nobody asks.
 *
 * `links` point only at pages this site has finished. Nothing here links to a
 * control served by the generic template, and no answer carries a link merely
 * because it mentions a feature by name.
 */
export const faqPageCategories: readonly FaqPageCategory[] = [
  {
    id: "general",
    title: "General",
    description:
      "What COD King is, who it is built for, and the problem it exists to solve.",
    entries: [
      {
        id: "what-is-cod-king",
        links: [{ label: "All features", href: routes.features }],
      },
      { id: "who-is-it-for" },
      {
        id: "what-is-rto",
        links: [
          { label: "Open the COD Calculator", href: routes.codCalculator },
        ],
      },
      { id: "countries" },
      { id: "support", links: [{ label: "Contact us", href: routes.contact }] },
    ],
  },
  {
    id: "getting-started",
    title: "Getting started",
    description:
      "Installing the app, and what changes on your store once you have.",
    entries: [
      { id: "install-steps" },
      { id: "themes" },
      { id: "no-developer" },
      { id: "checkout-impact" },
      {
        id: "free-trial",
        links: [{ label: "See pricing", href: routes.pricing }],
      },
    ],
  },
  {
    id: "fake-orders-and-rto",
    title: "Fake orders and RTO",
    description:
      "The controls that stop a bad cash order before it becomes a refused parcel.",
    entries: [
      {
        id: "otp",
        links: [
          {
            label: "OTP Verification",
            href: routeFor.control("otp-verification"),
          },
        ],
      },
      { id: "otp-channel" },
      {
        id: "partial-what",
        links: [
          {
            label: "Partial COD Payment",
            href: routeFor.control("partial-cod-payment"),
          },
        ],
      },
      { id: "partial-shipping" },
      {
        id: "cod-rules-customer",
        links: [
          { label: "COD Rules", href: routeFor.control("cod-show-hide") },
        ],
      },
      { id: "reporting" },
    ],
  },
  {
    id: "cod-rules-and-fees",
    title: "COD rules and fees",
    description:
      "Deciding where cash on delivery is offered at all, and what it costs the buyer.",
    entries: [
      {
        id: "cod-rules-what",
        links: [
          { label: "COD Rules", href: routeFor.control("cod-show-hide") },
        ],
      },
      { id: "cod-rules-pincode" },
      { id: "cod-rules-product" },
      { id: "cod-rules-value" },
      {
        id: "cod-fees-what",
        links: [{ label: "COD Fees", href: routeFor.control("cod-fees") }],
      },
      { id: "cod-fees-amount" },
      { id: "cod-fees-visible" },
      { id: "cod-fees-adoption" },
    ],
  },
  {
    id: "payments-and-prepaid",
    title: "Payments and prepaid",
    description:
      "Collecting money upfront, and moving cash buyers to paying online.",
    entries: [
      {
        id: "partial-payment",
        links: [
          {
            label: "Partial COD Payment",
            href: routeFor.control("partial-cod-payment"),
          },
        ],
      },
      { id: "partial-percentage" },
      { id: "partial-gateways" },
      {
        id: "prepaid-what",
        links: [
          { label: "COD to Prepaid", href: routeFor.control("cod-to-prepaid") },
        ],
      },
      { id: "prepaid-rules" },
      { id: "prepaid-only" },
      { id: "prepaid-placement" },
    ],
  },
  {
    id: "messaging-and-recovery",
    title: "Messaging and cart recovery",
    description:
      "WhatsApp and SMS — the reminders they carry, the providers behind them, and what they cost.",
    entries: [
      {
        id: "cart-what",
        links: [
          {
            label: "Abandoned Cart Recovery",
            href: routeFor.control("abandoned-cart-recovery"),
          },
        ],
      },
      { id: "cart-channels" },
      { id: "cart-sequence" },
      { id: "cart-link" },
      /*
        No link. The answer names the regional providers, and the page that
        would list them — `/integrations` — is still a placeholder. A link to an
        empty page is worse than no link at all.
      */
      { id: "local-sms" },
      { id: "message-billing" },
    ],
  },
  {
    id: "plans-and-billing",
    title: "Plans and billing",
    description:
      "What each plan includes, how it reaches your invoice, and how to change it.",
    entries: [
      {
        id: "which-plan",
        links: [{ label: "Compare plans", href: routes.pricing }],
      },
      { id: "billing" },
      { id: "plan-change" },
      { id: "order-limit" },
      { id: "free-plan-charges" },
    ],
  },
];
