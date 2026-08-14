import { FeatureTestimonialRail } from "@/components/features/sections";

/**
 * What Shopify merchants say.
 *
 * The shared rail, on the muted surface — this page closes on it, with only
 * the call to action after. Every word in it comes from the testimonial
 * repository the homepage reads; nothing is authored for this control.
 */
export function OtpVerificationTestimonials() {
  return <FeatureTestimonialRail tone="muted" />;
}
