import { Noise } from "@/components/ui/noise";

/**
 * The room the problem section stands in.
 *
 * The hero's environment, continued — not a variation on it. Same base wash,
 * same 64px grid at the same 4.5% ink, same masked ellipse, same corner chroma
 * under eight percent, same grain. The only thing left out is the key light,
 * because that exists to lift the hero's device off the field and there is no
 * device here.
 *
 * An earlier pass tinted the lower half warm to signal that the subject had
 * turned to loss. That was the background doing with colour what the copy is
 * supposed to do with facts, and it cost the thing that matters more: from the
 * hero down, this is one canvas, and a section that changes palette to make a
 * point reads as a different website making it.
 *
 * The two chroma bodies are brand at the crown and violet at the foot — the
 * accent used the way the token system says an accent is used: a few percent,
 * in a corner, never as a field.
 *
 * All CSS. No canvas, no JavaScript, nothing running after first paint.
 */
export function PainEnvironment() {
  return (
    <>
      {/* Base wash — the hero's, to its third stop. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fdfdfe_40%,#f7f8fa_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(11,27,54,0.045) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(11,27,54,0.045) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(120% 90% at 50% 26%, #000 18%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 26%, #000 18%, transparent 78%)",
        }}
      />

      {/* Corner chroma, and a soft ambient lift through the middle. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(50% 42% at 4% 0%, color-mix(in oklab, var(--brand) 7%, transparent), transparent 64%)",
            "radial-gradient(48% 44% at 98% 98%, color-mix(in oklab, var(--brand-violet) 5%, transparent), transparent 62%)",
            "radial-gradient(46% 44% at 66% 46%, rgba(255,255,255,0.85), transparent 72%)",
          ].join(","),
        }}
      />

      <Noise className="opacity-[0.035]" />
    </>
  );
}
