import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { WorldwideShowcase } from "@/components/sections/worldwide/WorldwideShowcase";

/**
 * Reach, now presented as operating scale rather than placeholder copy.
 *
 * The homepage keeps the same section order and the same light-blue system,
 * but this block now needs to read like a real global operations band: a
 * globe on the left, specific supported markets on the right, and compact
 * proof-style stats beneath the list.
 */
export function Worldwide() {
  return (
    <SectionShell
      tone="muted"
      size="compact"
      seam="top"
      ariaLabel="Worldwide availability"
    >
      <SectionHeading
        eyebrow="Worldwide"
        title="Trusted across the markets Shopify merchants sell in"
        description="COD King is actively supporting merchants across South Asia, the Middle East, Europe and North America."
      />

      <WorldwideShowcase className="mt-lede" />
    </SectionShell>
  );
}
