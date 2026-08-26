/**
 * The merchant the product demonstrations are wearing.
 *
 * Deliberately not COD King. Every buyer-facing surface this site depicts —
 * the checkout widget on the hero's phone, the WhatsApp thread that closes the
 * page — is rendered under the *merchant's* name, because that is how the
 * product actually ships: COD King automates the message, the store sends it.
 * A header saying "COD King" on a buyer's phone would tell a visitor we brand
 * their customers' screens for them, which is the opposite of the argument.
 *
 * One constant rather than a literal in each scene. The two demonstrations sit
 * at opposite ends of the same page and a visitor scrolling between them is
 * meant to recognise the same store, which cannot be left to two files
 * agreeing by coincidence. The only mention of ours in either scene is the
 * "powered by" line at the foot, which is where it belongs.
 */
export const demoMerchant = {
  name: "Your Awesome Brand",
  /** The line under the name in a WhatsApp business profile. */
  status: "Verified business",
} as const;
