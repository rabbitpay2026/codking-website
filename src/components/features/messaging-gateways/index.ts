/**
 * The Local SMS Operator Integration page, section by section.
 *
 * Each export is one band of the page: it reads its own content from the
 * repository, picks the marks for it, and hands both to the shared section in
 * `components/features/sections`. So the route file states what the page is
 * made of, this folder states what each band says, and none of it restates how
 * a feature page looks.
 *
 * Three of them are this page's own rather than a shared band with words in
 * it — `PaymentModel`, `Operators` and `Configure`. That is the whole
 * difference between this control and its siblings: the others are argued, and
 * this one is a directory and a setting. The shared blueprint has no band for
 * either, and bending one into the shape would have cost every page that uses
 * it.
 *
 * Named for their role rather than for the control — `Hero`, not
 * `OperatorHero`. The folder already says which page these belong to, and the
 * route file imports the whole set from this one module, so the prefix would
 * be repeated 9 times to disambiguate nothing.
 */
export { Benefits } from "./Benefits";
export { Configure } from "./Configure";
export { Cta } from "./Cta";
export { Faq } from "./Faq";
export { Features } from "./Features";
export { Flow } from "./Flow";
export { Hero } from "./Hero";
export { Operators } from "./Operators";
export { PaymentModel } from "./PaymentModel";
export { Testimonials } from "./Testimonials";
