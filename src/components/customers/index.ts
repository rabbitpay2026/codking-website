/**
 * The customers page, as reusable parts.
 *
 * The page itself is a composition file: it resolves the query, reads the feed
 * from the content repository and hands the pieces to these. Nothing here
 * reads content of its own.
 */
export { ReviewCard } from "./ReviewCard";
export { ReviewLoadMore, customersHref } from "./ReviewLoadMore";
export { ReviewSummary } from "./ReviewSummary";
