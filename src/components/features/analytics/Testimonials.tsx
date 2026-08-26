import { FeatureTestimonialRail } from "@/components/features/sections";
import { getAnalyticsPageCopy } from "@/lib/content";

/**
 * What Shopify merchants say.
 *
 * The shared rail, on the default surface rather than the muted one: the FAQ
 * directly below is muted, and two tinted bands in a row read as one long band
 * with the join lost.
 *
 * Every word comes from the testimonial repository the homepage reads. Nothing
 * is authored for this control, and no review here mentions it — a quote
 * invented to praise the feature the page is selling is the one thing this band
 * cannot survive.
 */
export function Testimonials() {
  return (
    <FeatureTestimonialRail
      title={getAnalyticsPageCopy().testimonialsTitle}
      tone="default"
    />
  );
}
