import type { FaqItem } from "@/types";

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
    id: "prepaid-tax",
    question: "How are taxes handled on a discounted order?",
    answer:
      "Flexible tax options let you manage different tax structures, supporting multiple regions and compliance requirements.",
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
];
