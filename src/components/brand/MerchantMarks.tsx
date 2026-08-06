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
      className={cn("h-auto w-auto max-w-none select-none", className)}
    />
  );
}
