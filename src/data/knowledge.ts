import type {
  CalculatorKnowledge,
  ControlKnowledge,
  ControlSlug,
  FeatureCombination,
  InterventionPoint,
  MerchantProblem,
  QuestionRoute,
} from "@/types";

/**
 * The `/llms.txt` knowledge layer (§13).
 *
 * `/llms.txt` describes this product to AI and answer engines in depth, and
 * much of what it needs is already written down: the control records in
 * `src/data/controls.ts`, each feature page's own copy modules, the plans in
 * `src/data/pricing.ts`, the calculator definitions and field hints, and the
 * tagged FAQ pool. The route reads all of those directly. Restating them here
 * would create exactly the drift every other file in this folder is arranged
 * to prevent.
 *
 * What lives here is the layer no rendered page needs, and which therefore
 * exists nowhere else:
 *
 * - the long-form explanation of the product and of each control;
 * - the problems merchants arrive with, and which controls answer each;
 * - the options a control is configured with, gathered in one list;
 * - why each published audience segment benefits;
 * - the vocabulary merchants search under;
 * - how two controls that are easily confused actually differ;
 * - which page is authoritative for which question.
 *
 * ── The rule this file is written under ───────────────────────────────────
 * Every sentence below is a compression or an explanation of content this
 * repository already publishes — a control's `outcome` and `benefits`, a
 * feature page's flow steps, capability grid, audience list or FAQ answers,
 * the plan matrix, or the calculator's own field definitions. Nothing here
 * introduces a capability, an integration, a figure or a guarantee.
 *
 * In particular: no percentage, recovery rate, conversion rate, RTO reduction,
 * merchant count, rating or review count appears anywhere in this file. Two of
 * the figures published on the feature pages are flagged in this repository as
 * having no source (see `otpOutcomes` and `partialOutcomes`), and a knowledge
 * map is quoted back verbatim by the systems that read it — so it carries only
 * what the repository can stand behind. The one figure that does survive is
 * the product's own published "15+ parameters" for COD Show/Hide, because it
 * is a count of a capability rather than a claim about a result.
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * What COD King is, in the order an assistant needs it: the product, the
 * platform relationship, the merchant, the economics, and the shape of the
 * system.
 *
 * Assembled from the About page (`src/data/about.ts`), the homepage's problem
 * section, the FAQ answers `what-is-cod-king`, `who-is-it-for`, `install-steps`
 * and `no-developer`, and the controls repository's own stage model.
 */
export const productOverview: readonly string[] = [
  "COD King is a Shopify app for managing cash-on-delivery orders. It sits on top of the checkout a merchant already has and adds the controls that cash on delivery has always lacked: verifying that a real buyer is behind an order, collecting money before a parcel ships, deciding which orders may use cash on delivery at all and at what fee, moving buyers onto online payment, and following up the checkouts that were started and never finished.",
  "It is installed from the Shopify App Store and runs inside the existing Shopify checkout. There are no theme edits, no code and no developer involved at any point: every control is switched on and configured from the COD King dashboard, the app works with all Shopify themes, and setup takes under ten minutes. Nothing about a store's design changes unless the merchant chooses to add COD fee labels or checkout messaging, and those are customisable too.",
  "It is built for merchants whose orders are largely cash on delivery, and who are carrying the cost of that in fake orders, returns and working capital tied up in transit. It runs on stores from single-product launches to established brands, across the markets where cash on delivery dominates — COD King works in 100+ countries, including India, the Philippines, the UAE, Saudi Arabia, Pakistan, Bangladesh and Egypt, and local SMS provider integration is available in most of them.",
  "Cash on delivery creates problems a prepaid order does not, and they do not arrive as one line on a statement. A cash order costs the buyer nothing to place, so an order placed carelessly or maliciously looks exactly like one placed seriously. A refused delivery costs freight out, freight back and the packaging in between, on a sale that never happened — and the marketing spend that won the order is gone either way. The courier charges a fee to collect and remit cash. Until that cash is remitted, the money is somewhere on a road rather than in the business. And a buyer who leaves mid-checkout leaves no way to follow up unless something is set up to do it.",
  "COD King is best understood as one system rather than six separate features. The product models an order in stages — before the order is placed, at the order, after the order, and across the store — and each control acts at one of them. Controls are switched on independently, so a merchant can start with the one costing them the most and add the others later, but they are designed to compose: a rule decides whether cash on delivery is offered, a fee decides what it costs, a discount offers a way out of it, verification and a deposit test the orders that still arrive as cash, and recovery chases the checkouts that never became orders at all.",
  "The product publishes ten controls in total. Six of them have a full feature page of their own and are the ones described in detail in this document: OTP Verification, Partial COD Payment, COD to Prepaid, Abandoned Cart Recovery, COD Show/Hide (also called COD Rules) and COD Fees. The remaining four — Prefilled Address, Order Verification, Messaging Gateways and Analytics & Reports — exist in the product and appear on plans, but do not yet have a dedicated page, so this document names them without linking to one.",
];

/**
 * The points at which COD King acts on an order.
 *
 * Related to the four order stages in the controls repository, and not the
 * same thing: a stage answers "when does this control run", and these answer
 * "what decision is being made". An assistant placing a merchant's question in
 * the product needs the second question answered.
 *
 * Every point names its controls by slug, so a rename or a withdrawal is
 * carried through without this list being edited.
 */
export const interventionPoints: readonly InterventionPoint[] = [
  {
    id: "eligibility",
    title: "COD eligibility — is cash on delivery offered at all?",
    body: "Before anything else, the checkout has to decide whether this particular order may use cash on delivery. COD King evaluates the rules a merchant has set — order value, pin code, product or collection, customer tag or order history, and phone or email blacklists — and shows or hides the cash-on-delivery option accordingly. Online payment is unaffected: hiding COD removes one way to pay, not the order.",
    controlSlugs: ["cod-show-hide"],
  },
  {
    id: "pricing",
    title: "COD pricing — what does cash on delivery cost the buyer?",
    body: "Where cash on delivery is offered, it can carry a fee that reflects what it actually costs to fulfil. The merchant sets a fixed amount or a percentage, optionally varying by parcel weight or order value band, and COD King adds it to the order summary as its own clearly labelled line when the customer selects cash on delivery. The customer sees the fee and the updated total before confirming.",
    controlSlugs: ["cod-fees"],
  },
  {
    id: "conversion",
    title: "Prepaid conversion — can this order be paid online instead?",
    body: "A cash order that becomes a prepaid one carries none of the risk it started with. COD King presents an exclusive prepaid discount as a banner during checkout, or sends a reminder with a payment link after the order has been placed, so paying now costs the buyer less than paying on delivery. A COD fee works from the other direction, making cash the more expensive of the two options.",
    controlSlugs: ["cod-to-prepaid", "cod-fees"],
  },
  {
    id: "commitment",
    title: "Payment commitment — does the buyer have anything at stake?",
    body: "For the orders that stay on cash on delivery, COD King can collect part of the money at checkout: a fixed amount or a percentage of the cart, paid online through the store's existing gateway, with the balance still collected on delivery. A buyer who has paid something has a reason to accept the parcel, and a merchant who has collected something has already recovered part of the cost of sending it.",
    controlSlugs: ["partial-cod-payment"],
  },
  {
    id: "verification",
    title: "Order verification — is a real buyer behind this order?",
    body: "COD King detects a cash-on-delivery order at checkout and sends a one-time password to the number the parcel will be delivered to, over SMS or WhatsApp. The buyer enters the code to complete the order, which proves the number is theirs. Orders nobody confirms never enter fulfilment, so they never become a parcel the merchant pays to ship twice.",
    controlSlugs: ["otp-verification"],
  },
  {
    id: "recovery",
    title: "Abandoned checkout recovery — can a lost sale be brought back?",
    body: "A buyer who reaches checkout and leaves has already chosen the product. COD King sends an automated multi-step sequence of reminders over SMS or WhatsApp, each carrying a direct checkout link, so returning to the filled cart takes one tap rather than a search.",
    controlSlugs: ["abandoned-cart-recovery"],
  },
  {
    id: "reporting",
    title: "Reporting — is any of it working?",
    body: "COD King reports verified against unverified orders, prepaid share and recovered carts inside the app, and reports RTO, fake-order and prepaid trends in one place, so the effect of the controls is a figure a merchant can check rather than a feeling. Reporting has no feature page of its own yet; it is part of the app.",
    controlSlugs: ["analytics", "order-verification"],
  },
];

/**
 * The problems COD King is bought to solve, in merchant vocabulary.
 *
 * Assembled from the homepage pain points, the problem and help blocks on the
 * About page, the order-stage problems in the controls repository, and the
 * three leakage pathways the calculator routes to a control. Each names the
 * controls that act on it by slug.
 *
 * Every `scenario` is a situation the product itself publishes as a use case —
 * a courier that will not collect cash in an area, a made-to-order item that
 * cannot go back on the shelf, a buyer who has refused a parcel before, a
 * heavy parcel whose freight doubles on return. None of them quotes a figure,
 * and none describes a named merchant.
 */
export const merchantProblems: readonly MerchantProblem[] = [
  {
    id: "fake-orders",
    title: "Fake and unverified COD orders",
    problem:
      "A cash order costs the buyer nothing to place, so the ones placed carelessly — or maliciously — look exactly like the ones placed seriously. A phone number that was mistyped, invented, or belongs to someone who never ordered anything produces an order that looks entirely normal in the admin.",
    whyItMatters:
      "The order is picked, packed and dispatched before anybody discovers it was never real. By then the merchant has spent packaging, forward freight and the ad spend that won the order, and will spend return freight on top of it. Nothing about the sale was ever going to produce revenue.",
    howAddressed:
      "COD King verifies the order at checkout with a one-time password sent over SMS or WhatsApp to the number the parcel will go to; only verified orders are accepted, and it detects a COD order and triggers verification on its own. A partial payment adds a second filter — a buyer who pays a deposit is a buyer with something at stake. A COD rule can go further and stop the order being placed as cash at all, including a blacklist for phone numbers and email addresses that have refused parcels before.",
    scenario:
      "A store running paid traffic sees a run of cash orders from numbers that never answer. OTP verification blocks the ones nobody confirms at checkout, and the numbers behind repeat attempts can be blacklisted so they never see cash on delivery again.",
    controlSlugs: ["otp-verification", "partial-cod-payment", "cod-show-hide"],
  },
  {
    id: "rto",
    title: "RTO — parcels that come back undelivered",
    problem:
      "RTO, return to origin, is a shipped cash-on-delivery order that comes back because the buyer refused it, could not be reached, or changed their mind while it was in transit.",
    whyItMatters:
      "A refused delivery costs freight out, freight back and the packaging in between, on a sale that never happened, and the marketing spend that won the order is gone either way. It is the single largest cost most cash-on-delivery stores carry, and it is invisible until it is counted — which is what the COD Calculator exists to do.",
    howAddressed:
      "COD King works on RTO from four directions: verification removes the orders that were never real; a deposit at checkout gives the buyer a reason to accept the parcel; a prepaid discount converts the order to one that is already paid for and therefore cannot be refused at the door; and a rule keeps cash on delivery away from the pin codes, baskets and customers where refusal is most likely.",
    scenario:
      "A merchant shipping to a wide pin-code spread finds a handful of areas where parcels keep coming back. A rule hides cash on delivery for those pin codes while leaving online payment available, so orders from them still convert — just not as cash.",
    controlSlugs: [
      "otp-verification",
      "partial-cod-payment",
      "cod-show-hide",
      "cod-to-prepaid",
    ],
  },
  {
    id: "commitment",
    title: "No payment commitment from the buyer",
    problem:
      "Nothing is at stake for a customer who placed a cash order until the parcel is at their door. Refusing it is free, and so is forgetting about it.",
    whyItMatters:
      "Commitment is what separates an intention from an order. Without it, a merchant is funding the packaging, the freight and the working capital for orders that only some fraction of buyers were ever serious about, and there is no way to tell which is which at the moment of dispatch.",
    howAddressed:
      "Partial COD Payment collects a token amount at checkout — a fixed sum or a percentage of the cart — through the store's existing payment gateway, and the balance is still collected on delivery. Non-serious buyers drop out at that step; the ones who continue have paid something, which is also part of the merchant's cost already recovered. OTP verification performs a lighter version of the same test: it costs the buyer a moment and a real phone number.",
    scenario:
      "A store selling made-to-order items sets the deposit to cover its shipping cost, so a refused parcel no longer leaves it paying freight out and freight back on an item it cannot restock.",
    controlSlugs: ["partial-cod-payment", "otp-verification"],
  },
  {
    id: "abandoned",
    title: "Abandoned checkouts and lost revenue",
    problem:
      "Buyers reach checkout with a filled cart and leave without ordering, for reasons a store never sees. Without a reminder, the cart is simply gone.",
    whyItMatters:
      "A buyer who left mid-checkout has already chosen the product and already cost the merchant whatever it took to bring them to the store. It is the cheapest revenue in the business to recover and the easiest to write off, because nothing about an abandoned checkout demands attention.",
    howAddressed:
      "Abandoned Cart Recovery sends timely SMS or WhatsApp reminders to COD buyers who did not complete checkout, as an automated multi-step sequence rather than one message that is easy to miss. Every reminder carries a direct checkout link back to the cart the buyer already filled.",
    scenario:
      "A high-traffic store in a WhatsApp-first market switches on the sequence and lets it run; buyers who left mid-checkout get a reminder on the channel they actually read, with a link that returns them to the cart in one tap.",
    controlSlugs: ["abandoned-cart-recovery"],
  },
  {
    id: "availability",
    title: "COD offered where it should not be",
    problem:
      "Shopify offers cash on delivery as a payment method for every order or none. There is no way, out of the box, to say that this pin code, this basket or this customer should not have it.",
    whyItMatters:
      "Some pin codes are never worth the freight, some baskets are too large to send as cash, some products cannot go back on the shelf if the parcel is refused, and some buyers have refused one before. Offering cash on delivery to all of them is a decision the merchant never actually made.",
    howAddressed:
      "COD Show/Hide is a rule engine at the checkout. A merchant builds rules from 15+ parameters — order value, pin code, product or collection, customer tag, order history and more — and COD King reads each order against them and shows or hides cash on delivery accordingly, with no latency at checkout. Specific phone numbers and email addresses can be blacklisted outright.",
    scenario:
      "A merchant selling custom-printed items enables cash on delivery for the rest of the catalogue but disables it on the custom collection, because a refused custom item cannot be resold.",
    controlSlugs: ["cod-show-hide"],
  },
  {
    id: "profitability",
    title: "COD profitability",
    problem:
      "A cash-on-delivery order costs more to fulfil than a prepaid one — cash collection and remittance, higher refusal rates, and the return freight that follows — and the checkout charges the same for both.",
    whyItMatters:
      "In thin-margin categories the difference decides whether the order was worth taking. Absorbing it silently on every cash order means the prepaid customers are effectively subsidising the cash ones, and the merchant has no lever to change the mix.",
    howAddressed:
      "COD Fees lets the merchant charge an additional fee on cash-on-delivery orders — fixed or percentage-based, and able to vary by parcel weight or order value band — displayed clearly at checkout so the customer sees the total before ordering. It covers part of what cash on delivery costs and reduces COD adoption naturally, without disabling it. Where a fee is not enough, a rule removes cash on delivery for that order entirely.",
    scenario:
      "A store shipping heavy goods sets a higher COD fee by parcel weight, so the orders whose return freight would hurt most either carry more of their own cost or move to online payment.",
    controlSlugs: ["cod-fees", "cod-show-hide"],
  },
  {
    id: "prepaid",
    title: "Low prepaid share",
    problem:
      "Most buyers in cash-on-delivery markets default to cash even when online payment is available and nothing is wrong with it.",
    whyItMatters:
      "Working capital rides around in a van until the courier settles, and every undelivered order carries risk that a prepaid order simply does not have. A higher prepaid share improves cash flow and lowers RTO exposure at the same time, without the merchant selling anything more.",
    howAddressed:
      "COD to Prepaid presents an exclusive discount that applies only to online payment options — as a banner during the checkout flow, or as a reminder with a payment link after the order is placed — so paying now costs less than paying later. A COD fee pushes from the other side by making cash the more expensive option. Where a buyer will not move fully to prepaid, a partial payment still brings part of the money in upfront.",
    scenario:
      "A merchant sets a prepaid discount as a percentage of the cart and shows it at checkout; buyers who take it pay online, and the order arrives already settled rather than travelling as cash.",
    controlSlugs: ["cod-to-prepaid", "cod-fees", "partial-cod-payment"],
  },
];

/**
 * The per-control knowledge entries, keyed by slug.
 *
 * Partial rather than complete, and deliberately: an entry belongs to a
 * control with a finished, indexable page, and the four controls still served
 * by the generic template have no canonical URL to send an assistant to. A
 * slug gains an entry in the same commit that gives it a page — the rule
 * `dedicatedControlPages` already follows.
 *
 * Each entry carries only what the feature page does not already hold in
 * structured form. The page's flow steps, capability grid, audience list,
 * hero checklist, demo points and FAQ answers are all read from their own
 * modules at render; what is written here is the long-form explanation around
 * them, the configuration options gathered into one list, the reason each
 * audience segment benefits, and how the control relates to and differs from
 * its neighbours.
 */
export const controlKnowledge: Partial<Record<ControlSlug, ControlKnowledge>> =
  {
    "otp-verification": {
      overview: [
        "OTP Verification is COD King's order-verification control. When a customer places a cash-on-delivery order, COD King sends a one-time password — a short numeric code — to the mobile number the parcel will be delivered to, over SMS or WhatsApp. The buyer enters that code back into the checkout, which proves the number is theirs and that a real person is behind the order. Only verified orders are accepted; everything else never becomes a parcel.",
        "The control detects a cash-on-delivery order at checkout and triggers verification on its own, so the merchant does not have to select which orders to verify. The step appears inside the existing Shopify checkout in the store's own styling, renders correctly on mobile, tablet and desktop, and the code is sent and checked in seconds without the buyer leaving the checkout. For a genuine customer it is one extra moment; for an order placed against a number that does not exist, it is the end of the order.",
        "The message itself is the merchant's: the store name, the wording and the branding on every code that goes out are configurable. Verification works on Shopify checkout without code changes, and the reporting inside the app shows verified against unverified orders so the effect is a figure rather than an impression.",
      ],
      problemDetail: [
        "The problem OTP Verification exists for is that a cash order carries no proof of intent. Nothing about placing one costs the buyer anything, and nothing about it confirms the phone number is real or reachable. Bots, random entries, mistyped numbers and buyers who never intended to accept the parcel all produce orders that look completely normal in the admin.",
        "The cost lands later and lands twice. The order is picked, packed and dispatched; the parcel travels, is refused or undeliverable, and travels back. Freight out, freight back, packaging and the marketing spend that won the order are all gone, on a sale that never existed. Verification moves that discovery to the cheapest possible moment — before the order enters fulfilment, while stopping it costs nothing.",
      ],
      behaviour: [
        "At checkout, the buyer enters the mobile number the parcel will be delivered to. COD King sends a one-time password to that number over SMS or WhatsApp, and the buyer types the code back into the checkout. Once the code matches, the order is placed and moves on exactly as it did before — the checkout on the far side of the verification is the same screen it was on the near side.",
        "An order nobody confirms is not accepted, so unverified numbers and repeat offenders never make it into dispatch. Nothing about the store's design changes: the step is rendered in the store's own styling inside the checkout that was already there.",
      ],
      configuration: [
        {
          id: "channel",
          option: "Delivery channel",
          detail: "SMS, or WhatsApp.",
        },
        {
          id: "branding",
          option: "Message wording and branding",
          detail:
            "The store name, the message text and the wording on every code that goes out.",
        },
        {
          id: "trigger",
          option: "Trigger",
          detail:
            "Automatic. COD King detects a cash-on-delivery order at checkout and starts verification; there is no per-order selection to make.",
        },
        {
          id: "outcome",
          option: "Outcome of an unconfirmed order",
          detail:
            "Not accepted. An order nobody verifies never enters fulfilment.",
        },
        {
          id: "cost",
          option: "Cost",
          detail:
            "Charged per message. A regional SMS provider can be connected and paid directly in local currency, and Professional and Enterprise earn a discount on notification rates.",
        },
        {
          id: "where",
          option: "Where it is configured",
          detail:
            "The COD King dashboard. Works on Shopify checkout without code changes.",
        },
      ],
      useCases: [
        "A store running paid social traffic that attracts a share of casual or malicious cash orders, and wants them filtered before packing rather than after delivery fails.",
        "A merchant whose courier reports a run of undeliverable numbers, who needs the number on the order to be one that answers.",
        "A store in a WhatsApp-first market where a code delivered over WhatsApp is more likely to be seen and entered than one sent by SMS.",
        "A merchant who wants a defensible number for how many of their cash orders are genuine, using the verified-against-unverified reporting inside the app.",
      ],
      audienceReasons: {},
      planFeatureIds: ["otp-verification"],
      terminology: [
        "COD OTP verification",
        "verify COD orders before shipping",
        "block fake COD orders on Shopify",
        "SMS OTP at checkout",
        "WhatsApp OTP verification",
        "COD order confirmation",
        "one-time password checkout Shopify",
        "stop fraudulent cash on delivery orders",
      ],
      related: [
        {
          slug: "partial-cod-payment",
          reason:
            "verification proves the buyer is real; a deposit gives them something at stake.",
          whenBoth:
            "Run both when fake orders and refusals are both a problem: the OTP removes the orders that were never real, and the deposit filters the real buyers who were not serious.",
        },
        {
          slug: "cod-show-hide",
          reason:
            "verification checks the cash orders a rule has already allowed through.",
          whenBoth:
            "Run both when some orders should never have been cash in the first place: the rule decides which orders may use cash on delivery, and verification tests the ones that do.",
        },
        {
          slug: "abandoned-cart-recovery",
          reason:
            "both send messages to the buyer over SMS or WhatsApp, and both are included on the free Standard plan.",
          whenBoth:
            "Run both on a store that is losing orders at two different points — one to unverified cash orders, the other to checkouts that were never completed.",
        },
      ],
      differences: [
        {
          slug: "partial-cod-payment",
          distinction:
            "OTP Verification tests identity — is a real, reachable buyer behind this order — and collects no money. Partial COD Payment tests commitment by collecting part of the order value at checkout. A verified order can still be refused at the door; a part-paid one costs the buyer something to refuse.",
        },
        {
          slug: "cod-show-hide",
          distinction:
            "COD Show/Hide decides whether cash on delivery is offered before the buyer chooses it. OTP Verification runs after they have chosen it, on the order itself. One narrows which orders can be cash; the other checks the ones that are.",
        },
      ],
    },

    "partial-cod-payment": {
      overview: [
        "Partial COD Payment lets a merchant collect a small token amount from the customer at checkout and collect the remaining balance on delivery. The advance can be a fixed sum or a percentage of the cart value, and it is paid online through Shopify Payments or whichever gateway the store already uses — there is nothing new to connect. The balance is still collected as cash on delivery exactly as it is today.",
        "The point of the deposit is not the money on its own; it is what asking for it does to the order mix. A buyer who was never going to accept the parcel does not pay a deposit for it, so those orders drop out at checkout instead of being discovered at the door. The orders that continue are ones somebody has already paid toward, and part of the merchant's cost is recovered before the parcel leaves the shelf.",
        "The deposit can be scoped rather than applied to everything: it can run on the whole store, or only on specific products, collections or tags. The checkout messaging that explains it is the merchant's own, which matters because a deposit is a change to how the store asks for money and buyers respond to how it is explained. It is enabled from the COD King dashboard in minutes, with no coding and no theme edits.",
      ],
      problemDetail: [
        "The problem is commitment. Cash on delivery costs a buyer nothing at the moment of ordering, so an order is an intention rather than an agreement — and there is no way to tell an intention from an agreement at the moment of dispatch. The merchant funds packaging, forward freight and working capital for both.",
        "The consequences are refusals, cancellations after dispatch, and cash flow that only arrives when the courier settles. A deposit changes the arithmetic on the buyer's side: refusing the parcel now costs them something. It also changes it on the merchant's side, because the money is in before the parcel goes out — and when the deposit is set to cover shipping, a refused parcel no longer leaves the merchant paying freight out and freight back with nothing collected.",
      ],
      behaviour: [
        "The customer adds products to the cart and proceeds to checkout as usual. At checkout they pay a small amount now — a fixed amount or a percentage — online through the store's gateway, alongside the cash-on-delivery option rather than instead of it. The order is then confirmed and shipped, and the customer pays the remaining balance on delivery, exactly as before.",
        "The merchant's own text at checkout explains what the deposit is and why it is being asked for. Everything else about the checkout is unchanged, and the balance still arrives as cash through the courier.",
      ],
      configuration: [
        {
          id: "amount",
          option: "Deposit amount",
          detail: "A percentage of the cart value, or a fixed amount.",
        },
        {
          id: "shipping",
          option: "Shipping-cost deposit",
          detail:
            "A setting rather than a separate feature: set the deposit to the store's shipping cost and the delivery is covered before the parcel leaves.",
        },
        {
          id: "scope",
          option: "Scope",
          detail:
            "The whole store, or only selected products, collections or tags.",
        },
        {
          id: "discount",
          option: "Discount",
          detail: "Optional, applied to prepaid or partial-payment orders.",
        },
        {
          id: "messaging",
          option: "Checkout messaging",
          detail: "The merchant's own text explaining the deposit.",
        },
        {
          id: "gateway",
          option: "Payment gateway",
          detail:
            "Whichever gateway the store already uses — the merchant's choice, not a fixed list. Nothing new to connect, and the balance still arrives as cash on delivery. The gateway must be set to auto-capture, or the deposit is authorised without being collected.",
        },
        {
          id: "rate",
          option: "Rate charged by COD King",
          detail:
            "A per-order partial payment rate set by the plan, charged only on the orders that use the feature.",
        },
        {
          id: "where",
          option: "Where it is configured",
          detail:
            "The COD King dashboard, in minutes. No coding, no theme edits.",
        },
      ],
      useCases: [
        "A store selling custom-printed items — T-shirts, mugs — that cannot be restocked if the parcel is refused, and wants the buyer to have paid something before production starts.",
        "A merchant shipping furniture or appliances, where forward and return freight on a refused parcel is the single largest avoidable cost, setting the deposit to cover shipping.",
        "A store selling refurbished goods, where a returned unit has to be re-inspected before it can be sold again.",
        "A made-to-order business that wants non-serious orders to drop out at checkout rather than at the door.",
        "Any cash-on-delivery-heavy store that wants part of the order value in the business before the parcel leaves, rather than after the courier settles.",
      ],
      audienceReasons: {
        custom:
          "A custom-printed item is produced for one buyer and cannot go back on the shelf, so a refused parcel is a total loss rather than a delayed sale — a deposit means the buyer has paid toward the item before it is made.",
        shipping:
          "Freight dominates the cost of a heavy or bulky parcel, and a refusal doubles it. A deposit set at the shipping cost removes that exposure entirely.",
        refurbished:
          "Refurbished stock has to be checked and re-listed after a return, so the cost of a refusal is more than the freight — the deposit filters buyers who were never going to accept it.",
        "made-to-order":
          "Production starts before dispatch, so the merchant is committed long before the buyer is. A deposit moves the buyer's commitment forward to match.",
        "cod-heavy":
          "When most orders arrive as cash, the whole business is exposed to refusals. A deposit applies a filter to all of them at the moment of ordering.",
      },
      planFeatureIds: ["partial-payment"],
      terminology: [
        "partial COD payment",
        "advance payment on COD orders",
        "token amount at checkout",
        "deposit before shipping",
        "collect shipping charges upfront",
        "part payment Shopify app",
        "COD advance percentage",
        "pay a little now, rest on delivery",
      ],
      related: [
        {
          slug: "cod-to-prepaid",
          reason:
            "a deposit takes part of the money upfront; a prepaid discount moves the whole order online.",
          whenBoth:
            "Offer the prepaid discount first and fall back to a deposit for the buyers who still want to pay cash — the order is then either fully paid or partly paid, but never entirely unpaid.",
        },
        {
          slug: "otp-verification",
          reason:
            "the two are usually run together — one confirms the buyer, the other commits them.",
          whenBoth:
            "Run both on stores where fake orders and genuine-but-casual buyers are both producing refusals.",
        },
        {
          slug: "cod-fees",
          reason:
            "both change what a cash order asks of the buyer at checkout — one collects part of the order value, the other adds a charge on top of it.",
          whenBoth:
            "Use a fee when the goal is to cover the cost of cash on delivery, and a deposit when the goal is to secure commitment; a store can do both, but should be clear which line at checkout is which.",
        },
      ],
      differences: [
        {
          slug: "cod-fees",
          distinction:
            "A partial payment is part of the order value, collected early — the customer pays no more in total. A COD fee is an additional charge on top of the order for choosing cash on delivery. One brings money forward; the other adds money.",
        },
        {
          slug: "cod-to-prepaid",
          distinction:
            "Partial COD Payment keeps the order on cash on delivery and collects a deposit against it. COD to Prepaid moves the order off cash on delivery entirely by offering a discount for paying the full amount online. The first reduces the exposure on a cash order; the second removes it.",
        },
        {
          slug: "otp-verification",
          distinction:
            "OTP Verification confirms who the buyer is and collects nothing. Partial COD Payment collects money and confirms nothing about identity. They test different things and are commonly run together.",
        },
      ],
    },

    "cod-to-prepaid": {
      overview: [
        "COD to Prepaid nudges cash-on-delivery buyers to pay fully online instead. When a customer chooses cash on delivery, COD King presents an exclusive prepaid discount — as a banner in the checkout flow, or as a reminder carrying a payment link after the order has been placed — so paying online costs the buyer less than paying on delivery. The discount is attached to the payment option itself, so only orders paid online receive it.",
        "The discount rules are fully configurable: a percentage of the cart or a fixed value, with the merchant's own wording and their own conditions for when it applies. The payment link is raised on the merchant's own payment gateway, connected to COD King with its API key and secret. The merchant uses whichever gateway they prefer — Razorpay, PayU, Cashfree and PhonePe are commonly used, and are examples rather than the set of gateways that work. Conversion from cash on delivery to prepaid is tracked in real time inside the app.",
        "An order that converts stops being a cash-on-delivery order in every respect that matters: the full amount arrives before the parcel leaves, there is nothing to refuse at the door, and the working capital is in the business rather than with the courier. Everything is set from the COD King dashboard — no theme edits, no code.",
      ],
      problemDetail: [
        "The problem is that buyers in cash-on-delivery markets default to cash even where online payment is available and nothing is wrong with it. It is habit as much as preference, and a merchant who does nothing about it inherits the entire risk profile of cash on delivery on orders that could have been prepaid.",
        "The cost is twofold. Cash flow: the money settles when the courier settles, so working capital is in transit rather than in the business. And risk: every undelivered cash order can be refused, and a refusal costs freight in both directions plus packaging. A discount at the moment of choice is a small, visible reason to pay now — and every order that takes it is one less parcel that can come back unpaid.",
      ],
      behaviour: [
        "The customer reaches checkout and selects cash on delivery exactly as they do today. COD King presents a banner offering an exclusive prepaid discount, and backs it with a reminder carrying a payment link. The discount applies to the online payment option, so paying now visibly costs less than paying later.",
        "If the customer switches, the full amount is collected upfront and the order carries no cash-on-delivery risk. If they do not, the order proceeds as cash on delivery as normal — the nudge does not block anything. The nudge can be shown during the checkout flow, or after the order has already been placed, which is what makes the payment-link reminder useful on orders that are already in the system.",
      ],
      configuration: [
        {
          id: "discount-type",
          option: "Discount type",
          detail: "A percentage of the cart, or a fixed value.",
        },
        {
          id: "payment-option",
          option: "Which payment options receive it",
          detail:
            "A specific type of payment option — online payments receive the discount, cash-on-delivery orders do not.",
        },
        {
          id: "placement",
          option: "Placement",
          detail:
            "A banner during the checkout flow, or a reminder carrying a payment link after the order is placed.",
        },
        {
          id: "conditions",
          option: "Conditions",
          detail:
            "The rules the discount applies under, configurable to the business.",
        },
        {
          id: "messaging",
          option: "Messaging",
          detail: "The merchant's own wording on the banner and the reminder.",
        },
        {
          id: "gateway",
          option: "Payment gateway",
          detail:
            "The merchant's own, connected with an API key and secret so the payment link is raised on their account. Whichever gateway they prefer — Razorpay, PayU, Cashfree and PhonePe among the common ones, given as examples and not as a supported-provider list.",
        },
        {
          id: "tracking",
          option: "Reporting",
          detail: "COD-to-prepaid conversion, tracked in real time.",
        },
        {
          id: "where",
          option: "Where it is configured",
          detail: "The COD King dashboard. No theme edits, no code.",
        },
      ],
      useCases: [
        "A store selling custom products — T-shirts, mugs — that would rather have the order paid for before anything is produced.",
        "A merchant shipping high-cost goods such as furniture or bicycles, where a refused parcel costs freight twice and a prepaid order cannot be refused.",
        "A store selling refurbished goods such as mobiles or printers, where a returned unit has to be re-checked before it can be sold again.",
        "A cash-on-delivery-heavy store with fake orders and high RTO, using the discount to move the willing part of its buyer base off cash entirely.",
        "A merchant who wants to raise prepaid share without removing cash on delivery from the checkout, so no customer is turned away.",
      ],
      audienceReasons: {
        custom:
          "Production begins before dispatch, so a prepaid order removes the risk of building something for a buyer who then refuses it.",
        shipping:
          "Freight on bulky goods is the largest single cost of a refusal, and a prepaid order is never refused at the door.",
        refurbished:
          "A refused refurbished unit has to be re-inspected and re-listed; converting the order to prepaid avoids that path entirely.",
        "cod-heavy":
          "Where fake orders and high RTO are already a problem, every order moved to prepaid is one removed from the exposed pool.",
      },
      terminology: [
        "COD to prepaid conversion",
        "prepaid discount at checkout",
        "prepaid nudge",
        "convert COD orders to online payment",
        "payment link reminder",
        "increase prepaid share",
        "discount for paying online",
        "reduce cash on delivery orders Shopify",
      ],
      related: [
        {
          slug: "cod-fees",
          reason:
            "a discount pulls buyers toward prepaid where a COD fee pushes them; both change the price difference between the two options.",
          whenBoth:
            "Run both when the goal is to shift the payment mix: the fee makes cash the more expensive option and the discount makes prepaid the cheaper one, and the customer sees both at checkout.",
        },
        {
          slug: "partial-cod-payment",
          reason:
            "the fallback when a buyer will not move fully to prepaid — part of the money now, the balance on delivery.",
          whenBoth:
            "Offer prepaid first and a deposit second, so an order that will not convert entirely still arrives partly paid.",
        },
        {
          slug: "abandoned-cart-recovery",
          reason:
            "both reach the buyer after they have left the checkout, and both are driven by messages sent over SMS or WhatsApp.",
          whenBoth:
            "Run both on a store where some checkouts are abandoned and some completed orders are still unpaid cash — recovery brings the cart back, the prepaid reminder settles the order.",
        },
      ],
      differences: [
        {
          slug: "partial-cod-payment",
          distinction:
            "COD to Prepaid asks for the full amount online in exchange for a discount, and the order stops being a cash order. Partial COD Payment asks for part of the amount and the order stays a cash order for the balance.",
        },
        {
          slug: "cod-fees",
          distinction:
            "Both make prepaid the better-priced option, from opposite directions. A COD fee adds a charge to the cash-on-delivery order; a prepaid discount reduces the total on the online-payment order. The fee also produces revenue toward the cost of cash on delivery, which the discount does not.",
        },
        {
          slug: "abandoned-cart-recovery",
          distinction:
            "COD to Prepaid acts on an order that exists and asks for it to be paid differently. Abandoned Cart Recovery acts on a checkout that never became an order at all.",
        },
      ],
    },

    "abandoned-cart-recovery": {
      overview: [
        "Abandoned Cart Recovery brings back cash-on-delivery buyers who started checkout and did not finish it. COD King sends timely reminders over SMS or WhatsApp as an automated multi-step sequence, and every reminder carries a direct checkout link so the buyer returns to the cart they already filled rather than searching for the products again.",
        "The sequence runs on its own once it is switched on. It is a sequence rather than a single message deliberately: a buyer who misses the first reminder still hears from the store, and messages go out while the checkout is still fresh in the buyer's mind. Reminder timing, channel and message are all set from the COD King dashboard — no theme edits, no code.",
        "It is aimed specifically at cash-on-delivery checkouts that were started and never completed, and it is included on every plan, including the free Standard plan. There is no separate charge for the feature itself; the merchant pays for the messages it sends, and a local SMS provider can be connected to reduce that cost.",
      ],
      problemDetail: [
        "The problem is that a store cannot see why a buyer left. The cart was filled, the checkout was reached, and then nothing — and without a follow-up, that is the end of it. Abandoned checkouts are the quietest loss in a store, because nothing about them demands attention the way a refused parcel does.",
        "What makes it worth fixing is that the buyer has already done the expensive part. They found the store, chose the product and reached the checkout, all of which the merchant has already paid for in traffic. A reminder on a channel they actually read, carrying a link back to the cart they already built, is the shortest path from a lost checkout back to an order.",
      ],
      behaviour: [
        "The customer reaches the Shopify checkout with a cash-on-delivery cart ready to place, and leaves without ordering. COD King treats that as an abandoned checkout and starts the reminder sequence: a timely message goes out over SMS or WhatsApp, and further reminders follow as part of the automated sequence rather than stopping at one.",
        "Each reminder carries a direct checkout link. The customer taps it and returns to the cart they already filled — no rebuilding, no searching — and completes the order, at which point the sale that had been written off comes back.",
      ],
      configuration: [
        {
          id: "channel",
          option: "Channel",
          detail: "SMS, or WhatsApp. Both are sent from COD King.",
        },
        {
          id: "sequence",
          option: "Sequence",
          detail:
            "Multi-step and automated rather than a single message; it runs on its own once switched on.",
        },
        {
          id: "timing",
          option: "Timing",
          detail:
            "Set from the dashboard, and intended to reach the buyer while the checkout is still fresh.",
        },
        {
          id: "message",
          option: "Message content",
          detail:
            "The merchant's own message. Every reminder carries a direct checkout link back to the filled cart.",
        },
        {
          id: "cost",
          option: "Cost",
          detail:
            "No charge for the feature on any plan, including the free one; the merchant pays for the messages sent. A regional provider can be connected and paid directly in local currency, and Professional and Enterprise earn a discount on notification rates.",
        },
        {
          id: "where",
          option: "Where it is configured",
          detail: "The COD King dashboard. No theme edits, no code.",
        },
      ],
      useCases: [
        "A cash-on-delivery-heavy store with a run of carts left unfinished, where the products were chosen but the checkout was never completed.",
        "A store with high-value carts, where a single recovered checkout is worth more than the messages it takes to recover it.",
        "A high-traffic store where many checkouts are started and no one could follow them up by hand.",
        "A merchant selling into WhatsApp-first markets such as India, the UAE or the Philippines, where a WhatsApp reminder is read and an email is not.",
        "A store on the free Standard plan that wants recovery running before it pays for anything else.",
      ],
      audienceReasons: {
        "cod-heavy":
          "Cash-on-delivery buyers abandon checkout at the point where they would have to commit, and a reminder reaches them at exactly the moment the decision is still live.",
        "high-aov":
          "The economics are obvious on a large cart — the cost of a handful of messages is trivial against the value of the order they bring back.",
        traffic:
          "At volume, abandoned checkouts are a continuous stream that no one can chase manually; an automated sequence is the only way to work through them.",
        whatsapp:
          "In markets where WhatsApp is the default channel, a reminder there is read within minutes, and the direct checkout link makes returning a single tap.",
      },
      planFeatureIds: ["abandoned-cart-recovery"],
      terminology: [
        "abandoned cart recovery for Shopify",
        "abandoned checkout reminders",
        "WhatsApp cart recovery",
        "SMS cart reminders",
        "recover abandoned COD carts",
        "cart recovery sequence",
        "checkout link reminder",
      ],
      related: [
        {
          slug: "cod-to-prepaid",
          reason:
            "both act once the buyer has left the checkout — one on the cart that was never placed, the other on the order that was.",
          whenBoth:
            "Run both to cover the whole tail of the funnel: recovery returns the buyer to an unfinished cart, and the prepaid reminder converts the cash order they then place.",
        },
        {
          slug: "otp-verification",
          reason:
            "both are messaging-driven controls included on the free Standard plan, and both are billed by the messages they send.",
          whenBoth:
            "A store already paying for OTP messages can add recovery without a plan change, and can connect one local SMS provider that serves both.",
        },
      ],
      differences: [
        {
          slug: "cod-to-prepaid",
          distinction:
            "Abandoned Cart Recovery acts on a checkout that never became an order. COD to Prepaid acts on an order that exists and asks for it to be paid online instead. Both can involve a message after the fact, but they are chasing two different things.",
        },
        {
          slug: "otp-verification",
          distinction:
            "OTP Verification stops orders that should not proceed. Abandoned Cart Recovery restarts orders that should have proceeded and did not. One reduces the order count, the other increases it.",
        },
      ],
    },

    "cod-show-hide": {
      overview: [
        "COD Show/Hide — called COD Rules inside the app and in this site's navigation — gives a merchant full control over their cash-on-delivery policy by defining where, when and to whom cash on delivery is offered. The merchant sets conditions such as order value, pin code, customer history or product type, and COD King applies them at the Shopify checkout: cash on delivery appears for the orders it should appear on, and disappears for the rest.",
        "It is a rule engine rather than a single switch. Rules can be built from 15+ parameters and combined, so a merchant is not limited to one condition at a time, and specific phone numbers and email addresses can be blacklisted outright. The engine reads each order against every condition that has been set, with no latency at checkout.",
        "Hiding cash on delivery removes one way to pay, not the order: online payment stays exactly where it was, so an order from an excluded pin code or on an excluded product can still be placed and paid for. Rules are built and edited from the COD King dashboard — no theme edits, no code.",
      ],
      problemDetail: [
        "Out of the box, cash on delivery is offered on every order or on none. That is a decision no merchant would make deliberately, because the orders differ enormously in what cash on delivery costs: some pin codes are never worth the freight, some couriers will not collect cash in an area at all, some baskets are too large to send unpaid, some products cannot go back on the shelf if the parcel is refused, and some buyers have refused one before.",
        "Without a rule, the merchant absorbs every one of those cases and only finds out afterwards. A rule moves the decision to the earliest and cheapest point — before the buyer has even chosen how to pay — and makes it a policy the merchant sets rather than an outcome they receive.",
      ],
      behaviour: [
        "The merchant creates a rule in the COD King dashboard: a condition, and what should happen to cash on delivery when it matches. When a buyer reaches the Shopify checkout and enters their details, the engine reads the order against every condition that has been set, matches the one that fits, and shows or hides cash on delivery accordingly.",
        "There is no delay at checkout, and nothing else about the checkout changes. Prepaid options remain available on every order, including the ones cash on delivery has been hidden on — the rule narrows how the order can be paid for, not whether it can be placed.",
      ],
      configuration: [
        {
          id: "value",
          option: "Condition — order value",
          detail:
            "A cart-value threshold, applied as only-above or only-below.",
        },
        {
          id: "location",
          option: "Condition — pin code / region",
          detail: "Individual pin codes, or whole regions.",
        },
        {
          id: "product",
          option: "Condition — product / collection",
          detail: "Per product, or per collection.",
        },
        {
          id: "customer",
          option: "Condition — customer",
          detail:
            "Customer tag, or order history — the buyer's record decides.",
        },
        {
          id: "blacklist",
          option: "Condition — blacklist",
          detail:
            "Specific phone numbers or email addresses, blocked from cash on delivery outright.",
        },
        {
          id: "parameters",
          option: "Parameters available",
          detail:
            "15+ in all, and combinable — a rule is not limited to one condition.",
        },
        {
          id: "action",
          option: "Action a rule takes",
          detail:
            "Show, or hide, the cash-on-delivery option. Online payment options are never affected.",
        },
        {
          id: "where",
          option: "Where it is configured",
          detail:
            "The COD King dashboard. No theme edits, no code, and no added latency at checkout.",
        },
      ],
      useCases: [
        "A made-to-order store that disables cash on delivery on its custom collection, because a refused custom item cannot be restocked, while leaving it on for the rest of the catalogue.",
        "A merchant whose courier will not collect cash in certain pin codes, hiding cash on delivery for exactly those areas rather than stopping delivery to them.",
        "A store with a list of repeat offenders, blacklisting their phone numbers and email addresses so they never see cash on delivery again.",
        "A merchant with high-value carts, requiring online payment above a cart value while leaving cash on delivery available on smaller baskets.",
        "A store with a segmented customer base, offering cash on delivery to tagged repeat buyers and withholding it from first-time customers.",
      ],
      audienceReasons: {
        custom:
          "Custom and made-to-order items cannot be resold if the parcel comes back, so those are exactly the products worth taking off cash on delivery.",
        coverage:
          "Where a courier will not collect cash, a cash order is undeliverable by definition — a pin code rule prevents it from being placed.",
        blacklist:
          "A buyer who has refused parcels before is the clearest possible signal, and a phone or email blacklist is the direct way to act on it.",
        value:
          "The larger the basket, the more a refusal costs — a cart-value threshold moves the biggest orders onto prepaid without touching the small ones.",
        segments:
          "Customer tags and order history already describe who has behaved well; a rule turns that record into a policy at checkout.",
      },
      planFeatureIds: ["cod-rules"],
      terminology: [
        "hide COD for specific pin codes",
        "COD rules for Shopify",
        "disable cash on delivery",
        "COD availability rules",
        "blacklist a customer from COD",
        "show COD above a cart value",
        "COD by product or collection",
        "restrict cash on delivery by zip code",
      ],
      related: [
        {
          slug: "cod-fees",
          reason:
            "a fee prices cash on delivery where a rule removes it — the two ends of the same decision.",
          whenBoth:
            "Use a rule where cash on delivery should not be available at all, and a fee everywhere else, so the orders that keep it pay toward what it costs.",
        },
        {
          slug: "cod-to-prepaid",
          reason:
            "a discount persuades the buyer off cash where a rule takes the option away.",
          whenBoth:
            "Try the discount on the orders where cash on delivery is still offered, and reserve the rule for the pin codes, products and customers where no incentive would be enough.",
        },
        {
          slug: "otp-verification",
          reason:
            "the rule decides which orders may be cash; verification tests the ones that are.",
          whenBoth:
            "Run both when risky orders should be narrowed first and then checked — the rule removes whole categories, verification checks individuals.",
        },
      ],
      differences: [
        {
          slug: "cod-fees",
          distinction:
            "COD Show/Hide decides whether cash on delivery is available on an order at all. COD Fees leaves it available and attaches a cost to it. A rule is a policy; a fee is a price. Both are on the Professional and Enterprise plans, and many stores run a fee broadly and a rule narrowly.",
        },
        {
          slug: "otp-verification",
          distinction:
            "COD Show/Hide acts before the buyer chooses a payment method, on categories of order. OTP Verification acts after they have chosen cash on delivery, on the individual order.",
        },
        {
          slug: "cod-to-prepaid",
          distinction:
            "A rule removes the cash option; a prepaid discount leaves it in place and makes the alternative cheaper. The rule is a decision the merchant makes for the buyer; the discount is one the buyer makes for themselves.",
        },
      ],
    },

    "cod-fees": {
      overview: [
        "COD Fees lets a merchant charge an additional fee on orders that choose cash on delivery, to cover the logistics costs a cash order carries and a prepaid one does not, and to give the customer a reason to pay online instead. The fee is set as a fixed amount or as a percentage of the order value, and COD King adds it to the order summary as its own clearly labelled line when the customer selects cash on delivery.",
        "The fee does not have to be the same on every order: it can be set by parcel weight, so a heavy shipment carries more of its own freight, and by price range, so different order-value bands carry different fees. The label the customer reads and the checkout messaging around it are the merchant's own wording, and nothing else about the theme changes.",
        "Transparency is the design principle. The customer sees the fee and the updated total while they are placing the order, before they confirm anything. Cash on delivery stays on the checkout — the fee is intended to reduce cash-on-delivery adoption naturally rather than to block it, which is also how it increases prepaid conversions: the customer can always switch to online payment, which carries no COD fee.",
      ],
      problemDetail: [
        "A cash-on-delivery order costs more to fulfil than a prepaid one. There is cash collection and remittance by the courier, a higher rate of refusal, and the return freight that follows one — none of which a prepaid order carries. The checkout, left alone, charges the same for both.",
        "That difference has to come from somewhere, and by default it comes out of margin, which is hardest to bear in thin-margin categories and on heavy parcels. Charging for cash on delivery does two things at once: it recovers part of the cost on the orders that use it, and it makes the cheaper alternative visible at the exact moment the customer is choosing between them.",
      ],
      behaviour: [
        "The merchant configures the fee in the COD King dashboard. A buyer reaches the Shopify checkout and chooses cash on delivery over paying online; COD King applies the fee and adds it to the order summary as its own clearly labelled line, and the order total updates in front of the customer.",
        "The customer then either places the cash-on-delivery order at the total shown, or switches to online payment, which carries no COD fee. Both outcomes are useful to the merchant: one covers part of what cash on delivery costs, the other removes the cost entirely.",
      ],
      configuration: [
        {
          id: "type",
          option: "Fee type",
          detail: "A fixed amount, or a percentage of the order value.",
        },
        {
          id: "variation",
          option: "Varying the fee",
          detail:
            "By parcel weight, and by order-value band — so a heavy parcel and a large basket need not carry the same fee.",
        },
        {
          id: "amount",
          option: "The amount",
          detail:
            "Always the merchant's decision. COD King applies whatever is set, and neither imposes nor recommends a figure.",
        },
        {
          id: "display",
          option: "How it appears",
          detail:
            "As its own clearly labelled line in the order summary, added when cash on delivery is selected, with the total updating before the customer confirms.",
        },
        {
          id: "label",
          option: "Fee label and messaging",
          detail:
            "The merchant's own wording, and the only visual change to the checkout.",
        },
        {
          id: "where",
          option: "Where it is configured",
          detail: "The COD King dashboard. No theme edits, no code.",
        },
      ],
      useCases: [
        "A store with high cash-handling costs — cash collection charges and return freight — recovering part of them on the orders that cause them.",
        "A merchant shipping heavy or bulky products, setting a weight-based fee so the parcels whose freight doubles on return carry more of it upfront.",
        "A cash-on-delivery-heavy catalogue where most orders arrive unpaid, using a visible fee to shift part of the mix toward prepaid without removing any option.",
        "A store deliberately moving toward prepaid but unwilling to remove cash on delivery and lose the customers who will only pay that way.",
        "A thin-margin category where the extra cost of a cash order is the difference between a profitable order and an unprofitable one.",
      ],
      audienceReasons: {
        logistics:
          "Cash collection and return freight are direct, measurable costs of offering cash on delivery, and a fee is the only way to charge them to the orders that incur them.",
        heavy:
          "Freight on a bulky parcel doubles when it is refused, and a weight-based fee puts more of that cost on the orders most likely to incur it.",
        codheavy:
          "When most orders arrive unpaid, even a small per-order fee changes the economics of the whole catalogue.",
        prepaid:
          "A fee shifts buyers toward online payment without removing cash on delivery, which is what a store wants when it is moving toward prepaid but not ready to lose cash-only customers.",
        margin:
          "In thin-margin categories the additional cost of a cash order is visible in the P&L, and leaving it uncharged means the prepaid customers are subsidising it.",
      },
      planFeatureIds: ["cod-fees"],
      terminology: [
        "COD fee for Shopify",
        "cash on delivery charges",
        "COD surcharge",
        "extra fee on COD orders",
        "percentage-based COD fee",
        "COD handling fee",
        "charge extra for cash on delivery",
        "COD fee by weight",
      ],
      related: [
        {
          slug: "cod-to-prepaid",
          reason:
            "the fee makes cash the more expensive option; the discount makes prepaid the cheaper one.",
          whenBoth:
            "Run both when the goal is to change the payment mix rather than to block anything — the customer sees a cost on one option and a saving on the other, at the same moment.",
        },
        {
          slug: "cod-show-hide",
          reason:
            "where a fee is not enough, a rule removes cash on delivery entirely.",
          whenBoth:
            "Charge a fee across the store and reserve rules for the pin codes, products and customers where cash on delivery should not be offered at any price. Both are on the Professional and Enterprise plans.",
        },
        {
          slug: "partial-cod-payment",
          reason:
            "both change what the buyer is asked for at checkout when they choose cash on delivery.",
          whenBoth:
            "A merchant using both should be clear about which line is which: the deposit is part of the order value paid early, the fee is an additional charge.",
        },
      ],
      differences: [
        {
          slug: "cod-show-hide",
          distinction:
            "COD Fees keeps cash on delivery available and prices it. COD Show/Hide decides whether it is available at all. A fee changes the economics of an order; a rule changes whether the order can be cash. They are commonly run together, with the fee broad and the rules narrow.",
        },
        {
          slug: "partial-cod-payment",
          distinction:
            "A COD fee is an additional charge on top of the order total for choosing cash on delivery. A partial payment is part of the existing order total, collected early. The customer pays more in the first case and the same in the second.",
        },
        {
          slug: "cod-to-prepaid",
          distinction:
            "Both move buyers toward online payment by changing the relative price. The fee adds cost to cash on delivery and produces revenue toward what it costs; the discount reduces the total on prepaid orders and does not.",
        },
      ],
    },
  };

/**
 * Controls run together, and the problem each combination is run against.
 *
 * Every pairing here is one the product's own content supports: the controls
 * act at different points on the same order, or on the same problem from two
 * directions. Nothing below claims the two controls are integrated with each
 * other — they are independent switches that compose, which is what the
 * product says of all of them.
 */
export const featureCombinations: readonly FeatureCombination[] = [
  {
    id: "otp-partial",
    title: "OTP Verification + Partial COD Payment",
    controlSlugs: ["otp-verification", "partial-cod-payment"],
    problem:
      "Cash orders are arriving from numbers that do not answer, and from buyers who are real but were never serious enough to accept the parcel.",
    complement:
      "The two tests are different and neither replaces the other. Verification asks whether a real, reachable buyer is behind the order; a deposit asks whether they are committed enough to pay something toward it. An order that passes both is one somebody confirmed and paid for.",
    contributions: {
      "otp-verification":
        "Sends a one-time password to the delivery number over SMS or WhatsApp and accepts only the orders that are confirmed.",
      "partial-cod-payment":
        "Collects a fixed or percentage advance through the store's existing gateway, with the balance still collected on delivery.",
    },
  },
  {
    id: "rules-fees",
    title: "COD Show/Hide + COD Fees",
    controlSlugs: ["cod-show-hide", "cod-fees"],
    problem:
      "Cash on delivery is unprofitable on some orders and outright unworkable on others, and the checkout treats them all the same.",
    complement:
      "A fee and a rule are the two ends of one decision. Where cash on delivery is worth offering, the fee makes it pay toward its own cost; where it is not worth offering at all — a pin code the courier will not collect in, a custom item that cannot be restocked — the rule removes it. Both controls are on the Professional and Enterprise plans, so a merchant on either plan has both.",
    contributions: {
      "cod-show-hide":
        "Decides whether cash on delivery appears at all, from rules on order value, pin code, product, customer history and blacklists.",
      "cod-fees":
        "Attaches a fixed or percentage fee to the cash-on-delivery orders that remain, shown as its own line at checkout.",
    },
  },
  {
    id: "fees-prepaid",
    title: "COD Fees + COD to Prepaid",
    controlSlugs: ["cod-fees", "cod-to-prepaid"],
    problem:
      "Buyers default to cash on delivery out of habit, and nothing at the checkout gives them a reason to choose otherwise.",
    complement:
      "The pair works on the price gap between the two payment methods from both sides at once: the fee makes cash on delivery visibly more expensive, and the prepaid discount makes online payment visibly cheaper. Neither removes an option, so no customer is turned away — the choice is simply priced.",
    contributions: {
      "cod-fees":
        "Adds a clearly labelled fee to the order summary when cash on delivery is selected, and updates the total in front of the customer.",
      "cod-to-prepaid":
        "Presents an exclusive discount that applies only to online payment options, as a checkout banner or as a reminder with a payment link.",
    },
  },
  {
    id: "otp-rules",
    title: "OTP Verification + COD Show/Hide",
    controlSlugs: ["otp-verification", "cod-show-hide"],
    problem:
      "Some cash orders should never have been placed as cash, and some of the ones that should were placed by people who cannot be reached.",
    complement:
      "The rule works on categories and the verification works on individuals. The rule removes whole classes of order from cash on delivery — a pin code, a collection, a blacklisted number — and verification then tests each order that still arrives as cash. Running only one leaves the other class of problem untouched.",
    contributions: {
      "cod-show-hide":
        "Applies the merchant's conditions at checkout and hides cash on delivery on the orders that match, with online payment unaffected.",
      "otp-verification":
        "Verifies the delivery number on the cash orders that are still allowed, and blocks the ones nobody confirms.",
    },
  },
  {
    id: "recovery-prepaid",
    title: "Abandoned Cart Recovery + COD to Prepaid",
    controlSlugs: ["abandoned-cart-recovery", "cod-to-prepaid"],
    problem:
      "Revenue is lost at two points after the buyer has left the checkout: carts that were never converted into orders, and orders that were placed but are still unpaid cash.",
    complement:
      "Both controls act once the buyer is no longer at the checkout, and both work through messages the buyer receives. Recovery brings back the checkout that was never completed; the prepaid reminder carries a payment link that settles the order that was. Together they cover the whole tail of the funnel.",
    contributions: {
      "abandoned-cart-recovery":
        "Sends an automated multi-step SMS or WhatsApp sequence, each message carrying a direct link back to the filled cart.",
      "cod-to-prepaid":
        "Follows a placed cash order with a discount banner or a reminder carrying a payment link, so the order can be paid online instead.",
    },
  },
  {
    id: "prepaid-partial",
    title: "COD to Prepaid + Partial COD Payment",
    controlSlugs: ["cod-to-prepaid", "partial-cod-payment"],
    problem:
      "Some buyers will move to online payment for a discount, and some will not move at all — but shipping the second group entirely unpaid is the risk the merchant is trying to remove.",
    complement:
      "The two form a ladder. The prepaid discount asks for the whole amount online and removes the cash risk completely; the deposit asks for part of it and reduces the risk without asking the buyer to abandon cash on delivery. A merchant running both converts what they can and secures what they cannot.",
    contributions: {
      "cod-to-prepaid":
        "Offers a percentage or fixed discount attached to online payment options, tracked as a conversion in real time.",
      "partial-cod-payment":
        "Collects a fixed or percentage deposit at checkout for the orders that stay on cash on delivery.",
    },
  },
];

/**
 * The COD Calculator, described as what the route actually renders.
 *
 * `calculatorDefinitions` names three tools for this page and only the savings
 * model is implemented today, so `notCalculated` says so explicitly rather
 * than leaving an assistant to promise a merchant a COD fee calculator that
 * the page does not have.
 *
 * The `method` entries are the engine's own load-bearing assumptions, stated
 * in `src/utils/calculator.ts`. They are included because a model whose
 * assumptions are hidden cannot be reasoned about, and because all four are
 * the conservative reading — which is worth knowing when quoting its output.
 */
export const calculatorKnowledge: CalculatorKnowledge = {
  purpose: [
    "The COD Calculator is a free profit-and-loss model for a cash-on-delivery business. A merchant enters one month of orders, costs and behaviour rates, and the page returns what cash on delivery is currently costing them, where that cost comes from, and what recovering part of it would be worth per month and per year.",
    "It is the site's main lead magnet and it is deliberately ungated: no signup, no email, and the page renders a complete result before anything is typed, because the form loads with a real, coherent store rather than empty fields. Every figure that depends on an improvement assumption is labelled an estimate.",
  ],
  intendedFor: [
    "Merchants who know their order volume and average order value but have never put a number on what RTO and cancellations cost them.",
    "Merchants deciding whether COD controls are worth installing, and which one to switch on first.",
    "Merchants who want to test a scenario — a lower RTO rate, fewer cancellations, a larger prepaid share — against their own numbers rather than against a claim.",
  ],
  method: [
    "A month's orders are split into cash-on-delivery and prepaid. Some cash orders are cancelled before they ship; of those that do ship, some come back as RTO; what is left is delivered, and only delivered orders produce revenue.",
    "Prepaid orders are assumed to deliver. Prepaid RTO exists but is a fraction of cash-on-delivery RTO, and folding it in would understate the gap the page is about.",
    "RTO stock is assumed to be resellable, so an RTO loses the shipping both ways and the packaging rather than the product cost. Merchants with damaged or perishable returns lose more than the model shows.",
    "Cancelled orders are assumed to cost only the acquisition spend, because they never ship.",
    "Marketing is assumed to be paid per order placed, delivered or not — which is what makes an RTO cost more than its freight.",
  ],
  outputs: [
    "Current estimated cash-on-delivery loss per month.",
    "Potential savings per month and per year, under the improvement assumptions the merchant chose.",
    "Additional profit under the improved scenario.",
    "A leakage breakdown showing how much of the loss is RTO, how much is cash orders cancelled before dispatch, and how much is the courier's fee for collecting cash on the orders that did deliver.",
    "Scenario figures for RTO orders, RTO cost, cancelled orders, prepaid share, delivered orders, revenue and net profit.",
    "Three solution pathways, each naming the COD King control that acts on that part of the loss and showing the estimated impact of that change alone.",
  ],
  questions: [
    "What is cash on delivery actually costing my store each month, and each year?",
    "How much of that loss is RTO, how much is cancellations, and how much is the courier's cash-collection fee?",
    "What would reducing my RTO rate, reducing cancellations, or moving part of my orders to prepaid be worth?",
    "How do my numbers compare with a typical low-, average- or high-RTO cash-on-delivery store?",
    "Which COD King control addresses the largest part of my loss, and which page explains it?",
  ],
  notCalculated: [
    "It does not calculate a COD fee or a partial-payment percentage. Those two tools are planned for this same route and are not implemented today, so the page returns the savings model only.",
    "It does not price a COD King plan, and it does not read a store's real data — every figure comes from the numbers the merchant types in.",
    "It does not promise a result. The improvement rates are the merchant's own assumptions, and every dependent figure on the page is labelled an estimate.",
  ],
};

/**
 * Merchant questions, and the page that is authoritative for each.
 *
 * The single most useful section for an assistant, and the reason it exists:
 * routing an intent to one canonical URL is a different job from answering the
 * question, and the FAQ pool does the second. Answers here are one line — just
 * enough to confirm the routing is right.
 *
 * Targets are declared as kinds rather than as URLs, so every destination is
 * resolved through the route registry at render and a mapping cannot point at
 * a page that does not exist.
 */
export const questionRoutes: readonly QuestionRoute[] = [
  {
    question: "How can I stop fake COD orders on my Shopify store?",
    target: { kind: "control", slug: "otp-verification" },
    answer:
      "OTP Verification sends a one-time password to the delivery number over SMS or WhatsApp, and only verified orders are accepted.",
  },
  {
    question: "How do I verify COD orders before shipping them?",
    target: { kind: "control", slug: "otp-verification" },
    answer:
      "Verification runs at checkout, before the order enters fulfilment, so an unconfirmed order never becomes a parcel.",
  },
  {
    question: "Can the OTP be sent on WhatsApp instead of SMS?",
    target: { kind: "control", slug: "otp-verification" },
    answer: "Yes — the code can be delivered over SMS or over WhatsApp.",
  },
  {
    question: "Can I customise the OTP message with my store name?",
    target: { kind: "control", slug: "otp-verification" },
    answer:
      "Yes. The store name, message and wording on every code are the merchant's own.",
  },
  {
    question: "How can I collect some payment before shipping a COD order?",
    target: { kind: "control", slug: "partial-cod-payment" },
    answer:
      "Partial COD Payment takes a fixed or percentage advance at checkout, with the balance collected on delivery.",
  },
  {
    question:
      "Can I take a deposit or token amount on cash-on-delivery orders?",
    target: { kind: "control", slug: "partial-cod-payment" },
    answer:
      "Yes — a fixed sum or a percentage of the cart, paid through the store's existing gateway.",
  },
  {
    question: "Can I collect only the shipping charges upfront?",
    target: { kind: "control", slug: "partial-cod-payment" },
    answer:
      "Yes. Setting the deposit to the shipping cost means a refused parcel no longer costs freight in both directions.",
  },
  {
    question:
      "Can I ask for an advance payment on some products but not others?",
    target: { kind: "control", slug: "partial-cod-payment" },
    answer:
      "Yes — the deposit can apply to the whole store or only to specific products, collections or tags.",
  },
  {
    question: "How can I convert COD buyers to prepaid?",
    target: { kind: "control", slug: "cod-to-prepaid" },
    answer:
      "COD to Prepaid offers an exclusive discount that applies only to online payment options.",
  },
  {
    question: "Can I offer a discount for paying online instead of COD?",
    target: { kind: "control", slug: "cod-to-prepaid" },
    answer:
      "Yes — a percentage or a fixed value, attached to the prepaid payment option so cash orders do not receive it.",
  },
  {
    question:
      "Can I send a payment link after a COD order has already been placed?",
    target: { kind: "control", slug: "cod-to-prepaid" },
    answer:
      "Yes. The nudge can be a checkout banner or a reminder carrying a payment link after the order is placed.",
  },
  {
    question: "How do I increase my prepaid share?",
    target: { kind: "control", slug: "cod-to-prepaid" },
    answer:
      "A prepaid discount is the direct lever; a COD fee works from the other side by pricing cash on delivery.",
  },
  {
    question: "How can I recover abandoned carts from COD buyers?",
    target: { kind: "control", slug: "abandoned-cart-recovery" },
    answer:
      "Abandoned Cart Recovery sends an automated SMS or WhatsApp sequence with a direct checkout link in every reminder.",
  },
  {
    question: "Can I send WhatsApp reminders for abandoned checkouts?",
    target: { kind: "control", slug: "abandoned-cart-recovery" },
    answer:
      "Yes — reminders go over SMS or WhatsApp, whichever the store's buyers prefer.",
  },
  {
    question: "Does the customer have to rebuild their cart to come back?",
    target: { kind: "control", slug: "abandoned-cart-recovery" },
    answer:
      "No. Every reminder carries a direct checkout link back to the cart they already filled.",
  },
  {
    question: "How can I hide COD for certain pin codes or zip codes?",
    target: { kind: "control", slug: "cod-show-hide" },
    answer:
      "COD Show/Hide hides cash on delivery for high-risk pin codes or whole regions, while leaving online payment available.",
  },
  {
    question: "Can I disable cash on delivery on specific products?",
    target: { kind: "control", slug: "cod-show-hide" },
    answer:
      "Yes — cash on delivery can be enabled or disabled per product or per collection.",
  },
  {
    question: "Can I show COD only above or below a cart value?",
    target: { kind: "control", slug: "cod-show-hide" },
    answer:
      "Yes. An order-value rule offers cash on delivery only above, or only below, a threshold you set.",
  },
  {
    question: "Can I block a specific customer from using COD?",
    target: { kind: "control", slug: "cod-show-hide" },
    answer:
      "Yes — blacklist specific phone numbers or email addresses, or segment rules by customer tag and order history.",
  },
  {
    question: "What conditions can I build COD rules from?",
    target: { kind: "control", slug: "cod-show-hide" },
    answer:
      "Order value, pin code, product or collection, customer tag, order history and blacklists — 15+ parameters in all, and they can be combined.",
  },
  {
    question: "How can I charge extra for cash on delivery?",
    target: { kind: "control", slug: "cod-fees" },
    answer:
      "COD Fees adds a fixed or percentage fee to the order when the customer selects cash on delivery.",
  },
  {
    question: "Can the COD fee be a percentage of the order value?",
    target: { kind: "control", slug: "cod-fees" },
    answer:
      "Yes — fixed or percentage, and it can also vary by parcel weight or order-value band.",
  },
  {
    question: "Will my customer see the COD fee before they order?",
    target: { kind: "control", slug: "cod-fees" },
    answer:
      "Yes. It is shown as its own line in the order summary and the total updates before the order is confirmed.",
  },
  {
    question: "Will charging a COD fee stop people ordering?",
    target: { kind: "control", slug: "cod-fees" },
    answer:
      "It is designed to reduce COD adoption naturally rather than block it — cash on delivery stays on the checkout and online payment carries no fee.",
  },
  {
    question: "What is RTO and what is it costing me?",
    target: { kind: "calculator" },
    answer:
      "RTO is a shipped cash order that comes back undelivered. The COD Calculator puts a figure on it from your own volume and costs.",
  },
  {
    question: "How much money am I losing on cash on delivery?",
    target: { kind: "calculator" },
    answer:
      "The COD Calculator models a month of orders and returns the loss, its breakdown, and what recovering part of it would be worth.",
  },
  {
    question: "Which COD King feature should I switch on first?",
    target: { kind: "calculator" },
    answer:
      "The calculator's solution pathways name the control that acts on the largest part of your loss.",
  },
  {
    question: "What does COD King cost?",
    target: { kind: "pricing" },
    answer:
      "Three plans — Standard at $0, Professional at $7.99 and Enterprise at $39 per month — billed on your Shopify invoice.",
  },
  {
    question: "Which plan do I need for COD fees and COD rules?",
    target: { kind: "pricing" },
    answer:
      "Both are on the Professional plan and above; OTP, partial payment and cart recovery are on every plan including the free one.",
  },
  {
    question: "Is there a free trial, and is there a free plan?",
    target: { kind: "pricing" },
    answer:
      "Every plan includes a 7-day free trial with no credit card, and the Standard plan is $0 per month.",
  },
  {
    question: "How am I billed, and can I cancel?",
    target: { kind: "pricing" },
    answer:
      "The plan is added to your Shopify invoice as a line item, and you can upgrade, downgrade or cancel at any time.",
  },
  {
    question: "How are SMS and WhatsApp messages charged?",
    target: { kind: "faq" },
    answer:
      "You pay for the messages you send; Professional and Enterprise earn a discount on notification rates, and a local provider can be connected instead.",
  },
  {
    question: "Does COD King work with my Shopify theme?",
    target: { kind: "faq" },
    answer:
      "Yes — it works with all Shopify themes, needs no code, and setup takes under ten minutes.",
  },
  {
    question: "Do I need a developer to install it?",
    target: { kind: "faq" },
    answer:
      "No. Every control is configured from the app, with no theme edits and nothing to deploy.",
  },
  {
    question: "Which countries does COD King support?",
    target: { kind: "faq" },
    answer:
      "100+ countries including India, the Philippines, the UAE, Saudi Arabia, Pakistan, Bangladesh and Egypt.",
  },
  {
    question: "Can I see whether the controls are actually working?",
    target: { kind: "faq" },
    answer:
      "The app reports verified against unverified orders, prepaid share and recovered carts, and RTO, fake-order and prepaid trends in one place.",
  },
  {
    question: "What are all the features COD King offers?",
    target: { kind: "features" },
    answer:
      "The features index lists the published controls, grouped by the stage of the order they act at.",
  },
  {
    question: "How do I install and set up COD King?",
    target: { kind: "install" },
    answer:
      "Install it from the official Shopify App Store listing, then configure the controls from inside the app.",
  },
  {
    question: "How do I configure a specific setting inside the app?",
    target: { kind: "docs" },
    answer:
      "The documentation is the authoritative reference for installation and for every control's settings.",
  },
  {
    question: "How do I contact COD King support?",
    target: { kind: "contact" },
    answer:
      "WhatsApp, live chat and email inside the app, or the contact form — support runs seven days a week.",
  },
  {
    question: "Who makes COD King and what problem is it built for?",
    target: { kind: "about" },
    answer:
      "The About page covers what the product is, the problem it exists to solve, and how each control answers it.",
  },
];

/**
 * What the documentation site is for, and when it — rather than this site — is
 * the authoritative answer.
 *
 * Deliberately short. The documentation is a separate property with its own
 * contents, and this file has no business summarising pages it does not own.
 * What it can state is which kind of question belongs there, which is the only
 * thing an assistant needs in order to route one correctly.
 */
export const documentationScope = {
  summary:
    "Setup and configuration reference for every COD King control, maintained separately from this marketing site.",
  authoritativeFor: [
    "installing COD King on a Shopify store",
    "configuring a control — OTP, partial payment, COD fees, COD rules, prepaid discounts and cart recovery",
    "the settings, fields and options inside the COD King dashboard",
  ],
  notCoveredHere:
    "This file describes what each control does and which page explains it. It does not reproduce the documentation, and an assistant answering a step-by-step setup question should send the merchant there.",
} as const;
