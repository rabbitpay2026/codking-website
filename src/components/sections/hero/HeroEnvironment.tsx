import { Noise } from "@/components/ui/noise";

/**
 * The lit room the hero devices stand in.
 *
 * Built as stacked layers rather than one gradient, because depth is what
 * separates a lit environment from a coloured rectangle. From the back
 * forward: a pale lavender wash, a mesh of four soft colour bodies that gives
 * the field its variation, two slow drifting lights for movement, a bright key
 * light behind the devices, a floor gradient to sit them on, and grain over
 * everything so a field this large cannot band.
 *
 * The whole thing is deliberately high-key. A dark, heavily blurred hero
 * hides the product inside it — and the product is the argument. Every layer
 * here is masked or faded before it reaches the centre-right, so the
 * brightest and least busy part of the frame is exactly where the phones are,
 * and the phones' own shadows have somewhere light to fall.
 *
 * All CSS. No canvas, no JavaScript, nothing running after first paint.
 */
export function HeroEnvironment() {
  return (
    <>
      {/* Base wash — white at the crown, lavender settling toward the floor. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(176deg,#ffffff_0%,#f8f5ff_28%,#f1ebff_62%,#eae1ff_100%)]"
      />

      {/*
        The mesh. Four bodies at different sizes and hues; overlapping soft
        radials are what give a flat gradient the sense of a lit room rather
        than a printed backdrop.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(58% 44% at 8% 6%, color-mix(in oklab, var(--brand) 20%, transparent), transparent 62%)",
            "radial-gradient(46% 40% at 96% 12%, color-mix(in oklab, var(--brand-accent) 26%, transparent), transparent 66%)",
            "radial-gradient(52% 48% at 84% 96%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 64%)",
            "radial-gradient(40% 36% at 26% 92%, color-mix(in oklab, var(--brand-check) 14%, transparent), transparent 66%)",
          ].join(","),
        }}
      />

      {/* Drifting lights, kept to the edges so they never cross the product. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-[26%] -left-[16%] size-[44rem] animate-aurora rounded-full bg-brand/18 blur-[160px]" />
        <div className="absolute right-[-18%] bottom-[-30%] size-[40rem] animate-aurora rounded-full bg-brand-accent/22 blur-[150px] [animation-delay:-11s]" />
      </div>

      {/*
        Key light. Sits behind the devices and is the brightest thing in the
        frame — a product photographed against its own light reads as premium;
        the same product on a flat field reads as a screenshot.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(46% 52% at 70% 44%, rgba(255,255,255,0.96), rgba(255,255,255,0.55) 42%, transparent 72%)",
        }}
      />

      {/* Floor: a soft horizon the devices sit on rather than float over. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
        style={{
          backgroundImage:
            "radial-gradient(64% 100% at 62% 108%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 68%)",
        }}
      />

      <Noise className="opacity-[0.05]" />

      {/* Hands off to the next section without an edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--color-background)_55%,transparent)] to-background"
      />
    </>
  );
}
