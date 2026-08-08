/**
 * Hover response for resting surfaces.
 *
 * The site already owns a `surface-card` utility, but that one declares the
 * whole surface — radius, border, background, resting shadow — and then adds
 * a hover on top. It is the right tool when a card has no opinion of its own.
 * It is the wrong tool for a card whose radius, border weight or padding is
 * set by a blueprint, because applying it silently overrides all three.
 *
 * So the response is separated from the surface here. These are behaviour
 * only: a transition, and what changes on hover. Nothing in them paints a
 * resting state, so a card keeps the border, radius and fill it was designed
 * with and gains a reaction to the cursor.
 *
 * The values are deliberately quiet. Three pixels of lift is enough to read as
 * a response and not enough to read as movement; the border warms rather than
 * changes colour; the shadow is the resting card shadow with a wider, softer
 * second pass under it. Nothing scales — scaling resamples every glyph inside
 * the card, which is how a hover ends up looking cheap — and nothing about the
 * card's box changes, so a row of them cannot shift as the pointer crosses it.
 *
 * Both honour `prefers-reduced-motion` through the global rule in
 * `globals.css`, which collapses transition duration rather than removing the
 * end state: the border and shadow still answer, they just arrive at once.
 */

/**
 * `translate`, not `transform` — and this is the whole reason these live in a
 * constant rather than being copied from the older `surface-card` utility.
 *
 * Tailwind v4 compiles `-translate-y-*` to the standalone `translate` CSS
 * property, not to a `transform` matrix. A transition list naming `transform`
 * therefore animates a property the utility never sets, and the lift lands
 * instantly while the border and shadow ease in behind it — which reads as a
 * card flinching rather than rising. `surface-card` in `globals.css` still has
 * that older list; it is left alone here because the homepage depends on it.
 */
const TRANSITION =
  "transition-[translate,box-shadow,border-color] duration-300 ease-emphasized";

/** The lifted shadow. Two passes: a tight contact, and a wide soft ambient. */
const HOVER_SHADOW =
  "hover:shadow-[0_2px_4px_rgba(11,27,54,0.05),0_12px_28px_-14px_rgba(11,27,54,0.32)]";

/**
 * A card that responds to the cursor.
 *
 * For informational cards — results, reviews, panels. It lifts, so it reads as
 * an object the pointer is over; it does not change colour or grow a ring, so
 * it never suggests there is somewhere to click.
 */
export const cardHoverClass = [
  TRANSITION,
  "hover:-translate-y-[3px] hover:border-ink/15",
  HOVER_SHADOW,
].join(" ");

/**
 * The same response, without the lift.
 *
 * For surfaces too wide to move: a full-measure band travelling three pixels
 * is not a card acknowledging the cursor, it is the page twitching — and on a
 * band that holds the primary action, it moves the button out from under the
 * hand reaching for it. These get the border and the elevation only, which is
 * the part of the response that reads at that size anyway.
 */
export const panelHoverClass = [
  TRANSITION,
  "hover:border-ink/15",
  HOVER_SHADOW,
].join(" ");
