import Image from "next/image";

import { cn } from "@/lib/utils";

import type { TrustedBrand } from "@/types";

/**
 * One merchant, as a logo.
 *
 * These are the stores' own supplied marks, so this component draws nothing —
 * it places artwork, in the brand's own colours, at the size the wall wants.
 * No desaturation and no hover reveal: a mark that has to be hovered to be seen
 * properly is a mark the page is half-hiding, and the point of a logo wall is
 * that the names are legible at a glance.
 *
 * The composition carries the restraint instead. Nothing else in this section
 * is saturated, so five brand palettes sitting on an otherwise achromatic strip
 * read as the content rather than as decoration.
 *
 * `width`/`height` come from the record and are the rendered box, not the
 * file's intrinsic size — the wall balances the marks optically rather than to
 * a shared height, and the ratio is exact so the row reserves its space before
 * a single image has loaded.
 *
 * There is deliberately no `sizes`. These are fixed-size images, and Next only
 * emits the small 1x/2x pair for that case when `sizes` is absent; supplying
 * one produces the full responsive candidate list and the browser asks for a
 * 3840-wide render of a 130-pixel mark.
 *
 * The image carries an empty `alt`: the marquee repeats its children to fill
 * the track, so the wall is hidden from assistive technology and the section
 * states the list once in text instead.
 *
 * A brand with no artwork yet falls back to its name set as a wordmark, so
 * adding a merchant to the content file is never blocked on a file arriving.
 */
export function MerchantMark({
  name,
  logo,
  className,
}: Pick<TrustedBrand, "name" | "logo"> & {
  readonly className?: string;
}) {
  if (!logo) {
    return (
      <span
        className={cn(
          "text-[15px] leading-none font-semibold tracking-tight whitespace-nowrap text-ink/70",
          className,
        )}
      >
        {name}
      </span>
    );
  }

  return (
    <Image
      src={logo.src}
      alt=""
      width={logo.width}
      height={logo.height}
      /*
        The box is set in the style rather than left to the attributes, and
        `w-auto`/`h-auto` are gone from the class list because between them
        they were throwing the balance away.

        `width: auto` on a replaced element does not mean "use the width
        attribute" — it means "use the image's own intrinsic width", and the
        intrinsic width of what Next actually serves is whichever optimised
        candidate the browser picked. So every mark rendered at 256px across
        regardless of what the record said: Casio came out at 256x47 against a
        130x24 box, RedTape and Qwerty at 256 wide as well, and Slobberman —
        whose artwork is a long thin wordmark — at 256x29. The one mark that
        looked nearly right, Himalaya, was the one whose candidate happened to
        be 128 wide.

        That is the whole of why the wall looked unbalanced: it was not
        rendering the hand-tuned sizes at all, it was rendering five files at
        one shared width, which is exactly the "logo wall as a row of random
        sizes" the balancing exists to avoid. An inline style cannot be
        overridden by the preflight rule that started it.
      */
      style={{ width: logo.width, height: logo.height }}
      className={cn("max-w-none select-none", className)}
    />
  );
}
