/**
 * The recovery sequence, shared by the phone screen and the cards around it.
 *
 * Held here rather than inside either component because both have to be on the
 * same beat: the card that lights up must be describing what the conversation
 * is doing at that moment. Two components running two copies of this timeline
 * would start together and drift apart over a few loops, and a card announcing
 * "reminder sent" over a thread that has already been paid is worse than no
 * card at all.
 *
 * Nothing here is JSX or copy the page owns — it is the mock the scene plays,
 * which is why it sits beside the scene rather than in `src/data`. The scene
 * is reusable across surfaces; a component in `components/product` reaching
 * into one page's data file is the coupling that folder exists to prevent.
 */

/**
 * The checkout that was left, as one object so nothing can disagree.
 *
 * The thread is drawn on the *buyer's* phone: the brand's reminders arrive on
 * the left in green, the buyer answers on the right, and only the buyer's own
 * messages carry receipts — which is the rule WhatsApp follows and the reason
 * the ticks are on that side rather than on the reminder.
 *
 * The header is deliberately generic. This mock stands for any merchant's
 * store, so naming one would be inventing a customer of a customer; "Your
 * Brand Name" is what a merchant reads as *their* account.
 */
export const CART = {
  brand: "Your Brand Name",
  /** Used inside the conversation, where a name is what a real message has. */
  buyerFirstName: "Ananya",
  item: "Terra trail runners",
  variant: "UK 9 · Slate",
  total: 2499,
  order: "#1042",
} as const;

export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Five beats, and each one is a stage of the recovery.
 *
 * The two channels are two beats rather than one, because that is what the
 * product does: recovery runs as an automated multi-step sequence over SMS
 * *and* WhatsApp, and a single "reminder sent" beat would show a merchant only
 * half of what they are buying. The SMS leg goes first and the WhatsApp leg
 * follows, which is why the reminder in the thread is still undelivered while
 * the SMS card is lit — the two are consistent rather than merely adjacent.
 *
 * Beat 0 is what renders on the server and on a browser that never runs the
 * script, so it has to be a legible frame in its own right: the reminder is
 * already written, with the abandoned cart quoted inside it, and on its way.
 *
 * The resolved beat holds longest because it is the only one the whole
 * sequence exists to reach, and it is where the timeline parks under reduced
 * motion.
 */
export const BEATS = [
  { id: "detected", ms: 1600 },
  { id: "sms", ms: 1700 },
  { id: "whatsapp", ms: 2100 },
  { id: "clicked", ms: 1700 },
  { id: "recovered", ms: 2900 },
] as const;

export const DURATIONS = BEATS.map((beat) => beat.ms);

/** Named indices, so no component compares against a bare number. */
export const DETECTED_STEP = 0;
export const SMS_STEP = 1;
export const WHATSAPP_STEP = 2;
export const CLICKED_STEP = 3;
export const RECOVERED_STEP = 4;
