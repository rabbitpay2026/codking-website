import type { CountryId } from "@/components/sections/worldwide/data";

/**
 * Where a market's flag and name sit relative to its marker.
 *
 * The marker itself is never moved — it is projected from the country's own
 * latitude and longitude, and moving it to make room would be a map that lies.
 * Only the label moves, and when it moves far enough to need one it takes a
 * leader line with it.
 *
 * Placed by hand, because there is no automatic answer for the Gulf: Saudi
 * Arabia, the UAE and Oman are a few degrees apart on a map a thousand pixels
 * wide, and each label is a flag plus a name — a hundred pixels of it. The eight
 * crowded markets therefore fan into bands above and below the row they sit on,
 * with neighbours alternating between the near and far band so that no two ever
 * share a line.
 *
 * `side` is which way the group runs from its anchor: `right` starts the group
 * at the anchor, `left` ends it there, and `center` parks it directly above or
 * below the marker.
 */
export interface LabelPlacement {
  readonly dx: number;
  readonly dy: number;
  readonly side: "left" | "right" | "center";
  /**
   * Shown instead of the full name.
   *
   * Only the UAE has one. "United Arab Emirates" is three times the width of any
   * other name here and it runs clean across India and Bangladesh at every size;
   * abbreviating is what a real map does, and the hover tooltip still gives the
   * name in full.
   */
  readonly short?: string;
}

export const LABEL_PLACEMENTS: Record<CountryId, LabelPlacement> = {
  /*
    The one label that changed sides. Left of the marker it ran off the frame
    once the map grew into its margins; east of it there is nothing else until
    Spain, so the whole Atlantic is free.
  */
  "united-states": { dx: 14, dy: 0, side: "right" },
  spain: { dx: -14, dy: 0, side: "left" },
  italy: { dx: 0, dy: -28, side: "center" },
  turkey: { dx: 14, dy: -16, side: "right" },
  egypt: { dx: -14, dy: 6, side: "left" },
  philippines: { dx: 14, dy: 0, side: "right" },

  /*
    The Gulf and South Asia, in bands. These eight markers sit almost on one line
    across about two hundred pixels of world, so their labels go straight up or
    straight down from their own marker into one of four bands, and neighbours
    alternate between the near band and the far one.
  */
  "saudi-arabia": { dx: 0, dy: 34, side: "center" },
  "united-arab-emirates": { dx: 0, dy: -34, side: "center", short: "UAE" },
  oman: { dx: 0, dy: 68, side: "center" },
  pakistan: { dx: 0, dy: -90, side: "center" },
  india: { dx: 8, dy: 40, side: "right" },
  bangladesh: { dx: 0, dy: -34, side: "center" },
  thailand: { dx: 0, dy: 68, side: "center" },
  vietnam: { dx: 0, dy: -122, side: "center" },
};

/** Past this, a label needs a line back to the marker it belongs to. */
export const LEADER_FROM = 26;

/**
 * Narrowest map that still carries the labels.
 *
 * Below this the world is drawn small enough that the eight markers between the
 * Gulf and Manila are a few pixels apart, and no amount of fanning keeps a flag
 * and a name clear of its neighbours. The markers stay, and so does the tooltip,
 * so nothing becomes unreachable — a phone taps a marker to read the name.
 */
export const LABEL_MIN_WIDTH = 1000;

/**
 * Room kept on the right for the label that lives there.
 *
 * The Philippines is the easternmost market and its label runs east from the
 * marker into the Pacific. Fitting the world to the full width would put that
 * marker close enough to the edge that the name ran off it, so the fit stops
 * short — but only when the labels are actually being drawn, or a phone spends a
 * fifth of its width on a gutter for nothing.
 */
export const LABEL_GUTTER = 72;
