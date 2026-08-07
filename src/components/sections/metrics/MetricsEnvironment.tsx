import { Noise } from "@/components/ui/noise";

/**
 * The room the scale band stands in.
 *
 * The hero's environment, at about a third of its strength. That ratio is the
 * whole brief: same vocabulary — a base wash, a faint grid, one cool body of
 * light, grain — so the two read as the same page, but quiet enough that the
 * hero stays the only place on the homepage with a lit stage in it. A second
 * section competing for that job would flatten both.
 *
 * The grid is the hero's, at the same 64px cell, so the two line up in kind if
 * not in phase. It is masked to a soft ellipse for the same reason it is there:
 * a grid running to the crop reads as a template, a grid fading into the field
 * reads as depth.
 *
 * The glow sits behind the middle of the row rather than under any one card, so
 * it lights the band without picking a favourite among four equal figures.
 *
 * All CSS. No canvas, no JavaScript, nothing running after first paint.
 */
export function MetricsEnvironment() {
  return (
    <>
      {/* Base wash — white at the seam with the band above, cooling downward. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fcfdff_46%,#f7fafd_100%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: [
            "linear-gradient(to right, rgba(11,27,54,0.04) 1px, transparent 1px)",
            "linear-gradient(to bottom, rgba(11,27,54,0.04) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(120% 100% at 50% 45%, #000 15%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 50% 45%, #000 15%, transparent 80%)",
        }}
      />

      {/*
        One cool body of light, centred and wide. Under six percent brand —
        the amount that stops a neutral field reading as dead without ever
        announcing itself as a colour.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 62% at 50% 42%, color-mix(in oklab, var(--brand) 5.5%, transparent), transparent 70%)",
        }}
      />

      <Noise className="opacity-[0.03]" />
    </>
  );
}
