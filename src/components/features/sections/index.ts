/**
 * The bands a feature page (§6.3) is built from.
 *
 * Every feature page makes the same argument in the same order — what it is
 * (hero), what it is worth (results), how it runs (flow), proof that it runs
 * (demo), what the merchant can configure (features), who it suits (audience),
 * and then the ask. These are that argument as components: geometry, spacing,
 * hover response and section divider decided once, with each page supplying
 * only its own words, icons and product scene.
 *
 * A page's own folder under `components/features/<slug>` holds nothing but the
 * thin wrappers that read content from the repository and hand it to these, so
 * adding the remaining feature pages is a data file and a scene rather than
 * another copy of this markup.
 */
export { FeatureAudienceRow } from "./FeatureAudienceRow";
export { FeatureCapabilityGrid } from "./FeatureCapabilityGrid";
export { FeatureCtaBand } from "./FeatureCtaBand";
export { FeatureDemoSplit } from "./FeatureDemoSplit";
export { FeatureFlowPanel } from "./FeatureFlowPanel";
export { FeatureHero } from "./FeatureHero";
export { FeatureOutcomeGrid } from "./FeatureOutcomeGrid";
export { FeatureTestimonialRail } from "./FeatureTestimonialRail";
