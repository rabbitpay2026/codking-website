import { ReviewRail } from "@/components/sections/proof/ReviewRail";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { BlurFade } from "@/components/ui/blur-fade";
import { getMerchantTestimonials } from "@/lib/content";

/**
 * What Shopify merchants say.
 *
 * The same repository the homepage carousel reads, on a rail that advances one
 * review at a time — see `ReviewRail` for why it shows several at once and
 * still steps by one.
 *
 * The published reviews come first: they are the ones merchants actually
 * wrote. The staged entries that follow are marked as such at the top of
 * `src/data/socialProof.ts`, which also carries the TODO for the App Store
 * sync that replaces them (§11). Nothing in this section is written for it.
 *
 * No faces. Every review here is attributed to a shop rather than to a person,
 * so the mark beside it is the store's initials; a stock portrait next to a
 * real merchant's words would be asserting that a stranger endorsed the
 * product, in the one section of the page whose entire job is to be believed.
 *
 * An empty feed is a valid state, not an error — the section simply does not
 * render.
 */
export async function OtpVerificationTestimonials() {
  const testimonials = await getMerchantTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <SectionShell
      tone="muted"
      size="compact"
      className="border-t border-ink/[0.07]"
    >
      <SectionHeading as="h2" title="What Shopify merchants say" />

      <BlurFade className="mt-lede">
        <ReviewRail
          testimonials={testimonials}
          label="What Shopify merchants say"
        />
      </BlurFade>
    </SectionShell>
  );
}
