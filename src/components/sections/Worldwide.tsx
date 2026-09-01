import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { OperatingRegionsMap } from "@/components/sections/worldwide/OperatingRegionsMap";
import { getProofMetrics } from "@/lib/content";

/**
 * Reach, as one map rather than as a pair of cards.
 *
 * This section used to be a two-column arrangement: a visual on the left and
 * the same fourteen markets listed as rows on the right, under a count. The
 * list is gone, and so are the cards around both halves. A map that names and
 * flags every market it marks already is the list, and printing it twice was
 * the reason neither half could be given enough room — the map was squeezed
 * into a column it could never fill, and the column beside it was a table of
 * contents for a picture sitting next to it.
 *
 * What is left is the heading, the count, and the drawing at the full width of
 * the page. Nothing here is a card, and that is the point: the section's
 * boundaries are the page's own.
 */
export async function Worldwide() {
  const proof = await getProofMetrics();

  return (
    <SectionShell
      tone="muted"
      size="compact"
      seam="top"
      ariaLabel="Worldwide availability"
      /*
        A neutral ground, not a tinted one.

        The `muted` tone runs through `--cloud`, which is a white with a little
        blue in it. Under a grey world map that tint is the difference between
        a map on paper and a map on a blue panel, and blue on this section is
        supposed to mean "supported market" and nothing else. The steps here
        are the same idea in neutral: white at both ends, a barely-there
        off-white through the middle, so the band still separates the section
        from its neighbours without colouring it.
      */
      className="bg-gradient-to-b from-white via-[#f7f8fa] to-white"
    >
      <SectionHeading
        eyebrow="Worldwide"
        title={
          <>
            {/*
              Two words in brand, not the sentence. The accent is there to land
              on who this is for; colouring the whole line would just make the
              heading loud, and colouring nothing leaves the section's one
              piece of large type with no relationship to the rest of the page.
            */}
            Trusted across the markets{" "}
            <span className="text-brand">Shopify merchants</span> sell in
          </>
        }
        description="COD King is actively supporting merchants across South Asia, the Middle East, Europe and North America."
      />

      {/*
        One figure, and it comes from the proof repository rather than from a
        literal here. The band higher up the page prints the same number; a
        second copy typed into this file is a number that can drift from the
        one it is meant to agree with.

        Nullable, because the repository models an unverified count as `null`.
        The line then drops out rather than printing a placeholder — this
        section must not be the one place on the page claiming a figure nobody
        has confirmed.

        Set a step larger than it was — 1.7rem to 2.1rem, and the word beside it
        from `text-base` to `text-lg` — because at the smaller size the one
        countable fact in the section was quieter than the heading above it and
        the map below it, and a reader scanning past caught neither the number
        nor the word.

        The whole figure grows, not the number alone. "100+" without "Countries"
        is not a claim, and letting the numeral run away from its own noun is
        how a statistic turns into decoration.

        Both stay in ink and foreground. This section already spends its one
        accent on the heading, and a second blue thirty pixels under it would
        make the two compete rather than read in order.
      */}
      {proof.countriesServed ? (
        <div className="mt-7 text-center">
          <p className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0.5">
            <span className="text-[2.1rem] font-semibold tracking-[-0.03em] text-ink tabular-nums sm:text-[2.35rem]">
              {proof.countriesServed}+
            </span>
            <span className="text-lg font-semibold text-foreground sm:text-xl">
              Countries
            </span>
          </p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Expanding our global COD network every day.
          </p>
        </div>
      ) : null}

      {/*
        Nothing is painted behind the map but the section's own background.

        There used to be two decorative layers here: a faint radial wash for
        depth, and a white fade down each side to blend the drawing into the
        page. Both were boxes the width of this wrapper, and once the wrapper
        stopped breaking out on the left they began at the content grid — where
        each one cut off dead straight. That vertical seam *was* the "map card"
        edge; on the right the same cut happens past the viewport, which is why
        only one side ever showed it. A map with nothing behind it needs neither.
      */}
      {/*
        The map breaks out of the reading column.

        Everything else in this section is text and belongs at a comfortable
        measure; the map is a picture of the world and wants the page. The
        negative margin pulls it out to the viewport and the inner box puts a
        ceiling back on it, so it goes full-bleed on a laptop without stretching
        into a letterbox on a very wide monitor. The section already clips its
        overflow, so 100vw here cannot introduce a horizontal scrollbar.
      */}
      {/*
        Left edge on the page's grid, right edge off it.

        The map used to break out on both sides, which put its left edge past
        the column every other thing on this page starts at — the heading, the
        description, the count. Only the right margin breaks out now, so the
        drawing begins exactly where the reading does and still runs off toward
        the edge of the screen, which is where a map wants to go.
      */}
      <div className="relative mt-10 mr-[calc(50%-50vw)] mb-10">
        {/*
          Wider by the width of its own gutters.

          The map already breaks out to the viewport, so on a laptop the only
          slack left to give it is this padding; taking it out is worth about
          three per cent there. The ceiling going up is what pays on a large
          monitor, where the cap was binding long before the viewport was.
        */}
        <div className="relative mx-auto w-full max-w-[1600px]">
          {/*
            The frame is aspect-locked, so insetting the left would have taken
            forty pixels off the height with it. Pinning the height back at the
            widths where the box is still wide enough keeps the map exactly as
            tall as it was; below that the aspect takes over again, because a
            fixed height on a narrow frame is what crops the Americas off.
          */}
          <OperatingRegionsMap className="xl:aspect-auto xl:h-[515px]" />
        </div>
      </div>
    </SectionShell>
  );
}
