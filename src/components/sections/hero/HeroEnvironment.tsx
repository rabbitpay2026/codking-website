import { Noise } from "@/components/ui/noise";

/**
 * The room the hero product scene stands in.
 *
 * Deliberately almost colourless. An earlier pass lit this field with four
 * saturated blue bodies, and it did what a coloured hero always does: the
 * background became the first thing a visitor saw, the phone became a thing
 * sitting *on* a brand banner, and every white card floating over it had to
 * fight the field to read as white. Colour was doing the work that
 * composition, type and light are supposed to do.
 *
 * So the field is now white through to a very pale neutral, and the only
 * chroma left is a few percent of brand in the far corners — enough that the
 * page is not clinically grey, not enough to name a colour. Everything that
 * makes it feel expensive is achromatic: a soft key light behind the product,
 * a grid so faint it reads as paper texture rather than as a pattern, a
 * horizon for the device to sit on, and grain so a field this large cannot
 * band.
 *
 * Layer order matters and is back to front: base wash, grid, corner chroma,
 * key light, floor, grain, seam. The key light is deliberately painted *over*
 * the grid so the brightest part of the frame — exactly where the phone is —
 * has no texture in it at all.
 *
 * All CSS. No canvas, no JavaScript, nothing running after first paint.
 */
export function HeroEnvironment() {
  return (
    <>
      {/* Base wash — white at the crown, settling to the faintest neutral. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fdfdfe_38%,#f7f8fa_72%,#f2f4f7_100%)]"
      />

      {/*
        Grid texture. 64px cells at ~2.5% ink, masked to a soft ellipse so it
        never reaches an edge — a grid that runs to the crop reads as a
        template, a grid that fades reads as depth.
      */}
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
            "radial-gradient(120% 90% at 50% 30%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 30%, #000 20%, transparent 78%)",
        }}
      />

      {/*
        Corner chroma. Two very weak bodies at opposite corners, both under
        eight percent — the amount that stops a neutral field reading as dead
        without ever announcing itself as a colour.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(52% 44% at 2% 0%, color-mix(in oklab, var(--brand) 7%, transparent), transparent 64%)",
            "radial-gradient(48% 46% at 100% 96%, color-mix(in oklab, var(--brand) 6%, transparent), transparent 62%)",
          ].join(","),
        }}
      />

      {/*
        Key light.
        Sits behind the device and is the brightest, emptiest part of the
        frame. This is the whole trick of a bright hero: the product is not
        placed on the background, it is lit against it.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(42% 50% at 68% 40%, rgba(255,255,255,0.98), rgba(255,255,255,0.72) 44%, transparent 74%)",
        }}
      />

      {/* Floor: a soft neutral horizon the device sits on rather than floats over. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          backgroundImage:
            "radial-gradient(58% 100% at 64% 106%, rgba(11,27,54,0.06), transparent 66%)",
        }}
      />

      <Noise className="opacity-[0.04]" />

      {/* Hands off to the next section without an edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
      />
    </>
  );
}
