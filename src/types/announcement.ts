import type { Route } from "next";

/**
 * The optional bar above the header (§5.1 #1).
 *
 * Light and dismissible, carrying a current offer or news item. Content is
 * data rather than markup so marketing can change or retire it without a
 * developer.
 */
export interface Announcement {
  /**
   * Identifies this announcement to the dismissal store. Changing it re-shows
   * the bar to everyone who dismissed the previous one, which is what makes a
   * new offer actually reach returning merchants.
   */
  readonly id: string;
  readonly message: string;
  readonly link?: {
    readonly label: string;
    readonly href: Route;
  };
  /** `false` retires the bar without deleting the record. */
  readonly active: boolean;
}
