/**
 * The Analytics & Reports page, section by section.
 *
 * Each export is one band of the page: it reads its own content from the
 * repository, picks the marks for it, and hands both to the shared section in
 * `components/features/sections`. So the route file states what the page is
 * made of, this folder states what each band says, and none of it restates how
 * a feature page looks.
 *
 * Named for their role rather than for the control — `Hero`, not
 * `AnalyticsHero`. The folder already says which page these belong to, and the
 * route file imports the whole set from this one module, so the prefix would be
 * repeated 8 times to disambiguate nothing.
 */
export { Audience } from "./Audience";
export { Benefits } from "./Benefits";
export { Cta } from "./Cta";
export { Faq } from "./Faq";
export { Features } from "./Features";
export { Flow } from "./Flow";
export { Hero } from "./Hero";
export { Testimonials } from "./Testimonials";
