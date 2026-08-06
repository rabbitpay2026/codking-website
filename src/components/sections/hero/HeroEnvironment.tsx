import { Noise } from "@/components/ui/noise";

/**
 * The light lavender room the hero devices stand in.
 *
 * Built as stacked layers rather than one gradient, because depth is what
 * separates a lit environment from a coloured rectangle: a warm lavender
 * wash at the base, two drifting colour bodies for movement, a bright key
 * light behind where the devices sit, a soft floor gradient that grounds
 * them, and grain over everything to stop the whole thing banding.
 *
 * Every layer is masked or faded before it reaches the centre, so the
 * brightest, least busy part of the frame is exactly where the phones are.
 * The environment has to stay subordinate to the product — the moment a
 * background competes with a device, both lose.
 *
 * All CSS. No canvas, no JavaScript, nothing running after first paint.
 */
export function HeroEnvironment() {
  return (
    <>
      {/* Base wash: white at the top, lavender settling toward the floor. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-background)_0%,var(--color-brand-soft)_45%,color-mix(in_oklab,var(--brand)_9%,var(--color-background))_100%)]"
      />

      {/* Drifting colour bodies, kept to the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-[22%] -left-[14%] size-[46rem] animate-aurora rounded-full bg-brand/22 blur-[150px]" />
        <div className="absolute -right-[16%] bottom-[-28%] size-[40rem] animate-aurora rounded-full bg-brand-accent/25 blur-[140px] [animation-delay:-11s]" />
        <div className="absolute top-[35%] left-[38%] size-[26rem] animate-aurora rounded-full bg-brand-check/10 blur-[130px] [animation-delay:-19s]" />
      </div>

      {/* Key light behind the devices. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(42% 46% at 72% 42%, rgba(255,255,255,0.92), transparent 70%)",
        }}
      />

      {/* Floor: a soft horizon the devices can sit on rather than float over. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          backgroundImage:
            "radial-gradient(70% 100% at 50% 100%, color-mix(in oklab, var(--brand) 16%, transparent), transparent 70%)",
        }}
      />

      <Noise className="opacity-[0.045]" />

      {/* Hands off to the next section without an edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
      />
    </>
  );
}
