/**
 * The automated conversation the closing demonstration plays, as one
 * declaration.
 *
 * Held beside the components rather than in `src/data` for the reason
 * `recoveryBeats.ts` gives: none of this is copy the page owns. It is the mock
 * the demonstration plays — an example order, an example product and the six
 * messages COD King sends around them — and a component reaching into a page's
 * content file for its own stage directions is the coupling that separation
 * exists to prevent. The two sentences the section actually *says* are content
 * and live in `src/data/homepage.ts`.
 *
 * ── What is safe to change here ───────────────────────────────────────────
 * This file is the whole configuration of the sequence. A message's words, the
 * side it arrives from, whatever card it carries and how long it holds are all
 * one entry, so adding a seventh message or reordering the six is an edit here
 * and nowhere else. The components read `MESSAGES` in order and know nothing
 * about which categories exist.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── On what the messages claim ────────────────────────────────────────────
 * Every update in here is something this repository already publishes: the
 * order notification, the payment and fulfilment updates and the
 * abandoned-cart reminder with a checkout link are the branded WhatsApp and
 * SMS messages of §6.2 (Messaging Gateways, Abandoned Cart Recovery). There is
 * no tracking number, no courier name and no named buyer anywhere in it.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * The example order every message refers to.
 *
 * The same id and value the closing visual has always used, so a merchant who
 * saw the previous version of this block is looking at the same order. There
 * is deliberately no buyer name and no address: the hero already shows a
 * real-shaped one on the buyer's phone, and a second invented person at the
 * foot of the page buys nothing the order line does not already say.
 */
export const AUTOMATION_ORDER = {
  id: "#1087",
  total: 2450,
} as const;

/**
 * Who sent a message, and therefore which side of the thread it sits on and
 * which side it arrives from.
 *
 * `incoming` is the buyer. `outgoing` is the store's automation. That is the
 * only distinction, it is fixed per message rather than alternating, and it
 * drives bubble colour, alignment and entry direction together — so a visitor
 * can see which party is doing the talking before reading a word of it.
 */
export type MessageDirection = "incoming" | "outgoing";

export type MessageCategory =
  | "placed"
  | "order-confirmation"
  | "payment"
  | "fulfilment"
  | "delivery"
  | "abandoned-cart";

/** The compact order summary an order message carries. */
export interface OrderAttachment {
  readonly id: string;
  readonly total: number;
  readonly method: string;
  readonly state: string;
}

/** The product card an abandoned-cart message carries. */
export interface ProductAttachment {
  readonly name: string;
  readonly meta: string;
  readonly price: number;
  readonly action: string;
}

/** A two-part progress line inside a message — "Packed / Ready to ship". */
export interface StatusAttachment {
  readonly done: string;
  readonly next: string;
}

export interface AutomationMessage {
  readonly id: string;
  readonly direction: MessageDirection;
  readonly category: MessageCategory;
  /** The message body, as it arrives on the buyer's phone. Keep it short. */
  readonly text: string;
  /** Clock time on the bubble. */
  readonly time: string;
  /** How long this beat holds, in milliseconds. */
  readonly ms: number;
  readonly order?: OrderAttachment;
  readonly product?: ProductAttachment;
  readonly status?: StatusAttachment;
}

/**
 * Six beats, in the order a cash-on-delivery order actually happens.
 *
 * ── One buyer, one store, and only one of them automated ──────────────────
 * The thread is not a conversation between two people taking turns. The buyer
 * speaks once — they placed an order — and everything after it is the store's
 * automation answering, which is the whole subject of this section. So exactly
 * one message is `incoming` and the other five are `outgoing`, and the thread
 * reads the way a real business thread does: a customer's line at the top left
 * and a run of branded updates down the right.
 *
 * Alternating the sides would be a prettier picture and a false one. It would
 * show two parties chatting, and nobody is chatting: the store's five messages
 * are sent by a machine at five different moments over two days, which is the
 * product.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The abandoned-cart reminder runs last because it is the one message that
 * does not belong to this order: it is the *next* buyer, and the sequence
 * loops from the reminder straight back into the order it recovers. It also
 * holds longest, because it carries the most to read and because
 * `useStepTimeline` parks on the final beat under reduced motion — the still
 * frame a visitor who asked for no animation gets is the richest of the six.
 */
export const MESSAGES: readonly AutomationMessage[] = [
  {
    id: "placed",
    direction: "incoming",
    category: "placed",
    text: "Hi, I just placed my order.",
    time: "16:44",
    ms: 2600,
  },
  {
    id: "order-confirmation",
    direction: "outgoing",
    category: "order-confirmation",
    text: `Thanks for your order! 🎉 Your order ${AUTOMATION_ORDER.id} has been confirmed.`,
    time: "16:45",
    ms: 3400,
    order: {
      id: `Order ${AUTOMATION_ORDER.id}`,
      total: AUTOMATION_ORDER.total,
      method: "Cash on Delivery",
      state: "Confirmed",
    },
  },
  {
    id: "payment",
    direction: "outgoing",
    category: "payment",
    text: "Payment received successfully. We'll keep you updated.",
    time: "16:46",
    ms: 2800,
  },
  {
    id: "fulfilment",
    direction: "outgoing",
    category: "fulfilment",
    text: "Your order has been packed and is ready to ship.",
    time: "09:20",
    ms: 3000,
    status: { done: "Packed", next: "Ready to ship" },
  },
  {
    id: "delivery",
    direction: "outgoing",
    category: "delivery",
    text: `Your order ${AUTOMATION_ORDER.id} is out for delivery.`,
    time: "11:05",
    ms: 2800,
  },
  {
    id: "abandoned-cart",
    direction: "outgoing",
    category: "abandoned-cart",
    text: "Still thinking about your order?",
    time: "18:12",
    ms: 4000,
    product: {
      name: "Everyday Cotton Tee",
      meta: "Ash · Size M",
      price: 1299,
      action: "Complete your order",
    },
  },
];

/**
 * Read on every tick, so it is a module-scope constant rather than an array
 * built during render — a fresh array each render restarts the pending timer
 * and the sequence never advances.
 */
export const MESSAGE_DURATIONS = MESSAGES.map((message) => message.ms);

/**
 * How many bubbles stand in the thread at once.
 *
 * Three, always — the window wraps around the end of the array rather than
 * growing from one, so the viewport is as full on the first beat as on the
 * last. One bubble is a slideshow of single lines with no sense that anything
 * is accumulating; six is the wall of simultaneous bubbles the brief rules
 * out; a window that grows leaves the thread half empty for two beats of every
 * loop. Three keeps the newest message and the two that led to it, which is
 * exactly enough context to read the newest one as a consequence.
 *
 * The wrap is also the truest reading of the sequence. The beat before "Hi, I
 * just placed my order" is the abandoned-cart reminder, so a loop shows the
 * reminder followed by the order it recovered — which is what the reminder is
 * for.
 */
export const VISIBLE_MESSAGES = 3;

/**
 * The four checkpoints under the thread.
 *
 * Secondary by contract: a legend for what the conversation has already
 * achieved, not a second set of cards competing with it. `reachedAt` is the
 * index in `MESSAGES` from which a checkpoint counts as met, which is why
 * inserting a message mid-sequence means revisiting these numbers and nothing
 * else.
 */
export interface AutomationMilestone {
  readonly id: string;
  readonly label: string;
  readonly reachedAt: number;
}

export const MILESTONES: readonly AutomationMilestone[] = [
  { id: "order", label: "Order confirmed", reachedAt: 1 },
  { id: "payment", label: "Payment received", reachedAt: 2 },
  { id: "packed", label: "Packed", reachedAt: 3 },
  { id: "delivery", label: "Out for delivery", reachedAt: 4 },
];

/**
 * WhatsApp's own colours, named rather than approximated.
 *
 * A brand surface drawn in a colour near the brand's is worse than no brand
 * surface at all, so these are the published values, and they are used nowhere
 * except on the WhatsApp parts of this depiction: the outgoing bubble, the read
 * receipt and the chat wallpaper. Everything else in the scene stays on the
 * site's own tokens, which is what keeps this a COD King visual that happens to
 * be shown inside WhatsApp rather than a WhatsApp advertisement.
 *
 * The logo itself is not here. It is `WhatsappMark` from `components/brand`,
 * the one published lockup this repository holds, and it carries its own
 * colours — a redrawn mark would be a different mark.
 */
export const WHATSAPP = {
  /** The outgoing bubble in WhatsApp's light theme. */
  bubble: "#D9FDD3",
  /** The read receipt. */
  read: "#53BDEB",
  /** The chat wallpaper, at the tint the app ships. */
  wallpaper: "#EFEAE2",
} as const;
